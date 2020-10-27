import { createSelector } from 'reselect';

import { sliceId } from './index';

const selectFeature = (state: any) => {
  return state[sliceId];
};

export const selectTodosById = createSelector(
  selectFeature,
  (state) => {
    return state.byId;
  }
);

export const selectTodosIds = createSelector(
  selectFeature,
  (state) => {
    return state.ids;
  }
);

export const selectTodos = createSelector(
  selectTodosById,
  selectTodosIds,
  (byId, ids: number[]) => {
    return ids.map((id) => byId[id]);
  }
);

export const selectIsFetching = createSelector(
  selectFeature,
  (state) => {
    return state.isFetching;
  }
);

export const selectIsUpdating = createSelector(
  selectFeature,
  (state) => {
    return state.isUpdating;
  }
);

export const selectIsRemoving = createSelector(
  selectFeature,
  (state) => {
    return state.isRemoving;
  }
);
