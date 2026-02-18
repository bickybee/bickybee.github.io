import type { TypeConfig } from './data.types';

export const TYPE_CONFIGS: Record<string, TypeConfig> = {
  programming: {
    text: "Programming",
    color: "#f56c97"
  },
  game: {
    text: "Game Development",
    color: "#3898ec"
  },
  ux: {
    text: "User Experience",
    color: "#ec9238"
  },
  education: {
    text: "Education",
    color: "#82b333"
  },
  art: {
    text: "Art",
    color: "#9538ec"
  }
}

export const THEMES = {
  FLOAT: 0,
  CURSOR: 1,
  NONE: 2
}

export const THEME_NAMES = ['Float', 'Cursor', 'None'];