import { createSelector } from 'reselect';

import { sliceId } from './index';

const selectFeature = (state: any) => {
  return state[sliceId];
};

export const selectIsEditing = createSelector(
  selectFeature,
  (state) => {
    return state.isEditing;
  }
);
