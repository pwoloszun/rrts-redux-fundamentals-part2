import { connect } from 'react-redux';

import {
  actions,
  selectors,
} from '../../../../store/21b-newSyncCounter';

import Counter from '../../../../components/Counter';
import { AppDispatch, RootState } from '../../../../store/store';

const mapStateToProps = (state: RootState) => {
  return {
    value: 123,
    squareValue: 997
  }
};

const mapDispatchToProps = function (dispatch: AppDispatch) {
  return {
    onIncrement() {
      console.log('onIncrement TODO');
    },
    onDecrement() {
      console.log('onDecrement TODO');
    },
    onReset() {
      console.log('onReset TODO');
    }
  }
};

const NewSyncCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default NewSyncCounter;
