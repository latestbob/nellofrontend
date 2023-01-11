import * as React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { subscriptionsWithDoctor, doctorCategories } from '../../Services';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import AppContext from '../../context';
import { PlaceholderStatus, ErrorMsg } from './../../components';
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';
import { makeAppointment } from '../../Services';
import useFormState from './../../hooks/useFormState';

import SearchBarSvg from './../../svg/search-bar-svg';
import SquareRadiusSvg from './../../svg/square-radius-svg';
import TimeSvg from './../../svg/time-svg';
// import { PaystackButton } from 'react-paystack';
import axios from 'axios';

import { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import Swal from 'sweetalert2';
import { showLoader, hideLoader } from '../../helper/loader';

export default function HealthAppointmentPay({ history }) {
    const { dispatch, baseUrl, errorResponse, userData, currentPath } = React.useContext(AppContext);
   
    

   

    const { isLoading: isLoadingSub, isFetching, refetch, isError: isErrorSub }
    = useQuery(['doctor-appointment'], () => subscriptionsWithDoctor(), {
        onError: (error) => errorResponse({ dispatch, error, history, state: { from: currentPath } }),
       
    });



    


    let location = useLocation();
    

   

    const [date,setDate]=useState("");
    const [time,setTime ]=useState("");
  
    
    const [username,setUsername]=useState("");
    const [useremail,setUserEmail]=useState("");
    const [usergender, setUserGender]=useState("");
    const [user_uuid , setUserUuid]=useState("");

    //medical centers details


    const [center_name,setCenterName]=useState("");
    const [center_email,setCenterEmail]=useState("");
    const [center_type,setCenterType]=useState("");
    const [center_address,setCenterAddress]=useState("");
    const [center_uuid,setCenterUuid]=useState("");
    const [center_fee,setCenterFee]=useState("");
    const [reason,setReason]=useState("");





    React.useEffect(()=>{
       
        setDate(moment(location.state.date).format('YYYY-MM-DD'));
        setTime(location.state.time);
       
        setUsername(location.state.username);
        setUserEmail(location.state.useremail);
        setUserGender(location.state.usergender);
        setUserUuid(location.state.user_uuid);
      
        //center and reason 
           
        // const [center_name,setCenterName]=useState("");
        // const [center_email,setCenterEmail]=useState("");
        // const [center_type,setCenterType]=useState("");
        // const [center_address,setCenterAddress]=useState("");
        // const [center_uuid,setCenterUuid]=useState("");
        // const [center_fee,setCenterFee]=useState("");
        // const [reason,setReason]=useState("");
    

        setCenterName(location.state.center_name);
        setCenterEmail(location.state.center_email);
        setCenterType(location.state.center_type);
        setCenterAddress(location.state.center_address);
        setCenterUuid(location.state.center_uuid);
        setCenterFee(location.state.center_fee);
        setReason(location.state.reason);
        

        
    })

    //Token


    //paystack script Here

     
const config = {
    reference: (new Date()).getTime(),
    //email:useremail,

    email:useremail,
    amount: center_fee * 100,
    publicKey: 'pk_live_c98b318b0a6960d258c3ea7ce676e804714b95eb',

    
    metadata: {
        
        date:date,
        time:time,
        
        username:username,
        useremail:useremail,
        usergender:usergender,
        user_uuid:user_uuid,

       

        center_name:center_name,
        center_email:center_email,
        center_type:center_type,
        center_address:center_address,
        center_uuid:center_uuid,
        center_fee:center_fee,
        reason:reason,
    
        
        

    },
  };
  
  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    

        //call the axios get response to the Api to verify payment

     console.log(reference);

        if(reference.message == "Approved"){

            console.log(reference.reference);

            showLoader();
            
    axios.get(`${process.env.REACT_APP_API_URL}appointments/verify/${reference.reference}`,{
        

    }).then(response => {
        console.log(response);


  
        //Check is the reference payment is Verified

        if(response.data.data.status == "success"){

            console.log(response.data.data.metadata);
            console.log(response.data.data.amount);


            // Add the Appoiment Meta Details to the database using a Post Request


            
                axios.post(`${process.env.REACT_APP_API_URL}appointments/hospital/completebook`,{
                        
                //request body here to complete appointment process
            user_uuid : response.data.data.metadata.user_uuid,
            date : response.data.data.metadata.date,
            time: response.data.data.metadata.time,
            ref_no : reference.reference,
            type:response.data.data.metadata.center_type,
            username:username,
        useremail:response.data.data.metadata.useremail,
        usergender:response.data.data.metadata.usergender,
        center_name:response.data.data.metadata.center_name,
        center_email:response.data.data.metadata.center_email,
        center_address:response.data.data.metadata.center_address,
        center_uuid:response.data.data.metadata.center_uuid,
        reason:response.data.data.metadata.reason,
        amount:response.data.data.amount / 100,
    
                
            

                }).then(response => {

                    hideLoader();
                    console.log(response)
                    console.log(response.data.status);
                    
                    if(response.data.status == true){
                        Swal.fire(
                            'Appointment Scheduled',
                            'Kindly Download Acknowledgement Slip',
                            
                            'success'
                          )
              
              
                          history.replace('/account/appointments');
                    }
  
         
                }).catch(error => {
                    console.log(error)
                })
  
  
  
            


        }




        



        //Return the User to the appointment done Page
        
    }).catch(error => {
        console.log(error)
    })
  
  
  

        }


    
  };
  
  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }
  
  const componentProps = {
    ...config,
    text: 'Complete Checkout',
    onSuccess: (reference) => onSuccess(reference),
    onClose: onClose,
  };


    


    //End of Paystack Button Script


    


    const PageLoading = () =>
        <div className="p-5">
            <div className="mb-4">
                <SearchBarSvg />
            </div>

            <div className="appointment-box">
                <div className="row">
                    <div class="col-md-6">
                        <SquareRadiusSvg />
                    </div>
                    <div class="col-md-6">
                        <TimeSvg />
                    </div>
                </div>
            </div>
        </div>

   


   

    //USER APPOINTMENT STATE DETAILS HERE

   


    //DOCTOR APPOINTMENT STATE DETAILS HERE



    return (<>
        {isLoadingSub ? <PageLoading /> : <>


            {/* {isErrorSub && (<div className="p-5">
                <PlaceholderStatus onClick={refetch} />
            </div>)} */}


          <>
                <div class="account-badge-container">
                    <div class="container-width-sm">
                        <h3>Complete  Appointment Process </h3>
                        {/* <div class="doc-mini-container">
                            <div class="dmc-image-box">
                                <img src="./../../assets/images/doc-1.png" alt="" />
                            </div>
                            <div class="dmc-content-box">
                                <div class="dmc-1">DR. {doctor?.firstname} {doctor?.lastname}</div>
                                <div class="dmc-2">{doctor?.aos}</div>
                                <div class="dmc-3">{doctor?.vendor?.name}</div>
                                <div class="dmc-4">
                                    <i class="la la-star"></i>
                                    <i class="la la-star"></i>
                                    <i class="la la-star"></i>
                                    <i class="la la-star"></i>
                                    <i class="la la-star"></i>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="container content-body container-layout">
                   
                        <div className="appointment-box">
                            <div className="row">
                                <div class="col-md-6">
                                <div class="ma-side">
                  <div class="ma-side-content">
                    <img src="http://asknello.com:5500/assets/images/img-ldy.svg" alt="" />
                    <img src="http://asknello.com:5500/assets/images/logo-w-isp.svg" alt="" />

                    <p style={{
                        fontWeight:"bold",
                        fontStyle:"italic"
                    }}>
                     Complete checkout to secure <br/> 
                     an appointment with {center_name}.
                     
                    </p>
                  </div>
                </div>
                                  
                                   
                                </div>




                                <div class="col-md-6">
                                    <h2 className="font-weight-medium display-block
                    text-secondary mb-3 font-size-14 text-center ">Appointment Details </h2>
                                 
                                   <div className="table-responsive">
                                        <table className='table table-striped'>
                                            <tbody>
                                                <tr>
                                                    <td>Appointment Date</td>
                                                    <td>{moment(date).format('dddd, MMMM DD, YYYY')}</td>
                                                </tr>

                                                <tr>
                                                    <td>Appointment Time</td>
                                                    <td>{moment(time, 'h:mm a').format('h:mm a')}</td>
                                                </tr>

                                                <tr>
                                                    <td>Name</td>
                                                    <td>{center_name}</td>
                                                </tr>

                                                <tr>
                                                    <td>Type</td>
                                                    <td style={{
                                                        textTransform:"capitalize"
                                                    }}>{center_type}</td>
                                                </tr>

                                                
                                             
                                               

                                                <tr>
                                                    <td>Reason</td>
                                                    <td>{reason}</td>
                                                </tr>

                                              

                                                
                                              

                                              

                                                <tr>
                                                    <td><h4>Fee</h4></td>
                                                    <td><h3>N {center_fee}</h3></td>
                                                </tr>





                                                
                                                  

                                                    {/* <tr>
                                                        <td>User UUID</td>

                                                        <td>{location.state.user_uuid}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Doctor Id</td>

                                                        <td>{location.state.doctor_id}</td>
                                                    </tr> */}

                                                    {/* <tr>
                                                        <td>Doctor's Email</td>

                                                        <td>{location.state.doctormail}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Username</td>

                                                        <td>{location.state.username}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Username Email</td>

                                                        <td>{location.state.useremail}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Username Gender</td>

                                                        <td>{location.state.usergender}</td>
                                                    </tr> */}





                                              

                                                
                                            </tbody>

                                        </table>

                                                        <div className="text-center">

                                                        <PaystackButton
                                                            className="btn btn-primary btn-arrow btn-lg btn-main"
                                                            {...componentProps}
                                                        />

                                                        </div>
                                   </div>
                                

                                </div>
                            </div>
                        </div>

                        

                       

                      
                    
                </div>
            </>

        </>}

    </>);
}