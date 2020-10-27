import { AppThunk, AppDispatch } from '../store';
import { delayedValue } from '../../utils/randoms';
import { actions } from './asyncCounterSlice';

export function incrementAsyncCounter(): AppThunk {
  return async function (dispatch: AppDispatch) {
    // TODO
    try {
    } catch (err) {
    }
  }
}
