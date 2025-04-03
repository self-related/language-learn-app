import { GoogleApiRespond } from "../../redux/features/api/apiSlice";
import { TranslationResult } from ".";

export const handleGoogleApi = (respond: GoogleApiRespond | undefined): TranslationResult | undefined => {
    if (!respond) 
        return undefined;

    return {
        original: respond.sentences[0].orig,
        mainTranslation: respond.sentences[0].trans,
        otherTranslations: respond.dict?.map(dict => ({
            pos: dict.pos,
            translations: dict.terms 
        }))
    }
};