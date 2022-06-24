import React, { createContext, useState, useEffect } from "react";

export const AppData = createContext();

export const UserDataProvider = (props) => {
  const [paymentSuccess, setpaymentSuccess] = useState(false);

  
 
  return (
    <UserDataContext.Provider value={{paymentSuccess}}>
      {props.children}
    </UserDataContext.Provider>
  );
};
