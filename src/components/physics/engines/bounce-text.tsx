//@ts-ignore
import {Composite, Common, Constraint} from 'matter-js'
import { LetterElement } from '../bodies'

const sanitizeText = (text: string) => String(text).toLocaleLowerCase()

export const BounceTextAnimation = (animationEngine: any):IBounceTextAnimationReturn => {
    const letterChain = Composite.create({label: 'letter chain'})
    const separation = 2

    const resetTextOnCanvas = () => {
        Composite.clear(letterChain)
        Composite.remove(animationEngine.world, letterChain)
    }

    const getLetterPosition = ({width, height, letterSize, i, text}: any) => ({
        top: {
            x: (letterSize * 2) + (i * (letterSize * separation)), 
            y: (letterSize * 2)
        },
        center: {
            x: ((width/2) - ((text.length * letterSize) + separation)) + (i * (letterSize * separation)),
            y: (height / 2)
        }
    })
    // ((width/2) - (text.length * (letterSize + separation))) - (i * (letterSize * separation))
    return({
        letterChain,
        add: ({text, letterSize = 32, position = 'center', width, height}) => {
            resetTextOnCanvas()
            text = sanitizeText(text)

            
            for (let i = 0; i < text.length; i++ ){
                if(text[i] == ' ') continue 
                
                const {x, y} = getLetterPosition({width, height, text, letterSize, i})[position]
                const letter = LetterElement({x, y: y - (letterSize * 2), size: letterSize, letter: text[i]})
                const sling = Constraint.create({
                    pointA: {x, y},
                    bodyB: letter,
                    stiffness: 0.05,
                    length: 10,
                    render: {
                        visible: false
                    }
                })
                Composite.addBody(letterChain, letter)
                Composite.addConstraint(letterChain, sling);
            }

            Composite.add(animationEngine.world, [letterChain])
        }
        
    })
}