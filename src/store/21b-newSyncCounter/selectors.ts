import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { newSyncCounterSliceId } from './newSyncCounterSlice';

export const selectStateSlice = (state: RootState) => {
  return state[newSyncCounterSliceId];
};
