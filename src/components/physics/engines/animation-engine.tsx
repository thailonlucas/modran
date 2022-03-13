//@ts-ignore
import {Engine, Events, Render, Runner, Composite, Mouse, MouseConstraint} from 'matter-js'
import { Circle } from '../bodies/circles'
import { FloorElement } from '../bodies/floor'
import { BounceTextAnimation } from './bounce-text'

export const AnimationEngine = (props: IAnimationCanvas): IAnimationCanvasReturn => {
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
        world: engine.world,
        ...props,
        run: () => {
            Render.run(render)
            Runner.run(runner, engine)
        },
        add: (target: any, body: any) => {
            Composite.add(target, body)
        },
        remove: (target: any, body: any) => {
            Composite.remove(target, body)
        },
        clear: (body: any) => {
            Composite.clear(body)
        },
        composite: (props) => {
            return Composite.create(props)
        },
        circle: (props) => {
            return Circle(props)
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
        addBounceText: ({text, size}) => {
            bounceText.add({text, letterSize: size, width, height})
        },
        onAfterUpdate: (callback: any) => {
            Events.on(engine, 'afterUpdate', callback);
        }
    }
}