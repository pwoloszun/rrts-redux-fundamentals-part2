import reducer from "./reducer";

import * as selectors from "./selectors";
import * as actions from "./actions";
import * as types from "./types";
import * as sagas from "./sagas";

export const sliceId = 'todos';

export {
  selectors,
  actions,
  types,
  sagas
};

export default reducer;
