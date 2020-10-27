import faker from 'faker';
import { merge, shuffle } from 'lodash';

import { store } from '../../../store/store';
import { actions, selectors } from '../../../store/24-todos'
import { selectors as editSelectors } from '../../../store/24-todos-edit'

import { Todo } from '../models/todo';

const delayInSec = {
  create: 10,
  update: 4,
};

const externalTodosWebsocket = {
  isBlocked: {} as { [id: number]: boolean; },
  notBlockedTodos: [] as Todo[],
  intervalId: null as any,

  init() {
    store.subscribe(() => {
      const state = store.getState();
      const isRemoving = selectors.selectIsRemoving(state);
      const isUpdating = selectors.selectIsUpdating(state);
      const isEditing = editSelectors.selectIsEditing(state);
      this.isBlocked = merge({}, isRemoving, isEditing, isUpdating);
      const allTodos = selectors.selectTodos(state);
      this.notBlockedTodos = allTodos.filter((t: Todo) => !this.isBlocked[t.id]);
    });
  },

  open() {
    let i = 0;
    this.intervalId = setInterval(() => {
      i++;
      if (i % delayInSec.create === 0) {
        store.dispatch(actions.createTodoRequest(this.generateTodoData()));
      }
      if (i % delayInSec.update === 0) {
        const todoToUpdate = shuffle(this.notBlockedTodos)[0];
        store.dispatch(actions.updateTodoRequest(todoToUpdate, this.generateTodoData()));
      }
    }, 1000);
  },

  close() {
    clearInterval(this.intervalId);
  },

  generateTodoData() {
    return {
      title: faker.lorem.word(),
      description: faker.lorem.words(),
    };
  }
};

externalTodosWebsocket.init();

export default externalTodosWebsocket;
