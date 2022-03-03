import { useState } from "react"
import { RandomGenerator } from "./controller"

export const useRandomGenerator = () => {
    const [colorPallete, setColorPalette] = useState(['#FFF', '#FFF', '#FFF'])
    const [theme, setTheme] = useState('Criatividade')
    const randomGenerator = RandomGenerator()

    const generateTheme = () => {
        setTheme(randomGenerator.getTheme().data)
        randomGenerator.getColorPallete().then((colorPallete: any) =>  setColorPalette(colorPallete))
    }

    return {colorPallete, theme, generateTheme}
}