export type TypeConfig = {
  text: string,
  color: string
}

export interface Project {
  id: string,
  title: string,
  context: string,
  tagline: string,
  previewImage: string,
  contentPath: string,
  tags: string[],
  skills: ProjectSkill[],
  details: ProjectDetail[],
  wideImages?: boolean
}

export interface ProjectSkill {
  type: string,
  subSkills: string[]
}

export interface ProjectDetail {
  iconKey: string,
  content: string
}