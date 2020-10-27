import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { asyncCounterSliceId } from './asyncCounterSlice';

const selectStateSlice = (state: RootState) => {
  return state[asyncCounterSliceId];
};

export const selectAsyncCounterValue = createSelector(
  [selectStateSlice],
  (state) => {
    return state.asyncValue;
  }
);

export const selectIsLoading = createSelector(
  [selectStateSlice],
  (state) => {
    return state.isLoading;
  }
);

export const selectUpdatedAt = createSelector(
  [selectStateSlice],
  (state) => {
    return state.updatedAt;
  }
);
