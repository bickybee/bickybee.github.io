--[[
    ===============
    NPC MANAGER
    Singleton Script
    Version 1.6 (01/20/2026) - interact quests will now require the NPC to start AND end in the same state.
                             - ignoreStartState = true reverts to old behaviour, only checking that the NPC ends in the target state
    Version 1.5 (11/12/2025) - fix overrideCameraTag sometimes freezing player controls, fix one-shoe issue
    Version 1.4 (01/12/2025) - disable controls when override camera is used
    Version 1.3 (25/11/2025) - add voice preset support
    Version 1.2 (24/09/2025) - check the default control scheme at the end of every interaction
    Version 1.1 (16/09/2025) - added overrideCameraTag support
    Version 1.0 (11/08/2025) - initial script
    ===============
    This script contains shared logic to be used by NPCs in a mission.
    It should NOT change from mission to mission.
    It works together with the *Mission_Config and *NPC_Base scripts.

    ===============
    HOW TO USE
    ===============
    Assign this script to 1 entity and give it the tag "npcManager". 
    DO NOT EDIT the code in this script!
    
]]--

--[[
    ===============
    PUBLIC
    ===============
]]--

--[[
    start: initialization code to be called for the NPC
]]
function start(npcEntity)
    setupAvatar(npcEntity)
end

--[[
    interactStart: initialization code to be called for the NPC
]]


-- track if overrideCam is being used to reenable controls manually onInteractFinish 
local usingOverrideCamera = false 

function interactStart(npcEntity, clientId)
    local npc = npcEntity.env
    local currentStateConfig = npc.stateConfigs[npc.state]

    -- possibility to override Dialogue cam based on NPC state
    if currentStateConfig.overrideCameraTag then
        local camera = World.findEntity(currentStateConfig.overrideCameraTag)
        if camera then
            Controls.setCameraEntity(clientId, camera)
            -- Control scheme is switched to Custom. Manually disable controls
            Controls.setPlayerControls(clientId, false)
            usingOverrideCamera = true
        else
            Controls.setControlScheme(clientId, ControlScheme.Dialogue)
        end
    else
        Controls.setControlScheme(clientId, ControlScheme.Dialogue)
    end

    local startState = npc.state
    playInteractionSequence(npcEntity, npc.interactions[npc.state], clientId)
    tryCompleteQuest(startState, npcEntity)
end

function interactFinish(npcEntity, clientId)
    local npc = npcEntity.env
    local currentStateConfig = npc.stateConfigs[npc.state]
    if usingOverrideCamera then
      Controls.setPlayerControls(clientId, true)
      usingOverrideCamera = false
    end
    Controls.setControlScheme(clientId, missionConfig.env.defaultControlScheme)
end

function setState(npcEntity, newState)
    local npc = npcEntity.env
    local npcAvatar = npc["Avatar"]
    local npcSpeech = npc["Speech"]
    
    npc.state = newState
    local config = npc.stateConfigs[newState]
    if config then
        if hasAvatarModule(npcEntity) and config.emote then
            npcAvatar.playPartialEmote(config.emote, 0, 1, PersistMode.Repeat, AsyncMode.Continue)
        end

        if config.position then
            npcEntity.position = config.position
        end

        if config.rotation then
            npcEntity.rotation = config.rotation
        end

        if config.text then
            npcSpeech.setText(formatString(config.text))
        end

        if config.showFx then
            if npc.questFx and not isVectorEqual(npc.questFx.position, npcEntity.position) then
                destroyParticles(npcEntity)
                spawnParticles(npcEntity)
            elseif not npc.questFx then
                spawnParticles(npcEntity)
            end
        elseif npc.questFx and not config.showFx then
            destroyParticles(npcEntity)
        end
    end
end

--[[
    ===============
    PRIVATE
    ===============
]]--

missionConfig = nil
function onStart(initialData)
    Task.wait(0.5)
    missionConfig = World.findEntity("missionConfig")
    if missionConfig == nil then
        print("WARNING: Missing *Mission_Config entity tagged 'missionConfig'")
    end
end

function tryCompleteQuest(startState, npcEntity)
    local quest = Quest.getCurrent()
    if not quest then return end
    
    local npc = npcEntity.env
    for _,interactQuest in ipairs(npc.interactQuests) do
        if quest.id == interactQuest.questId
        and npc.state == interactQuest.completionState
        and ((startState == interactQuest.completionState) or (interactQuest.ignoreStartState == true)) then
            Quest.setComplete()
            destroyParticles(npcEntity)
            break
        end
    end
end

function spawnParticles(npcEntity)
    npcEntity.env.questFx = Particles.spawn("zone.yellow", npcEntity.position, Vector3.zero, npcEntity.scale, -1)
end

function destroyParticles(npcEntity)
    local npc = npcEntity.env
    if npc.questFx and not npc.questFx.isDestroyed then
        npc.questFx.destroy()
        npc.questFx = nil
    end
end

function setupAvatar(npcEntity)
    local npc = npcEntity.env
    local npcSpeech = npc["Speech"]
    local npcAvatar = npc["Avatar"]

    npcSpeech.setName(npc.name)
    Health.setInvulnerable(npcEntity, true)

    if hasPhysics(npcEntity) then
        npcEntity.isKinematic = true
    end

    if npc.voicePreset then
        npcSpeech.setVoicePreset(npc.voicePreset)
    end

    if hasAvatarModule(npcEntity) and npc.equipName then
        npcAvatar.equipItem(AvatarSlot.Head, string.format("head.%s.0", npc.equipName))
        npcAvatar.equipItem(AvatarSlot.Top, string.format("top.%s.0", npc.equipName))
        npcAvatar.equipItem(AvatarSlot.Bottom, string.format("bottom.%s.0", npc.equipName))
        npcAvatar.equipItem(AvatarSlot.LeftFoot, string.format("foot.%s.0", npc.equipName))
        npcAvatar.equipItem(AvatarSlot.RightFoot, string.format("foot.%s.0", npc.equipName))
    end
end

function playInteractionSequence(npcEntity, sequence, clientId)
    local npcSpeech = npcEntity.env["Speech"]
    npcSpeech.setSpeechCancellable(false)
    for _,step in ipairs(sequence) do
        if type(step) == "string" then
            npcSpeech.prompt(formatString(step))
        elseif type(step) == "function" then
            local result = step(clientId)
            if result == "break" then
                break
            end
        end
    end
    npcSpeech.closePrompt()
end

function isVectorEqual(v1, v2)
    return v1.x == v2.x and v1.y == v2.y and v1.z == v2.z
end

playerName = ""
function onPlayerJoin(player)
    playerName = player.name
end

function formatString(str)
    return string.gsub(str, "{playerName}", playerName)
end

function hasAvatarModule(npcEntity)
    return npcEntity.name == "Citizen"
end

function hasPhysics(npcEntity)
    return npcEntity.name == "Citizen" or npcEntity.name == "Crone"
end