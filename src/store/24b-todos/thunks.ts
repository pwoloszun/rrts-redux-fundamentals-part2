import { AppThunk, AppDispatch } from '../store';
import { actions } from './todosSlice';

import api from '../../api/todos';
import { Todo } from '../../features/24-redux-todos-normalized/models/todo';

export function fetchAllTodos(): AppThunk {
  return async function (dispatch: AppDispatch) {
    dispatch(actions.fetchTodosRequest());
    try {
      const todos = await api.getAll();
      dispatch(actions.fetchTodosSuccess(todos as Todo[]));
    } catch (err) {
      // TODO
    }
  }
}

export function removeTodo(todo: Todo): AppThunk {
  return async function (dispatch: AppDispatch) {
    dispatch(actions.removeTodoRequest(todo));
    try {
      await api.remove(todo);
      dispatch(actions.removeTodoSuccess(todo));
    } catch (err) {
      // TODO
    }
  }
}

export function optimisticUpdateTodo(todo: Todo, params: Partial<Todo>): AppThunk {
  return async function (dispatch: AppDispatch) {
    dispatch(actions.optimisticUpdateTodoRequest(todo, params));
    try {
      const updatedTodo = await api.update(todo, params);
      dispatch(actions.optimisticUpdateTodoSuccess(updatedTodo as Todo));
    } catch (err) {
      // TODO
    }
  }
}
