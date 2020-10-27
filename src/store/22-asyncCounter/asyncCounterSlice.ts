import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AsyncCounterState {
  asyncValue: number;
  updatedAt: number | null;
  isLoading: boolean;
  error: Error | undefined;
}

const initialState: AsyncCounterState = {
  asyncValue: -997,
  updatedAt: null,
  isLoading: false,
  error: undefined,
};

export const asyncCounterSliceId = 'asyncCounter';

export const asyncCounterSlice = createSlice({
  name: asyncCounterSliceId,
  initialState,
  reducers: {
    incrementRequest: (state) => {
      // TODO
    },
    incrementSuccess: {
      reducer: (state) => {
        // TODO
      },
      prepare: (incBy: number) => {
        // TODO
        return {
          payload: null
        };
      }
    },
    incrementError: {
      reducer: (state) => {
        // TODO
      },
      prepare: (error: Error) => {
        // TODO
        return {
          payload: null
        };
      }
    },
    // TODO: impl decrement async data flow
  },
});

export const actions = asyncCounterSlice.actions;

export default asyncCounterSlice.reducer;
