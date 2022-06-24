import * as React from 'react';
import { ErrorMessage } from "@hookform/error-message";


// handle for input changes
const formActions = {
    handleFormChange: (dispatch, e) => {
        const { name, value } = e.target
        dispatch({ type: 'UPDATE_FORM', name, value });
    },


    //handle form clear inputs
    clearForm: (dispatch) => {
        dispatch({ type: 'CLEAR_FORM' });
    },

    //set temporary document Uuid
    setTempDocUuid: (dispatch, tempDocUuid) => {
        dispatch({ type: 'SET_DOC_UUID', tempDocUuid });
    },


    setSubData: (dispatch, SubAppointment, SubService) => {
        dispatch({ type: 'SET_SUB_DATA', SubAppointment, SubService });
    },


    lengthValidate: (getValues, name, msg) => getValues(`${name}`).length ? true : msg,


    //valid Email email in form INPUTS 
    validateEmail: (value, notRequired) => {
        //const value = getValues(name);
        const exp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/

        if (!notRequired && !value) {
            return 'Email address is required!'
        }

        if (!notRequired && value && !exp.test(value)) {
            return 'Email address is not valid!'
        }

        return true;
    },

    //Disable form Inputs 
    
    disableForms: (id, status) => {
        const form = document.getElementById(id);
        const btn = document.querySelector(`#${id} .btn-main`);

        if (form && btn) {
            const allElements = form.elements;
            for (let i = 0, l = allElements.length; i < l; ++i) {
                // allElements[i].readOnly = true;
                if (status)
                    allElements[i].disabled = true;
                else
                    allElements[i].disabled = false;
            }

            const iel = '<span className="btn-loading-icon"><i className="bx bx-spin dripicons-loading"></i></span>';
            if (status) {
                if (!btn.classList.contains('btn-block')) {
                    btn.classList.add('btn-loading-icon-pad');
                }
                btn.insertAdjacentHTML('beforeend', iel);
            } else {
                if (!btn.classList.contains('btn-block')) {
                    btn.classList.remove('btn-loading-icon-pad');
                }
                const rel = document.querySelector(`#${id} .btn-main .btn-loading-icon`);
                if (rel) rel.remove();
            }
        }
    },
}

export default formActions;