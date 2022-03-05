import { Circle } from "./circles"

export const MouseFollower = () => {
    return Circle({x: 0, y: 0, r: 32, options:{
        isStatic: true,
        render: {
            visible: false
        }
    }})
}