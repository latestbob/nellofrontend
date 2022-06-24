



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
            <div class="container">
                <div class="row">

                    <div class="col-12">
                        <div class="grid invoice">
                            <div class="grid-body">
                                <div class="invoice-title">
                                    <div class="row">
                                        <div class="col-12">
                                            <img src="./assets/images/logo.svg" alt="" />
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-12">
                                            <h2 className="font-weight-normal">receipt<br />
                                                <span class="small">receipt #{data?.refrence}</span>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-6">
                                        <address>
                                            <strong>Customer</strong><br />
                                            {userData?.firstname} {userData?.lastname}<br />
                                            {userData?.phone}<br />
                                            {userData?.email}
                                        </address>
                                    </div>
                                    <div class="col-6 text-right">
                                        <address>
                                            <strong>Subscription</strong><br />
                                            from <strong>{moment(data?.start_date).format('ll')}</strong> to <strong>{moment(data?.expiration_date).format('ll')}</strong>
                                        </address>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <address>
                                            <strong>Payment</strong><br />
                                            Payment Confirmed<br />
                                        </address>
                                    </div>
                                    <div class="col-6 text-right">
                                        <address>
                                            <strong>Date</strong><br />
                                            {moment(data?.created_at).format('ll')}
                                        </address>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h3>SUMMARY</h3>
                                        <table class="table table-striped">
                                            <thead>
                                                <tr class="line">
                                                    <td width="1%"><strong>#</strong></td>
                                                    <td class="text-left" width="50%"><strong>Description</strong></td>
                                                    <td class="text-center" width="5%"><strong>Qty</strong></td>
                                                    <td class="text-right" width="10%"><strong>Unit Rate</strong></td>
                                                    <td class="text-right" width="20%"><strong>Sub Total</strong></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td><strong>Subscription</strong></td>
                                                    <td class="text-center">1</td>
                                                    <td class="text-right"><Currency value={data?.sub_amount} /></td>
                                                    <td class="text-right"><Currency value={data?.sub_amount} /></td>
                                                </tr>

                                                <tr>
                                                    <td colspan="3">
                                                    </td><td class="text-right"><strong>Total</strong></td>
                                                    <td class="text-right"><strong><Currency value={data?.total} /></strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default function SubscriptionDone() {
    const { dispatch, userData } = React.useContext(AppContext);

    let location = useLocation();
    let history = useHistory();
    let { appointment, service, data } = location.state || { appointment: null, service: null, data: {} };
    const [goto, setGoto] = React.useState({ pathname: `/account` });
    const [linkText, setLinkText] = React.useState('Go to Account');
    
    const componentRef = React.useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    React.useEffect(() => {
        if (!service) {
            history.replace('/');
        }

        if (service === 'doctor') {
            setGoto({ pathname: `/doctor/${appointment}/appointment` })
            setLinkText('Continue to Appointment');
        }

        if (service === "doctor-md") {
            console.log(appointment, service, 'sub done service....');
            setGoto({ pathname: `/appointment` });
            setLinkText('Continue to Appointment');
        }

        if (service === 'fitness') {
            setGoto({ pathname: `/fitness` });
            setLinkText('Continue to Fitness');
        }


    }, [service, history, appointment]);

    return (<div class="content-body container-done appointment">
        {history && (<div class="container-width-sm container-done-wrapper">
            <i class="fal fa-check-circle"></i>
            <div className="display-none"><Print data={data} userData={userData} ref={componentRef} /></div>
            <h1>Subscription Successful</h1>
            <p className="text-mix-sec">
                Your subscription is successful
            </p>
            <div className="dashed-top-box">
                <div className="flex-space-middle-">
                    <Link to={goto} class="btn btn-secondary btn-inverse btn-sm" role="button">{linkText}</Link>
                    <button type="button" class="btn btn-secondary btn-sm" onClick={handlePrint}>
                        Download Receipt
                    </button>
                </div>
            </div>
        </div>)}
    </div>);
}