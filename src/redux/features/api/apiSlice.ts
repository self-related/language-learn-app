import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // for react

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
        translateGoogle: build.query<{[s: string]: string}, Query>({
            query: (query) => ({
                url: `translate_a/single?client=gtx&sl=${query.sourceLang}&tl=${query.targetLang}&dt=t&q=${query.sourceText}`,
                method: "GET"
            })
        }),
    })
});

export const { useTranslateGoogleQuery } = apiSlice;