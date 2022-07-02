import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

import ReactToPrint from 'react-to-print';
import { Modal } from 'react-bootstrap'
import moment from 'moment'
import { Currency } from './../../components';
import axios from 'axios';

//import IDCard from './../id-card';
//import './../print.css';

// function getDrugName(drug_id){
//     let drugname;
//    axios.get(`http://127.0.0.1:8000/api/drugname/${drug_id}`)
//       .then(res => {

//         drugname = JSON.stringify(res.data);
       
//        console.log("data", drugname);
//       })

//       return (<p>{drugname}</p>);

      
      
// }





class ComponentToPrint extends React.Component {
    constructor(){
        super();
        this.state = {
            itemss: [],
          };

        
    }
    // componentDidUpdate(){
    //     this.forceUpdate();
    // }
    
    componentDidMount(){

     console.log(this.props.order.id);
    // order/${id}/view

     axios.get(`${process.env.REACT_APP_API_URL}order/${this.props.order.id}/view`)
          .then(res => {
    
           //console.log(res.data);

           this.setState({ itemss: res.data.items })
           console.log(this.state.itemss);
          })
    }
        
    // getDrugName(drug_id){
    // //     let drugname;
    // //    axios.get(`http://127.0.0.1:8000/api/drugname/${drug_id}`)
    // //       .then(res => {
    
    // //         drugname = JSON.stringify(res.data);
           
    // //        console.log("data", drugname);
    // //       })
    
    // //       return drugname;
    
          
          
    // // }
    
    render() {
        const order = this.props.order || {};
        //const order = state?.order;
        //const order = {};
        //console.log(state, 'state...')
       
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
                                                <span class="small">order ref - {order?.order_ref}</span>
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
                                        <h3>ORDER SUMMARY </h3>
                                        <table class="table table-striped">
                                            <thead>
                                                <tr class="line">
                                                    <td width="1%"><strong>#</strong></td>
                                                    <td class="text-left" width="50%"><strong>Description</strong></td>
                                                    <td class="text-center" width="5%"><strong>Qty</strong></td>
                                                    {/* <td class="text-right" width="10%"><strong>Unit Rate</strong></td> */}
                                                    <td class="text-right" width="20%"><strong>Sub Total</strong></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* <tr>
                                                    <td>1</td>
                                                    <td><strong>Chelated Cal-mag With 500 Iu Vitamin D3</strong></td>
                                                    <td class="text-center">15</td>
                                                    <td class="text-right"><Currency value={1000} /></td>
                                                    <td class="text-right"><Currency value={15000} /></td>
                                                </tr> */}

                                                {this.state.itemss.map(function(item, i){
                                                    
                                                   return  (<tr>
                                                   <td>{i + 1}</td>
                                                   {/* {getDrugName(item.drug_id)} */}
                                                  
                                                   
                                                   <td class="text-center">{item?.drug.name}</td>
                                                        {/* <td class="text-right">Drug</td> */}
                                                   <td class="text-center">{item.quantity}</td>
                                                   {/* <td class="text-right"><Currency value={1000} /></td> */}
                                                   <td class="text-right"><Currency value={item.price} /></td>
                                               </tr>);
                                                })}

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
            </div>
        )
    }
}

class PrintID extends React.Component {

  

    render() {
        const order = this.props.location?.state?.order;
        //const order = state?.order;
        console.log(order, 'state...')
        return (
            <>
                <div className="display-none">
                    <ComponentToPrint
                        order={order}
                        ref={(el) => (this.componentRef = el)}
                        />
                </div>
                <div class="content-body container-done">
                    <div class="container-width-sm container-done-wrapper">
                        <i class="fal fa-check-circle"></i>
                        <h1>Payment Successful</h1>
                        <h3 class="text-sky">THANK YOU FOR YOUR ORDER!!</h3>
                        <p>Payment Details has been sent to your email for the records.</p>
                        <div>
                            <Link to="/account/my-orders" class="btn btn-secondary btn-inverse" role="button">View Orders</Link>
                            <ReactToPrint
                                trigger={() => (<button className="btn btn-secondary"
                                    type="button">Download Receipt</button>)}
                                content={() => this.componentRef}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default PrintID
