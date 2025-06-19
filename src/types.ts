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
    learned: boolean;
    dictionaryName: string,
    original?: string,
    mainTranslation?: string,
    otherTranslations?: OtherTranslations[],
    detectedLanguage?: string,
}

export enum SortBy {
    RecentlyAdded,
    Name
}



export interface ContextMenuData {
    
    // temp fields
    entryId?: string,
    word?: TranslationResult,
    x: number,
    y: number,
}