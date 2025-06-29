import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TranslateSliceState {
    inputText: string,
    outputText: string,
    // TODO: add translateAutomatically, moreTranslations[], sourceLanguage and targetLanguage (en, es, etc), currentApi: {name, languageList} 
    // TODO:  use loadFromLocalStorage() to load saved values
}

const initialState: TranslateSliceState = {
    inputText: "",
    outputText: "",    
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
            [state.inputText, state.outputText] = [state.outputText, state.inputText];
        },
    }
});

export const {swapInputOutputText, updateInputText, updateOutputText} = translateSlice.actions;