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

// TODO: export const selectAllTodos

// TODO export const selectIsRemovingTodosMap

// TODO: export const selectIsSavingTodosMap

// TODO export const selectIsEditingTodosMap
