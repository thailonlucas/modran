interface IRandomGeneratorReturn{
    getTheme: () => string
    getColorPallete: () => Promise<string[]>
    getNewCombinedTheme: () => Promise<any>
    getSubject: () => Promise<string>
    getPredicate: ({theme, article}: {theme: string, article: string}) => string
}