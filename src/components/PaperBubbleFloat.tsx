import paper from 'paper';
import { useRef, useEffect } from 'react';
import { randomBubble, getColor } from '../utils/paperUtils';
import type { PaperFrameEvent, PaperPointerEvent } from '../utils/paperTypes';
import type { PaperProps } from './components.types';
import styles from './paper.module.css'

export function PaperBubbleFloat({renderTime, filter}: PaperProps) {
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

    var squareSize = 400;
    var padding = 60;
    var gridSizeX = Math.floor((paper.view.size.width + (squareSize/2)) / squareSize);
    var gridSizeY = Math.floor((paper.view.size.height + (squareSize/2)) / squareSize);

    // if (props.renderTime !== renderTime.current) {
    //   renderTime.current = props.renderTime;
    //   grid.current = []; // reset grid to force re-generation
    // }
    
    if (grid.current.length === 0) {
      // divide the page up into a grid
      for (let i = 0; i < gridSizeX + 1; i++) {
        grid.current[i] = [];
        for (let j = 0; j < gridSizeY + 1; j++) {
          var shouldSkip = false//Math.random() < 0.1; // 10% chance to skip
          if (shouldSkip) {
            grid.current[i][j] = null;
            continue;
          }
          var xMin = i * squareSize - (squareSize / 2) + padding;
          var yMin = j * squareSize - (squareSize / 2) + padding;
          var randomX = xMin + Math.floor(Math.random() * (squareSize - padding * 2))
          var randomY = yMin + Math.floor(Math.random() * (squareSize - padding * 2))
          grid.current[i][j] = {
            path: randomBubble(new paper.Point(randomX, randomY), filter, 10, 20),
            tOffset: Math.random() * 1000
          };
          
        }
      }
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

    // Animate the paths
    paper.view.onFrame = (event: PaperFrameEvent) => {
      for (let i = 0; i < gridSizeX + 1; i++) {  
        for (let j = 0; j < gridSizeY + 1; j++) {  
          const bubble = grid.current[i][j]
          if (bubble) {
            const offset = new paper.Point(0, (Math.sin((event.time * 0.8) + (bubble.tOffset))) / 5);
            bubble.path.position = bubble.path.position.add(offset);
          }
        }
      }
    };

    paper.view.onMouseDown = (event: PaperPointerEvent) => {
      
      if (event.target) {
        console.log("mouse down")
        event.target.fillColor = getColor(filter)
        var hitResult = paper.project.hitTest(event.point, {fill: true})
        if (hitResult) {
          hitResult.item.fillColor = getColor(filter)
        }  
      }
    }

    // Cleanup function to remove the Paper.js project on unmount
    return () => {
      if (paper.projects.length > 0) {
        // Destroy the project associated with this canvas
        paper.projects.forEach(project => {
          if (project.view.element === canvas) {
            project.remove();
          }
        });
      }
    };
  }, [filter, renderTime])// Refresh whenever filter changes

  return (
    <canvas ref={canvasRef} className={styles.paperCanvas}/>
  );
};

export default PaperBubbleFloat;