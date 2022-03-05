//@ts-ignore
import {Composite, Body, Constraint, Bodies} from 'matter-js'
import { LetterElement } from '../bodies'
import { Sling } from '../constraints/sling'

const sanitizeText = (text: string) => String(text).toLocaleLowerCase()

export const BounceTextAnimation = (animationEngine: any):IBounceTextAnimationReturn => {
    const letterChain = Composite.create({label: 'letter chain'})
    const SEPARATION = 2
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
            
            while(words.length > 3){
                const lastWord = words.pop()
                words[words.length - 1] = `${words[words.length - 1]}*${lastWord}`
            }

            words.map((word: string, wordIndex: number) => {
                if(word == ' ') return
                for (let i = 0; i < word.length; i++ ){
                    if(word[i] == ' ') continue

                    const letterWithoutAccents = word[i].normalize("NFD").replace(/\p{Diacritic}/gu, "")
                    
                    const {x, y} = getLetterPosition({width, height, text: word, letterSize, i, wordIndex})[position]
                    const letter = LetterElement({x, y: y - (letterSize * 2), size: letterSize, letter: letterWithoutAccents})
                    const sling = Sling({x, y, bodyB: letter, length: 0})

                    
                    const acute = ['á', 'é', 'í','ó', 'ú']
                    const circumflex = ['â', 'ê', 'î','ô', 'û']
                    const tilde = ['ã','õ', 'ñ']

                    const getLetterAccent = (letter: string) => {
                        let type = undefined
                        let position= undefined

                        if(tilde.includes(letter)){
                            type = 'tilde'
                            position = 'top'
                        }else if(acute.includes(letter)){
                            type = 'acute'
                            position = 'top'
                        }else if(circumflex.includes(letter)){
                            type = 'circumflex'
                            position = 'top'
                        }

                        return {type, position}
                    }

                    const letterAccent = getLetterAccent(word[i])
                    let accentElement = undefined

                    if(letterAccent.type){
                        accentElement = Bodies.rectangle(x, y - (letterSize + 3.5), 30, 10, {
                            render:{
                                fillStyle: '#000',
                                sprite: {
                                    texture: letterAccent.type !== 'acute' ? require(`../sprites/${letterAccent.type}.png`) : false,
                                    xScale: 0.5,
                                    yScale: 0.5
                                }
                            }
                        })
                        if(letterAccent.type === 'acute')
                            Body.rotate(accentElement, -35)
                            
                        const anchorPoint = Constraint.create({
                            pointA: {x, y: y - (letterSize + 3.5)},
                            bodyB: accentElement,
                            length: 0,
                            render:{
                                visible: false,
                            }
                        })
                        Composite.addBody(letterChain, accentElement)
                        Composite.addConstraint(letterChain, anchorPoint);
                    }

                    Composite.add(letterChain, [letter, sling]) 
                }
            })
            Composite.add(animationEngine.world, [letterChain])
        }
        
    })
}