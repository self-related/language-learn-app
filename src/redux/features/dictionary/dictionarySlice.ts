import { createSlice } from "@reduxjs/toolkit";
import { TranslationResult } from "../../../types";

export interface DictionaryMap {
    [name: string]: Array<TranslationResult>
}

const initialState: DictionaryMap = {};

export const dictionarySlice = createSlice({
    initialState,
    name: "dictionarySlice",
    reducers: {
        addTranslation: (state: DictionaryMap, action) => {

            if (!action.payload.mainTranslation) {
                return;
            }

            const dictionaryName = action.payload.dictionaryName;

            if (!state[dictionaryName]) {
                state[dictionaryName] = [];
            }

            console.log(action.payload.original);
            const existingTranslationIndex = state[dictionaryName].findIndex(item => item.original == action.payload.original);

            if (existingTranslationIndex >= 0) {
                const replacing = window.confirm("This item already exists.\nReplace?");
                if (replacing) {
                    state[dictionaryName][existingTranslationIndex] = action.payload;
                }
            } else {
                state[dictionaryName].push(action.payload);
            }
        },
        deleteTranslation: (state: DictionaryMap, action) => {
            state[action.payload.dictionary] = state[action.payload.dictionary].filter(translation => translation.original != action.payload.original);
            /* ToDo:
                remove dictionary if there's no entries
             */
        }
    }
});

export const {reducerPath, reducer} = dictionarySlice;