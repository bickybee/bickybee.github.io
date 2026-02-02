export const PROJECTS = [
  {
    id: "superCodeSaga",
    title: "SuperCode Saga",
    context: "Educational Game Development @ Creatubbles",
    tagline: "Teaching computer science through narrative-driven games.",
    previewImage: "/media/entity-emporium.png",
    contentPath: "/copy/supercode.md",
    tags: ["education", "programming", "game", "ux"],
    skills: [
      { type: "programming", subSkills: ["Lua"]},
      { type: "ux", subSkills: ["Figma", "Experience Design"]},
      { type: "game", subSkills: ["Game Design", "Prototyping"]},
      { type: "education", subSkills: ["Curriculum Development", "Instructional Design"]}
    ],
    details: [
      { heading: "Where?", content: "Creatubbles"},
      { heading: "When?", content: "2023 - present"},
      { heading: "Role:", content: "Educational Game Developer (amongst other things!)"}
    ]
  },
  {
    id: "jurassic",
    title: "Jurassic World: Primal Ops",
    context: "Game Programming @ Behaviour Interactive",
    tagline: "A dinosaur-collecting action game set in the Jurassic World universe.",
    tags: ["programming", "game"],
    previewImage: "/media/jurassic-roster.png",
    contentPath: "/copy/jurassic.md",
    skills: [
      { type: "game", subSkills: ["Unity", "Mobile"]},
      { type: "programming", subSkills: ["C#", "Javascript", "Node.js", "Mocha.js (test suite)"]},
    ],
    details: [
      { heading: "Where?", content: "Behaviour Interactive"},
      { heading: "When?", content: "2020 - 2022"},
      { heading: "Role:", content: "Gameplay Programmer"}
    ]
  },
  {
    id: "unannounced",
    title: "Unannounced Project",
    context: "Game Programming @ Behaviour Interactive",
    tagline: "An unannounced project built in Unreal Engine.",
    tags: ["programming", "game"],
    previewImage: "/media/unreal.jpg",
    contentPath: "/copy/unreal.md",
    skills: [
      { type: "game", subSkills: ["Unreal Engine", "Multiplayer", "Gameplay Ability System", "Behaviour Trees"]},
      { type: "programming", subSkills: ["C++"]},
    ],
    details: [
      { heading: "Where?", content: "Behaviour Interactive"},
      { heading: "When?", content: "2022 - 2023"},
      { heading: "Role:", content: "Gameplay Programmer"}
    ]
  },
  {
    id: "uoft",
    title: "Space-Time Maps",
    context: "Graduate Research @ University of Toronto",
    tagline: "Human-computer interaction research and prototyping novel interaction techniques.",
    tags: ["programming", "ux"],
    previewImage: "/media/space-time.png",
    contentPath: "/copy/space-time.md",
    skills: [
      { type: "ux", subSkills: ["UX Research", "Prototyping", "Usability Testing"]},
      { type: "programming", subSkills: ["Swift", "iOS"]},
    ],
    details: [
      { heading: "Where?", content: "University of Toronto"},
      { heading: "When?", content: "2018 - 2020"},
      { heading: "Role:", content: "Graduate Student Researcher"}
    ]
  },
  {
    id: "website",
    title: "Portfolio Site",
    context: "Personal Work",
    tagline: "The website you're looking at right now, built with React and Paper.js.",
    tags: ["programming", "ux"],
    previewImage: "/media/vicky-portrait-square.png",
    contentPath: "/copy/unreal.md",
    skills: [
      { type: "ux", subSkills: ["Figma", "Web Design"]},
      { type: "programming", subSkills: ["Javascript", "React", "Paper.js", "HTML5 Canvas", "CSS"]},
    ],
    details: [
      { heading: "Where?", content: "On the Internet"},
      { heading: "When?", content: "2026"},
      { heading: "Role:", content: "Creator!"}
    ]
  },
  {
    id: "art",
    title: "Artwork",
    context: "Personal Work",
    tagline: "Collected illustrations, animations, and artwork.",
    tags: ["art"],
    previewImage: "/media/tastys-blue.png",
    contentPath: "/copy/art.md",
    skills: [
      { type: "art", subSkills: ["Adobe Photoshop", "Adobe Illustrator", "Procreate"]},
    ],
    details: [
      { heading: "Where?", content: "Online, on walls, on paper."},
      { heading: "When?", content: "Ongoing"},
      { heading: "Role:", content: "Artist"}
    ]
  }
];
