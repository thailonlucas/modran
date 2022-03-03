import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useRandomGenerator } from '../../logic/generator/hook'
import { getAnimationEngine } from './controller'
import './style.scss'

const ThemeGenerator = () => {
    const boxRef = useRef(null)
    const canvasRef = useRef(null)
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const LETTER_SIZE = 36
    const [animationEngine, setAnimationEngine] = useState<any>()
    const {theme, generateTheme} = useRandomGenerator()

    useLayoutEffect(() => {
      const newAnimationEngine = getAnimationEngine({width, height, canvasRef, boxRef})
      newAnimationEngine.addBounceText({text: 'Greetings', size: LETTER_SIZE})
      setAnimationEngine(newAnimationEngine)
    }, [])

    useEffect(()=>{
      if(!animationEngine) return
      animationEngine.addBounceText({text: theme, size: LETTER_SIZE})
    }, [theme])

    const onChangeTheme = () => {
      generateTheme()
    }
      
    return (
        <div ref={boxRef} onClick={onChangeTheme}>
          <canvas ref={canvasRef} />
        </div>
      )
}

export default ThemeGenerator;