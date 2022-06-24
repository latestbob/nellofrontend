import * as React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppContext from '../../context';
import { Currency } from './../../components';
import moment from 'moment'



export default function CheckoutDone() {
    let location = useLocation();
    let { order } = location.state || { order: {} };

    React.useEffect(() => {

    }, []);

    return (<div class="container">
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
                                    <h2 className="font-weight-normal">invoice<br />
                                        <span class="small">order #1082</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-6">
                                <address>
                                    <strong>Customer:</strong><br />
                                    {order?.firstname} {order?.lastname}<br />
                                    {order?.phone}<br />
                                    {order?.email}<br />
                                </address>
                            </div>
                            <div class="col-6 text-right">
                                <address>
                                    <strong>Delivery:</strong><br />
                                    {order?.delivery_method}:<br />
                                    Farmcity, Lekki 1, Lagos<br />
                                </address>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <address>
                                    <strong>Payment:</strong><br />
                                    Payment Confirmed<br />
                                </address>
                            </div>
                            <div class="col-6 text-right">
                                <address>
                                    <strong>Order Date:</strong><br />
                                    {moment(order?.created_at).format('ll')}
                                </address>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <h3>ORDER SUMMARY</h3>
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
                                            <td><strong>Chelated Cal-mag With 500 Iu Vitamin D3</strong></td>
                                            <td class="text-center">15</td>
                                            <td class="text-right"><Currency value={1000} /></td>
                                            <td class="text-right"><Currency value={15000} /></td>
                                        </tr>

                                        <tr>
                                            <td colspan="3">
                                            </td><td class="text-right"><strong>Total</strong></td>
                                            <td class="text-right"><strong><Currency value={order?.amount} /></strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>);
}