export const getRandomArbitrary = (min: number, max: number) => Number.parseInt((Math.random() * ((max + 1) - min) + min))

export const getRandomListItem = (list: any) => list[getRandomArbitrary(0,(list.length - 1))]