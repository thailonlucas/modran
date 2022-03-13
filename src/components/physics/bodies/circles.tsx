//@ts-ignore
import {Bodies} from 'matter-js'

interface ICircleProps{
    x: number,
    y: number,
    radius: number,
    options?: ICircleOptions
}

interface ICircleOptions{
    restitution?: number,
    render?: ICircleRender
}

interface ICircleRender{
    fillStyle?: string
}

export const Circle = ({x, y, radius, options}: ICircleProps) => {
    return Bodies.circle(x, y, radius, options);
}