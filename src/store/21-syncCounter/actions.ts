import { types } from './index';

export function incrementAction(value: number) {
  return {
    type: types.INCREMENT,
    payload: {
      value,
      updatedAt: Date.now()
    }
  };
}

export function decrementAction(payload: number) {
  return {
    type: types.DECREMENT,
    payload
  };
}

export function resetAction() {
  return {
    type: types.RESET,
  };
}
