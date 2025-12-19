import { useRef, useEffect } from 'react';
import paper from 'paper';
import { TYPE_CONFIGS } from './data/constants';

export function PaperCanvas(props) {
  const canvasRef = useRef(null);
  const moreMacaronis = useRef([]);

  useEffect(() => {
    // Get the canvas from the ref
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')
    //Our first draw
    context.fillStyle = '#FF00FF'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    // Make sure paper is not already set up on this canvas
    if (canvas) {
      const colors = [
          '#f56c97',
          '#ec9238',
          '#3898ec',
          '#82b333',
          '#9538ec'
      ]

      // Setup Paper.js on the canvas
      paper.setup(canvas);

      // Your drawing logic here

      function randomMacaroni(startPoint, colorIndex) {
        var startX = startPoint.x;
        var startY = startPoint.y;
        
        var throughOffsetX = 30
        var throughOffsetY = 0
        var toOffsetX = 30
        var toOffsetY = 30
        
        var from = startPoint;
        var through = new paper.Point(startX + throughOffsetX, startY + throughOffsetY);
        var to = new paper.Point(startX + toOffsetX, startY + toOffsetY);
        //var path = new paper.Path.Arc(from, through, to);
        var path = new paper.Path.Circle(startPoint, 15 + Math.random() * 15);

        var rotation = Math.random() * 360
        path.rotate(rotation, startPoint)
        //path.strokeColor = colors[Math.floor(Math.random() * colors.length)];
        path.strokeWidth = 10 + Math.random() * 5;
        console.log("filter: " + props.filter)
        var color = props.filter === "" ? colors[colorIndex % colors.length] : TYPE_CONFIGS[props.filter].color
        path.fillColor = color;
        path.opacity = 0.9;
        return path
      }

      var squareSize = 250;
      var padding = 20;
      var gridSizeX = Math.floor((paper.view.size.width + (squareSize/2)) / squareSize);
      var gridSizeY = Math.floor((paper.view.size.height + (squareSize/2)) / squareSize);
      var grid = [];
      // divide the page up into a grid
      for (let i = 0; i < gridSizeX + 1; i++) {
          grid[i] = [];
          // for (let j = 0; j < gridSizeY + 1; j++) {
          //     var shouldSkip = Math.random() < 0.3; // 20% chance to skip
          //     if (shouldSkip) {
          //       grid[i][j] = null;
          //       continue;
          //     }
          //     var xMin = i * squareSize + padding
          //     var yMin = j * squareSize + padding
          //     var randomX = xMin + Math.floor(Math.random() * (squareSize - padding * 2))
          //     var randomY = yMin + Math.floor(Math.random() * (squareSize - padding * 2))
          //     grid[i][j] = {
          //       path: randomMacaroni(new paper.Point(randomX, randomY), i+j),
          //       tOffset: Math.random() * 1000
          //     };
          // }
      }

      for (let i = 0; i < moreMacaronis.current.length; i++) {
          let macaroni = moreMacaronis.current[i];
          moreMacaronis.current[i] = new paper.Path.Circle(macaroni.position, macaroni.bounds.width / 2);
          moreMacaronis.current[i].fillColor = macaroni.fillColor
      }

      console.log("Paper.js setup complete");

      // Animate the path
      paper.view.onFrame = (event) => {
        for (let i = 0; i < gridSizeX + 1; i++) {  
         for (let j = 0; j < gridSizeY + 1; j++) {  
            let macaroni = grid[i][j]
            if (macaroni) {
              let offset = new paper.Point(0,(Math.sin((event.time * 2) + (macaroni.tOffset)))/(Math.random() * 1 + 2));
              macaroni.path.position = macaroni.path.position.add(offset);
            }
          }
        }

        for (let i = 0; i < moreMacaronis.current.length; i++) {
          let macaroni = moreMacaronis.current[i];
          let offset = new paper.Point(0,(Math.sin((event.time * 2) + (i * 10))));
          macaroni.position = macaroni.position.add(offset);
          if (props.filter !== "") {
            macaroni.fillColor = TYPE_CONFIGS[props.filter].color;
          }
          //macaroni.opacity -= 0.01;
        }
      };

      paper.view.onMouseMove = (event) => {
        var path = randomMacaroni(event.point, Math.floor(Math.random() * colors.length));
        var len = moreMacaronis.current.push(path);
        setTimeout(() => {
          path.remove();
        }, 2000);
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
  }, [props.filter]);

  return (
    <canvas ref={canvasRef} {...props} />
  );
};

export default PaperCanvas;