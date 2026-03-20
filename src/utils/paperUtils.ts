import paper from 'paper';
import { TYPE_CONFIGS } from '../data/constants';

let colors: paper.Color[] = [];
let colorIndex = 0;

export function randomBubble(
  startPoint: paper.Point | paper.PointLike,
  filter: string,
  minSize = 5,
  maxSize = 10,
  randomColor = false,
  sizeMultiplier = 1,
): paper.Path {
  const clampedMultiplier = Math.min(sizeMultiplier, 8);
  const radius = (minSize + Math.random() * maxSize) * clampedMultiplier;
  const path = new paper.Path.Circle(startPoint, radius);

  path.strokeWidth = 10;
  path.fillColor = getColor(filter, randomColor);

  return path;
}

export function getColor(filter: string, randomOrder = false): paper.Color {
  if (colors.length === 0) {
    loadColors();
  }

  if (filter) {
    const hex = TYPE_CONFIGS[filter].color;
    const color = new paper.Color(hex);
    if (Math.random() < 0.75) {
      color.lightness = Math.min(0.8, color.lightness + Math.random() * 0.4);
    }
    return color;
  }

  if (randomOrder) {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  colorIndex = (colorIndex + 1) % colors.length;
  return colors[colorIndex];
}

function loadColors() {
  colors = Object.values(TYPE_CONFIGS).map((typeConfig) => new paper.Color(typeConfig.color));
  colorIndex = Math.floor(Math.random() * colors.length);
}
