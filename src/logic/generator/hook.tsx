import { useState } from "react"
import { RandomGenerator } from "./controller"

export const useRandomGenerator = () => {
    const [colorPallete, setColorPalette] = useState(['#FFF', '#FFF', '#FFF'])
    const [theme, setTheme] = useState('Criatividade')
    const randomGenerator = RandomGenerator()

    const generateTheme = () => {
        setTheme(randomGenerator.getTheme())
        setColorPalette(randomGenerator.getColorPallete())
    }

    return {colorPallete, theme, generateTheme}
}