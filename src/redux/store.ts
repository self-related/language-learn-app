import { configureStore  } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import { dictionarySlice } from "./features/dictionary/dictionarySlice";
import { useDispatch, useSelector } from "react-redux";
import { settingsSlice } from "./features/settings/settingsSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [dictionarySlice.reducerPath]: dictionarySlice.reducer,
        [settingsSlice.reducerPath]: settingsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();