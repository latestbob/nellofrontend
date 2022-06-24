import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// import { getLocalItem } from "../components/helpers/authService";
import jwtDecode from "jwt-decode";
import { httpGet } from "../../helper/httpMethods";
import { hideLoader, showLoader } from "../../helper/loader";
export const UserDataContext = createContext();


// Runned Once
export const UserDataProvider = (props) => {
  const [user, setUser] = useState();
  const [userActive, setUserActive] = useState(false);
  const [count, setCount] = useState(0);
  const [firstTimeLoad, setFirstTimeLoad] = useState(true);
  const [botPaymentStatus, setBotPaymentStatus] = useState(false);
  let token = localStorage.getItem("token");
  useEffect(() => {
    checkUserState();
  }, []);


  //check if token is empty or if token is null or is token is an empty string
  const checkUserState = () => {
    if (token === null || token === undefined || token === "") {
      setUserActive(false);
    } else {
      ValidateToken();
    }
  };


  //validate token check if the token has expired

  const ValidateToken = () => {
    if (jwtDecode(token).exp < Date.now() / 1000) {
      console.log("TOKEN EXPIRED");
      return;
    }
    getUserProfile();
    setUserActive(true);
  };


  //get the profile of the logged in Users using the auth/user api endpoint
  const getUserProfile = async () => {
    showLoader();
    setFirstTimeLoad(true);
    const res = await httpGet(`auth/user`);
    if (res) {
      setFirstTimeLoad(false);
      hideLoader();
      if (res.er) {
        return;
      }
      console.log(res);
      setUser(res.user);
    }
  };
  return (
    <UserDataContext.Provider
      value={{
        userActive,
        checkUserState,
        firstTimeLoad,
        user,
        botPaymentStatus,
      }}
    >
      {props.children}
    </UserDataContext.Provider>
  );
};
