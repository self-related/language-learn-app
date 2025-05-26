import { createSlice } from "@reduxjs/toolkit";

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

const settingsSlice = createSlice({
    name: "settingsSlice",
    initialState,
    reducers: {
        setCurrentApi: () => {},
        setSourceLang: () => {},
        setTargetLang: () => {},
        setSelectedDictionary: () => {},
        setTranslateAutomatically: () => {},
        setHideTranslations: () => {},
    },
});


export const { setSourceLang, setTargetLang, setSelectedDictionary, setTranslateAutomatically, setHideTranslations } = settingsSlice.actions;