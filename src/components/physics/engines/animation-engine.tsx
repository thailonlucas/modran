//@ts-ignore
import {Engine, Events, Render, Runner, Composite, Mouse, MouseConstraint} from 'matter-js'
import { interpolate } from '../../../logic/utils'
import { Circle } from '../bodies/circles'
import { FloorElement } from '../bodies/floor'
import { BounceEllement } from './bounce-text'

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
    const bounceEllement = BounceEllement(engine)
    let mouse, mouseConstraint: any = undefined

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
            mouse = Mouse.create(render.canvas)
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
        addGyroscopeConstraint: (callback) => {
            window.addEventListener('deviceorientation', (event) => {
                let x = interpolate(event.gamma,-90,90, -0.3,0.3)
                // let y = scale(event.beta, [20,60], [-1,1])
                engine.gravity.x = x
                // engine.gravity.y = y

                if(callback)
                    callback(event)
              }, true)
        },
        addFloor: () => {
            const floor = FloorElement({width: width, height: 80, x: width/2, y:height+40})
            Composite.add(engine.world, [floor])
        },
        addBounceText: ({text, size, scale}) => {
            bounceEllement.addText({text, letterSize: size, width, height, scale})
        },
        onAfterUpdate: (callback: any) => {
            Events.on(engine, 'afterUpdate', callback);
        },
        onTouchEnd: (callback) => {
            Events.on(mouseConstraint, 'mouseup', callback);
        },
    }
}