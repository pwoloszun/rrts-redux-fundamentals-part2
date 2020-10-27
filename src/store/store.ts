import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import syncCounterReducer, { syncCounterSliceId } from './21-syncCounter';
import newSyncCounterReducer, { newSyncCounterSliceId } from './21b-newSyncCounter';
import asyncCounterReducer, { asyncCounterSliceId } from './22-asyncCounter';
import todosReducer, { todosSliceId } from './24b-todos';

export const store = configureStore({
  reducer: {
    [syncCounterSliceId]: syncCounterReducer,
    [newSyncCounterSliceId]: newSyncCounterReducer,
    [asyncCounterSliceId]: asyncCounterReducer,
    [todosSliceId]: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;

