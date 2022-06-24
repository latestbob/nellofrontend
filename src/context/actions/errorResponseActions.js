import * as React from 'react';
import commonActions from './commonActions';


// handle all error responses

const errorResponseActions = {
    errorResponse: ({ error, exclude = [], history = null, dispatch = null, state = {} }) => {
        if (!exclude.includes(999)) {
            //errorResponse: (error, exclude = [], history = null) => {
            let errorHeader, errMsg, errCode;

            if (error?.response?.status === undefined) {
                if (error?.message === 'Network Error') {
                    if (!navigator.onLine) {
                        errorHeader = 'Connectivity Error';
                        errMsg = 'No internet connectivity, please check and try again!';
                        errCode = `ERR_G1000`;
                    } 
                    else {
                        errorHeader = 'Error Notification';
                        errMsg = 'Can not process request, please retry or reload page!';
                        errCode = `ERR_G1002`;
                    }
                } else if (error?.code === 'ECONNABORTED') {
                    errorHeader = 'Error Notification!';
                    errMsg = 'Can not process request, please retry.';
                    errCode = `ERR_T29`;
                } else {
                    errorHeader = 'Error Notification!';
                    errMsg = 'Can not process request, please retry.';
                    errCode = `ERR_S31`;
                }

                //Alert.alert(errorHeader, errMsg);
                //alert(`${errorHeader}\n${errMsg}`)
                commonActions.notify('danger', errorHeader, errMsg);
                return;
            }

            const errors = error?.response?.data;
            const status = error?.response?.status;
            const { msg, errorCode } = errors;
            switch (status) {
                case 0:
                    if (!exclude.includes(0)) {
                        if (error.message === 'Network Error') {
                            if (!navigator.onLine) {
                                errorHeader = 'Connectivity Error';
                                errMsg = 'No connectivity, please check your internet and try again!';
                                errCode = `ERR_G1003`;
                            } else {
                                errorHeader = 'Error Notification';
                                errMsg = 'An error occurred, please retry!';
                                errCode = `ERR_G1004`;
                            }
                        }
                    }
                    break;
                case 401:
                case 403:
                    /* TODO: Sign out */
                    if (!exclude.includes(401) && !exclude.includes(403)) {
                        //console.log(exclude.includes(403), '401....')
                        localStorage.removeItem(process.env.REACT_APP_USER_DATA);
                        localStorage.removeItem(process.env.REACT_APP_USER_TOKEN);
                        localStorage.removeItem(process.env.REACT_APP_USER_TOKEN_EXP);
                        dispatch({ type: 'LOGOUT' });
                        history.replace({ pathname: '/login', state });
                        return;
                    }
                    commonActions.notify('danger', 'Authentication Error', 'Invalid email/password!');
                    return;
                case 422:
                    if (!exclude.includes(422)) {
                        let listMsg = '';
                        const listErrors = errors.errors;

                        for (const error in listErrors) {
                            //console.log(listErrors[error][0], 'listErrors...')
                            listMsg = listMsg + `<p>${listErrors[error][0]}</p>`;
                        }

                        errorHeader = 'Validation Error';
                        const s = listErrors.length > 0 ? 's' : '';
                        errMsg = `The following error${s} occurred:`;
                        errMsg += listMsg;
                    } else {
                        return true;
                    }

                    break;

                case 404:
                case 405:
                    errorHeader = 'Error Notification';
                    errMsg = "An error occurred, please retry!";
                    errCode = status === 404 ? 9104 : 9105;
                    break;
                case 400:
                    if (exclude.includes(400)) {
                        return { status: error?.response?.status, msg, errorCode };
                    } else {
                        errorHeader = 'Error Notification';
                        errCode = errorCode ? errorCode : null;
                        if (msg) {
                            errMsg = msg;
                        } else {
                            errMsg = "An error occurred, please retry!";
                            errCode = `ERR_S5100`;
                        }
                    }
                    break;
                case 500:
                    if (exclude.includes(500)) {
                        return { status: error?.response?.status, msg, errorCode };
                    } else {
                        errorHeader = 'Error Notification';
                        errCode = errorCode ? errorCode : null;
                        if (msg) {
                            errMsg = msg;
                        } else {
                            errMsg = "An error occurred, please retry!";
                            errCode = `ERR_S5100`;
                        }
                    }
                    break;
                default:
                    errorHeader = 'Error Notification';
                    errMsg = "An error occurred, please retry!";
                    errCode = `ERR_D5100D`;
            }

            if (errorHeader && errMsg)
                //alert(errorHeader, errCode ? `${errMsg} (${errCode})` : errMsg);
                commonActions.notify('danger', errorHeader, errMsg);
        }

    },
}

export default errorResponseActions;