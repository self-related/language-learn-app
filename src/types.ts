export interface Languages {
    [key: string]: string;
}

export interface OtherTranslations {
    pos: string,
    translations: string[]
};

export interface OtherTranslations {
    pos: string,
    translations: string[]
};
export interface TranslationResult {
    original?: string,
    mainTranslation?: string,
    otherTranslations?: OtherTranslations[],
    dictionaryName?: string,
    detectedLanguage?: string,
}
