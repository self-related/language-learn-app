import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortBy } from "../../../types";

interface Settings {
    currentApi: string,
    sourceLang: string,
    targetLang: string,
    selectedDictionaryName: string,
    translateAutomatically: boolean,
    hideTranslations: boolean,
    sortBy: SortBy | null,
    // ToDo: sortBy
}

function saveSettings(state: Settings) {
    localStorage.setItem("settings", JSON.stringify(state));
}    

const savedSettings = localStorage.getItem("settings");

const initialState: Settings = (savedSettings != null) ? JSON.parse(savedSettings) 
    : {
    currentApi: "google",
    sourceLang: "auto",
    targetLang: "es",
    selectedDictionaryName: "",
    translateAutomatically: true,
    hideTranslations: false,
    sortBy: null,
};

export const settingsSlice = createSlice({
    name: "settingsSlice",
    initialState,
    reducers: {
        setCurrentApi: () => {}, // ToDo
        setSourceLang: (state: Settings, action: PayloadAction<string>) => {
            state.sourceLang = action.payload;
            saveSettings(state);
        },
        setTargetLang: (state: Settings, action: PayloadAction<string>) => {
            state.targetLang = action.payload;
            saveSettings(state);
        },
        setSelectedDictionaryName: (state: Settings, action: PayloadAction<string>) => { 
            state.selectedDictionaryName = action.payload;
            saveSettings(state);
        },
        setTranslateAutomatically: (state: Settings, action: PayloadAction<boolean>) => { 
            state.translateAutomatically = action.payload;
            saveSettings(state);
        },
        setSortBy: (state: Settings, action: PayloadAction<SortBy | null>) => {
            state.sortBy = action.payload;
            saveSettings(state);
        },
        switchHideTranslations: (state: Settings) => {
            state.hideTranslations = !state.hideTranslations;
            saveSettings(state);
        },
    },
});


export const { 
    setSourceLang, 
    setTargetLang, 
    setSelectedDictionaryName, 
    setTranslateAutomatically, 
    switchHideTranslations, 
    setSortBy,

} = settingsSlice.actions;