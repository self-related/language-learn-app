import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TranslationResult } from "../../../types";

export interface DictionaryMap {
    [name: string]: Array<TranslationResult>
}

const savedState = localStorage.getItem("dictionaries");
const initialState: DictionaryMap = savedState ? JSON.parse(savedState) : {};

export const dictionarySlice = createSlice({
    initialState,
    name: "dictionarySlice",
    reducers: {
        addTranslation: (state: DictionaryMap, action: PayloadAction<TranslationResult>) => {

            if (!action.payload.mainTranslation) {
                return;
            }

            const dictionaryName = action.payload.dictionaryName;

            if (!state[dictionaryName]) {
                state[dictionaryName] = [];
            }

            console.log(action.payload.original);
            const existingTranslationIndex = state[dictionaryName].findIndex(item => item.original == action.payload.original);

            const newTranslation: TranslationResult = {...action.payload, learned: false };

            if (existingTranslationIndex >= 0) {
                const replacing = window.confirm("This item already exists.\nReplace?");
                if (replacing) {
                    state[dictionaryName][existingTranslationIndex] = newTranslation;
                }
            } else {
                state[dictionaryName].push(newTranslation);
            }

            localStorage.setItem("dictionaries", JSON.stringify(state));
        },
        deleteTranslation: (state: DictionaryMap, action) => {
            state[action.payload.dictionary] = state[action.payload.dictionary].filter(translation => translation.original != action.payload.original);

            if (Object.keys(state[action.payload.dictionary]).length == 0) {
                delete state[action.payload.dictionary];
            }

            localStorage.setItem("dictionaries", JSON.stringify(state));
        }
    }
});

export const {reducerPath, reducer} = dictionarySlice;