import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { RandomShapesGenerator } from '../../components/physics/engines/random-shapes'
import { useRandomGenerator } from '../../logic/generator/hook'
import { getAnimationEngine } from './controller'
import './style.scss'

const ThemeGenerator = () => {
    const boxRef = useRef(null)
    const canvasRef = useRef(null)
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const LETTER_SIZE = 20
    const [animationEngine, setAnimationEngine] = useState<any>()
    const {theme, colorPallete, generateTheme} = useRandomGenerator()

    useLayoutEffect(() => {
      const newAnimationEngine = getAnimationEngine({width, height, canvasRef, boxRef})
      newAnimationEngine.addBounceText({text: 'Aperte Aqui', size: LETTER_SIZE}) 
      setAnimationEngine(newAnimationEngine)
    }, [])

    const addRandomShapes: any = useMemo(() => {
      if(!animationEngine) return 
      const randomShapesGenerator = RandomShapesGenerator(animationEngine)
      return (colors: string[]) => randomShapesGenerator.generate({min: 5, max: 10, minSize: 10, maxSize: 80, colors})
    }, [animationEngine])

    useEffect(()=>{
      if(!animationEngine) return
      animationEngine.addBounceText({text: theme, size: LETTER_SIZE})
    }, [theme])

    const onChangeTheme = () => {
      generateTheme()
      addRandomShapes(colorPallete)
      animationEngine.addColorPallete({colors: colorPallete})
    }
      
    return (
        <div id='theme-generator-screen' ref={boxRef} onClick={onChangeTheme}>
          <div className='screen-labels'>
            <h1 className='theme-label'>Seu tema é</h1>
            <span className='theme-empty-space'></span>
            <h2 className='theme-color-pallete-label'>paleta de cores</h2>
          </div>
          <canvas ref={canvasRef} />
        </div>
      )
}

export default ThemeGenerator;