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
      state.isLoading = true;
    },
    incrementSuccess: {
      reducer: (state, action: PayloadAction<{ incBy: number, updatedAt: number }>) => {
        const { incBy, updatedAt } = action.payload;
        state.isLoading = false;
        state.asyncValue += incBy;
        state.updatedAt = updatedAt;
      },
      prepare: (incBy: number) => {
        return {
          payload: {
            incBy,
            updatedAt: Date.now()
          }
        };
      }
    },
    incrementError: {
      reducer: (state, action: PayloadAction<Error>) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      prepare: (error: Error) => {
        return {
          error: true,
          payload: error,
        };
      }
    },
    // TODO: impl decrement async data flow
  },
});

export const actions = asyncCounterSlice.actions;

export default asyncCounterSlice.reducer;
