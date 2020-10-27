import React from 'react';

import NormalizedTodoList from './containers/NormalizedTodoList';
import externalTodosWebsocket from './services/external-todos-websocket';

class TodosNormalized extends React.Component {
  render() {
    return (
      <div>
        <div>
          <button onClick={this.handleStartExternalWS}>Start</button>
          <button onClick={this.handleStopExternalWS}>Stop</button>
        </div>
        <h3>Todos Normalized</h3>
        <NormalizedTodoList />
      </div>
    );
  }

  handleStartExternalWS = () => {
    // externalTodosWebsocket.open();
  };

  handleStopExternalWS = () => {
    // externalTodosWebsocket.close();
  };

  componentWillUnmount() {
    // externalTodosWebsocket.close();
  }
}

export default TodosNormalized;
