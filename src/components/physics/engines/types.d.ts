interface IAnimationCanvas{
    width: number,
    height: number,
    canvasRef: MutableRefObject<null>
    boxRef: MutableRefObject<null>
}

interface IAnimationCanvasReturn{
    run: () => void
    add: (body) => void
    addFloor: () => void
    addBounceText: ({text, size}: {text: string, size: number}) => void
    addMouseConstraint: () => void
    addMouseFollower: (body: any) => void
    engine: any
}

interface IBounceTextAnimationReturn {
    letterChain: any,
    add: ({}: {text: string, letterSize?: number, position?: 'top'| 'center', width: number, height: number}) => void
}