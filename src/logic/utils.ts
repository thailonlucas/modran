export const getRandomArbitrary = (min: number, max: number) => {
    let randomNumber:any = Number.parseInt((Math.random() * ((max + 1) - min) + min))
    while(randomNumber > max){
        randomNumber = getRandomArbitrary(min, max)
    }
    return randomNumber
}

export const getRandomListItem = (list: any) => list[getRandomArbitrary(0,(list.length - 1))]