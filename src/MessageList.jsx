import React, {Component} from 'react';
 import Message from './Message.jsx';
 class MessageList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("Rendering <MessageList/>")

    const inheritMessageProps = this.props.msgs

    const submissions = inheritMessageProps.map((message) => {
      if (message.type === "incomingMessage") {
        return (
          <div className="message" key={message.id}>
            <span className="message-username">{message.username}</span>
            <span className="message-content">{message.content}</span>
          </div>
        )
      } else if (message.type === "incomingNotification") {
        return (
          <div className="message" key={message.id}>
            <div className="message system">
              {message.previousUserName} changed their username to {message.newUser}
            </div>
          </div>
        )
      } else if (message.type === "incomingConnectNotification") {
        return (
          <div className="message" key={message.id}>
          <div className="message system">
            New user connected!
          </div>
        </div>
        )
      }
    })


    return (
      <div>
        {submissions}
      </div>
    );
  }
}

export default MessageList
