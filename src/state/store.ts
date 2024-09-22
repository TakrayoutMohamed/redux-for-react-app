import { configureStore } from '@reduxjs/toolkit';
import countingReducer from "./counter/counterSlice";

export const store = configureStore({
    reducer:{
        counters: countingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;