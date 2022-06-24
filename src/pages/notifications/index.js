import * as React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import AppContext from '../../context';
import moment from 'moment';


export default function AppointmentDone() {

    let location = useLocation();
    let history = useHistory();
    let { appointment, data } = location.state || { appointment: false, data: null };

    React.useEffect(() => {
        if (!appointment) {
            //history.replace('/');
        }
    }, [history]);

    return (<div class="content-body container-done appointment">
        {history && (<div class="container-width-sm container-done-wrapper">
            <i class="fal fa-check-circle"></i>
            {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
            <h1>Appointment Successful</h1>
            <p className="text-mix-sec">You have scheduled an appointment with
                <span><u> {appointment?.doctor}</u></span> on 
                <span> <u>{moment(appointment?.date, 'YYYY-MM-DD').format('dddd, MMMM DD, YYYY')}</u> </span>
                by
                <span> <u>{moment(appointment?.time, 'h:mm a').format('h:mm a')}</u></span>
            </p>
            <div className="dashed-top-box">
                <div className="flex-space-middle-">
                    <Link to="/" class="btn btn-secondary btn-inverse btn-sm" role="button">Return to Home</Link>
                    <button class="btn btn-secondary btn-sm">
                        Download Acknowledgement
                    </button>
                </div>
            </div>
        </div>)}
    </div>);
}