import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ColorPalleteEllement } from '../../components/physics/engines/color-pallete'
import { RandomShapesGenerator } from '../../components/physics/engines/random-shapes'
import { useRandomGenerator } from '../../logic/generator/hook'
import { interpolate, SCREENS_RANGE } from '../../logic/utils'
import { getAnimationEngine } from './controller'
import './style.scss'

const ThemeGenerator = () => {
    const INITIAL_PHRASE = 'Click para gerar'
    const WIDTH = document.documentElement.clientWidth
    const HEIGHT = document.documentElement.clientHeight
    const LETTER_SIZE = interpolate(WIDTH, SCREENS_RANGE[0], SCREENS_RANGE[1], 14, 22)
    const LETTER_SCALE = interpolate(LETTER_SIZE, 14, 22, 0.15, 0.22)

    const boxRef = useRef(null)
    const canvasRef = useRef(null)
    const colorPalleteLabel = useRef(null)

    const [animationEngine, setAnimationEngine] = useState<any>()
    const {theme, colorPallete, generateTheme} = useRandomGenerator('Click para gerar')

    useLayoutEffect(() => {
      const newAnimationEngine = getAnimationEngine({
        width: WIDTH,
        height: HEIGHT,
        canvasRef,
        boxRef
      })

      newAnimationEngine.onTouchEnd(generateTheme)
      setAnimationEngine(newAnimationEngine)
    }, [WIDTH, HEIGHT])

    const updateShapes: any = useMemo(() => {
      if(!animationEngine || !colorPalleteLabel) return 

      const randomShapesGenerator = RandomShapesGenerator(animationEngine)
      const colorPalleteEllement = ColorPalleteEllement(animationEngine, {
        x: WIDTH/2,
        y:colorPalleteLabel.current.offsetTop + 70,
        size:22
      })
      
      return (colors: string[]) => {
        colorPalleteEllement.show({colors})
        randomShapesGenerator.show({min: 5, max: 10, minSize: 10, maxSize: 80, colors})
      }
    }, [animationEngine, colorPalleteLabel, WIDTH])

    useEffect(()=>{
      if(animationEngine)
        animationEngine.addBounceText({text: theme, size: LETTER_SIZE, scale: LETTER_SCALE})
        
      if(theme !== INITIAL_PHRASE)
        updateShapes(colorPallete)
    }, [theme, animationEngine])

    return (
        <div id='theme-generator-screen' ref={boxRef}>
          <canvas ref={canvasRef}/>
          <div className='screen-labels'>
            <h1 className='theme-label'>Seu tema é:</h1>
            <span className='theme-empty-space'></span>
            <h2 id='color-pallete-label' className='theme-color-pallete-label' ref={colorPalleteLabel}>
              paleta de cores
            </h2>
          </div>
        </div>
      )
}

export default ThemeGenerator;