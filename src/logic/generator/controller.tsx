import animals from '../../translations/pt-BR/animals.json'
import foods from '../../translations/pt-BR/food.json'
import daily from '../../translations/pt-BR/daily.json'
import creatures from '../../translations/pt-BR/creatures.json'
import random from '../../translations/pt-BR/actions.json'
import colorPalletes from '../../translations/pt-BR/colorPalletes.json'
import { getRandomListItem, getRandomArbitrary } from '../utils'

const ALL_SUBJECTS: any = {creatures, daily, foods, animals}

export const RandomGenerator = ():IRandomGeneratorReturn => {
    return({
        getColorPallete: (quantity = 3) => {
            let option = getRandomArbitrary(0,10)
            let response: any = []
    
            if(option<3){
                response = getRandomListItem(colorPalletes.data)
            }else{
                while(response.length !== quantity){
                    let newColor = getRandomListItem(getRandomListItem(colorPalletes.data))
                    if(!response.includes(newColor) && newColor.length === 7) 
                        response.push(newColor)
                }
            }

            return response
        },
        getTheme: () => {
            let available = false
            let response = ""
        
            while(!available) {
                let subject: any = RandomGenerator().getSubject()
                let predicate = RandomGenerator().getPredicate(subject)
                
                if(String(subject).toLowerCase() !== String(predicate).toLowerCase()){
                    available = true
                    response = `${subject.data} ${predicate}`
                }
            }
            return response
        },
        getSubject: (subject) => {
            const subjectTheme = subject || getRandomListItem(Object.keys(ALL_SUBJECTS))
            let subjects = ALL_SUBJECTS[subjectTheme].subject
            let selectedSubject = getRandomListItem(subjects)
            return {theme: subjectTheme, ...selectedSubject}
        },
        getPredicate: ({theme, article}) => {
            let result = ''
            if(['creatures', 'daily'].includes(theme)){
                if(getRandomArbitrary(0, 10) < 3){
                    let selectedFood = getRandomListItem(foods.subject) 
                    result = `${getRandomListItem([`d${selectedFood.article || 'o'}`, 'de', 'feit@ de', ])} ${selectedFood.data}`
                }else{
                    result = getRandomListItem(random.actions)
                }
            }
            else if(theme === 'animals')
                result = (getRandomArbitrary(0, 10) < 2) ? 'metade ' + getRandomListItem(animals.subject).data : getRandomListItem(random.actions)
            else
                result = (getRandomArbitrary(0, 10) < 2) ? getRandomListItem(daily.subject).data : getRandomListItem(random.actions)
            return result.split('@').join(article || 'o')
        }
    })
}