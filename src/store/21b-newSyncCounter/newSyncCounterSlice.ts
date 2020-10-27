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
    // TODO increment: {},
    decrement: {
      reducer: (state) => {
        // TODO
      },
      prepare: () => {
        // TODO
        return { payload: null };
      }
    },
    reset: (state) => {
      // TODO
    },
  },
});

export const actions = newSyncCounterSlice.actions;

export default newSyncCounterSlice.reducer;
