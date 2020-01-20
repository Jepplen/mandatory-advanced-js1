import React from "react";
import EmojisOrLinks from "./EmojisOrLinks.js";
import TimeStamp from "./TimeStamp.js";


// ChatBoard.js RENDERAR UT CHATMEDDELANDEN SOM HAR SKICKATS TILL SERVERN
class ChatBoard extends React.Component {

  componentDidMount(){
    // FÖR ATT FÖNSTRET SKA SKROLLA NER OCH VISA DET SENASTE MEDDELANDET
    // VID FÖRSTA INLADDNING AV CHATTEN
    this.scrollIntoView();
  }

  componentDidUpdate() {
    // FÖR ATT FÖNSRET SKA SKROLLA NER OCH VISA DET SENASTE MEDDELANDET
    // EFTER VARJE GÅNG ETT NYTT MEDDALANDE HAR LAGTS TILL PÅ SERVERN
    this.scrollIntoView();
  }

  componentWillUnmount() {
    // VID UTLOGGNING AV CHATTEN STÄNGS CLIENTEN ANSLUTNING TILL SERVERN
    this.props.socket.on('disconnect', function(){
      console.log("Disconnected!");
    });

    // STÄNGER ANSLUTNINGEN TILL SERVERN
    this.props.socket.close();
  }

// scrollIntoView(), SKROLLAR TILL DUMMY-ELEMENT "el" SOM LIGGER LÄNGST NER I DOMEN
  scrollIntoView() {
    this.el.scrollIntoView({  behaviour: "smooth" });
  }

  render() {
    return (
      <div className="chatBoard">
        {this.props.chatData.map(message =>
          <li className="listItem" key={message.id}>
            <span>
              <TimeStamp>
                {message.timestamp}
              </TimeStamp>
            </span>
            <span style={{fontWeight: "bold"}}>
              {message.username}:
            </span>
            <EmojisOrLinks>
              {message.content}
            </EmojisOrLinks>
          </li> )}
        {/* DUMMY-ELEMENT SOM scrollIntoView(), MÅLSÄTTER FÖR SKROLL */}
        <div ref={el => {this.el=el; } } /></div>
    );
  }
}

export default ChatBoard;
