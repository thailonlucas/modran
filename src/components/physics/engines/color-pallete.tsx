import { getRandomArbitrary } from '../../../logic/utils'
import { Circle } from '../bodies/circles'
import { Sling } from '../constraints/sling'

const COLORS = ['#FF007A', '#00C2FF', '#FFB800']

export const ColorPalleteEllement = (animationEngine: IAnimationCanvasReturn, options: {x: number, y: number, size: number}) => {
    
    let {y, x, size = 21} = options
    const SEPARATION = size * 1.5
    let current: any = []
    
    const show = ({colors = COLORS}: any) => {
        
        for (let i = 0; i < colors.length; i++){
            const posX = x - ((colors.length - 1) * (size + SEPARATION) / 2) + ((size + SEPARATION) * i)
            const circle = Circle({x: posX, y: getRandomArbitrary(y/2, y), radius: size, options:{
                render:{fillStyle:colors[i]}}
            })

            if(current[i]){
                animationEngine.remove(animationEngine.world, current[i].bodyB)
                current[i].bodyB = circle
                animationEngine.add(animationEngine.world, circle)
            }else{
                current[i] = Sling({x: posX, y, bodyB: circle, length: 0}) 
                animationEngine.add(animationEngine.world, circle)
                animationEngine.add(animationEngine.world, current[i])  
            }
        }
    }

    return({
        show
    })
}

