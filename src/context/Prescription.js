import { createContext, useState } from "react";

export const PrescriptionContext = createContext({}); //create context

//this controller is used update the deliveryprice.

//default is 2000 naira

export const PrescriptionContextProvider = function ({ children }) {

    const [prePrice, setPriPrice] = useState(0);


   const value = {
        prePrice,
        setPriPrice,
    }

    return <PrescriptionContext.Provider value={value}> {children} </PrescriptionContext.Provider>
}