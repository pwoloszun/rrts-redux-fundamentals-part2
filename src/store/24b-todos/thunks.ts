import { AppThunk, AppDispatch } from '../store';
import { actions } from './todosSlice';

import api from '../../api/todos';
import { Todo } from '../../features/24-redux-todos-normalized/models/todo';

export function fetchAllTodos(): AppThunk {
  return async function (dispatch: AppDispatch) {
    // TODO REQUEST
    try {
      // TODO SUCCESS
    } catch (err) {
      // TODO ERROR
    }
  }
}

// TODO: export function removeTodo(todo: Todo): AppThunk 

// TODO export function optimisticUpdateTodo(todo: Todo, params: Partial<Todo>): AppThunk
