import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { newSyncCounterSliceId } from './newSyncCounterSlice';

export const selectStateSlice = (state: RootState) => {
  return state[newSyncCounterSliceId];
};

export const selectCounterValue = createSelector(
  [selectStateSlice],
  (state) => {
    return state.value;
  }
);

export const selectSquareValue = createSelector(
  [selectCounterValue],
  (value) => {
    return value ** 2;
  }
);
