import { createSelector } from 'reselect';
import { syncCounterSliceId } from './index';

export const selectFeature = (state: any) => {
  return state[syncCounterSliceId];
};

export const selectCounterValue = createSelector(
  selectFeature,
  (state) => {
    return state.value;
  }
);

export const selectSquareValue = createSelector(
  selectCounterValue,
  (value) => {
    return value ** 2;
  }
);
