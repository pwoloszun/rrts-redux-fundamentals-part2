import { Store, Action, Dispatch } from '@reduxjs/toolkit';

const DELAY_IN_MS = 2400;

function delayAction(action: Action) {
  return {
    type: '@priority/DELAYED',
    payload: {
      createdAt: Date.now(),
      delayed: action.type
    }
  };
}

function priorityMiddleware(store: Store) {
  return function (next: Dispatch<Action>) {
    return function (action: any) {
      const { meta } = action;
      if (meta && meta.priority === 'low') {
        store.dispatch(delayAction(action)); // TODO dispatch '@priority/DELAY' action
        setTimeout(() => { // delay passing original action
          next(action);
        }, DELAY_IN_MS);
      } else {
        next(action);
      }
    };
  };
}

export default priorityMiddleware;
