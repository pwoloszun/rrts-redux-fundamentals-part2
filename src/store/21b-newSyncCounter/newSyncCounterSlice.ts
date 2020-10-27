import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  updatedAt: number | null;
}

const initialState: CounterState = {
  value: 110,
  updatedAt: null,
};

export const newSyncCounterSliceId = 'newSyncCounter';

export const newSyncCounterSlice = createSlice({
  name: newSyncCounterSliceId,
  initialState,
  reducers: {
    increment: {
      reducer: (state, action: PayloadAction<{ incBy: number; updatedAt: number }>) => {
        const { incBy, updatedAt } = action.payload;
        state.value += incBy;
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
    decrement: {
      reducer: (state, action: PayloadAction<number>) => {
        state.value += action.payload;
      },
      prepare: (value: number) => {
        return { payload: value };
      }
    },
    reset: (state) => {
      state.value = initialState.value;
    },
  },
});

export const actions = newSyncCounterSlice.actions;

export default newSyncCounterSlice.reducer;
