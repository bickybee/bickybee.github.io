import paper from 'paper';
import { useRef, useEffect } from 'react';
import { randomBubble, getColor, observePaperCanvasSize } from '../../utils/paperUtils.ts';
import styles from './paper.module.css'

const squareSize = 400;
const padding = 60;

function gridDimensions(viewWidth: number, viewHeight: number) {
  const gridSizeX = Math.floor((viewWidth + squareSize / 2) / squareSize);
  const gridSizeY = Math.floor((viewHeight + squareSize / 2) / squareSize);
  return { gridSizeX, gridSizeY };
}

export function PaperBubbleFloat({ renderTime, filter }: { renderTime: number, filter: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastRenderTime = useRef<number>(renderTime);
  const grid = useRef<Array<Array<{ path: paper.Path; tOffset: number } | null>>>([]);

  useEffect(() => {
    // Get the canvas from the ref
    const canvas = canvasRef.current;
    // Make sure paper is not already set up on this canvas
    if (!canvas || canvas.getAttribute('data-paper-scope')) {
      console.log("Paper.js already running on this canvas");
      return;
    }

    if (lastRenderTime.current !== renderTime) {
      lastRenderTime.current = renderTime;
      grid.current = [];
    }

    paper.setup(canvas);
    const view = paper.view;

    /** Ensures every cell up to (gridSizeX, gridSizeY) exists; new cells get a bubble. */
    function fillGridToSize(gridSizeX: number, gridSizeY: number) {
      for (let i = 0; i < gridSizeX + 1; i++) {
        if (!grid.current[i]) grid.current[i] = [];
        for (let j = 0; j < gridSizeY + 1; j++) {
          if (grid.current[i][j] !== undefined) continue;
          const shouldSkip = false;
          if (shouldSkip) {
            grid.current[i][j] = null;
            continue;
          }
          const xMin = i * squareSize - squareSize / 2 + padding;
          const yMin = j * squareSize - squareSize / 2 + padding;
          const randomX = xMin + Math.floor(Math.random() * (squareSize - padding * 2));
          const randomY = yMin + Math.floor(Math.random() * (squareSize - padding * 2));
          grid.current[i][j] = {
            path: randomBubble(new paper.Point(randomX, randomY), filter, 10, 20),
            tOffset: Math.random() * 1000,
          };
        }
      }
    }

    function extendGridForCurrentView() {
      const { gridSizeX, gridSizeY } = gridDimensions(view.size.width, view.size.height);
      fillGridToSize(gridSizeX, gridSizeY);
    }

    const stopObservingSize = observePaperCanvasSize(canvas, extendGridForCurrentView);

    let { gridSizeX, gridSizeY } = gridDimensions(view.size.width, view.size.height);

    if (grid.current.length === 0) {
      fillGridToSize(gridSizeX, gridSizeY);
    } else {
      for (let i = 0; i < gridSizeX + 1; i++) {
        for (let j = 0; j < gridSizeY + 1; j++) {
          const bubbleData = grid.current[i]?.[j] ?? null;
          if (bubbleData) {
            const path = paper.project.activeLayer.addChild(bubbleData.path) as paper.Path;
            path.fillColor = getColor(filter);
            bubbleData.path = path;
          }
        }
      }
      extendGridForCurrentView();
    }

    // debug drawing!
    // for (let i = 0; i < gridSizeX + 1; i++) {
    //   for (let j = 0; j < gridSizeY + 1; j++) {
    //     var xStart = i * squareSize - (squareSize / 2) + padding;
    //     var yStart = j * squareSize - (squareSize / 2) + padding;
    //     var xEnd = xStart + squareSize - padding;
    //     var yEnd = yStart + squareSize - padding;
    //     var rect = new paper.Path.Rectangle(
    //       new paper.Point(xStart, yStart),
    //       new paper.Point(xEnd, yEnd)
    //     );
    //     rect.strokeWidth = 10;
    //     rect.strokeColor = "red";
    //   }
    // }

    console.log("Paper.js setup complete");

    // Animate the paths (all cells, including off-screen after a shrink)
    view.onFrame = (event: { count: number; time: number; delta: number }) => {
      for (let i = 0; i < grid.current.length; i++) {
        const row = grid.current[i];
        if (!row) continue;
        for (let j = 0; j < row.length; j++) {
          const bubble = row[j];
          if (bubble) {
            const offset = new paper.Point(0, (Math.sin((event.time * 0.8) + bubble.tOffset)) / 5);
            bubble.path.position = bubble.path.position.add(offset);
          }
        }
      }
    };

    view.onMouseDown = (event: paper.MouseEvent) => {

      if (event.target) {
        console.log("mouse down")
        event.target.fillColor = getColor(filter)
        var hitResult = paper.project.hitTest(event.point, { fill: true })
        if (hitResult) {
          hitResult.item.fillColor = getColor(filter)
        }
      }
    }

    return () => {
      stopObservingSize();
      if (paper.projects.length > 0) {
        paper.projects.forEach((project) => {
          if (project.view.element === canvas) {
            project.remove();
          }
        });
      }
    };
  }, [filter, renderTime])

  return (
    <canvas
      ref={canvasRef}
      className={styles.paperCanvas}
      data-paper-resize
    />
  );
};

export default PaperBubbleFloat;