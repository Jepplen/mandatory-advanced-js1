import React from "react";

// isEmojiOrLink(), TAR EN STRÄNG AV ETT ORD OCH TESTAR MOT REGEXP FÖR ATT SE
// OM DEN INNEHÅLLER EN EMOJI ELLER EN LÄNK ELLER INGET AV DET.
// RETURNAR TRUE VID TRÄFF AV EMOJI ELLER LÄNK
function isEmojiOrLink(str) {
  if (/^:smile:|:big-smile:|:tongue:|:\)|:D|:p|:P$/.test(str)) {
    return "isEmoji";
  } else if (/^(https?|www)/.test(str)) {
    return "isLink";
  }
}

// EmojisOrLinks(), TAR PROPS FRÅN ChatBoard.js SOM ARGUMENT
// OCH TESTAR INNEHÅLLET AV <EmojisOrLinks></EmojisOrLinks> I ChatBoard.js
// OM DET INNEHÅLLER EVENTUELL EMOJI ELLER LÄNK.
// RETURNERAR HELA INNEHÅLLET SOM EN STRÄNG
function EmojisOrLinks(props) {
  let _blank = "_blank";
  let content = props.children.split(" ").map((word, index) => {
    if (isEmojiOrLink(word) === "isEmoji") {
      if (word === ":smile:" || word === ":)") {
        return <span key={index} role="img" aria-label="smile">🙂</span>
      } else if (word === ":big-smile:" || word === ":D") {
          return <span key={index} role="img" aria-label="big-smile">😃</span>
      } else if (word === ":tongue:" || word === ":p" || word === ":P") {
          return <span key={index} role="img" aria-label="tongue">😝</span>
      }
    } else if (isEmojiOrLink(word) === "isLink") {
      return <a target={_blank} key={index} href={word}> {word} </a>
    }
    return " " + word + " ";
  });
  return <>{content}</>
}

export default EmojisOrLinks;
