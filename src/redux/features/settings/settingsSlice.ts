import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Settings {
    currentApi: string,
    sourceLang: string,
    targetLang: string,
    selectedDictionaryName: string,
    translateAutomatically: boolean,
    hideTranslations: boolean,
    // ToDo: sortBy
}

const initialState: Settings = {
    currentApi: "google",
    sourceLang: "auto",
    targetLang: "es",
    selectedDictionaryName: "",
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
        setSelectedDictionaryName: (state: Settings, action: PayloadAction<string>) => { state.selectedDictionaryName = action.payload },
        setTranslateAutomatically: () => {},
        setHideTranslations: () => {},
    },
});


export const { setSourceLang, setTargetLang, setSelectedDictionaryName, setTranslateAutomatically, setHideTranslations } = settingsSlice.actions;