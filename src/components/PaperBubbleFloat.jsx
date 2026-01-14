import paper from 'paper';
import { useRef, useEffect } from 'react';
import { randomBubble, getColor } from '../utils/paperUtils.js';
import styles from './paper.module.css'

export function PaperBubbleFloat(props) {
  const canvasRef = useRef(null);
  const grid = useRef([]);
  const renderTime = useRef(props.renderTime);

  useEffect(() => {
    // Get the canvas from the ref
    const canvas = canvasRef.current;

    // Make sure paper is not already set up on this canvas
    if (!canvas || canvas.getAttribute('data-paper-scope')) {
      console.log("Paper.js already running on this canvas");
      return;
    }

    paper.setup(canvas);

    var squareSize = 350;
    var padding = 20;
    var gridSizeX = Math.floor((paper.view.size.width + (squareSize/2)) / squareSize);
    var gridSizeY = Math.floor((paper.view.size.height + (squareSize/2)) / squareSize);

    // if (props.renderTime !== renderTime.current) {
    //   renderTime.current = props.renderTime;
    //   grid.current = []; // reset grid to force re-generation
    // }
    
    if (grid.current.length == 0) {
      // divide the page up into a grid
      for (let i = 0; i < gridSizeX + 1; i++) {
        grid.current[i] = [];
        for (let j = 0; j < gridSizeY + 1; j++) {
          var shouldSkip = Math.random() < 0.1; // 10% chance to skip
          if (shouldSkip) {
            grid.current[i][j] = null;
            continue;
          }
          var xMin = i * squareSize + padding
          var yMin = j * squareSize + padding
          var randomX = xMin + Math.floor(Math.random() * (squareSize - padding * 2))
          var randomY = yMin + Math.floor(Math.random() * (squareSize - padding * 2))
          grid.current[i][j] = {
            path: randomBubble(new paper.Point(randomX, randomY), props.filter, 10, 20),
            tOffset: Math.random() * 1000
          };
        }
      }
    } else {
      for (let i = 0; i < gridSizeX + 1; i++) {
        for (let j = 0; j < gridSizeY + 1; j++) {
          var bubbleData = grid.current[i][j]
          if (bubbleData !== null) {  
            var path = paper.project.activeLayer.addChild(bubbleData.path)
            path.fillColor = getColor(props.filter)
            grid.current[i][j].path = path
          }
        }
      }
    }

    console.log("Paper.js setup complete");

    // Animate the paths
    paper.view.onFrame = (event) => {
      for (let i = 0; i < gridSizeX + 1; i++) {  
        for (let j = 0; j < gridSizeY + 1; j++) {  
          let bubble = grid.current[i][j]
          if (bubble) {
            let offset = new paper.Point(0,(Math.sin((event.time * 0.8) + (bubble.tOffset)))/(Math.random() + 2));
            bubble.path.position = bubble.path.position.add(offset);
          }
        }
      }
    };

    paper.view.onMouseDown = (event) => {
      
      if (event.target) {
        console.log("mouse down")
        event.target.fillColor = getColor(props.filter)
        var hitResult = paper.project.hitTest(event.point, {fill: true})
        if (hitResult) {
          hitResult.item.fillColor = getColor(props.filter)
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
  }, [props.filter])//, props.renderTime]); // Refresh whenever filter changes

  return (
    <canvas ref={canvasRef} className={styles.paperCanvas}/>
  );
};

export default PaperBubbleFloat;