import moment from "moment";
import React from "react";
import { NotificationManager } from "react-notifications";

export default function handleSubmitDocMsg(
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
  submitBookDoctor,
  setAppiont,
  setAccountInfo
) {
  e.preventDefault();
  let allMsg = speakDoc;

  if (index == 4) {
    if (accountInfo.firstname == "") {
      return NotificationManager.error("First name is required to continue");
    }
    let active = speakDocActive;
    const userRes = {
      id: 5,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{accountInfo.firstname}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    setTimeout(() => {
      setactiveInputValue("");
      setActiveDocMsg(6);
      setSpeakToDocActive([...allMsgSpread, allMsg[6]]);
      window.location.href = "#showNewMsg";
    }, 2000);
  }

  if (index == 6) {
    if (accountInfo.lastname == "") {
      return NotificationManager.error("Last name is required to continue");
    }
    let active = speakDocActive;
    const userRes = {
      id: 7,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{accountInfo.lastname}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    setTimeout(() => {
      setactiveInputValue("");
      setActiveDocMsg(8);
      setSpeakToDocActive([...allMsgSpread, allMsg[8]]);
      window.location.href = "#showNewMsg";
    }, 2000);
  }

  if (index == 8) {
    if (accountInfo.email == "") {
      return NotificationManager.error("Email is required to continue");
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(accountInfo.email).toLowerCase()) == false) {
      return NotificationManager.error("Invalid email format");
    }
    let active = speakDocActive;
    const userRes = {
      id: 9,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{accountInfo.email}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    setTimeout(() => {
      setactiveInputValue("");
      setActiveDocMsg(10);
      setSpeakToDocActive([...allMsgSpread, allMsg[10]]);
      window.location.href = "#showNewMsg";
    }, 2000);
  }

  if (index == 10) {
    if (accountInfo.phone == "") {
      return NotificationManager.error("Phone number is required to continue");
    }

    if (isNaN(accountInfo.phone) ==true) {
      console.log(isNaN(accountInfo.phone));
      return NotificationManager.error("Invalid number");
    }

    if (accountInfo.phone.length >11 || accountInfo.phone.length < 11) {
      return NotificationManager.error("Phone number must not be greater than 11 digits");
    }
    let active = speakDocActive;
    const userRes = {
      id: 11,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{accountInfo.phone}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    setTimeout(() => {
      setactiveInputValue("");
      setActiveDocMsg(12);
      setSpeakToDocActive([...allMsgSpread, allMsg[12]]);
      window.location.href = "#showNewMsg";
    }, 2000);
  }

  // if (index == 12) {
  //   if (accountInfo.dob == "") {
  //     return NotificationManager.error("DOB is required to continue");
  //   }
  //   let converDate =  (moment(activeInputValue).format("YYYY-MM-DD"))
  //   console.log(">>>converDate",converDate,activeInputValue);
  //   if (converDate == "Invalid date") {
  //     return NotificationManager.error(
  //       "Invalid date format,please use the format below"
  //     );
  //   }
  //   setAccountInfo({
  //     ...accountInfo,
  //     dob:converDate,
  //   });
  //   let active = speakDocActive;
  //   const userRes = {
  //     id: 13,
  //     user: [
  //       <div className="ongoingMsgReplyText">
  //         {" "}
  //         <p>{converDate}</p>
  //       </div>,
  //     ],
  //     type: "user",
  //   };
  //   setChatInputDisable(true);
  //   setChatSubmitBtnDisable(true);
  //   let allMsgSpread = [...active, userRes];
  //   setSpeakToDocActive(allMsgSpread);
  //   setTimeout(() => {
  //     setactiveInputValue("");
  //     setActiveDocMsg(14);
  //     setSpeakToDocActive([...allMsgSpread, allMsg[14]]);
  //     window.location.href = "#showNewMsg";
  //   }, 2000);
  // }

  if (index == 16) {
    if (accountInfo.password == "") {
      return NotificationManager.error("Password is required to continue");
    }
    let lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if (
      // !accountInfo.password.match(lowerCaseLetters) ||
      // !accountInfo.password.match(upperCaseLetters) ||
      // !accountInfo.password.match(numbers) ||
      accountInfo.password.length < 8
    ) {
      return NotificationManager.error(
        "Invalid password, password must be greater than 8 characters"
      );
    }

    let active = speakDocActive;
    const userRes = {
      id: 17,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>************</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes, speakDoc[18]];
    setSpeakToDocActive(allMsgSpread);
    setactiveInputValue("");
    setActiveDocMsg(18);
    setLoadSubmitData(true);
  }

  if (index == 19) {
    if (accountInfo.email == "") {
      return NotificationManager.error("Email is required to continue");
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(accountInfo.email).toLowerCase()) == false) {
      return NotificationManager.error("Invalid email format");
    }
    let active = speakDocActive;
    const userRes = {
      id: 20,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{accountInfo.email}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes, allMsg[21]];
    setSpeakToDocActive(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveDocMsg(21);
    setLoadSubmitData(true);
    window.location.href = "#showNewMsg";
  }

  if (index == 22) {
    if (accountInfo.phone == "") {
      return NotificationManager.error("Phone number is required to continue");
    }

    if (isNaN(accountInfo.phone) ==true) {
      console.log(isNaN(accountInfo.phone));
      return NotificationManager.error("Invalid number");
    }

    if (accountInfo.phone.length >11 || accountInfo.phone.length < 11) {
      return NotificationManager.error("Phone number must not be greater tahn 11 digits");
    }
    let active = speakDocActive;
    const userRes = {
      id: 23,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{accountInfo.phone}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes, allMsg[24]];
    setSpeakToDocActive(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveDocMsg(24);
    setLoadSubmitData(true);
    window.location.href = "#showNewMsg";
  }

  if (index == 26) {
    if (loginInfo.email == "") {
      return NotificationManager.error("Email is required to continue");
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(loginInfo.email).toLowerCase()) == false) {
      return NotificationManager.error("Invalid email format");
    }
    let active = speakDocActive;
    const userRes = {
      id: 27,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{loginInfo.email}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    setTimeout(() => {
      setactiveInputValue("");
      setActiveDocMsg(28);
      setSpeakToDocActive([...allMsgSpread, allMsg[28]]);
      window.location.href = "#showNewMsg";
    }, 2000);
  }

  if (index == 28) {
    if (loginInfo.password == "") {
      return NotificationManager.error("Password is required to continue");
    }
    let lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if (
      // !loginInfo.password.match(lowerCaseLetters) ||
      // !loginInfo.password.match(upperCaseLetters) ||
      // !loginInfo.password.match(numbers) ||
      loginInfo.password.length < 8
    ) {
      return NotificationManager.error(
        "Invalid password, password must be up to  8 caracters"
      );
    }
    let active = speakDocActive;
    const userRes = {
      id: 29,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>**********</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes, allMsg[30]];
    setSpeakToDocActive(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveDocMsg(30);
    //etActiveDocMsg(62);
    setSubmitLogin(true);
    window.location.href = "#showNewMsg";
  }

  if (index == 34) {
    if (fitness.height == "") {
      return NotificationManager.error("Heigt is required to continue");
    }

    if (validateNumber(Number(fitness.height))) {
      return NotificationManager.error("Please input a valid number");
    }

    let active = speakDocActive;
    const userRes = {
      id: 35,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{fitness.height}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveDocMsg(36);
    window.location.href = "#showNewMsg";
    setactiveInputValue("");

    setTimeout(() => {
      setSpeakToDocActive([...allMsgSpread, allMsg[36]]);
    }, 1000);
    setactiveInputValue("");
  }

  if (index == 36) {
    if (fitness.weight == "") {
      return NotificationManager.error("Weight is required to continue");
    }

    if (validateNumber(Number(fitness.weight))) {
      return NotificationManager.error("Please input a valid number");
    }

    let active = speakDocActive;
    const userRes = {
      id: 37,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{fitness.weight}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveDocMsg(38);
    window.location.href = "#showNewMsg";
    setactiveInputValue("");
    setTimeout(() => {
      setSpeakToDocActive([...allMsgSpread, allMsg[38]]);
    }, 1000);
  }

  if (index == 38) {
    if (fitness.workOutDays == "") {
      return NotificationManager.error("Work out days is required to continue");
    }

    if (validateNumber(Number(fitness.workOutDays))) {
      return NotificationManager.error("Please input a valid number");
    }

    let active = speakDocActive;
    const userRes = {
      id: 39,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{fitness.workOutDays}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveDocMsg(40);
    window.location.href = "#showNewMsg";
    setactiveInputValue("");
    setTimeout(() => {
      setSpeakToDocActive([...allMsgSpread, allMsg[40]]);
    }, 1000);
  }

  if (index == 40) {
    if (fitness.workOutTime == "") {
      return NotificationManager.error("Work out time is required to continue");
    }

    if (validateNumber(Number(fitness.workOutTime))) {
      return NotificationManager.error("Please input a valid number");
    }

    let active = speakDocActive;
    const userRes = {
      id: 41,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{fitness.workOutTime}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveDocMsg(42);
    window.location.href = "#showNewMsg";
    setactiveInputValue("");
    setTimeout(() => {
      setChatInputDisable(false);
      setChatSubmitBtnDisable(false);
      setSpeakToDocActive([...allMsgSpread, allMsg[42]]);
    }, 1000);
  }

  if (index == 44) {
    if (activeInputValue == "") {
      return NotificationManager.error("activities is required to continue");
    }

    let active = speakDocActive;
    const userRes = {
      id: 45,
      user: [
        <div className="ongoingMsgReplyText healthIntrsdk">
          {" "}
          {activeInputValue.map((data) => {
            return <p>{data}</p>;
          })}
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setFitness({ ...fitness, activities: activeInputValue });
    setSpeakToDocActive(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveDocMsg(46);
    window.location.href = "#showNewMsg";
    setactiveInputValue("");
    setTimeout(() => {
      setChatInputDisable(false);
      setChatSubmitBtnDisable(false);
      setSpeakToDocActive([...allMsgSpread, allMsg[46]]);
    }, 1000);
  }

  if (index == 46) {
    if (fitness.sleepGoal == "") {
      return NotificationManager.error("activities is required to continue");
    }

    let active = speakDocActive;
    const userRes = {
      id: 47,
      user: [
        <div className="ongoingMsgReplyText">
          <p>{fitness.sleepGoal}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveDocMsg(48);
    window.location.href = "#showNewMsg";
    setactiveInputValue("");
    setTimeout(() => {
      setChatInputDisable(false);
      setChatSubmitBtnDisable(false);
      setSpeakToDocActive([...allMsgSpread, allMsg[48]]);
    }, 1000);
  }

  if (index == 48) {
    if (fitness.weightGoal == "") {
      return NotificationManager.error("activities is required to continue");
    }

    let active = speakDocActive;
    const userRes = {
      id: 49,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{fitness.weightGoal}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveDocMsg(50);
    window.location.href = "#showNewMsg";
    setactiveInputValue("");
    setTimeout(() => {
      setChatInputDisable(false);
      setChatSubmitBtnDisable(false);
      setSpeakToDocActive([...allMsgSpread, allMsg[50]]);
    }, 1000);
  }

  if (index == 53) {
    if (fitness.allergies.detail == "") {
      return NotificationManager.error("activities is required to continue");
    }

    let active = speakDocActive;
    const userRes = {
      id: 54,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{fitness.allergies.detail}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveDocMsg(55);
    window.location.href = "#showNewMsg";
    setactiveInputValue("");
    setTimeout(() => {
      setChatInputDisable(false);
      setChatSubmitBtnDisable(false);
      setSpeakToDocActive([...allMsgSpread, allMsg[55]]);
    }, 1000);
  }

  if (index == 56) {
    if (fitness.diagnosis.detail == "") {
      return NotificationManager.error("activities is required to continue");
    }

    let active = speakDocActive;
    const userRes = {
      id: 57,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{fitness.diagnosis.detail}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveDocMsg(58);
    window.location.href = "#showNewMsg";
    setactiveInputValue("");
    setTimeout(() => {
      setChatInputDisable(false);
      setChatSubmitBtnDisable(false);
      setSpeakToDocActive([...allMsgSpread, allMsg[58]]);
    }, 1000);
  }

  if (index == 59) {
    if (fitness.medication.detail == "") {
      return NotificationManager.error("activities is required to continue");
    }

    let active = speakDocActive;
    const userRes = {
      id: 60,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{fitness.medication.detail}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    window.location.href = "#showNewMsg";
    // setActiveDocMsg(61);
    window.location.href = "#showNewMsg";
    setactiveInputValue("");
    setActiveDocMsg(61);
    setSubmitFitness(true);
    setTimeout(() => {
      setChatInputDisable(false);
      setChatSubmitBtnDisable(false);
      setSpeakToDocActive([...allMsgSpread, allMsg[61]]);
    }, 1000);
  }

  if (index == 62) {
    getAllSpecalist(searchSpeacialistByName, "byName");
  }

  if (index == 65) {
    if (appiont.description == "") {
      return NotificationManager.error(
        "Reason to see a doctor is required to continue"
      );
    }

    let active = speakDocActive;
    const userRes = {
      id: 66,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{appiont.description}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveDocMsg(67);
    window.location.href = "#showNewMsg";
    setactiveInputValue("");
    setTimeout(() => {
      setChatInputDisable(false);
      setChatSubmitBtnDisable(false);
      setSpeakToDocActive([...allMsgSpread, allMsg[67]]);
    }, 1000);
  }

  if (index == 67) {
    if (activeInputValue == "") {
      return NotificationManager.error(
        "Appiontment date is required to continue"
      );
    }
    console.log(moment(activeInputValue).format("YYYY-MM-DD"));
    let converDate =  (moment(activeInputValue).format("YYYY-MM-DD"))
    console.log(">>>converDate",converDate,activeInputValue);
    if (converDate == "Invalid date") {
      return NotificationManager.error(
        "Invalid date format,please use the format below"
      );
    }
    setAppiont({
      ...appiont,
      date: converDate,
    });
    let active = speakDocActive;
    const userRes = {
      id: 68,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{converDate}</p>
        </div>,
      ],
      type: "user",
    };
    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    setTimeout(() => {
      setactiveInputValue("");
      setActiveDocMsg(69);
      setSpeakToDocActive([...allMsgSpread, allMsg[69]]);
      window.location.href = "#showNewMsg";
    }, 2000);
  }

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


    let allMsgSpread = [...active, userRes];
    //setSpeakToDocActive([...allMsgSpread, allMsg[71]]);
    window.location.href = "#showNewMsg";
    setActiveDocMsg(71);
    //etActiveDocMsg(62);
    //setSubmitLogin(true);

    submitBookDoctor(true);
    setTimeout(() => {
        setactiveInputValue("");
        setSpeakToDocActive([...allMsgSpread, allMsg[71]]);
        window.location.href = "#showNewMsg";
      }, 1000);


    


  }

  
}
