import React from "react";
import io from "socket.io-client";
import ChatBoard from "./ChatBoard.js";


// Chat RENDERAR HELA CHAT-LAYOUT OCH CHILDAR ChatBoard.js
// SOM RENDERAR LISTAN MED MEDDELANDEN
class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: "", content: "", invalidMessage: false, newMessage: {}, chatData: [] }

    // DEKLARERAR SERVERN
    this.socket = io("http://3.120.96.16:3000");

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

// onChange() VALIDERAR MEDDELANDET I REALTID, OM ÖVER 200 TECKEN FÅR ANVÄNDAREN
// EN VARNING OCH KNAPPEN "SKICKA" BLIR GRAYED-OUT
  onChange(e) {
    if (/^.{0,200}$/.test(e.target.value)) {
      console.log("Under eller lika med 200 tecken");
      this.setState({ username: this.props.username, content: e.target.value, invalidMessage: false });
    } else {
      console.log("Över 200 tecken");
      this.setState({ username: this.props.username, content: e.target.value, invalidMessage: true});
    }
  }

// onSubmit() VALIDERAR MEDDELANDET EFTER ATT ANVÄNDAREN HAR KLICKAT "SKICKA",
// OM ÖVER 200 GÅR INTE VALIDERINGEN IGENOM OCH MEDDELANDET SKICKAS EJ.
// DOCK FINNS MEDDELANDET KVAR FÖR OMSTRUKTURERING
  onSubmit(e) {
    e.preventDefault();
    if (/^.{1,200}$/.test(this.state.content)) {
      this.setState({ username: this.state.username, content: this.state.content, invalidMessage: false });

      this.socket.emit("message", {
          username: this.state.username,
          content: this.state.content
      }, (response) => {
        console.log(response);
        this.setState({ username: this.state.username, content: this.state.content, invalidMessage: false, newMessage: [...this.messageArray, response.data.newMessage ]});
        let newMessageArray = this.state.chatData;
        newMessageArray.push(response.data.newMessage);
        this.setState({ chatData: newMessageArray });
      });
      this.setState({ content: "" });
    }
  }

  componentDidMount(){
    this.socket.on('connect', function(){
      console.log("Connected!");
    });

    this.messageArray = []; // FÖR ATT SPARA ChatData FRÅN SERVERN

    // ANROPAR SERVERN OCH HÄMTAR ALLA BEFINTLIGA MEDDELANDE-OBJEKT I EN ARRAY
    // SOM SEDAN SPARAS I messageArray OCH SÄTTS TILL ChatData PROPERTY I STATE
    this.socket.on('messages', (data) => {
      this.messageArray = data;
      this.setState({ chatData: this.messageArray });
    });

    // LYSSNAR EFTER NYA MEDDELANDEN PÅ SERVERN OCH LÄGGS TILL I messageArray
    // SEDAN UPPDATERAS ChatData PROPERTY I STATE MED messageArray
    this.socket.on('new_message', (message) => {
      if (this.state.chatData[this.state.chatData.length - 1].id !== message.id) {
        this.messageArray.push(message);
        this.setState({ chatData: this.messageArray });
      }
    });
  }

  // PLACEHOLDER
  componentWillUnmount() {
  }

  onClick(e) {
    e.preventDefault();
    this.props.onLogin();
  }

  render() {
    return (
      <div className="chatPage">
        <header>
          <h1>EC Chatterbox</h1>
          <h3>Välkommen {this.props.username}!</h3>
          <button id="closeButton" onClick={this.onClick}>Logout</button>
        </header>
        <main>
          <div className="chatWrapper">
            <div className="chatContent">
              <ul>
                {/*KÖR ChatBoard.js SOM HÄMTAR SERVERNS MEDDELANDEN*/}
                <ChatBoard socket={this.socket} chatData={this.state.chatData}/>
              </ul>
            </div>
            {/*HÄR KAN ANVÄNDAREN MATA IN ETT MEDDELANDE TILL CHATTEN*/}
            <div className="newMessageWrapper">
              <form id="chatForm" onSubmit={this.onSubmit}>
                <input id="newMessageInput" type="text" onChange={this.onChange} value={this.state.content} placeholder="Skriv ditt meddelande här..."/>
                {/*OM MEDDELANDET INTE OGILTIGT SÅ GRÅAS "SKICKA" KNAPPEN*/}
                { this.state.invalidMessage ? <button id="chatButton" style={{opacity: "0.5"}}>Skicka</button> : <button id="chatButton">Skicka</button> }
              </form>
              {/* OM MEDDELANDET ÄR OGILTIGT VISAS ETT VARNINGSMEDDELANDE FÖR ANVÄNDAREN */}
              { this.state.invalidMessage ? <p style={{fontSize: "16px", color: "red"}}>You have exceeded the maximum allowed 200 characters...</p> : null }
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Chat;
