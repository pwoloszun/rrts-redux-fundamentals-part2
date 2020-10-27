// import { produce } from 'immer';

import { types } from "./index";

// initial feature state value
const initialState = {
  value: 0,
  updatedAt: null
};

export default function counterReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.INCREMENT: {
      const { value, updatedAt } = action.payload;
      return {
        value: state.value + value,
        updatedAt
      };
    }
    case types.DECREMENT:
      return {
        ...state,
        value: state.value - action.payload
      };
    case types.RESET:
      return initialState;
    default:
      return state;
  }
}
