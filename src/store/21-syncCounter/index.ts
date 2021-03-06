import reducer from "./reducer";

import * as selectors from "./selectors";
import * as actions from "./actions";
import * as types from "./types";

export const syncCounterSliceId = 'syncCounter';

export {
  selectors,
  actions,
  types
};

export default reducer;
