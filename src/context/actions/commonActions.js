import * as React from 'react';
import { useLocation } from "react-router-dom";
import moment from 'moment';
import { store } from 'react-notifications-component';
import { initialState } from './../reducer';




const commonActions = {
    linkBaseUrl: (link) => initialState.baseUrl + link,
    setPageTitle: (dispatch, title) => dispatch({ type: 'SET_PAGE_TITLE', title }),
    togglePageTitle: (dispatch, showPageTitle = true) => dispatch({ type: 'SHOW_PAGE_TITLE', showPageTitle }),
    setCurrentPath: (dispatch, pathname) => dispatch({ type: 'SET_PATH_NAME', pathname }),
    setNA: (string) => string ? string : <span className="text-muted">N/A</span>,
    setQueryString: (query) => {
        query = Object.keys(query).length === 0 && query.constructor === Object ? '' :
            '?' + Object.keys(query).map(key => key + '=' + query[key]).join('&');
        return query;
    },
    useQueryString: () => {
        return new URLSearchParams(useLocation().search);
    },
    setStateData: (dispatch, name, value) => {
        dispatch({ type: 'SET_STATE', name, value });
    },
    emailRegex: (email) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    },
    formatDate: (date, dateFormat = "ll") => moment(date).format(dateFormat),
    momentAgo: (date) => moment(date).fromNow(),
    formatDateBr: (date) => <>{moment(date).format('ll')}<br />{moment(date).format('LT')}</>,
    //formatDateBr: (date) => `${moment(date).format('ll')}<br/>${moment(date).format('LT')}`,
    notify: (type, title, message) => {
        store.addNotification({
            title,
            message: (<div dangerouslySetInnerHTML={{ __html: message }} />),
            type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                showIcon: true,
                duration: 4000,
                onScreen: true,
                pauseOnHover: true
            }
        });
    },
    checkObject: (obj) => obj && Object.entries(obj).length > 0,
    itsObject: (obj) => obj && Object.entries(obj).length > 0,
    checkArray: (obj) => obj && Array.isArray(obj) && obj.length > 0,
    itsArray: (obj) => obj && Array.isArray(obj),
    capitalize: (str) => {
        if (str) {
            str = String((str).trim());
            return str
                .split(' ')
                .map(word => {
                    let string = word.toLowerCase();
                    string = string[0].toUpperCase() + string.slice(1);
                    return string;
                })
                .join(' ');
        }

        return str;
    },
    dataURItoBlob: (dataURI) => {
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        let ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    },
    randomString: (length = 8) => {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    selectDays: () => {
        return [...Array(31)].map((_, i) => <option value={i + 1}>{i + 1}</option>);
    },
    selectMonths: () => {
        const months = [
            { value: 1, label: 'January' },
            { value: 2, label: 'Febuary' },
            { value: 3, label: 'March' },
            { value: 4, label: 'April' },
            { value: 5, label: 'May' },
            { value: 6, label: 'June' },
            { value: 7, label: 'July' },
            { value: 8, label: 'August' },
            { value: 9, label: 'September' },
            { value: 10, label: 'October' },
            { value: 11, label: 'November' },
            { value: 12, label: 'December' }
        ]
        //const months = []
        const dateStart = moment()
        const dateEnd = moment().add(12, 'month')
        while (dateEnd.diff(dateStart, 'months') >= 0) {
            months.push(dateStart.format('M'))
            dateStart.add(1, 'month')
        }
        return months
    },
    getCartSessionId: (dispatch) => {
        let cartSessionId = localStorage.getItem(process.env.REACT_APP_CART_SESSION_ID) || commonActions.randomString(32);
        dispatch({ type: 'SET_CART_SESSION_ID', cartSessionId });
        localStorage.setItem(process.env.REACT_APP_CART_SESSION_ID, cartSessionId);
        return cartSessionId;
    },
    shortStr: (str) => {
        if (str.length > 20) {
            const prefix = (str).substr(0, 7);
            const suffix = (str).substr(-8);
            return `${prefix}...${suffix}`
        } else {
            return str;
        }
    },
    getInitials: (firstname, lastname) => {
        const init = `${(firstname).toUpperCase().substr(0, 1)}${(lastname).toUpperCase().substr(0, 1)}`;
        return init;
    },
}

export default commonActions;