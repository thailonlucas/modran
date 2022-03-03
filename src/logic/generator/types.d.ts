interface IRandomGeneratorReturn{
    getColorPallete: () => string[]
    getTheme: () => string
    getSubject: (subject?: 'foods' | 'animals' | 'creatures' | 'daily') => Promise<string>
    getPredicate: ({theme, article}: {theme: string, article: string}) => string
}