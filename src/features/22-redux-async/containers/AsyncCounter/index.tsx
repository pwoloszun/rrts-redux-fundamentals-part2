import { connect } from 'react-redux';

import Counter from '../../../../components/Counter';

import {
  thunks, selectors
} from '../../../../store/22-asyncCounter';

const mapStateToProps = (state: any) => {
  return {
    value: -12345,
  }
};

const mapDispatchToProps = function (dispatch: any) {
  return {
    onIncrement() {
      // TODO
    },
    onDecrement() {
      // TODO
    }
  }
};

const AsyncCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default AsyncCounter;
