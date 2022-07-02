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
import Swal from 'sweetalert2';

import { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { showLoader , hideLoader } from '../../helper/loader';

export default function DoctorAppointmentPay({ history }) {
    const { dispatch, baseUrl, errorResponse, userData, currentPath } = React.useContext(AppContext);
    const { uuid } = useParams();
    

   

    const { isLoading: isLoadingSub, isFetching, refetch, isError: isErrorSub }
    = useQuery(['doctor-appointment', uuid], () => subscriptionsWithDoctor(uuid), {
        onError: (error) => errorResponse({ dispatch, error, history, state: { from: currentPath } }),
       
    });



    


    let location = useLocation();

   

    const [date,setDate]=useState("");
    const [time,setTime ]=useState("");
    const [doctor ,  setDoctor]=useState("");
    const [aos,setAos]=useState("");
    const [doctormail, setDocEmail]=useState("");
    const [username,setUsername]=useState("");
    const [useremail,setUserEmail]=useState("");
    const [usergender, setUserGender]=useState("");
    const [user_uuid , setUserUuid]=useState("");
    const [doctor_id , setDoctorId]=useState("");



    React.useEffect(()=>{
       
        setDate(moment(location.state.date).format('YYYY-MM-DD'));
        setTime(location.state.time);
        setDoctor(location.state.doctor);
        setAos(location.state.aos);
        setDocEmail(location.state.doctormail);
        setUsername(location.state.username);
        setUserEmail(location.state.useremail);
        setUserGender(location.state.usergender);
        setUserUuid(location.state.user_uuid);
        setDoctorId(location.state.doctor_id);

        
    })

    //Token



    // Paystack button Script Here

// date: moment(selectedDate).format('dddd, MMMM DD, YYYY'),
    // time: moment(selectedTime, 'h:mm a').format('h:mm a'),
    // doctor: `DR. ${docfirstname} ${docfirstname}`,
    // aos:aos,
    // doctormail: docemail,
    // username: `${userfirstname} ${userlastname}`,
   
    // useremail: useremail,
    // usergender:usergender,
    
const config = {
    reference: (new Date()).getTime(),
    //email:useremail,

    email:useremail,
    amount: 300000,
    publicKey: 'pk_test_02ce7d4340336726886f879f63b3b5fd13988f34',

    
    metadata: {
        
        date:date,
        time:time,
        doctor:doctor,
        aos:aos,
        doctormail:doctormail,
        username:username,
        useremail:useremail,
        usergender:usergender,
        user_uuid:user_uuid,
        doctor_id:doctor_id,
        

    },
  };
  
  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    

        //call the axios get response to the Api to verify payment

     console.log(reference);

     showLoader();

        if(reference.message == "Approved"){

            console.log(reference.reference);

            
    axios.get(`${process.env.REACT_APP_API_URL}appointments/verify/${reference.reference}`,{
        

    }).then(response => {
        console.log(response);


  
        //Check is the reference payment is Verified

        if(response.data.data.status == "success"){

            console.log(response.data.data.amount);


            // Add the Appoiment Meta Details to the database using a Post Request


            
                axios.post(`${process.env.REACT_APP_API_URL}appointments/completebook`,{
                        
                //request body here to complete appointment process
            user_uuid : response.data.data.metadata.user_uuid,
            date : response.data.data.metadata.date,
            time: response.data.data.metadata.time,
            ref_no : reference.reference,
                doctor_id:response.data.data.metadata.doctor_id,
                doctor_name:response.data.data.metadata.doctor,
                doctor_aos:response.data.data.metadata.aos,
                type:"doctor_appointment",
                link:`https://meet.jit.si/asknello/${reference.reference}`,
                user_email:response.data.data.metadata.useremail,
                doctor_email:response.data.data.metadata.doctormail,
                username:response.data.data.metadata.username,
                amount:response.data.data.amount / 100,
            

                }).then(response => {
                    console.log(response)
                    hideLoader();
                    if(response.data.status == true){
                        Swal.fire(
                            'Appointment Scheduled',
                            `Schedule At - ${response.data.date} , Time - ${response.data.time}` ,
                            
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

    React.useEffect(() => {
        if (!uuid) {
            history.push('/doctors');
        }
    }, [uuid, history]);


   

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
                     Complete checkout to secured <br/> 
                     an appointment with the Doctor.
                     
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
                                                    <td>{location.state.date }</td>
                                                </tr>

                                                <tr>
                                                    <td>Appointment Time</td>
                                                    <td>{location.state.time}</td>
                                                </tr>

                                                
                                                    <tr>
                                                        <td>Doctor's Name</td>
                                                        <td>{location.state.doctor}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Doctor's specialization</td>

                                                        <td>{location.state.aos}</td>
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





                                                <tr className="m-auto">
                                                    
                                                    <br/>
                                                    
                                                <div className="text-center">
                                                       
                                                        <PaystackButton
                                                            className="btn btn-primary btn-arrow btn-lg btn-main"
                                                            {...componentProps}
                                                        />


                                                        {/* {displayPay()} */}
                                                            

                                                            
                                                    </div>
                                                </tr>

                                                
                                            </tbody>

                                        </table>
                                   </div>
                                

                                </div>
                            </div>
                        </div>

                        

                       

                      
                    
                </div>
            </>

        </>}

    </>);
}