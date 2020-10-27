import { Store, Action, Dispatch } from '@reduxjs/toolkit';

function someMiddleware(store: Store) {
  // Called ONCE when calling applyMiddleware

  return function (next: Dispatch<Action>) {
    // next() function "moves" action to next middleware

    return function (action: Action) {
      // called every time ANY action is dispatched
    };
  };
}

export default someMiddleware;
