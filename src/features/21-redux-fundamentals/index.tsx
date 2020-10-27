import React from 'react';
import NewSyncCounter from './containers/NewSyncCounter';

import SyncCounter from './containers/SyncCounter';

class ReduxFundamentals extends React.Component {
  render() {
    return (
      <div>
        <h3>ReduxFundamentals </h3>
        <SyncCounter />
        <hr />
        <NewSyncCounter />
      </div>
    );
  }
}

export default ReduxFundamentals;
