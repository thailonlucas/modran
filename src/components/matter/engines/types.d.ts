interface IAnimationCanvas{
    width: number,
    height: number,
    canvasRef: MutableRefObject<null>
    boxRef: MutableRefObject<null>
}

interface IBounceTextAnimationReturn {
    letterChain: any,
    add: ({}: {text: string, letterSize?: number, position?: 'top'| 'center', width: number, height: number}) => void
}