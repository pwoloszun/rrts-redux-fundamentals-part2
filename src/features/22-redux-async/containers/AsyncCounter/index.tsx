import { connect } from 'react-redux';

import Counter from '../../../../components/Counter';

import {
  thunks, selectors
} from '../../../../store/22-asyncCounter';

const mapStateToProps = (state: any) => {
  return {
    value: selectors.selectAsyncCounterValue(state),
  }
};

const mapDispatchToProps = function (dispatch: any) {
  return {
    onIncrement() {
      dispatch(thunks.incrementAsyncCounter(5));
    },
    onDecrement() {
      // dispatch(actions.decrementRequest());
    }
  }
};

const AsyncCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default AsyncCounter;
