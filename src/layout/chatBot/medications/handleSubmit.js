import moment from "moment";
import React from "react";
import { NotificationManager } from "react-notifications";

export default function handleMedicationSubmit(
  e,
  index,
  activeMedicationMsg,
  medicationMsgs,
  accountInfo,
  medicationActiveMsg,
  setMedicationActiveMsg,
  setactiveInputValue,
  setActiveMedicationMsg,
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
  submitBookDoctor,
  setAccountInfo,
  
) {
  e.preventDefault();
  let allMsg = medicationMsgs;




  if(index == 1){
    console.log("index is one");
  }


  if (index == 5) {
    if (activeInputValue == "") {
      return NotificationManager.error(
        "Appiontment date is required to continue"
      );
    }
    console.log(moment(activeInputValue).format("YYYY-MM-DD"));
    let converDate = moment(activeInputValue).format("YYYY-MM-DD");
    console.log(">>>converDate", converDate, activeInputValue);
    if (converDate == "Invalid date") {
      return NotificationManager.error(
        "Invalid date format,please use the format below"
      );
    }
    //setAppiontMentDetails({ ...appiontMentDetails, date: converDate });
    let active = medicationActiveMsg;
    const userRes = {
      id: 4,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{converDate}</p>
        </div>,
      ],
      type: "user",
    };
    // setChatInputDisable(true);
    // setChatSubmitBtnDisable(true);
    let allMsgSpread = [...active, userRes];
    setMedicationActiveMsg(allMsgSpread);
    setActiveMedicationMsg(7);
    setTimeout(() => {
      setactiveInputValue("");
      setMedicationActiveMsg([...allMsgSpread, allMsg[7]]);
      window.location.href = "#showNewMsg";
    }, 1000);
  }

  // if (index == 7) {
  //   // alert(4);
  //   if (appiontMentDetails.time == "") {
  //     return NotificationManager.error(
  //       "Appiontment time is required to continue"
  //     );
  //   }

  //   let active = medicationActiveMsg;
  //   const userRes = {
  //     id: 8,
  //     user: [
  //       <div className="ongoingMsgReplyText">
  //         {" "}
  //         <p>{appiontMentDetails.time}</p>
  //       </div>,
  //     ],
  //     type: "user",
  //   };
  //   // setChatInputDisable(true);
  //   // setChatSubmitBtnDisable(true);
  //   let allMsgSpread = [...active, userRes];
  //   setMedicationActiveMsg(allMsgSpread);
  //   setActiveMedicationMsg(9);
  //   setTimeout(() => {
  //     setActiveMedicationMsg(9);
  //     setactiveInputValue("");
  //     setMedicationActiveMsg([...allMsgSpread, allMsg[9]]);
  //     setSubmitAppiontment(true);
  //     window.location.href = "#showNewMsg";
  //   }, 1000);
  // }

}
