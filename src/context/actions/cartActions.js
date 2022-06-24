import * as React from 'react';
import { cartAdd, carts } from '../../Services';
import { errorResponseActions, commonActions } from './index';

//import commonActions from './commonActions';
//import errorResponseActions from './errorResponseActions';




//cart actions 


//set Add Cart,, Add Items to carts,,,


const cartActions = {
    setAddCart: async (dispatch, data) => {
        const cartSessionId = commonActions.getCartSessionId(dispatch);

        return cartAdd({ ...data, cart_uuid: cartSessionId }).then(cartItems => {
            dispatch({ type: 'SET_CART_ITEMS', cartItems });
            return cartItems;
        }).catch(error => errorResponseActions.errorResponse({ error }))
    },

    // get Cart Items

    getCartItems: async (dispatch) => {
        const cartSessionId = commonActions.getCartSessionId(dispatch);
        return carts(cartSessionId).then(cartItems => {
            console.log(cartItems, 'cartItems...');
            dispatch({ type: 'SET_CART_ITEMS', cartItems });
            return cartItems;
        }).catch(error => errorResponseActions.errorResponse({ error }))
            //.then(() => toggleFormState(false));
    },

    //Update Cart Items
    updateCartItem: async (dispatch, id, qty) => {
        const cartSessionId = commonActions.getCartSessionId(dispatch);
        return carts(cartSessionId).then(cartItems => {
            console.log(cartItems, 'cartItems...');
            dispatch({ type: 'SET_CART_ITEMS', cartItems });
            return cartItems;
            //const { token, user } = response;
            //setUserData(dispatch, token, user);
        }).catch(error => errorResponseActions.errorResponse({ error }))
            //.then(() => toggleFormState(false));
    },

    // Handle Prescriptions 
    setRequestPresription: async (dispatch, prescriptionRequested) => {
        localStorage.setItem(process.env.REACT_APP_USER_PRESC, JSON.stringify(prescriptionRequested));
        dispatch({ type: 'SET_PRESC', prescriptionRequested });
    },
}

export default cartActions;