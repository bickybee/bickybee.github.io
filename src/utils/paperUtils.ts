import paper from 'paper';
import { TYPE_CONFIGS } from '../data/constants';

/** Keeps Paper.js view backing store aligned with the canvas layout box (avoids CSS stretching). */
export function observePaperCanvasSize(
  canvas: HTMLCanvasElement,
  onAfterViewSizeSync?: () => void,
): () => void {
  const sync = () => {
    const w = Math.round(canvas.clientWidth);
    const h = Math.round(canvas.clientHeight);
    if (w <= 0 || h <= 0) return;
    for (let i = 0; i < paper.projects.length; i++) {
      const view = paper.projects[i].view;
      if (view?.element === canvas) {
        view.viewSize = new paper.Size(w, h);
        onAfterViewSizeSync?.();
        break;
      }
    }
  };

  const resizeObserver = new ResizeObserver(() => {
    sync();
  });
  resizeObserver.observe(canvas);
  requestAnimationFrame(sync);

  return () => {
    resizeObserver.disconnect();
  };
}

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
