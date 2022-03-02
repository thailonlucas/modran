import { AnimationEngine } from "../../components/matter/engines/animation-engine"

export const getAnimationEngine = ({width, height, canvasRef, boxRef}: IAnimationCanvas) => {
    let newAnimationEngine = AnimationEngine({width, height, canvasRef, boxRef})
    newAnimationEngine.addMouseConstraint()
    newAnimationEngine.addFloor()
    newAnimationEngine.run()

    return newAnimationEngine
}