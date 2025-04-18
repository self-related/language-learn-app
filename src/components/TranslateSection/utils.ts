import { GoogleApiRespond } from "../../redux/features/api/apiSlice";
import { TranslationResult } from ".";
import { languagesG } from ".";

export const handleGoogleApi = (respond: GoogleApiRespond | undefined, sourceLang: string, targetLang: string): TranslationResult | undefined => {
    if (!respond) 
        return undefined;
    const dictionaryName = sourceLang == "auto"
    ? `${languagesG[respond.src] ?? respond.src} - ${languagesG[targetLang]}`
    : `${languagesG[sourceLang]} - ${languagesG[targetLang]}`;
    
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