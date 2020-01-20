import React from "react";

// GER ANVÄNDAREN MÖJLIGHET ATT LOGGA IN
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: "", loggedIn: false, valid: true };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onChange(e) {
    this.setState({ username: e.target.value });
  }



//  PÅ SUBMIT AV ANVÄNDARNAMN, VALIDERAS NAMNET VIA REGEXP SAMT STÄLLER
//  loggedIn TILL TRUE/FALSE SOM SKICKAS UPP TILL App.js SOM SEDAN BESTÄMMER
//  VILKEN KOMPONENT SOM SKA RENDERAS (<Chat /> eller <Login />)
  onSubmit(e) {
    e.preventDefault();
    let user = this.state.username;


      if (/^[a-zA-Z\d_-\s]{1,12}$/.test(user)) {
        this.setState({ username: user, loggedIn: true});

        //SKICKAR UPP user TILL App.js
        this.props.onLogin(user);
        
        console.log("Username OK");
      } else {
        console.log("Invalid username");
        this.setState({ username: "", loggedIn: false, valid: false });
      }
  }

  render() {
    const failedLogin = {
      color: "black",
      fontWeight: "bold"
    };

    return (
      <div id="chatLoginContent">
        <h1>EC Chatterbox</h1>
        <form id="loginForm" onSubmit={this.onSubmit}>
        Name:   
          <input id="loginName" type="text" onChange={this.onChange} value={this.state.username} />
          <input id="loginButton" type="submit" value="Login" />
        </form>
        { this.state.valid ? null : <p style={{color: "red"}}>Username <span style={failedLogin}>{this.state.previousUsername}</span> is invalid! <br /> (Max 12 characters, no special characters except: "-", "_" and "space")</p> }
      </div>
    );
  }
}

export default Login;
