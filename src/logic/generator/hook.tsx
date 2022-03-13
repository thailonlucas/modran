import { useState } from "react"
import { RandomGenerator } from "./controller"

export const useRandomGenerator = () => {
    const randomGenerator = RandomGenerator()
    const [colorPallete, setColorPalette] = useState(randomGenerator.getColorPallete())
    const [theme, setTheme] = useState('Criatividade')

    const generateTheme = () => {
        setTheme(randomGenerator.getTheme())
        setColorPalette(randomGenerator.getColorPallete())
    }

    return {colorPallete, theme, generateTheme}
}