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

const saveSettings = (state: Settings) => localStorage.setItem("settings", JSON.stringify(state));

const savedSettings = localStorage.getItem("settings");

const initialState: Settings = savedSettings 
    ? JSON.parse(savedSettings) 
    : {
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
        setHideTranslations: () => {},
    },
});


export const { setSourceLang, setTargetLang, setSelectedDictionaryName, setTranslateAutomatically, setHideTranslations } = settingsSlice.actions;