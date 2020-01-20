

// convertTimeStamp(), TAR SERVERNS TIDSSTÄMPEL I MILLISEKUNDER PÅ VARJE
// MEDDELANDE OCH KONVERTERAR TILL HH : MM : SS
// DOCK VERKAR DET SOM SERVERNS TID ÄR LITE KNASIG
// ANNARS ÄR DET MIN KOD SOM ÄR LITE KNASIG
// NÅT KNAS ÄR DET I ALLA FALL!
function convertTimeStamp(timeStamp) {

  let msString = timeStamp.toString().split("").splice(5, 12).join("");
  let ms = parseInt(msString);

  let seconds = (ms / 1000).toFixed(0);
        let minutes = Math.floor(seconds / 60);
        let hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }

        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return hours + ":" + minutes + ":" + seconds;
}


// TimeStamp.js KONVERTERAR SIN CHILD (TIDSSTÄMPELN FRÅN SERVER) TILL EN LÄSBAR TID 
function TimeStamp(props) {
  let time = props.children;
  return convertTimeStamp(time);
}

export default TimeStamp;
