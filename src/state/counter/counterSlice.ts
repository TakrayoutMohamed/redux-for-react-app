import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  dd: number;
}

const initialState: CounterState = { value: 0, dd: 0 };

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
      state.value += action.payload;
      state.dd += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(incrementAsync.pending, () => {
      console.log("incrementAsync.pending .....");
    })
    .addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>)=> {
      state.value += action.payload;
      state.dd += action.payload;
      console.log("incrementAsync.fulfilled ");
    })
    .addCase(incrementAsync.rejected, (state) => {
      console.log("incrementAsync.rejected ");
      console.log(JSON.stringify(state));
      // throw Error("time out exception"+ state.value);

    })

  },
});

/**
 * here we are creating the thunk (it is a type of functions in redux that can have asynchronous logic)
 */

export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount: number) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    return amount;
  }
);

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
