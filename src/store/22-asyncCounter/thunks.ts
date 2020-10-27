import { AppThunk, AppDispatch } from '../store';
import { delayedValue } from '../../utils/randoms';
import { actions } from './asyncCounterSlice';

export function incrementAsyncCounter(incrementBy: number): AppThunk {
  return async function (dispatch: AppDispatch) {
    const action = actions.incrementRequest();
    dispatch(action);
    try {
      const value = await delayedValue(incrementBy, 2200);
      const action = actions.incrementSuccess(value);
      dispatch(action);
    } catch (err) {
      dispatch(actions.incrementError(err));
    }
  }
}
