//@ts-ignore
import { Constraint } from 'matter-js'

interface ISlingProps{
    x: number,
    y: number,
    bodyB?: any,
    stiffness?: number,
    length?: number,
    visible?: boolean
}

export const Sling = ({x, y, bodyB, stiffness = 0.04, length, visible}: ISlingProps) => {
    return Constraint.create({
        pointA: {x, y},
        bodyB,
        stiffness,
        length,
        render: {
            visible
        }
    })
}