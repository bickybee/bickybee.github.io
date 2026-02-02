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
      { iconKey: "where", content: "Creatubbles"},
      { iconKey: "when", content: "2023 - present"},
      { iconKey: "role", content: "Educational Game Developer"}
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
      { iconKey: "where", content: "Behaviour Interactive"},
      { iconKey: "when", content: "2020 - 2022"},
      { iconKey: "role", content: "Gameplay Programmer"}
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
      { iconKey: "where", content: "Behaviour Interactive"},
      { iconKey: "when", content: "2022 - 2023"},
      { iconKey: "role", content: "Gameplay Programmer"}
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
      { iconKey: "where", content: "University of Toronto"},
      { iconKey: "when", content: "2018 - 2020"},
      { iconKey: "role", content: "Graduate Student Researcher"}
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
      { iconKey: "where", content: "On the Internet"},
      { iconKey: "when", content: "2026"},
      { iconKey: "role", content: "Creator!"}
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
    wideImages: true,
    skills: [
      { type: "art", subSkills: ["Adobe Photoshop", "Adobe Illustrator", "Procreate"]},
    ],
    details: [
      { iconKey: "where", content: "Online, on walls, on paper."},
      { iconKey: "when", content: "Ongoing"},
      { iconKey: "role", content: "Artist"}
    ]
  }
];
