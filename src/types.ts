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
export interface TranslationResult { // TODO: remove: dictionaryName, learned. Add source language and target language
    learned: boolean;
    dictionaryName: string,
    original?: string,
    mainTranslation?: string,
    otherTranslations?: OtherTranslations[],
    detectedLanguage?: string,
}

export interface Translation {
    sourceLang: string,
    targetLang: string,

    original: string,
    mainTranslation: string,
    dictionaryName: string,

    otherTranslations?: OtherTranslations[],
    detectedLanguage?: string,    
}

// TODO:
// add DictionaryItem type { dictionaryName, learned, original, mainTranslation, otherTranslations, detectedLanguage,  }

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
    contextMenuActions: { edit: () => void }
}