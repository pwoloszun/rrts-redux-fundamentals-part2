import reducer, { actions, asyncCounterSliceId } from './asyncCounterSlice';

import * as selectors from './selectors';
import * as thunks from './thunks';


export {
  selectors,
  thunks,
  actions,
  asyncCounterSliceId,
};

export default reducer;
