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
    startEditingTodo: {
      reducer: (state, action: PayloadAction<{ todoId: number }>) => {
        const { todoId } = action.payload;
        state.todosStatuses[todoId] = TodoStatus.Editing;
      },
      prepare: (todo: Todo) => {
        return {
          payload: { todoId: todo.id }
        };
      }
    },
    cancelEditingTodo: {
      reducer: (state, action: PayloadAction<{ todoId: number }>) => {
        const { todoId } = action.payload;
        state.todosStatuses[todoId] = TodoStatus.Persisted;
      },
      prepare: (todo: Todo) => {
        return {
          payload: { todoId: todo.id }
        };
      }
    },
    optimisticUpdateTodoRequest: {
      reducer: (state, action: PayloadAction<{ updateParams: TodoUpdate }>) => {
        const { updateParams } = action.payload;
        const todoId = updateParams.id as number;
        state.todosStatuses[todoId] = TodoStatus.Saving;
        state.todos = todoEntitiesAdapter.updateOne(state.todos, updateParams);
      },
      prepare: (todo: Todo, changes: Partial<Todo>) => {
        const updateParams: TodoUpdate = { id: todo.id, changes };
        return {
          payload: { updateParams }
        };
      }
    },
    optimisticUpdateTodoSuccess: {
      reducer: (state, action: PayloadAction<{ todoId: number }>) => {
        const { todoId } = action.payload;
        state.todosStatuses[todoId] = TodoStatus.Persisted;
      },
      prepare: (todo: Todo) => {
        return {
          payload: { todoId: todo.id }
        };
      }
    },
    removeTodoRequest: {
      reducer: (state, action: PayloadAction<{ todoId: number }>) => {
        const { todoId } = action.payload;
        state.todosStatuses[todoId] = TodoStatus.Removing;
      },
      prepare: (todo: Todo) => {
        return {
          payload: { todoId: todo.id }
        };
      }
    },
    removeTodoSuccess: {
      reducer: (state, action: PayloadAction<{ todoId: number }>) => {
        const { todoId } = action.payload;
        delete state.todosStatuses[todoId];
        state.todos = todoEntitiesAdapter.removeOne(state.todos, todoId);
      },
      prepare: (todo: Todo) => {
        return {
          payload: { todoId: todo.id }
        };
      }
    },
  },
});

export const actions = todosSlice.actions;

export default todosSlice.reducer;
