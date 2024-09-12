import React, { Component } from 'react';
import ChatInput from './ChatInput.jsx';
import ChatWindow from './ChatWindow.jsx';

class MainWindow extends Component {
  constructor(props) {
    super(props);
    this.socket = props.socket;
    this.state = {
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.socket.on("receive_message", data => this.addMessage(data.message));
    this.socket.on("snapshot", data => this.addSnapshot(data.snapshot));
  }

  addMessage(message) {
    if (!message || message.length === 0) return;
    const newMessages = this.state.messages.slice(0);
    newMessages.push(message);
    this.setState({
      messages: newMessages
    }, () => {
      const messageIndex = document.getElementById("message-index");
      messageIndex.scrollTop = messageIndex.scrollHeight;
    });
  }

  addSnapshot(snapshotMessages) {
    console.log(snapshotMessages);
    if (!snapshotMessages) {
      return;
    }
    this.setState({
      messages: snapshotMessages
    }, () => {
      const messageIndex = document.getElementById("message-index");
      messageIndex.scrollTop = messageIndex.scrollHeight;
    });
  }

  render() {
    return (
      <div id="main">
        <ChatWindow messages={this.state.messages}/>
        <ChatInput socket = {this.socket} addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default MainWindow;
