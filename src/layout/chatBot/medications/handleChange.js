import moment from "moment";
import React from "react";
export default function medicationHandleChange(
  e,
  index,
  accountInfo,
  setAccountInfo,
  appiont,
  setAppiont,
  fitness,
  setFitness,
  loginInfo,
  setLoginInfo,
  setactiveInputValue,
  setsearchSpeacialistByName,
  getAllMedication
) {
  e.preventDefault();

  setactiveInputValue(e.target.value);
  if (index == 1 || index == 6) {
    getAllMedication(e.target.value)
  }

  // if (index == 42) {
  //   setFitness({ ...fitness, dailyActivities: e.target.value });
  // }


}