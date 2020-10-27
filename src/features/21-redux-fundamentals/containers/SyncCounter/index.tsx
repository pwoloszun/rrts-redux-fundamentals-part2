import { connect } from 'react-redux';

import {
  actions,
  selectors,
} from '../../../../store/21-syncCounter';

import Counter from '../../../../components/Counter';

const mapStateToProps = (state: any) => {
  return {
    value: selectors.selectCounterValue(state),
    squareValue: selectors.selectSquareValue(state)
  }
};

const mapDispatchToProps = function (dispatch: any) {
  return {
    onIncrement() {
      dispatch(actions.incrementAction(5));
    },
    onDecrement() {
      dispatch(actions.decrementAction(3));
    },
    onReset() {
      dispatch(actions.resetAction());
    }
  }
};

const SyncCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default SyncCounter;
