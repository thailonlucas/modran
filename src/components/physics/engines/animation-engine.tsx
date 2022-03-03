//@ts-ignore
import {Engine, Events, Body, Render, Runner, Composite, Mouse, MouseConstraint} from 'matter-js'
import { FloorElement } from '../bodies'
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
        ...props,
        run: () => {
            Render.run(render)
            Runner.run(runner, engine)
        },
        add: (body) => {
            Composite.add(engine.world,body)
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
        addMouseFollower: (body: any) => {
            let mouse = Mouse.create(render.canvas);
            Composite.add(engine.world, body)

            Events.on(engine, 'afterUpdate', function() {
                if (!mouse.position.x) {
                    return;
                }

                Body.setPosition(body, {
                    x: mouse.position.x,
                    y: mouse.position.y
                });
            });
        }
    }
}