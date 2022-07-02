import moment from "moment";
import React from "react";
import { NotificationManager } from "react-notifications";

export default function handleMedicationSubmit(
  e,
  index,
  speakDoc,
  accountInfo,
  speakDocActive,
  setSpeakToDocActive,
  setactiveInputValue,
  setActiveDocMsg,
  setChatInputDisable,
  setChatSubmitBtnDisable,
  setLoadSubmitData,
  loginInfo,
  setSubmitLogin,
  fitness,
  validateNumber,
  activeInputValue,
  setFitness,
  setSubmitFitness,
  getAllSpecalist,
  searchSpeacialistByName,
  appiont,
  submitBookDoctor
) {
  e.preventDefault();
  let allMsg = speakDoc;

  if (index == 69) {
    if (appiont.time == "") {
      return NotificationManager.error(
        "Appiontment time is required to continue"
      );
    }

    let active = speakDocActive;
    const userRes = {
      id: 70,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{appiont.time}</p>
        </div>,
      ],
      type: "user",
    };
    setChatInputDisable(true);
    setChatSubmitBtnDisable(true);
    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    setActiveDocMsg(71);
    submitBookDoctor(true);
    setTimeout(() => {
      setactiveInputValue("");
      setSpeakToDocActive([...allMsgSpread, allMsg[71]]);
      window.location.href = "#showNewMsg";
    }, 1000);
  }
}

