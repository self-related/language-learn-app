import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortBy } from "../../../types";

interface Settings {
    selectedDictionaryName: string,
    hideTranslations: boolean,
    sortBy: SortBy | null,
    // ToDo: sortBy
}

function saveSettings(state: Settings) {
    localStorage.setItem("settings", JSON.stringify(state));
}    

const savedSettings = localStorage.getItem("settings");

const initialState: Settings = (savedSettings != null) 
    ? JSON.parse(savedSettings) 
    : {
    // selectedDictionaryName: "",
    translateAutomatically: true,
    hideTranslations: false,
    sortBy: null,
};

export const settingsSlice = createSlice({
    name: "settingsSlice",
    initialState,
    reducers: {
        setCurrentApi: () => {}, // ToDo
/*         setSelectedDictionaryName: (state: Settings, action: PayloadAction<string>) => { 
            state.selectedDictionaryName = action.payload;
            saveSettings(state);
        }, */
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
    // setSelectedDictionaryName, 
    switchHideTranslations, 
    setSortBy,

} = settingsSlice.actions;