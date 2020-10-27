import { connect } from 'react-redux';

import {
  actions,
  selectors,
} from '../../../../store/21b-newSyncCounter';

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
      dispatch(actions.increment(5));
    },
    onDecrement() {
      dispatch(actions.decrement(3));
    },
    onReset() {
      dispatch(actions.reset());
    }
  }
};

const NewSyncCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default NewSyncCounter;
