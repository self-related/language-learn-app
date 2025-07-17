import { TranslationResult } from "@/src/types";

export const sortByName = (words: readonly TranslationResult[] | undefined): TranslationResult[] | undefined => {
    if (!words) return words;
    const sortedWords = [...words].sort((wordA, wordB) => {
        if (!wordA.original || !wordB.original) return 0;

        const lettersA = wordA.original.split(""); 
        const lettersB = wordB.original.split(""); 
        const minLength = lettersA.length < lettersB.length 
        ? lettersA.length 
        : lettersB.length;
        
        for (let i = 0; i < minLength; i++) {
            const letterACode = lettersA[i].toLowerCase().charCodeAt(0);
            const letterBCode = lettersB[i].toLowerCase().charCodeAt(0);
            const diff = letterACode - letterBCode;

            if (diff === 0) {
                continue;
            } else {
                return diff;
            }
        }

        return 0;
    });
    
    return sortedWords;
};