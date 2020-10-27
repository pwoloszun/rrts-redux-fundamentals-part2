import produce from 'immer';
import { merge } from 'lodash';

import { Todo } from '../../features/24-redux-todos-normalized/models/todo';

import { types } from "./index";

interface TodosMap {
  [id: number]: Todo;
}

interface IdBoolMap {
  [id: number]: boolean;
}

export interface NormalizedTodos {
  byId: TodosMap;
  ids: number[];
}

interface SliceState extends NormalizedTodos {
  isFetching: boolean;
  isUpdating: IdBoolMap;
  isRemoving: IdBoolMap;
}

const initialState: SliceState = {
  byId: {},
  ids: [],
  isFetching: false,
  isUpdating: {},
  isRemoving: {},
};

export default function todosReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.FETCH_REQUEST: {
      return produce(state, (draftState) => {
        draftState.isFetching = true;
      });
    }
    case types.FETCH_SUCCESS: {
      const { byId, ids } = action.payload;
      return produce(state, (draftState) => {
        draftState.isFetching = false;
        draftState.byId = byId;
        draftState.ids = ids;
      });
    }
    case types.REMOVE_REQUEST: {
      const { id } = action.payload;
      return produce(state, (draftState) => {
        draftState.isRemoving[id] = true;
      });
    }
    case types.REMOVE_SUCCESS: {
      const removedId = action.payload;
      return produce(state, (draftState) => {
        draftState.ids = state.ids.filter((id) => id !== removedId);
        delete draftState.byId[removedId];
        draftState.isRemoving[removedId] = false;
      });
    }
    case types.CREATE_SUCCESS: {
      const { byId, ids } = action.payload;
      return produce(state, (draftState) => {
        draftState.ids = state.ids.concat(ids);
        merge(draftState.byId, byId);
      });
    }
    case types.UPDATE_REQUEST: {
      const { id } = action.payload.todo;
      return produce(state, (draftState) => {
        draftState.isUpdating[id] = true;
      });
    }
    case types.UPDATE_SUCCESS: {
      const { byId } = action.payload;
      const [id] = action.payload.ids;
      return produce(state, (draftState) => {
        merge(draftState.byId, byId);
        draftState.isUpdating[id] = false;
      });
    }
    // optimistic
    case types.OPTIMISTIC_UPDATE_REQUEST: {
      const { todo, params } = action.payload;
      const { id } = todo;
      return produce(state, (draftState) => {
        draftState.byId[id] = merge({}, todo, params);
      });
    }
    case types.OPTIMISTIC_UPDATE_SUCCESS: {
      const { byId } = action.payload;
      return produce(state, (draftState) => {
        merge(draftState.byId, byId);
      });
    }
    case types.OPTIMISTIC_UPDATE_ERROR: {
      return state; // TODO
    }

    default:
      return state;
  }
}
