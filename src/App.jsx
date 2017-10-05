import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages:[]
      
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
  	message.type = "postMessage";
  	this.socket.send(JSON.stringify(message));

  }
//takes the messages in data and loops through them, adding to the message box
  addMessage(message) {
    message.id = this.state.messages.length;
    this.setState({messages: this.state.messages.concat([message])});
  }

  onUsernameChange(user){
  	const pastUsername = this.state.currentUser.name;
  	this.setState({ currentUser: user });
  	this.socket.send(JSON.stringify({type: "postNotification", content: `${pastUsername} changed their name to ${user.name}.` }))

  }

  render() {
    return (
      <div>
       
        <nav className="navbar">
          <a href="/" className="navbar-brand">...</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} onUsernameChange={this.onUsernameChange.bind(this)} onMessage={this.onMessage.bind(this)} />
      </div>
    );
  }
}
export default App;