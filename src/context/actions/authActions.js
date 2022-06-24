import * as React from 'react';

//auth actions.. set data to the localstorage

const authActions = {

    //set user data and user token to the localstorage
    setUserData: (dispatch, userToken, userData) => {
        localStorage.setItem(process.env.REACT_APP_USER_DATA, JSON.stringify(userData));
        localStorage.setItem(process.env.REACT_APP_USER_TOKEN, userToken);
        dispatch({ type: 'LOGIN', userToken, userData });
    },

    //Logout a user and delete stored value from the localstorage
    logoutUser: (dispatch, history) => {
        localStorage.removeItem(process.env.REACT_APP_USER_DATA);
        localStorage.removeItem(process.env.REACT_APP_USER_TOKEN);
        dispatch({ type: 'LOGOUT' });
        history.push('/login');
    },

    //used to update user details on the localstorage.
    updateUserData: (dispatch, userData) => {
        localStorage.setItem(process.env.REACT_APP_USER_DATA, JSON.stringify(userData));
        dispatch({ type: 'UPDATE_USER_DATA', userData });
    },
}

export default authActions;