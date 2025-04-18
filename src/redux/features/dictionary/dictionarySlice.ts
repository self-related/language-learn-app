import { createSlice } from "@reduxjs/toolkit";
import { TranslationResult } from "../../../components/TranslateSection";

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

            if (state[dictionaryName]) {
                state[dictionaryName].push(action.payload);
            }
            else {
                state[dictionaryName] = [];
                state[dictionaryName].push(action.payload);
            }

        }
    }
});

export const {reducerPath, reducer} = dictionarySlice;