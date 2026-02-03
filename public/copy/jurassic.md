# The Project
 Jurassic World: Primal Ops was an action-adventure, dinosaur-collecting mobile game, built for Universal Studios as part of the Jurassic World franchise. Players take on missions to rescue dinosaurs across the continuent, growing their dinosaur roster and uncovering each species' special abilities in battle.

*[**Click here to check out the launch trailer on YouTube!**](https://www.youtube.com/watch?v=XhM6s8E9IAk)*

I was a **Gameplay Programmer** on Jurassic from the very beginning of production all the way through to its 2022 soft-launch in multiple countries, continuing to push fixes and new features to the live game. The project has since been cancelled, but it entertained tons of loyal fans during its run, with popular YouTube channels like [**The Gaming Beaver**](https://youtu.be/4gNaxBiWDhw?si=HZ2DxsNUgDSp2czh) posting gameplay videos regularly.

# Contributing Across the Stack

My main contributions were in the meta-game, building out game features across the stack.

I worked with Game Designers to create data models that would capture the parameters they needed while maintaining good data architecture, and implemented the underlying feature logic on the Node.js backend.

I connected the data to the front-end, populating the UI dynamically throughout the game. I collaborated closely with UI Artists to build out the corresponding UI components and screens in Unity, including tweakable parameters to support customization of details like animation curves and timing.

Here are some of the major meta-game systems that I owned and developed.

## The World Map

The World Map was the main hub of the game, acting as the main entrypoint into all the menus as well as the main gameplay.

![Alt text](/media/jurassic-map.png)
*The World Map was the first thing players would see once the game booted up!*

Each playable Mission was represented as a Node on the map, with each Chapter of the game represented as a different path across the continent. The Nodes had different designs that would communicate certain details about their missions. For example: the kind of loot that could be won, or if the Mission was replayable.

![Alt text](/media/jurassic-map-event.png)
*The flashy TLE-version of the World Map.*

An entirely different version of the map, with additional UI, was used for time-limited events.

## Squad Missions

![Alt text](/media/jurassic-squad.png)
*The main Squad Missions screen. Click on GO to open up the Mission Setup screen!*

Players could send out members of their Handler team and Dinosaur roster on timed Squad Missions, to gather extra loot. Squad Missions had specific Squad Requirements, dictating which Handlers and Dinosaurs were eligible to be sent out. 

## Mission Setup

![Alt text](/media/jurassic-roster.png)
*There was tons of data to display on the Mission Setup screen.*

The Mission Setup screen is where players learn more about each Mission and set up their team composition before embarking. This screen was used for both regular playable Missions and Squad Missions, and many UI components were reused in other parts of the game, such as the Sanctuary where you level up your team.

## The Rest
I also built and contributed to some general-purpose UI systems used throughout the game:
- The FTUE (first time user experience) system
- The toaster notification system
- The universal back-button / back-stack

