import { types } from "./index";

import { Todo } from '../../features/24-redux-todos-normalized/models/todo';

export function startEditingTodo(todo: Todo) {
  return {
    type: types.START_EDIT_TODO,
    payload: todo
  };
}

export function endEditingTodo(todo: Todo) {
  return {
    type: types.END_EDIT_TODO,
    payload: todo
  };
}
