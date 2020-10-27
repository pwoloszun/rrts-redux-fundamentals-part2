import { put, takeEvery } from 'redux-saga/effects';

import api from '../../api/todos-normalized';
import { actions, types } from "./index";

function* fetchTodos(action: any) {
  try {
    const todosNormalized = yield api.getAll();
    yield put(actions.fetchTodosSuccess(todosNormalized));
  } catch (e) {
    console.error(e); // TODO: handle error
  }
}

function* fetchTodosSaga() {
  yield takeEvery(types.FETCH_REQUEST, fetchTodos);
}

function* removeTodo(action: any) {
  try {
    const removedId = yield api.remove(action.payload);
    yield put(actions.removeTodoSuccess(removedId));
  } catch (e) {
    console.error(e); // TODO: handle error
  }
}

function* removeTodoSaga() {
  yield takeEvery(types.REMOVE_REQUEST, removeTodo);
}

function* createTodo(action: any) {
  try {
    const todoData = action.payload;
    const createdTodo = yield api.create(todoData);
    yield put(actions.createTodoSuccess(createdTodo));
  } catch (e) {
    console.error(e); // TODO: handle error
  }
}

function* createTodoSaga() {
  yield takeEvery(types.CREATE_REQUEST, createTodo);
}

function* updateTodo(action: any) {
  try {
    const { todo, params } = action.payload;
    const updatedTodo = yield api.update(todo, params);
    yield put(actions.updateTodoSuccess(updatedTodo));
  } catch (e) {
    console.error(e); // TODO: handle error
  }
}

function* updateTodoSaga() {
  yield takeEvery(types.UPDATE_REQUEST, updateTodo);
}

function* optimisticUpdateTodo(action: any) {
  try {
    const { todo, params } = action.payload;
    const updatedTodo = yield api.update(todo, params);
    yield put(actions.optimisticUpdateTodoSuccess(updatedTodo));
  } catch (e) {
    yield put(actions.optimisticUpdateTodoError(e));
  }
}

function* optimisticUpdateTodoSaga() {
  yield takeEvery(types.OPTIMISTIC_UPDATE_REQUEST, optimisticUpdateTodo);
}


export {
  fetchTodosSaga,
  removeTodoSaga,
  createTodoSaga,
  updateTodoSaga,
  optimisticUpdateTodoSaga,
}
