//@ts-ignore
import {Composite, Common, Constraint} from 'matter-js'
import { LetterElement } from '../bodies'

const sanitizeText = (text: string) => String(text).toLocaleLowerCase()

export const BounceTextAnimation = (animationEngine: any):IBounceTextAnimationReturn => {
    const letterChain = Composite.create({label: 'letter chain'})
    const SEPARATION = 2

    const resetTextOnCanvas = () => {
        Composite.clear(letterChain)
        Composite.remove(animationEngine.world, letterChain)
    }

    const getLetterPosition = ({width, height, letterSize, i, text, wordIndex}: any) => ({
        top: {
            x: (letterSize * 2) + (i * (letterSize * SEPARATION)), 
            y: (letterSize * 2)
        },
        center: {
            x: ((width/2) - (text.length * letterSize + SEPARATION)) + (i * (letterSize * SEPARATION)),
            y: ((height / 2) - (((text.split(' ').length * (letterSize * SEPARATION)))) + (wordIndex * (letterSize * SEPARATION)))
        }
    })

    return({
        letterChain,
        add: ({text, letterSize = 32, position = 'center', width, height}) => {
            resetTextOnCanvas()
            text = sanitizeText(text)

            let words = text.split(' ')
            
            while(words.length > 3){
                const lastWord = words.pop()
                words[words.length - 1] = `${words[words.length - 1]}*${lastWord}`
            }

            words.map((word: string, wordIndex: number) => {
                if(word == ' ') return

                for (let i = 0; i < word.length; i++ ){
                    if(word[i] == ' ') continue 
                    const {x, y} = getLetterPosition({width, height, text: word, letterSize, i, wordIndex})[position]
                    const letter = LetterElement({x, y: y - (letterSize * 2), size: letterSize, letter: word[i]})
                    const sling = Constraint.create({
                        pointA: {x, y},
                        bodyB: letter,
                        stiffness: 0.05,
                        length: 0,
                        render: {
                            visible: false
                        }
                    })
                    Composite.addBody(letterChain, letter)
                    Composite.addConstraint(letterChain, sling);
                }
            })
            Composite.add(animationEngine.world, [letterChain])
        }
        
    })
}