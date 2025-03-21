import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // for react

export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://translate.googleapis.com/"
    }),
    endpoints: (build) => ({
        translateGoogle: build.query<{[s: string]: string}, string>({
            query: (text) => ({
                url: `translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=${text}`,
                method: "GET"
            })
        }),
    })
});

export const { useTranslateGoogleQuery } = apiSlice;