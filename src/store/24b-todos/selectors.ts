import { createSelector } from '@reduxjs/toolkit';
import { reduce } from 'lodash';

import { RootState } from '../store';
import { todosSliceId, todoEntitiesAdapter, TodoStatus } from './todosSlice';

const selectStateSlice = (state: RootState) => {
  return state[todosSliceId];
};

export const selectIsFetchingMany = createSelector(
  [selectStateSlice],
  (state) => {
    return state.isFetchingMany;
  }
);

const selectTodoEntitiesState = createSelector(
  [selectStateSlice],
  (state) => state.todos
);

const adapterSelectors = todoEntitiesAdapter.getSelectors(selectTodoEntitiesState);

export const selectAllTodos = adapterSelectors.selectAll;

const selectTodosStatuses = createSelector(
  [selectStateSlice],
  (state) => state.todosStatuses
);

export const selectIsRemovingTodosMap = createSelector(
  [selectTodosStatuses],
  (todosStatuses) => {
    return reduce(todosStatuses, (memo, status, id) => {
      if (status === TodoStatus.Removing) {
        memo[id] = true;
      }
      return memo;
    }, {} as any);
  }
);

export const selectIsSavingTodosMap = createSelector(
  [selectTodosStatuses],
  (todosStatuses) => {
    return reduce(todosStatuses, (memo, status, id) => {
      if (status === TodoStatus.Saving) {
        memo[id] = true;
      }
      return memo;
    }, {} as any);
  }
);

export const selectIsEditingTodosMap = createSelector(
  [selectTodosStatuses],
  (todosStatuses) => {
    return reduce(todosStatuses, (memo, status, id) => {
      if (status === TodoStatus.Editing) {
        memo[id] = true;
      }
      return memo;
    }, {} as any);
  }
);
