import {Bodies} from 'matter-js'

export const FloorElement = ({x, y, width, height}: IMatterFloor) => Bodies.rectangle(x, y, width, height , {
    isStatic: true,
    render: {fillStyle: 'none',},
})
