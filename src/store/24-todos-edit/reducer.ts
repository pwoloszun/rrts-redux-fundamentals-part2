import produce from 'immer';

import * as types from './types';

interface IdBoolMap {
  [id: number]: boolean;
}

interface SliceState {
  isEditing: IdBoolMap;
}

const initialState: SliceState = {
  isEditing: {},
};

export default function todosPessimisticReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.START_EDIT_TODO: {
      const { id } = action.payload;
      return produce(state, (draftState) => {
        draftState.isEditing[id] = true;
      });
    }
    case types.END_EDIT_TODO: {
      const { id } = action.payload;
      return produce(state, (draftState) => {
        draftState.isEditing[id] = false;
      });
    }
    default:
      return state;
  }
}
