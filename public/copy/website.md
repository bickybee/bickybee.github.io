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
Not only did I decide to include all the disciplines in the website, this variety became the core visual theme of the site

Each discipline is given its own color, resulting in the website's colour scheme. People may visit my website for different reasons -- ideally, the colors will lead them to the information that they're searching for. Follow pink for programming! Follow blue for game dev! Etc. etc.

I realized later on that the 5 disciplines can correspond to the 5 letters of my name, resulting in my logo:

![The website logo: the name "vicky" in lowercase, with each letter surrounded by a circle of a different colour.](/media/logo.png)

It's me: I'm made up of all these things!

# The Implementation

I mocked up the initial designs in Figma, and returned to Figma when I found that certain pages weren't looking as I'd hoped after being populated with different project data.

The final site I built in React and Javascript, pulling static data from JSON and Markdown files.

I decided to work from scratch rather than vibe-coding the website, as one of my goals was to brush up on certain engineering skills. Now that the brushing up's been done, I'd gladly use AI tools to build more quickly the next time.

The background animations were built using Paper.js, a drawing library built upon HTML5 Canvas.

# Future Work

If I keep tinkering here, these are the next things I would do:
- Migrate to Typescript!
- Add more interactivity to the background bubbles, and perhaps additional different visualization options.
- Improve the algorithm for spacing the bubbles. I currently use a straight-forward, square-based grid, but I could try something more sophisticated like Poisson-Disk sampling or Voronoi partitioning.
- Move away from ReactMarkdown for the project page content and create my own JSON format instead, to support embedding custom components throughout pages.