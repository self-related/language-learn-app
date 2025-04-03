import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // for react

export interface Query {
    sourceLang: string,
    targetLang: string,
    sourceText: string
}


type GoogleApiSentences = {
    trans: string, 
    orig: string, 
    backend: number
}[];

interface GoogleApiTranslationEntry {
    word: string,
    reverse_translation: string[],
    score: number
}

type GoogleApiDict = {
    pos: string, 
    terms: string[], 
    entry?: GoogleApiTranslationEntry[], 
    base_form: string, 
    pos_enum: number
}[];

export interface GoogleApiRespond {
    sentences: GoogleApiSentences,
    dict?: GoogleApiDict,
    src: string,
    spell?: {[field: string]: string | number | undefined} // temp; idk what it is
}

export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://translate.googleapis.com/"
    }),
    endpoints: (build) => ({
        translateGoogle: build.query<{[s: string]: string}, Query>({
            query: (query) => ({
                url: `translate_a/single?client=gtx&sl=${query.sourceLang}&tl=${query.targetLang}&dt=t&q=${query.sourceText}`,
                method: "GET"
            })
        }),
        translateGoogleNew: build.query<GoogleApiRespond, Query>({
            query: (query) => ({
                url: `translate_a/single?client=gtx&sl=${query.sourceLang}&tl=${query.targetLang}&dt=t&dt=bd&dj=1&q=${query.sourceText}`,
                method: "GET"
            })
        }),
    })
});

export const { useTranslateGoogleQuery, useLazyTranslateGoogleQuery, useTranslateGoogleNewQuery, useLazyTranslateGoogleNewQuery } = apiSlice;