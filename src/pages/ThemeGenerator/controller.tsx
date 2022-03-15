import { AnimationEngine } from "../../components/physics/engines/animation-engine"

export const getAnimationEngine = ({width, height, canvasRef, boxRef}: IAnimationCanvas) => {
    let newAnimationEngine = AnimationEngine({width, height, canvasRef, boxRef})
    newAnimationEngine.addMouseConstraint()
    newAnimationEngine.addGyroscopeConstraint()
    newAnimationEngine.addFloor()
    newAnimationEngine.run()

    return newAnimationEngine
}