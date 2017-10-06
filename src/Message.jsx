import React, {Component} from 'react';

//left over from an older version. this code doesn't come into play much.
class Message extends Component {
  render() {
    if (this.props.type === "incomingNotification") {
      return (
          <div className="message system">
            <span className="message-content">{this.props.content}</span>
          </div>
      );
    } else if (this.props.type === 'IncommingConnect'){
    	return (
    		<div className="message system">
    		  <span className ="message-content">{ this.props.content}</span>
    		  </div>
    		  );
    }
      return (
          <div className="message">
            <span className="message-username">{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
      );
    }
  }

export default Message;
