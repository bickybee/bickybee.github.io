import paper from 'paper';
import { TYPE_CONFIGS } from '../data/constants';

let colors = []
let colorIndex = 0;

export function randomBubble(startPoint, filter, minSize=5, maxSize=10, randomColor=false, sizeMultiplier=1) {
    var clampedMultiplier = 1 //Math.min(sizeMultiplier, 8)
    var radius = ((minSize + Math.random() * maxSize) * clampedMultiplier);
    console.log(radius)
    var path = new paper.Path.Circle(startPoint, radius);

    path.strokeWidth = 10;
    path.fillColor = getColor(filter, randomColor);

    return path
}

export function getColor(filter, randomOrder=false) {
    if (colors.length === 0) {
        loadColors()
    }

    if (filter) {
        const hex =  TYPE_CONFIGS[filter].color
        let color = new paper.Color(hex)
        if (Math.random() < 0.75) {
            color.lightness = Math.min(0.8, color.lightness + Math.random() * 0.4)
        }
        return color
    } else if (randomOrder) {
        return colors[Math.floor(Math.random() * colors.length)]
    } else {
        colorIndex = (colorIndex + 1) % colors.length
        return colors[colorIndex]
    }
}

function loadColors() {
    colors = Object.values(TYPE_CONFIGS).map((typeConfig) => {return typeConfig.color})
    colorIndex = Math.floor(Math.random() * colors.length)
}