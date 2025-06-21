import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TranslationResult } from "../../../types";

interface TranslateSliceState {
    inputText: string,
    outputText: string,
    translationResult?: TranslationResult 
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
        updateTranslationResult: (state: TranslateSliceState, action: PayloadAction<TranslationResult | undefined>) => {
            state.translationResult = action.payload;
        },
    },
});

export const {swapInputOutputText, updateInputText, updateOutputText, updateTranslationResult} = translateSlice.actions;