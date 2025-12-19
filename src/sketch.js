// Source - https://stackoverflow.com/a
// Posted by Ricardo Sanchez
// Retrieved 2025-11-18, License - CC BY-SA 4.0

import paper from 'paper';

export function Sketch() {

   window.onload = function() {
       paper.install(window);
       paper.setup('paper-background');

        var squareSize = 300;
        var padding = 50;
        var gridSizeX = Math.floor((1000 + (squareSize/2)) / squareSize);
        var gridSizeY = Math.floor((1000 + (squareSize/2)) / squareSize);
        var grid = [];
        // divide the page up into a grid
        for (let i = 0; i < gridSizeX + 1; i++) {
            grid[i] = [];
            for (let j = 0; j < gridSizeY + 1; j++) {
                console.log("macaronie")
                var xMin = i * squareSize + padding
                var yMin = j * squareSize + padding
                var randomX = xMin + Math.floor(Math.random() * (squareSize - padding * 2))
                var randomY = yMin + Math.floor(Math.random() * (squareSize - padding * 2))
                grid[i][j] = randomMacaroni(new Point(randomX, randomY))
            }
        }
        view.onFrame = draw;
    }

   function draw(event) {
       // animation loop
   }

   // Most return null
   return null;
}

function randomMacaroni(startPoint) {
        const colors = [
        '#f56c97',
        '#ec9238',
        '#3898ec',
        '#82b333',
        '#9538ec'
    ]

    var startX = startPoint.x
    var startY = startPoint.y
    var rotation = Math.random() * 360
    
    var throughOffsetX = 50
    var throughOffsetY = 0
    var toOffsetX = 50
    var toOffsetY = 50
    
    var from = startPoint;
    var through = new Point(startX + throughOffsetX, startY + throughOffsetY);
    var to = new Point(startX + toOffsetX, startY + toOffsetY);
    var path = new Path.Arc(from, through, to);
    var rotation = Math.random() * 360
    var macaroniMiddle = from + ((to - from) / 2)
    path.rotate(rotation, macaroniMiddle)
    
    var color = colors[Math.floor(Math.random() * colors.length)]
    path.strokeColor = color;
    path.strokeWidth = 15;
    return path
}

function onFrame(event) {
    for (let i = 0; i < gridSizeX + 1; i++) {  
         for (let j = 0; j < gridSizeY + 1; j++) {  
            grid[i][j].position += new Point(0,Math.sin((event.time * 7) + (i)));
        }
    }
}