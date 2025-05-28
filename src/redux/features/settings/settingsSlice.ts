import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Settings {
    currentApi: string,
    sourceLang: string,
    targetLang: string,
    selectedDictionary: string,
    translateAutomatically: boolean,
    hideTranslations: boolean,
}

const initialState: Settings = {
    currentApi: "google",
    sourceLang: "auto",
    targetLang: "es",
    selectedDictionary: "",
    translateAutomatically: true,
    hideTranslations: false,
};

export const settingsSlice = createSlice({
    name: "settingsSlice",
    initialState,
    reducers: {
        setCurrentApi: () => {},
        setSourceLang: (state: Settings, action: PayloadAction<string>) => {state.sourceLang = action.payload},
        setTargetLang: (state: Settings, action: PayloadAction<string>) => {state.targetLang = action.payload},
        setSelectedDictionary: () => {},
        setTranslateAutomatically: () => {},
        setHideTranslations: () => {},
    },
});


export const { setSourceLang, setTargetLang, setSelectedDictionary, setTranslateAutomatically, setHideTranslations } = settingsSlice.actions;