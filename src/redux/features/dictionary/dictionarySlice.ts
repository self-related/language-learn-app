import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OtherTranslations, SortBy, Translation, TranslationResult } from "../../../types";

export interface DictionaryItem {
    sourceLang: string,
    targetLang: string,

    original: string,
    mainTranslation: string,
    dictionaryName: string,
    learned: boolean;
    
    otherTranslations?: OtherTranslations[],
    detectedLanguage?: string,
}

export interface DictionaryMap {
    [name: string]: Array<DictionaryItem>
}

interface DictionarySliceState {
    dictionaryMap: DictionaryMap,

    selectedDictionaryName: string,
    sortBy: SortBy | null,
    hideTranslations: boolean,
}

const savedState = localStorage.getItem("dictionarySettings");

const initialState: DictionarySliceState = savedState 
? JSON.parse(savedState) 
: {
    dictionaryMap: {},

    selectedDictionaryName: "",
    hideTranslations: false,
    sortBy: null,
};

export const dictionarySlice = createSlice({
    initialState,
    name: "dictionarySlice",
    reducers: {
        addTranslation: (state: DictionarySliceState, action: PayloadAction<Translation>) => {
            const dictionaryName = action.payload.dictionaryName;

            if (!state.dictionaryMap[dictionaryName]) {
                state.dictionaryMap[dictionaryName] = [];
            }

            const existingTranslationIndex = state.dictionaryMap[dictionaryName].findIndex(item => item.original == action.payload.original);

            const newDictionaryItem: DictionaryItem = {...action.payload, learned: false};

            if (existingTranslationIndex >= 0) {
                const replacing = window.confirm("This item already exists.\nReplace?");
                if (replacing) {
                    state.dictionaryMap[dictionaryName][existingTranslationIndex] = newDictionaryItem;
                }
            } else {
                state.dictionaryMap[dictionaryName].unshift(newDictionaryItem);
            }

            // saveToLocalStorage(state);
        },
        deleteTranslation: (state: DictionarySliceState, action) => {
            state.dictionaryMap[action.payload.dictionary] = state.dictionaryMap[action.payload.dictionary].filter(translation => translation.original != action.payload.original);

            if (Object.keys(state.dictionaryMap[action.payload.dictionary]).length == 0) {
                delete state.dictionaryMap[action.payload.dictionary];
            }

            // saveToLocalStorage(state);
        },
        markLearned: (state: DictionarySliceState, action: PayloadAction<TranslationResult>) => {
            const dictionaryName = action.payload.dictionaryName;
            const translation = state.dictionaryMap[dictionaryName].find(tr => tr.original === action.payload.original);
            if (translation) translation.learned = !translation.learned;

            // saveToLocalStorage(state);
        },

        
        setSelectedDictionaryName: (state: DictionarySliceState, action: PayloadAction<string>) => { 
            state.selectedDictionaryName = action.payload;
            // saveSettings(state);
        },

        setSortBy: (state: DictionarySliceState, action: PayloadAction<SortBy | null>) => {
            state.sortBy = action.payload;
            // saveSettings(state);
        },

        switchHideTranslations: (state: DictionarySliceState) => {
            state.hideTranslations = !state.hideTranslations;
            // saveSettings(state);
        },

    }
});

export const {reducerPath, reducer} = dictionarySlice;
export const { 
    markLearned,
    setSelectedDictionaryName,
    setSortBy,
    switchHideTranslations
} = dictionarySlice.actions;