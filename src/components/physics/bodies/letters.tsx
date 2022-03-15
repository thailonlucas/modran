//@ts-ignore
import { Bodies, Body } from 'matter-js'
import { interpolate } from '../../../logic/utils'
const ACCENT_HEIGHT = 7
const LETTER_ACCENT = [
    {
        group: ['á', 'é', 'í','ó', 'ú'],
        name: 'acute',
        position: 'top'
    },{
        group: ['â', 'ê', 'î','ô', 'û'],
        name: 'circumflex',
        position: 'top'
    },
    {
        group: ['ã','õ', 'ñ'],
        name: 'tilde',
        position: 'top'
    }
]

const getLetterSprite = (letter: string) => {
    try{
        return require(`../sprites/${letter}.png`)
    }catch{
        return require(`../sprites/emoji.png`)
    }
}

export const LetterElement = (props: IMatterLetter) => {
    const {x, y, size, letter, inertia = 99999999, restitution = 0.1, scale = 1} = props
    const letterWithoutAccent = letter.normalize("NFD").replace(/\p{Diacritic}/gu, "")

    const body = Bodies.circle(x, y, size, {
        restitution,
        inertia,
        size,
        render: {
            sprite:{
                texture: getLetterSprite(letterWithoutAccent),
                xScale: scale,
                yScale: scale
            }
        }
    })

    const accent = LetterAccentElement({y: y - size * 1.6, x, letter, size: size})

    return{
        ...props,
        body,
        accent
    }
}

export const LetterAccentElement = (props: any) => {
    const {x, y, size, letter, inertia = 999999, restitution = 0.1} = props
    const accent = LETTER_ACCENT.find((accent: any) => accent.group.includes(letter))

    if(!accent){
        return
    }

    const body = Bodies.rectangle(x, y, size, ACCENT_HEIGHT, {
        inertia,
        restitution,
        render:{
            fillStyle: '#000',
            sprite: {
                texture: accent.name !== 'acute' ? require(`../sprites/${accent.name}.png`) : false,
                xScale: interpolate(size,14,22,0.3,0.5),
                yScale: interpolate(size,14,22,0.3,0.5)
            }
        }
    })

    if(accent.name === 'acute')
        Body.rotate(body, -35)
    
    return {
        body,
        ...accent,
        ...props
    }
}