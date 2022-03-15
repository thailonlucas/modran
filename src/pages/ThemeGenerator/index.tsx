import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ColorPalleteEllement } from '../../components/physics/engines/color-pallete'
import { RandomShapesGenerator } from '../../components/physics/engines/random-shapes'
import { useRandomGenerator } from '../../logic/generator/hook'
import { getAnimationEngine } from './controller'
import './style.scss'

const ThemeGenerator = () => {
    const LETTER_SIZE = 20
    const WIDTH = document.documentElement.clientWidth
    const HEIGHT = document.documentElement.clientHeight

    const boxRef = useRef(null)
    const canvasRef = useRef(null)
    const colorPalleteLabel = useRef(null)

    const [animationEngine, setAnimationEngine] = useState<any>()
    const {theme, colorPallete, generateTheme} = useRandomGenerator()

    useLayoutEffect(() => {
      const newAnimationEngine = getAnimationEngine({width: WIDTH, height: HEIGHT, canvasRef, boxRef})
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
    }, [animationEngine, colorPalleteLabel])

    useEffect(()=>{
      if(!animationEngine) return
      animationEngine.addBounceText({text: theme, size: LETTER_SIZE})
    }, [theme, animationEngine])

    const onChangeTheme = () => {
      generateTheme()
      updateShapes(colorPallete)
    }
      
    return (
        <div id='theme-generator-screen' ref={boxRef} onClick={onChangeTheme}>
          <div className='screen-labels'>
            <h1 className='theme-label'>Seu tema é</h1>
            <span className='theme-empty-space'></span>
            <h2 id='color-pallete-label' className='theme-color-pallete-label' ref={colorPalleteLabel}>
              paleta de cores
            </h2>
          </div>
          <canvas ref={canvasRef} />
        </div>
      )
}

export default ThemeGenerator;