import { createContext, useState } from "react";

export const DeliveryPriceContext = createContext({}); //create context

//this controller is used update the deliveryprice.

//default is 2000 naira

export const DeliveryPriceContextProvider = function ({ children }) {

    const [deliverprice, setDeliveryPrice] = useState(1500);


   const value = {
        deliverprice,
    }

    return <DeliveryPriceContext.Provider value={value}> {children} </DeliveryPriceContext.Provider>
}