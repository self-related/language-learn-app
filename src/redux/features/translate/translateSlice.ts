import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Languages, OtherTranslations } from "../../../types";
import { languagesG } from "../../../consts";

interface TranslateSliceState {
    inputText: string,
    outputText: string,

    sourceLang: string,
    targetLang: string,

    original: string,
    mainTranslation: string,
    dictionaryName: string,

    otherTranslations?: OtherTranslations[],
    detectedLanguage?: string,
    
    translateAutomatically: boolean,

    currentApi?: {id: string, languageMap: Languages},
}

// TODO:  use loadFromLocalStorage() to load saved values
const initialState: TranslateSliceState = {
    inputText: "",
    outputText: "",

    sourceLang: "en",
    targetLang: "es",

    original: "",
    mainTranslation: "",

    dictionaryName: "",

    translateAutomatically: true,
    
    currentApi: { id: "google", languageMap: languagesG }
};

export const translateSlice = createSlice({
    name: "translateSlice",
    initialState,
    reducers: {
        updateInputText: (state: TranslateSliceState, action: PayloadAction<string>) => { 
            state.inputText = action.payload;
        },
        updateOutputText: (state: TranslateSliceState, action: PayloadAction<string>) => {
            state.outputText = action.payload;
        },
        swapInputOutputText: (state: TranslateSliceState) => {
            [state.original, state.mainTranslation] = [state.mainTranslation, state.original];
        },
        setOriginal: (state: TranslateSliceState, action: PayloadAction<string>) => { 
            state.original = action.payload;
        },
        setMainTranslation: (state: TranslateSliceState, action: PayloadAction<string>) => { 
            state.mainTranslation = action.payload;
        },
        setSourceLang: (state: TranslateSliceState, action: PayloadAction<string>) => {
            state.sourceLang = action.payload;
            // saveSettings(state);
        },
        setTargetLang: (state: TranslateSliceState, action: PayloadAction<string>) => {
            state.targetLang = action.payload;
            // saveSettings(state);
        },
    }
});

export const {
    swapInputOutputText, 
    updateInputText, 
    updateOutputText, 
    setOriginal, 
    setMainTranslation, 
    setSourceLang, 
    setTargetLang
} = translateSlice.actions;