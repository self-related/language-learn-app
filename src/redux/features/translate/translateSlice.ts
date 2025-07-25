import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OtherTranslations, TranslationResult } from "@/src/types";
import { loadStateFromLocalStorage, saveToLocalStorage } from "@/src/redux/utils";
import { languagesG } from "@/src/consts";

interface TranslateSliceState {
    sourceLang: string,
    targetLang: string,

    original: string,
    mainTranslation: string,
    
    dictionaryName: string,
    customDictionaryName?: string,
    useCustomDictionaryName: boolean,

    otherTranslations?: OtherTranslations[],
    detectedLanguage?: string,
    
    translateAutomatically: boolean,

    currentApi?: string,
}

const localStorageKey = "translateSettings";
const savedState = loadStateFromLocalStorage<TranslateSliceState>(localStorageKey);

const initialState: TranslateSliceState = savedState
    ? savedState
    : {
    sourceLang: "en",
    targetLang: "es",

    original: "",
    mainTranslation: "",

    dictionaryName: "default dictionary",
    useCustomDictionaryName: false,

    translateAutomatically: true,
    
    currentApi: "google"
};

export const translateSlice = createSlice({
    name: "translateSlice",
    initialState,
    reducers: {
        swapInputOutputText: (state: TranslateSliceState) => {
            [state.original, state.mainTranslation] = [state.mainTranslation, state.original];
        },
        setOriginal: (state: TranslateSliceState, action: PayloadAction<string>) => { 
            state.original = action.payload;
            saveToLocalStorage(localStorageKey, state);
        },
        setMainTranslation: (state: TranslateSliceState, action: PayloadAction<string>) => { 
            state.mainTranslation = action.payload;
            saveToLocalStorage(localStorageKey, state);
        },
        setSourceLang: (state: TranslateSliceState, action: PayloadAction<string>) => {
            state.sourceLang = action.payload;
            saveToLocalStorage(localStorageKey, state);
        },
        setTargetLang: (state: TranslateSliceState, action: PayloadAction<string>) => {
            state.targetLang = action.payload;
            saveToLocalStorage(localStorageKey, state);
        },
        setTranslateAutomatically: (state: TranslateSliceState, action: PayloadAction<boolean>) => {
            state.translateAutomatically = action.payload;
            saveToLocalStorage(localStorageKey, state);
        },
        setDictionaryName: (state: TranslateSliceState, action: PayloadAction<string | undefined>) => {
            if (action.payload) {
                state.dictionaryName = action.payload;
            } else {
                // TODO: change using currentApi string
                
                // if auto, use detected language as sourceLang
                const sourceLang = state.sourceLang == "auto" 
                ? state.detectedLanguage ?? ""
                : state.sourceLang;

                const sourceLangName = languagesG[sourceLang];
                const targetLangName = languagesG[state.targetLang];

                const dictionaryName = sourceLangName && targetLangName
                ? `${sourceLangName}-${targetLangName}`
                : "default";

                state.dictionaryName = dictionaryName;
            }
        },
        syncTranslationResultFromApi: (state: TranslateSliceState, action: PayloadAction<TranslationResult>) => {
            const { original, mainTranslation, otherTranslations, detectedLanguage, dictionaryName } = action.payload;
            return { ...state, original, mainTranslation, detectedLanguage, dictionaryName, otherTranslations };
        },
    }
});

export const {
    swapInputOutputText, 
    setOriginal, 
    setMainTranslation, 
    setSourceLang, 
    setTargetLang,
    setTranslateAutomatically,
    setDictionaryName,
    syncTranslationResultFromApi
} = translateSlice.actions;