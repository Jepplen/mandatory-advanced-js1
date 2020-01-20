import React from 'react';
import './App.css';
import Chat from "./Chat.js";
import Login from "./Login.js";

// Class App, STÄLLER VILKEN SIDA SOM SKA VISAS (LOGIN eller CHAT)
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: "" };
    this.onLogin = this.onLogin.bind(this);
  }

// TAR EMOT user FRÅN CHILD-Chat.js
  onLogin(user) {
    if (this.state.loggedIn) {
      this.setState({ username: user, loggedIn: false });
    } else {
      this.setState({ username: user, loggedIn: true });
    }
  }

  render() {
    return (
      <div className="App">
      {/*OM TRUE RENDERAR <Chat /> OM FALSE RENDERAS <Login />*/}
        { this.state.loggedIn ? <Chat username={this.state.username} onLogin={this.onLogin} /> : <Login onLogin={this.onLogin} /> }
      </div>
    );
  }
}

export default App;
