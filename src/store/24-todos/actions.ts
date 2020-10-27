import { types } from "./index";
import { Todo, TodoParams } from '../../features/24-redux-todos-normalized/models/todo';

import { NormalizedTodos } from './reducer';

export function fetchTodosRequest() {
  return {
    type: types.FETCH_REQUEST
  };
}

export function fetchTodosSuccess(todosNormalized: NormalizedTodos) {
  return {
    type: types.FETCH_SUCCESS,
    payload: todosNormalized
  };
}

export function removeTodoRequest(todo: Todo) {
  return {
    type: types.REMOVE_REQUEST,
    payload: todo
  };
}

export function removeTodoSuccess(removedId: number) {
  return {
    type: types.REMOVE_SUCCESS,
    payload: removedId
  };
}

export function createTodoRequest(todoData: TodoParams) {
  return {
    type: types.CREATE_REQUEST,
    payload: todoData
  };
}

export function createTodoSuccess(createdTodo: Todo) {
  return {
    type: types.CREATE_SUCCESS,
    payload: createdTodo
  };
}

export function updateTodoRequest(todo: Todo, params: TodoParams) {
  return {
    type: types.UPDATE_REQUEST,
    payload: {
      todo,
      params,
    },
  };
}

export function updateTodoSuccess(updatedTodo: Todo) {
  return {
    type: types.UPDATE_SUCCESS,
    payload: updatedTodo
  };
}

export function optimisticUpdateTodoRequest(todo: Todo, params: TodoParams) {
  return {
    type: types.OPTIMISTIC_UPDATE_REQUEST,
    payload: {
      todo,
      params,
    },
  };
}

export function optimisticUpdateTodoSuccess(updatedTodo: Todo) {
  return {
    type: types.OPTIMISTIC_UPDATE_SUCCESS,
    payload: updatedTodo
  };
}

export function optimisticUpdateTodoError(error: Error) {
  return {
    type: types.OPTIMISTIC_UPDATE_ERROR,
    payload: error,
    error: true,
  };
}
