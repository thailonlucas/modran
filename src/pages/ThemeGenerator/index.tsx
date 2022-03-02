import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimationEngine } from './controller'
import './style.scss'

const ThemeGenerator = () => {
    const boxRef = useRef(null)
    const canvasRef = useRef(null)
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const [animationEngine, setAnimationEngine] = useState<any>()

    const [currentText, setCurrentText] = useState()

    useLayoutEffect(() => {
      setUpAnimationEngine()
    }, [])

    const setUpAnimationEngine = () => {
      const newAnimationEngine = AnimationEngine({width, height, canvasRef, boxRef})
      newAnimationEngine.addMouseConstraint()
      newAnimationEngine.addFloor()
      newAnimationEngine.addBounceText({text: 'Ola', size: 36})
      newAnimationEngine.run()
      setAnimationEngine(newAnimationEngine)
    }

    useEffect(()=>{
      if(!animationEngine) return
      animationEngine.addBounceText({text: currentText, size: 36})
    }, [currentText])
      
    return (
        <div
          ref={boxRef}
          onClick={() => setCurrentText('Mundo')}>
          <canvas ref={canvasRef} />
        </div>
      )
}

export default ThemeGenerator;