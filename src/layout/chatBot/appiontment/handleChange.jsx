import moment from "moment";
import React from "react";
//export default function doctorHandleChange(

export default function appiontmentChange(
  e,
  index,
  setactiveInputValue,
  setAppiontMentDetails,
  appiontMentDetails,
  accountInfo,
  setAccountInfo,
  loginInfo,
  setLoginInfo,
  appiont,
  setAppiont,
  fitness,
  setFitness,
  setsearchSpeacialistByName,
 
) {
  e.preventDefault();

  setactiveInputValue(e.target.value);
  // if (index == 3) {
  //   // alert(5);
  //   setAppiontMentDetails({ ...appiontMentDetails, reason: e.target.value });
  // }

  // if (index == 5) {
  //   // alert(5);
  //   setactiveInputValue(e.target.value);
  // }

  // if (index == 7) {
  //   // alert(5);
  //   setAppiontMentDetails({ ...appiontMentDetails, time: e.target.value });
  // }

  // // if (index == 42) {
  // //   setFitness({ ...fitness, dailyActivities: e.target.value });
  // // }


  if (index == 4) {
    setAccountInfo({ ...accountInfo, firstname: e.target.value });
    console.log(accountInfo.firstname);
  }

  if (index == 6) {
    setAccountInfo({ ...accountInfo, lastname: e.target.value });
  }

  if (index == 8) {
    setAccountInfo({ ...accountInfo, email: e.target.value });
  }

  if (index == 10) {
    setAccountInfo({ ...accountInfo, phone: e.target.value });
  }
  if (index == 12) {
    setactiveInputValue(e.target.value);
  }

  if (index == 16) {
    setAccountInfo({
      ...accountInfo,
      password: e.target.value,
      password_confirmation: e.target.value,
    });

    console.log(accountInfo);
  }

  if (index == 19) {
    setAccountInfo({ ...accountInfo, email: e.target.value });
  }

  if (index == 22) {
    setAccountInfo({ ...accountInfo, phone: e.target.value });
  }

  if (index == 26) {
    // setLoginInfo({ ...loginInfo, email: e.target.value });
    setAccountInfo({ ...accountInfo, email: e.target.value });
    // console.log(loginInfo.email);
    // console.log(loginInfo);
    console.log(e.target.value);
    console.log(loginInfo);
  }

  if (index == 28) {
    // setLoginInfo({ ...loginInfo, password: e.target.value });
    // console.log(loginInfo)

    setAccountInfo({ ...accountInfo, password: e.target.value });
  }
  if (index == 34) {
    setFitness({ ...fitness, height: e.target.value });
  }

  if (index == 36) {
    setFitness({ ...fitness, weight: e.target.value });
  }

  if (index == 38) {
    setFitness({ ...fitness, workOutDays: e.target.value });
  }

  if (index == 40) {
    setFitness({ ...fitness, workOutTime: e.target.value });
  }
  if (index == 44) {
    setFitness({ ...fitness, dailyActivities: e.target.value });
  }

  if (index == 46) {
    setFitness({ ...fitness, sleepGoal: e.target.value });
  }

  if (index == 48) {
    setFitness({ ...fitness, weightGoal: e.target.value });
  }

  if (index == 53) {
    setFitness({
      ...fitness,
      allergies: { ...fitness.allergies, detail: e.target.value },
    });
  }

  if (index == 56) {
    setFitness({
      ...fitness,
      diagnosis: { ...fitness.diagnosis, detail: e.target.value },
    });
  }

  if (index == 59) {
    setFitness({
      ...fitness,
      medication: { ...fitness.medication, detail: e.target.value },
    });
  }

  if (index == 62) {
    setsearchSpeacialistByName(e.target.value);
  }

  /////////////Choosing specialist

  if (index == 65) {
    setAppiontMentDetails({
      ...appiontMentDetails,
      reason: e.target.value,
      description: e.target.value,
    });
    console.log(appiontMentDetails);
  }

  if (index == 67) {
   
    setactiveInputValue(e.target.value)
    console.log(appiont);
  }

  if (index == 69) {
    setAppiont({
      ...appiontMentDetails,
      time: `${e.target.value}`,
    });
    console.log(appiontMentDetails.time);
  }

  
}
