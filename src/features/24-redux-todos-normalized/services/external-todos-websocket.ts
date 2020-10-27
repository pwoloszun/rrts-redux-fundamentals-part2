import faker from 'faker';
import { merge, shuffle } from 'lodash';

import { store } from '../../../store/store';

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

      // TODO
      const isRemoving = {};
      const isUpdating = {};
      const isEditing = {};
      this.isBlocked = merge({}, isRemoving, isEditing, isUpdating);
      const allTodos = [] as Todo[];
      this.notBlockedTodos = allTodos.filter((t: Todo) => !this.isBlocked[t.id]);
    });
  },

  open() {
    let i = 0;
    this.intervalId = setInterval(() => {
      i++;
      if (i % delayInSec.create === 0) {
        // TODO create todo
      }
      if (i % delayInSec.update === 0) {
        const todoToUpdate = shuffle(this.notBlockedTodos)[0];
        const data = this.generateTodoData()
        // TODO update todo
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
