//@ts-ignore
import {Engine, Events, Body, Render, Runner, Composite, Mouse, MouseConstraint} from 'matter-js'
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
        addGyroscopeConstraint: (callback) => {
            const scale = (inputY:any, yRange:any, xRange:any) => {
                const [xMin, xMax] = xRange;
                const [yMin, yMax] = yRange;
              
                const percent = (inputY - yMin) / (yMax - yMin);
                const outputX = percent * (xMax - xMin) + xMin;
              
                return outputX;
            };

        
            const circle = Circle({x:100, y:100, radius: 21, options:{isStatic: true}})
            Composite.add(engine.world, circle)

            window.addEventListener('deviceorientation', (event) => {
                let x = scale(event.gamma, [-90,90], [0,width])
                let y = scale(event.beta, [-10,110], [0,height])
                Body.setPosition(circle, {x, y})
                callback(event)
              }, true)
        },
        addFloor: () => {
            const floor = FloorElement({width: width, height: 80, x: width/2, y:height+40})
            Composite.add(engine.world, [floor])
        },
        addBounceText: ({text, size}) => {
            bounceEllement.addText({text, letterSize: size, width, height})
        },
        onAfterUpdate: (callback: any) => {
            Events.on(engine, 'afterUpdate', callback);
        }
    }
}