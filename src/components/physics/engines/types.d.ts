interface IAnimationCanvas{
    width: number,
    height: number,
    canvasRef: MutableRefObject<null>
    boxRef: MutableRefObject<null>
}

interface IAnimationCanvasReturn{
    run: () => void
    add: (target: any, body: any) => void
    remove: (target: any, body: any) => void
    clear: (body: any) => void
    composite: ({label, id}: {label: string, id?: number}) => any
    circle: (props: ICircleProps) => any
    addFloor: () => void
    addBounceText: ({text, size, scale}: {text: string, size: number, scale?: number}) => void
    addMouseConstraint: () => void
    addGyroscopeConstraint: (callback?: (event: any) => void) => void
    onAfterUpdate: (callback?: any) => void
    onTouchEnd: (callback?: any) => void
    engine: any
    world: any
    width: number,
    height: number
}

interface IBounceTextAnimationReturn {
    letterChain: any,
    addText: ({}: {text: string, letterSize?: number, position?: 'top'| 'center', width: number, height: number, scale?: number}) => void
}

interface IRandomShapesGeneratorReturn {
    show: (props: IRandomShapesGenerateProps) => void
}

interface IRandomShapesGenerateProps {
    min: number,
    max: number,
    minSize: number,
    maxSize: number,
    colors?: string[]
}