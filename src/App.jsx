import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 0,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 1,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }
//sets connection to local host executes a function for recieveing a message
    componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = () => {
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.addMessage(data);
      }
    }
  }

//when recieves a message turns JSON into a string
  onMessage(message) {
  	this.socket.send(JSON.stringify(message));
  }
//takes the messages in data and loops through them, adding to the message box
  addMessage(message) {
    message.id = this.state.messages.length;
    this.setState({messages: this.state.messages.concat([message])});
  }

  render() {
    return (
      <div>
       
        <nav className="navbar">
          <a href="/" className="navbar-brand">Encouter With The Sublime</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} onMessage={this.onMessage.bind(this)} />
      </div>
    );
  }
}
export default App;