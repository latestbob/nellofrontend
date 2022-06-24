import moment from "moment";
import React from "react";
import { NotificationManager } from "react-notifications";

export default function handleAppiontmentSubmit(
  e,
  index,
  setActiveAppiontmentMsg,
  appiontmentActiveMsg,
  setappiontmentActiveMsg,
  appiontmentMsg,
  appiontMentDetails,
  setAppiontMentDetails,
  setactiveInputValue,
  activeInputValue,
  setSubmitAppiontment,
  accountInfo,
  setAccountInfo,
  setLoadSubmitData,
  loginInfo,
  setLoginInfo,
  loginInfoHos,
  setLoginInfoHos,
  setSubmitLoginHos,
  submitLoginHos,
  activeAppiontmentMsg,
  appiont,
  setChatInputDisable,
  setChatSubmitBtnDisable,
) {
  e.preventDefault();
  let allMsg = appiontmentMsg;

  if (index == 4) {
    // alert(4);
    if (accountInfo.firstname == "") {
      return NotificationManager.error(
        "Firstname is required to continue"
      );
    }

    let active = appiontmentActiveMsg;
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
    // setChatInputDisable(true);
    // setChatSubmitBtnDisable(true);
    let allMsgSpread = [...active, userRes];
    setappiontmentActiveMsg(allMsgSpread);
    setActiveAppiontmentMsg(6);
    setTimeout(() => {
      setactiveInputValue("");
      setappiontmentActiveMsg([...allMsgSpread, allMsg[6]]);
      window.location.href = "#showNewMsg";
    }, 1000);
  }


  //check if lastname input is valid

  if (index == 6) {
    // alert(4);
    if (accountInfo.lastname == "") {
      return NotificationManager.error(
        "Lastname is required to continue"
      );
    }

    let active = appiontmentActiveMsg;
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
    // setChatInputDisable(true);
    // setChatSubmitBtnDisable(true);
    let allMsgSpread = [...active, userRes];
    setappiontmentActiveMsg(allMsgSpread);
    setActiveAppiontmentMsg(8);
    setTimeout(() => {
      setactiveInputValue("");
      setappiontmentActiveMsg([...allMsgSpread, allMsg[8]]);
      window.location.href = "#showNewMsg";
    }, 1000);
  }

//for email validation
  if (index == 8) {
    // alert(4);
    if (accountInfo.email == "") {
      return NotificationManager.error("Email is required to continue");
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(accountInfo.email).toLowerCase()) == false) {
      return NotificationManager.error("Invalid email format");
    }

    let active = appiontmentActiveMsg;
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
    // setChatInputDisable(true);
    // setChatSubmitBtnDisable(true);
    let allMsgSpread = [...active, userRes];
    setappiontmentActiveMsg(allMsgSpread);
    setActiveAppiontmentMsg(10);
    setTimeout(() => {
      setactiveInputValue("");
      setappiontmentActiveMsg([...allMsgSpread, allMsg[10]]);
      window.location.href = "#showNewMsg";
    }, 1000);
  }

  if (index == 10) {
    // alert(4);
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

    let active = appiontmentActiveMsg;
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
    // setChatInputDisable(true);
    // setChatSubmitBtnDisable(true);
    let allMsgSpread = [...active, userRes];
    setappiontmentActiveMsg(allMsgSpread);
    setActiveAppiontmentMsg(12);
    setTimeout(() => {
      setactiveInputValue("");
      setappiontmentActiveMsg([...allMsgSpread, allMsg[12]]);
      window.location.href = "#showNewMsg";
    }, 1000);
  }

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

    let active = appiontmentActiveMsg;
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

    let allMsgSpread = [...active, userRes, appiontmentMsg[18]];
    setappiontmentActiveMsg(allMsgSpread);
    setactiveInputValue("");
    //setActiveDocMsg(18);
    setActiveAppiontmentMsg(18);
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
    let active = appiontmentActiveMsg;
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
    setappiontmentActiveMsg(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveAppiontmentMsg(21);
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
      return NotificationManager.error("Phone number must not be greater than 11 digits or lesser than 11");
    }
    let active = appiontmentActiveMsg;
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
    setappiontmentActiveMsg(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveAppiontmentMsg(24);
    setLoadSubmitData(true);
    window.location.href = "#showNewMsg";
  }


  //login details validations


  if (index == 26) {
    
    if (accountInfo.email == "") {
      return NotificationManager.error("Email is required to continue");
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(accountInfo.email).toLowerCase()) == false) {
      return NotificationManager.error("Invalid email format");
    }

    
   

    let active = appiontmentActiveMsg;
    const userRes = {
      id: 27,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{accountInfo.email}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];
    setappiontmentActiveMsg(allMsgSpread);
    setTimeout(() => {
      setactiveInputValue("");
      setActiveAppiontmentMsg(28);
      setappiontmentActiveMsg([...allMsgSpread, allMsg[28]]);


      // setActiveAppiontmentMsg(19);
      // setappiontmentActiveMsg([...allSentMsg, allMsg[19]]);

      window.location.href = "#showNewMsg";
    }, 2000);
  }

  if (index == 28) {
    //console.log(loginInfo);
    if (accountInfo.password == "") {
      return NotificationManager.error("Password is required to continue");
    }
    let lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if (
      // !loginInfo.password.match(lowerCaseLetters) ||
      // !loginInfo.password.match(upperCaseLetters) ||
      // !loginInfo.password.match(numbers) ||
      accountInfo.password.length < 8
    ) {
      return NotificationManager.error(
        "Invalid password, password must be up to  8 caracters"
      );
    }

    
    let active = appiontmentActiveMsg;
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

    console.log(accountInfo);
    let allMsgSpread = [...active, userRes, allMsg[30]];
    setappiontmentActiveMsg(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveAppiontmentMsg(30);
    //etActiveDocMsg(62);
    setSubmitLoginHos(true); 
    console.log(submitLoginHos);
    console.log("Working");
    
    
    window.location.href = "#showNewMsg";
  }


  if (index == 65) {
    if (appiontMentDetails.description == "") {
      return NotificationManager.error(
        "Reason to visit medical center is required to continue"
      );
    }

    let active = appiontmentActiveMsg;
    const userRes = {
      id: 66,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{appiontMentDetails.description}</p>
        </div>,
      ],
      type: "user",
    };

    let allMsgSpread = [...active, userRes];


    setappiontmentActiveMsg(allMsgSpread);
    window.location.href = "#showNewMsg";
    setActiveAppiontmentMsg(67);
    window.location.href = "#showNewMsg";
    setactiveInputValue("");
    setTimeout(() => {
      setChatInputDisable(false);
      //setChatSubmitBtnDisable(false); uncomment later
      setappiontmentActiveMsg([...allMsgSpread, allMsg[67]]);
    }, 1000);
  }

  if (index == 69) {
    if (appiontMentDetails.time == "") {
      return NotificationManager.error(
        "Appiontment time is required to continue"
      );
    }

    let active = appiontmentActiveMsg;
    const userRes = {
      id: 70,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{appiontMentDetails.time}</p>
        </div>,
      ],
      type: "user",
    };

    console.log(appiontMentDetails);
    let allMsgSpread = [...active, userRes];
    //setSpeakToDocActive([...allMsgSpread, allMsg[71]]);
    window.location.href = "#showNewMsg";
    setActiveAppiontmentMsg(71);
    //etActiveDocMsg(62);
    //setSubmitLogin(true);

    //submitBookDoctor(true); change it for medical center now
    setTimeout(() => {
        setactiveInputValue("");
        setappiontmentActiveMsg([...allMsgSpread, allMsg[71]]);
        window.location.href = "#showNewMsg";
      }, 1000);


    // setChatInputDisable(true);
    // setChatSubmitBtnDisable(true);
    // let allMsgSpread = [...active, userRes];
    // setSpeakToDocActive(allMsgSpread);
    // setActiveDocMsg(71);
    // submitBookDoctor(true);
    // setTimeout(() => {
    //   setactiveInputValue("");
    //   setSpeakToDocActive([...allMsgSpread, allMsg[71]]);
    //   window.location.href = "#showNewMsg";
    // }, 1000);
  }


  // if (index == 5) {
  //   if (activeInputValue == "") {
  //     return NotificationManager.error(
  //       "Appiontment date is required to continue"
  //     );
  //   }
  //   console.log(moment(activeInputValue).format("YYYY-MM-DD"));
  //   let converDate = moment(activeInputValue).format("YYYY-MM-DD");
  //   console.log(">>>converDate", converDate, activeInputValue);
  //   if (converDate == "Invalid date") {
  //     return NotificationManager.error(
  //       "Invalid date format,please use the format below"
  //     );
  //   }
  //   setAppiontMentDetails({ ...appiontMentDetails, date: converDate });
  //   let active = appiontmentActiveMsg;
  //   const userRes = {
  //     id: 4,
  //     user: [
  //       <div className="ongoingMsgReplyText">
  //         {" "}
  //         <p>{converDate}</p>
  //       </div>,
  //     ],
  //     type: "user",
  //   };
  //   // setChatInputDisable(true);
  //   // setChatSubmitBtnDisable(true);
  //   let allMsgSpread = [...active, userRes];
  //   setappiontmentActiveMsg(allMsgSpread);
  //   setActiveAppiontmentMsg(7);
  //   setTimeout(() => {
  //     setactiveInputValue("");
  //     setappiontmentActiveMsg([...allMsgSpread, allMsg[7]]);
  //     window.location.href = "#showNewMsg";
  //   }, 1000);
  // }

  // if (index == 7) {
  //   // alert(4);
  //   if (appiontMentDetails.time == "") {
  //     return NotificationManager.error(
  //       "Appiontment time is required to continue"
  //     );
  //   }

  //   let active = appiontmentActiveMsg;
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
  //   setappiontmentActiveMsg(allMsgSpread);
  //   setActiveAppiontmentMsg(9);
  //   setTimeout(() => {
  //     setActiveAppiontmentMsg(9);
  //     setactiveInputValue("");
  //     setappiontmentActiveMsg([...allMsgSpread, allMsg[9]]);
  //     setSubmitAppiontment(true);
  //     window.location.href = "#showNewMsg";
  //   }, 1000);
  // }
}
