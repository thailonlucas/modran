interface IMatterFloor {
    x: number;
    y: number,
    width: number;
    height: number
}

interface IMatterShape {
    x: number;
    y: number;
    width?: number;
    height?: number;
    size: number;
    color?: string
}

interface IMatterLetter {
    x: number,
    y: number,
    size: number,
    letter: string
    restitution?: number,
    inertia?: number
}