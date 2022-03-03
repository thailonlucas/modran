//@ts-ignore
import {Bodies} from 'matter-js'

export const Circle = ({x, y, r, options}: any) => {
    let body = Bodies.circle(x, y, r, options);

    return({
        body
    })
}