//@ts-ignore
import { Bodies } from 'matter-js'

export const FloorElement = ({x, y, width, height}: IMatterFloor) => Bodies.rectangle(x, y, width, height , {
    isStatic: true,
    render: {fillStyle: 'none',},
})

export const ShapeEllement = ({x, y, size, color}: IMatterShape) => {
    return Bodies.circle(x, y, size, {
        restitution: 0.1,
        render: {
            fillStyle: color || 'black',
            sprite:{
                xScale: 0.5,
                yScale:0.5
            }
        },
    })
}

export const LetterElement = ({x, y, size, letter, inertia = 99999999, restitution = 0.7}: IMatterLetter) => {
    return Bodies.circle(x, y, size, {
        restitution,
        inertia,
        size,
        render: {
            sprite:{
                texture: require(`../sprites/${letter}.png`),
                xScale: 0.45,
                yScale: 0.45
            }
        },
    })
}