export const getRandomArbitrary = (min: number, max: number) => Number.parseInt((Math.random() * ((max + 1) - min) + min))

export const getRandomListItem = (list: any) => list[getRandomArbitrary(0,(list.length - 1))]

export const interpolate = (value: number | any = 0, low1: number, high1: number, low2: number, high2: number) => {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

export const SCREENS_RANGE: [number,number] = [200,3000]