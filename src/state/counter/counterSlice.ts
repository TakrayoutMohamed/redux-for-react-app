import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  dd: number;
}

const initialState: CounterState = { value: 0, dd:0 };

// declare const createSlice: <
//   State,
//   CaseReducers extends SliceCaseReducers<State>,
//   Name extends string,
//   Selectors extends SliceSelectors<State>,
//   ReducerPath extends string = Name
// >(
//   options: CreateSliceOptions<State, CaseReducers, Name, ReducerPath, Selectors>
// ) => Slice<State, CaseReducers, Name, ReducerPath, Selectors>;

const counterSlice = createSlice({
  name: "cccccc",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.dd += 1;
    },
    decrement: (state) => {
      state.value -= 1;
      state.dd -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value +=  action.payload;
    }
  },
  
});

export const {increment, decrement} = counterSlice.actions;

export default counterSlice.reducer;
