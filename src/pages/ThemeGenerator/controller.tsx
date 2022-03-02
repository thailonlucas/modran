//@ts-ignore
import Matter from 'matter-js'
import { MutableRefObject } from 'react'
import { FloorElement } from '../../components/2DElements/Shapes/shapes'
import { BounceTextAnimation } from './bounce-text'
const {Engine, Render, Runner, Composite, Mouse, MouseConstraint} = Matter

interface IAnimationCanvas{
    width: number,
    height: number,
    canvasRef: MutableRefObject<null>
    boxRef: MutableRefObject<null>
}

export const AnimationEngine = (props: IAnimationCanvas) => {
    const {width, height, canvasRef, boxRef} = props
    
    const engine = Engine.create({})
    const renderConfig = {
        engine,
        element: boxRef.current,
        canvas: canvasRef.current,
        options: {
            width: width,
            height: height,
            background: 'transparent',
            wireframes: false,
        }
    }
    const runner = Runner.create()
    const render = Render.create(renderConfig)
    const bounceText = BounceTextAnimation(engine)

    return {
        engine,
        ...props,
        run: () => {
            Render.run(render)
            Runner.run(runner, engine)
        },
        addMouseConstraint: ({stiffness, visible}: {stiffness?: number, visible?: boolean} = {}) => {
            var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: stiffness || 0.2,
                    render: {
                        visible
                    }
                }
            });
            Composite.add(engine.world, [mouseConstraint])
        },
        addFloor: () => {
            const floor = FloorElement({width: width, height: 80, x: width/2, y:height+40})
            Composite.add(engine.world, [floor])
        },
        addBounceText: ({text, size}: {text: string, size: number}) => {
            bounceText.add({text, letterSize: size, width, height})
        }
    }
}