import * as React from 'react';


// these are the initials of the web variables
export const initialState = {
    baseUrl: process.env.REACT_APP_BASE_URL,
    pageTitle: process.env.REACT_APP_TITLE,
    userData: null,
    userToken: null,
    appIsReady: false,
    formValues: {},
    modalTitle: '',
    formActionType: 1,
    stateData: null,
    currentPath: '',
    showPageTitle: true,
    cartSessionId: null,
    cartItems: [],
    cartStatus: true,
    cartError: null,
    tempDocUuid: null,
    healthInterests: ["Calories", "Diet & Nutrition", "Work Out", "Sleep", "Meditation",
        "Weight Loss", "Healthy Food", "Exercises", "Yoga", "Anaerobic"],
    SubService: null,
    SubAppointment: null,
    rcc: false,
    prescriptionRequested: false,
};

export const AppReducer = (initialState, action) => {
    switch (action.type) {
        case "APP_READY": {
            return {
                ...initialState,
                appIsReady: true,
                userToken: action.userToken,
                userData: action.userData,
                cartSessionId: action.cartSessionId,
                prescriptionRequested: action.prescriptionRequested,
            };
        }
        case "LOGIN": {
            return {
                ...initialState,
                userToken: action.userToken,
                userData: action.userData,
            };
        }
        case "LOGOUT":
            return {
                ...initialState,
                userToken: null,
                userData: null,
            };
        case "UPDATE_USER_DATA":
            return {
                ...initialState,
                userData: action.userData
            };
        case "UPDATE_FORM":
            const name = action.name;
            const value = action.value;
            let { formValues } = initialState;
            formValues = { ...formValues, [name]: value };
            return {
                ...initialState,
                formValues
            };
        case "CLEAR_FORM":
            return {
                ...initialState,
                formValues: {}
            };
        case "SET_STATE":
            const stateName = action.name;
            const stateValue = action.value;
            return {
                ...initialState,
                [stateName]: stateValue
            };
        case "SET_PAGE_TITLE":
            return {
                ...initialState,
                pageTitle: action.title,
            };
        case "SET_PATH_NAME":
            return {
                ...initialState,
                currentPath: action.pathname,
            };
        case "SHOW_PAGE_TITLE":
            return {
                ...initialState,
                showPageTitle: action.showPageTitle,
            };
        case "SET_CART_SESSION_ID":
            return {
                ...initialState,
                cartSessionId: action.cartSessionId,
            };
        case "SET_CART_ITEMS":
            return {
                ...initialState,
                cartItems: action.cartItems,
                cartStatus: action.cartStatus,
                cartError: action.cartError,
            };
        case "SET_DOC_UUID":
            return {
                ...initialState,
                tempDocUuid: action.tempDocUuid,
            };
        case "SET_SUB_DATA":
            return {
                ...initialState,
                SubService: action.SubService,
                SubAppointment: action.SubAppointment,
            };
        case "SET_PRESC":
            return {
                ...initialState,
                prescriptionRequested: action.prescriptionRequested,
            };
        default:
            return initialState;
    }
};