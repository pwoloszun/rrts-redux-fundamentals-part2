import { Store, Action, Dispatch } from '@reduxjs/toolkit';

function loggerMiddleware(store: Store) {
  return function (next: Dispatch<Action>) {
    return function (action: Action) {
      console.log(`BEFORE ${action.type}`, store.getState());
      console.log(`action`, action);
      next(action); // WARNING! store.dispatch(action)
      console.log(`AFTER ${action.type}`, store.getState());
      console.log('\n');
    };
  };
}

export default loggerMiddleware;
