import * as React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import AppContext from '../../context';
import { Checkbox, Radio } from 'pretty-checkbox-react';
import { useForm } from "react-hook-form";
import { Currency, ItemQtyUpdate, StepsIndicator, ErrorMsg } from './../../components';
import { PaystackButton } from 'react-paystack';



export default function CheckoutDone() {
    let location = useLocation();
    let history = useHistory();
    let { order } = location.state;

    React.useEffect(() => {
        if (!order)
            history.push('/');
    }, []);

    return (<div class="content-body container-done">
        <div class="container-width-sm container-done-wrapper">
            <i class="fal fa-check-circle"></i>
            <h1>Payment Successful</h1>
            <h3 class="text-sky">THANK YOU FOR YOUR ORDER!!</h3>
            <p>Payment Details has been sent to your email for the records.</p>
            <div>
                <Link to="/account/orders" class="btn btn-secondary btn-inverse" role="button">View Orders</Link>
                <button class="btn btn-secondary">Download Receipt</button>
            </div>
        </div>
    </div>);
}