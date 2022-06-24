import * as React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import AppContext from '../../context';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import { Currency } from './../../components';


class Print extends React.Component {
    render() {
        const data = this.props.data || {};
        const userData = this.props.userData || {};
        return (
            <div className="container">
                <div className="row">

                    <div className="col-12">
                        <div className="grid invoice">
                            <div className="grid-body">
                                <div className="invoice-title">
                                    <div className="row">
                                        <div className="col-12">
                                            <img src="./assets/images/logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-12">
                                            <h2 className="font-weight-normal">Appointment Acknowledgement<br />
                                                {/* <span className="small">appointment #{data?.refrence}</span> */}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className="mb-4">
                                    <address>
                                        <strong>Customer</strong><br />
                                        {userData?.firstname} {userData?.lastname}<br />
                                        {userData?.phone}<br />
                                        {userData?.email}
                                    </address>
                                </div>
                                <div>
                                    <address>
                                        <strong>Appointment</strong><br />
                                        {data?.doctor}<br />
                                        at {moment(data?.date, 'YYYY-MM-DD').format('dddd, MMMM DD, YYYY')} {moment(data?.time, 'h:mm a').format('h:mm a')}
                                    </address>
                                </div>



                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default function AppointmentDone() {
    const { dispatch, userData } = React.useContext(AppContext);

    let location = useLocation();
    let history = useHistory();
    let { appointment } = location.state || { appointment: false };

    const componentRef = React.useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    React.useEffect(() => {
        if (!appointment) {
            history.replace('/');
        }
    }, [appointment, history]);

    return (<div className="content-body container-done appointment">
        {appointment && (<div className="container-width-sm container-done-wrapper">
        <div className="display-none"><Print data={appointment} userData={userData} ref={componentRef} /></div>
            <i className="fal fa-check-circle"></i>
            <h1>Appointment Successful</h1>
            <p className="text-mix-sec">You have scheduled an appointment with
                <span><u> {appointment?.doctor}</u></span> on
                <span> <u>{moment(appointment?.date, 'YYYY-MM-DD').format('dddd, MMMM DD, YYYY')}</u> </span>
                by
                <span> <u>{moment(appointment?.time, 'h:mm a').format('h:mm a')}</u></span>
            </p>
            <div className="dashed-top-box">
                <div className="flex-space-middle-">
                    <Link to="/account/appointments" className="btn btn-secondary btn-inverse btn-sm" role="button">View Appointments</Link>
                    <button type="button" onClick={handlePrint} className="btn btn-secondary btn-sm">
                        Download Acknowledgement
                    </button>
                </div>
            </div>
        </div>)}
    </div>);
}