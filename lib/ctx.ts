import { createCanvas } from 'canvas'
import { format } from './config';

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

export {
    ctx,
    canvas
};