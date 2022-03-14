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
    addBounceText: ({text, size}: {text: string, size: number}) => void
    addColorPallete: ({colors, x, y}: {colors: string[], x: number, y: number}) => void
    addMouseConstraint: () => void
    onAfterUpdate: (callback?: any) => void
    engine: any
    world: any
    width: number,
    height: number
}

interface IBounceTextAnimationReturn {
    letterChain: any,
    addText: ({}: {text: string, letterSize?: number, position?: 'top'| 'center', width: number, height: number}) => void
}

interface IRandomShapesGeneratorReturn {
    generate: (props: IRandomShapesGenerateProps) => void
}

interface IRandomShapesGenerateProps {
    min: number,
    max: number,
    minSize: number,
    maxSize: number,
    colors?: string[]
}