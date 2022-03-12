//@ts-ignore
import {Composite} from 'matter-js'
import { LetterElement } from '../bodies'
import { Sling } from '../constraints/sling'

const sanitizeText = (text: string) => String(text).toLocaleLowerCase()

export const BounceTextAnimation = (animationEngine: any):IBounceTextAnimationReturn => {
    const letterChain = Composite.create({label: 'letter chain'})
    const SEPARATION = 2
    const MAX_LINES = 3
    // const HEIGHT_SEPARATION = 3

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
            x: ((width/2) - (text.length * (letterSize))) + (i * (letterSize * SEPARATION)) + (letterSize + SEPARATION),
            y: ((height / 2) - (((text.split(' ').length * (letterSize * SEPARATION)))) + (wordIndex * (letterSize * SEPARATION)))
        }
    })

    return({
        letterChain,
        add: ({text, letterSize = 32, position = 'center', width, height}) => {
            resetTextOnCanvas()
            text = sanitizeText(text)
            let words = text.split(' ')
            
            while(words.length > MAX_LINES){
                const lastWord = words.pop()
                words[words.length - 1] = `${words[words.length - 1]}*${lastWord}`
            }

            words.map((word: string, wordIndex: number) => {
                if(word === ' ') return
                for (let i = 0; i < word.length; i++ ){
                    if(word[i] === ' ') continue
                    
                    const {x, y}: any = getLetterPosition({width, height, text: word, letterSize, i, wordIndex})[position]
                    const letter = LetterElement({x, y, size: letterSize, letter: word[i]})
                    const sling = Sling({x, y, bodyB: letter.body, length: 0})

                    if(letter.accent){
                        const anchorPoint =  Sling({x: letter.accent.x, y: letter.accent.y, bodyB: letter.accent.body, length: 0})
                        Composite.addBody(letterChain, letter.accent.body)
                        Composite.addConstraint(letterChain, anchorPoint);
                    }

                    Composite.add(letterChain, [letter.body, sling]) 
                }
            })
            Composite.add(animationEngine.world, [letterChain])
        }
        
    })
}