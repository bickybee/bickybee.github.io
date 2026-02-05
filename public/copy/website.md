# The Project

Every few years I build a new personal website. The goals are:
- to give an overview of my skills via concrete experiences
- to engineer outside of my current comfort zone
- to have the website itself show off my skills
- to infuse some whimsy into the experience

The biggest challenge is deciding how to convey my varied skills and experiences in one place. This includes asking myself the question: **should** it all go in one place?

Being so multidisciplinary is seen as a boon to some and a fault to many. I've decided to lean in anyway.

# The Design

## Visual Themes
Not only did I decide to include all the disciplines in the website, this variety became the core visual theme of the site.

Each discipline is given its own color, resulting in the website's colour scheme. People may visit my website for different reasons -- ideally, the colors will lead them to the information that they're searching for. Follow pink for programming! Follow blue for game dev! Etc. etc.

The 5 discipline buttons on the homepage serve two functions:

1. As an additional subtitle, highlighting what I'm about
2. As filter buttons, helping visitors find projects relevant to what they're interested in

I realized later on that the 5 disciplines can correspond to the 5 letters of my name, resulting in my logo:

![Alt text](/media/logo.png)

It's me: I'm made up of all these things!

The bubbles in the logo also serve as a call-back to the background visuals. Creating randomly-generated artwork is something I knew I wanted to do for the site, to add extra flavour and fun. It's a common thread throughout the website, no matter which page you're on.

## Layout Design

Figma was a great tool for mocking up and iterating upon all of my design ideas, especially when translating the initial designs into responsive, mobile layouts.

The homepage was straightforward, but the about and project pages gave me a lot more trouble. Here are some variations I experimented with for the projects, which didn't always respond well depending on the project contents.

![Alt text](/media/personal-site/figma.png)

# The Implementation

The site is built in React and Javascript, pulling static data from JSON and Markdown files.

I decided to work from scratch rather than vibe-coding the website, as one of my goals was to brush up on certain engineering skills. Now that the brushing up's been done, I'd gladly use AI tools to build more quickly the next time.

The background animations were built using Paper.js, a drawing library built upon HTML5 Canvas. It's easier to use than straight Canvas, but still extremely lightweight. Libraries like three.js and Pixi.js are incredibly powerful, but would have been overkill for my purposes here.

# Future Work

If I keep tinkering here, these are the next things I would do:
- Migrate to Typescript!
- Add more interactivity to the background bubbles, and perhaps additional different visualization options.
- Improve the algorithm for spacing the bubbles. I currently use a straight-forward, square-based grid, but I could try something more sophisticated like Poisson-Disk sampling or Voronoi partitioning.
- Move away from ReactMarkdown for the project page content and create my own JSON format instead, to support embedding custom components throughout pages.