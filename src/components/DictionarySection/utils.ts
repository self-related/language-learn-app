import { TranslationResult } from "../../types";

export const sortByLearned = (dictionary: TranslationResult[]): TranslationResult[] => {
    if (!dictionary) return dictionary;
    
    const sortedDictionary = [...dictionary].sort((dictionaryA, dictionaryB) => {
        if (dictionaryA.learned == dictionaryB.learned) {
            return 0;
        } else if (dictionaryA.learned) {
            return 1;
        } else {
            return -1;
        }
    });
    return sortedDictionary;
};