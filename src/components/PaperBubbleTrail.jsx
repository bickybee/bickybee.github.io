import paper from 'paper';
import { useRef, useEffect } from 'react';
import { randomBubble, getColor } from '../utils/paperUtils.js';
import styles from './paper.module.css'

export function PaperBubbleTrail(props) {
  const canvasRef = useRef(null);
  const bubbles = useRef(new Map());

  useEffect(() => {
    // Get the canvas from the ref
    const canvas = canvasRef.current;

    // Make sure paper is not already set up on this canvas
    if (!canvas || canvas.getAttribute('data-paper-scope')) {
      console.log("Paper.js already running on this canvas");
      return;
    }

    paper.setup(canvas);

    // Re-render any existing bubbles
    for (const [id, bubble] of bubbles.current) {
      bubble.fillColor = getColor(props.filter, true)
      paper.project.activeLayer.addChild(bubble)
    }

    console.log("Paper.js setup complete");

    // Animate the bubbles
    paper.view.onFrame = (event) => {

      for (const [id, bubble] of bubbles.current) {
        let offset = new paper.Point(0, Math.sin((event.time * 6) + (id * 10)));
        bubble.position = bubble.position.add(offset);
        if (bubble.opacity < 1) {
          bubble.opacity = bubble.opacity * 0.97
        }
      }
    };

    // Add a bubble when mouse moves
    paper.view.onMouseMove = (event) => {
      var bubble = randomBubble(event.point, props.filter, 5, 10, true);
      bubbles.current.set(bubble.id, bubble);

      setTimeout(() => {
        bubble.opacity = 0.97;
      }, 1500);

      setTimeout(() => {
        bubbles.current.delete(bubble.id);
        bubble.remove(); 
      }, 2000);
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
    <canvas ref={canvasRef} className={styles.paperCanvas} />
  );
};

export default PaperBubbleTrail;