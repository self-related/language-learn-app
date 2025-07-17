import { GoogleApiRespond } from "@/src/redux/features/api/types";
import { Languages, TranslationResult } from "@/src/types"; 
import { languagesG } from "@/src/consts";


export function generateDictionaryName (sourceLang: string, targetLang: string, langMap: Languages, detectedLang?: string) {
    const sourceLangName = langMap[sourceLang];
    const targetLangName = langMap[targetLang];
    
    const detectedLangName = detectedLang
    ? langMap[detectedLang] ?? detectedLang
    : "unknown";

    return sourceLang == "auto"
    ? `${detectedLangName} - ${targetLangName}`
    : `${sourceLangName} - ${targetLangName}`;
};

export const handleGoogleApi = (respond: GoogleApiRespond | undefined, sourceLang: string, targetLang: string): TranslationResult | undefined => {
    if (!respond) 
        return undefined;

    const dictionaryName = generateDictionaryName(sourceLang, targetLang, languagesG, respond.src);
    
    return {
        dictionaryName,
        detectedLanguage: respond.src,
        original: respond.sentences[0].orig,
        mainTranslation: respond.sentences[0].trans,
        otherTranslations: respond.dict?.map(dict => ({
            pos: dict.pos,
            translations: dict.terms 
        })),
    }
};