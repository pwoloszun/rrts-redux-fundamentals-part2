import reducer, { actions, todosSliceId } from './todosSlice';

import * as selectors from './selectors';
import * as thunks from './thunks';

export {
  selectors,
  thunks,
  actions,
  todosSliceId,
};

export default reducer;
