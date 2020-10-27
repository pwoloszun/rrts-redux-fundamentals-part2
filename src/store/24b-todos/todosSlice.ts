import { createSlice, PayloadAction, createEntityAdapter, EntityState, Update } from '@reduxjs/toolkit';

export enum TodoStatus {
  Persisted = 'PERSISTED',
  Saving = 'SAVING',
  Removing = 'REMOVING',
  Editing = 'EDITING',
}

interface Todo {
  id: number;
  title: string;
  description?: string;
}

export const todoEntitiesAdapter = createEntityAdapter<Todo>();

type TodoEntityState = EntityState<Todo>;
type TodoUpdate = Update<Todo>;

interface TodosSliceState {
  // domain/entities state
  todos: TodoEntityState;

  // feature/app logic state
  isFetchingMany: boolean;
  todosStatuses: { [id: number]: TodoStatus };
}

const initialState: TodosSliceState = {
  todos: todoEntitiesAdapter.getInitialState(),

  isFetchingMany: false,
  todosStatuses: {},
};

export const todosSliceId = 'todos';

export const todosSlice = createSlice({
  name: todosSliceId,
  initialState,
  reducers: {
    fetchTodosRequest: (state) => {
      state.isFetchingMany = true;
    },
    fetchTodosSuccess: {
      reducer: (state, action: PayloadAction<{ todos: Todo[] }>) => {
        const { todos } = action.payload;
        state.isFetchingMany = false;
        state.todos = todoEntitiesAdapter.setAll(state.todos, todos);
      },
      prepare: (todos: Todo[]) => {
        return {
          payload: { todos }
        };
      }
    },
    // TODO: start/cancel editing

    // TODO: optimisticUpdateTodo

    // TODO: removeTodo
  },
});

export const actions = todosSlice.actions;

export default todosSlice.reducer;
