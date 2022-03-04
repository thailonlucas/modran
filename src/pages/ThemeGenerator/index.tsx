import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MouseFollower } from '../../components/physics/bodies/mouseFollower'
import { useRandomGenerator } from '../../logic/generator/hook'
import { getAnimationEngine } from './controller'
import './style.scss'

const ThemeGenerator = () => {
    const boxRef = useRef(null)
    const canvasRef = useRef(null)
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const LETTER_SIZE = 32
    const [animationEngine, setAnimationEngine] = useState<any>()
    const {theme, generateTheme} = useRandomGenerator()

    useLayoutEffect(() => {
      const newAnimationEngine = getAnimationEngine({width, height, canvasRef, boxRef})
      newAnimationEngine.addBounceText({text: 'Aperte Aqui', size: LETTER_SIZE})
      newAnimationEngine.addMouseFollower(MouseFollower().body)
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