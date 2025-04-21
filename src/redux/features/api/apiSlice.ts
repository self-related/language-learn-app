import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // for react
import { GoogleApiRespond } from "./types";

export interface Query {
    sourceLang: string,
    targetLang: string,
    sourceText: string
}



export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://translate.googleapis.com/"
    }),
    endpoints: (build) => ({
        translateGoogleNew: build.query<GoogleApiRespond, Query>({
            query: (query) => ({
                url: `translate_a/single?client=gtx&sl=${query.sourceLang}&tl=${query.targetLang}&dt=t&dt=bd&dj=1&q=${query.sourceText}`,
                method: "GET"
            })
        }),
        translateGoogleTransformed: build.query<GoogleApiRespond, Query>({
            query: (query) => ({
                url: `translate_a/single?client=gtx&sl=${query.sourceLang}&tl=${query.targetLang}&dt=t&dt=bd&dj=1&q=${query.sourceText}`,
                method: "GET"
            }), //TODO: transformResponse
/*             transformResponse: (response: GoogleApiRespond): TranslationResult => {
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
            } */
        }),
    })
});

export const { useTranslateGoogleNewQuery, useLazyTranslateGoogleNewQuery } = apiSlice;