//@ts-ignore
import {Engine, Events, Render, Runner, Composite, Mouse, MouseConstraint} from 'matter-js'
import { getRandomArbitrary } from '../../../logic/utils'
import { Circle } from '../bodies/circles'
import { FloorElement } from '../bodies/floor'
import { Sling } from '../constraints/sling'
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
    const colorPallete: any[] = []

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
            bounceEllement.addText({text, letterSize: size, width, height})
        },
        addColorPallete:({colors}) => {
            for (let i = 0; i <= colors.length; i++){
                const size = 21
                const SEPARATION = 32

                const x = ((width / 2) - ((colors.length) * ((size + SEPARATION) / 2))) + ((size + SEPARATION) * i) 
                let y = height - 235
                const circle = Circle({x: getRandomArbitrary(0, width), y: getRandomArbitrary(0, height), radius: size, options:{render:{fillStyle:colors[i]}}})

                if(colorPallete[i]){
                    Composite.remove(engine.world, colorPallete[i].bodyB)
                    colorPallete[i].bodyB = circle
                    Composite.add(engine.world, circle)
                }else{
                    colorPallete[i] = Sling({x, y, bodyB: circle, length: 0}) 
                    Composite.add(engine.world, circle)
                    Composite.add(engine.world, colorPallete[i])  
                }
                
            }
        },
        onAfterUpdate: (callback: any) => {
            Events.on(engine, 'afterUpdate', callback);
        }
    }
}