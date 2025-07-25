import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OtherTranslations, SortBy, Translation, TranslationResult } from "@/src/types";
import { loadStateFromLocalStorage, saveToLocalStorage } from "@/src/redux/utils";
import { TranslateSliceState } from "../translate/translateSlice";

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

const localStorageKey = "dictionarySettings";

const savedState = loadStateFromLocalStorage<DictionarySliceState>(localStorageKey);

const initialState: DictionarySliceState = savedState 
? savedState
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

        // TODO: fix for payload type <Translation>
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

            saveToLocalStorage<DictionarySliceState>(localStorageKey, state);
        },

        addDictionaryItem: (state: DictionarySliceState, action: PayloadAction<TranslateSliceState>) => {
            const {
                sourceLang,
                targetLang,
                detectedLanguage,

                original,
                mainTranslation,
                otherTranslations,

                dictionaryName
                                
            } = action.payload;

            const newDictionaryItem: DictionaryItem = {
                sourceLang,
                targetLang,
                original,
                mainTranslation,
                dictionaryName,
                detectedLanguage,
                otherTranslations, 
                learned: false
            };

            if (!state.dictionaryMap[dictionaryName]) {
                state.dictionaryMap[dictionaryName] = [];
            }

            const existingTranslationIndex = state.dictionaryMap[dictionaryName].findIndex(item => item.original == original);


            if (existingTranslationIndex >= 0) {
                const replacing = window.confirm("This item already exists.\nReplace?");
               
                if (replacing) {
                    state.dictionaryMap[dictionaryName][existingTranslationIndex] = newDictionaryItem;
                }

            } else {
                state.dictionaryMap[dictionaryName].unshift(newDictionaryItem);
            }

        },

        // TODO: fix for payload type <Translation>
        editTranslation: (state: DictionarySliceState, action: PayloadAction<TranslationResult & { lastOriginal: string }>) => {
            const editedTranslation = action.payload;
            const dictionaryName = action.payload.dictionaryName;
            const existingTranslationIndex = state.dictionaryMap[dictionaryName].findIndex(item => item.original == action.payload.lastOriginal);

            if (existingTranslationIndex >= 0) {
                const currentTranslation = state.dictionaryMap[dictionaryName][existingTranslationIndex];
                state.dictionaryMap[dictionaryName][existingTranslationIndex] = {...currentTranslation, ...editedTranslation};

                saveToLocalStorage<DictionarySliceState>(localStorageKey, state);
            }

        },
        deleteTranslation: (state: DictionarySliceState, action) => {
            state.dictionaryMap[action.payload.dictionary] = state.dictionaryMap[action.payload.dictionary].filter(translation => translation.original != action.payload.original);

            if (Object.keys(state.dictionaryMap[action.payload.dictionary]).length == 0) {
                delete state.dictionaryMap[action.payload.dictionary];
            }

            saveToLocalStorage<DictionarySliceState>(localStorageKey, state);
        },
        markLearned: (state: DictionarySliceState, action: PayloadAction<TranslationResult>) => {
            const dictionaryName = action.payload.dictionaryName;
            const translation = state.dictionaryMap[dictionaryName].find(tr => tr.original === action.payload.original);
            if (translation) translation.learned = !translation.learned;

            saveToLocalStorage<DictionarySliceState>(localStorageKey, state);
        },

        
        setSelectedDictionaryName: (state: DictionarySliceState, action: PayloadAction<string>) => { 
            state.selectedDictionaryName = action.payload;

            saveToLocalStorage<DictionarySliceState>(localStorageKey, state);
        },

        setSortBy: (state: DictionarySliceState, action: PayloadAction<SortBy | null>) => {
            state.sortBy = action.payload;

            saveToLocalStorage<DictionarySliceState>(localStorageKey, state);
        },

        switchHideTranslations: (state: DictionarySliceState) => {
            state.hideTranslations = !state.hideTranslations;

            saveToLocalStorage<DictionarySliceState>(localStorageKey, state);
        },

    }
});

export const {reducerPath, reducer} = dictionarySlice;
export const { 
    markLearned,
    setSelectedDictionaryName,
    setSortBy,
    switchHideTranslations,
    addTranslation,
    editTranslation,
    
    addDictionaryItem
} = dictionarySlice.actions;