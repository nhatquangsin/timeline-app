import React, { Component, createContext } from 'react';

const MessageContext = createContext();

const INITIAL_STATE = {
  visible: false,
  message: '',
  type: null,
};

export class MessageProvider extends Component {
  state = INITIAL_STATE;

  showMessage = ({ message, type }) =>
    this.setState({
      visible: true,
      message,
      type,
    });

  hideMessage = () => this.setState({ ...INITIAL_STATE });

  render() {
    const { children } = this.props;
    return (
      <MessageContext.Provider
        value={{
          ...this.state,
          showMessage: this.showMessage,
          hideMessage: this.hideMessage,
        }}
      >
        {children}
      </MessageContext.Provider>
    );
  }
}

export const MessageConsumer = MessageContext.Consumer;
