import { getRandomArbitrary, getRandomListItem } from '../../../logic/utils'

const COLORS = ['#FF007A', '#00C2FF', '#FFB800']

export const RandomShapesGenerator = (animationEngine: IAnimationCanvasReturn):IRandomShapesGeneratorReturn => {
    const randomShapesGroup = animationEngine.composite({label: 'shapes'})
    let bodies: any = []

    animationEngine.onAfterUpdate(() => {
        bodies = bodies.filter((body: any) => {
            if(body.position.y > (animationEngine.height + 200)){
                animationEngine.remove(randomShapesGroup, body)
                return false
            }
            return true
        })
    })

    const generateRandomCircles = ({min, max, minSize, maxSize, colors = COLORS}: IRandomShapesGenerateProps) => {
        const circleQuantity = getRandomArbitrary(min, max)
        for(let i = 0; i <= circleQuantity; i++){
            const size = getRandomArbitrary(minSize, maxSize)

            bodies.push(animationEngine.circle({
                x: getRandomArbitrary(size * 2, animationEngine.width - size * 2),
                y: getRandomArbitrary(-size, -(size*3)),
                radius: size,
                options:{
                    friction: 0,
                    render:{
                        fillStyle: getRandomListItem(colors)
                    }
                }
            }))
            // options: {restitution: 0.5, frictionAir: 0, friction: 0}
        }
        return bodies
    }

    return({
        show: ({min, max, minSize, maxSize, colors}) => {
            animationEngine.clear(randomShapesGroup)
            animationEngine.remove(animationEngine.world, randomShapesGroup)
            generateRandomCircles({colors, min, max, minSize, maxSize})
            animationEngine.add(randomShapesGroup, bodies)
            animationEngine.add(animationEngine.world, randomShapesGroup)
        }
    })
}

