import React from 'react'
import ReactToPrint from 'react-to-print'
import { Modal } from 'react-bootstrap'
import moment from 'moment'

//import IDCard from './../id-card';
//import './../print.css';

class ComponentToPrint extends React.Component {
    render() {
        /* const {
          first_name,
          middle_name,
          last_name,
          address,
          gender,
          phone,
          lga,
          state,
          insurance_id,
          package: packageDetails,
          picture,
          subscriptions,
        } = this.props.data
        const subscription =
          subscriptions && subscriptions.length > 0 && subscriptions.pop() */
        return (
            <div className="print-container">

            </div>
        )
    }
}

class PrintID extends React.Component {

    render() {
        const { state } = this.props.location;
        console.log(state, 'state...')
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
                                            <h2 className="font-weight-normal">invoice<br />
                                                {/* <span class="small">order #1082</span> */}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-6">
                                        <address>
                                            <strong>Billed To:</strong><br />
                                            Twitter, Inc.<br />
                                            795 Folsom Ave, Suite 600<br />
                                            San Francisco, CA 94107<br />
                                            <abbr title="Phone">P:</abbr> (123) 456-7890
                                        </address>
                                    </div>
                                    <div class="col-6 text-right">
                                        <address>
                                            <strong>Shipped To:</strong><br />
                                            Elaine Hernandez<br />
                                            P. Sherman 42,<br />
                                            Wallaby Way, Sidney<br />
                                            <abbr title="Phone">P:</abbr> (123) 345-6789
                                        </address>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <address>
                                            <strong>Payment Method:</strong><br />
                                            Visa ending **** 1234<br />
                                            h.elaine@gmail.com<br />
                                        </address>
                                    </div>
                                    <div class="col-6 text-right">
                                        <address>
                                            <strong>Order Date:</strong><br />
                                            17/06/14
                                        </address>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h3>ORDER SUMMARY</h3>
                                        <table class="table table-striped">
                                            <thead>
                                                <tr class="line">
                                                    <td><strong>#</strong></td>
                                                    <td class="text-center"><strong>PROJECT</strong></td>
                                                    <td class="text-center"><strong>HRS</strong></td>
                                                    <td class="text-right"><strong>RATE</strong></td>
                                                    <td class="text-right"><strong>SUBTOTAL</strong></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td><strong>Template Design</strong><br />A website template is a pre-designed webpage, or set of webpages, that anyone can modify with their own content and images to setup a website.</td>
                                                    <td class="text-center">15</td>
                                                    <td class="text-center">$75</td>
                                                    <td class="text-right">$1,125.00</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td><strong>Template Development</strong><br />Web development is a broad term for the work involved in developing a web site for the Internet (World Wide Web) or an intranet (a private network).</td>
                                                    <td class="text-center">15</td>
                                                    <td class="text-center">$75</td>
                                                    <td class="text-right">$1,125.00</td>
                                                </tr>
                                                <tr class="line">
                                                    <td>3</td>
                                                    <td><strong>Testing</strong><br />Take measures to check the quality, performance, or reliability of (something), especially before putting it into widespread use or practice.</td>
                                                    <td class="text-center">2</td>
                                                    <td class="text-center">$75</td>
                                                    <td class="text-right">$150.00</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3"></td>
                                                    <td class="text-right"><strong>Taxes</strong></td>
                                                    <td class="text-right"><strong>N/A</strong></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3">
                                                    </td><td class="text-right"><strong>Total</strong></td>
                                                    <td class="text-right"><strong>$2,400.00</strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 text-right identity">
                                        <p>Designer identity<br /><strong>Jeffrey Williams</strong></p>
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

export default PrintID
