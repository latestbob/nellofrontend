import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
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
import { NotificationManager } from "react-notifications";

import { useState } from 'react';

export default function DoctorAppointment({ history }) {
    const { dispatch, baseUrl, errorResponse, userData, currentPath } = React.useContext(AppContext);
    const { uuid } = useParams();
    const { register, handleSubmit, setValue, getValues, watch, control, formState: { errors } } = useForm();

    const { toggleFormState } = useFormState('form-appointment');

    const selectedDate = watch('date');
    const selectedTime = watch('time');
    const date = new Date();

    const [service, setService] = React.useState(null);
    const [doctor, setDoctor] = React.useState(null);
    const [times , setTimes] = React.useState([
        { value: '8:00:00', label: '8:00 am', match: true },
                    { value: '8:30:00', label: '8:30 am', match: true },
                    { value: '9:00:00', label: '9:00 am', match: true },
                    { value: '9:30:00', label: '9:30 am', match: true },
                    { value: '10:00:00', label: '10:00 am', match: true },
                    { value: '10:30:00', label: '10:30 am', match: true },
                    { value: '11:00:00', label: '11:00 am', match: true },
                    { value: '11:30:00', label: '11:30 am', match: true },
                    { value: '12:00:00', label: '12:00 pm', match: true },
                    { value: '13:30:00', label: '1:30 pm', match: true },
                    { value: '14:00:00', label: '2:00 pm', match: true },
                    { value: '14:30:00', label: '2:30 pm', match: true },
                    { value: '15:00:00', label: '15:00 pm', match: true },
                    { value: '15:30:00', label: '15:30 pm', match: true },
                    { value: '16:00:00', label: '4:00 pm', match: true },
        // { value: '18:00:00', label: '6:00 pm' },
        // { value: '19:00:00', label: '7:00 pm' },
        // { value: '20:00:00', label: '8:00 pm' },
    ]);


    //User Appointment Details States Here

    const [user_uuid , setUserId]=useState("");
    const [userfirstname, setFirstName] = useState("");
    const [userlastname, setLastName] = useState("");
    const [useremail, setEmail] = useState("");
    const [usergender, setGender] = useState("");

    //Doctor Appointment Details State Here


    const [doctor_id , setDoctorId]=useState("");
    const [docuuid, setUuid] = useState(uuid);
    const [docfirstname, setDocFirstName] = useState("");
    const [doclastname, setDocLastName] = useState("");
    const [docemail, setDocEmail] = useState("");
    const [aos, setDocAos] = useState("");
    const [doctorfee, setDoctorFee]= useState(0);


    //HIDE BOTTON FOR PAYSTACK
    const [hidebutton , setHideButton] = useState("");

    const todaydate = new Date();


    const [mydate , setMyDate] = useState("");

    const [showbtn, setShowBtn] = useState(false);

    const [doctorday , setDoctorDay] = useState([]);

    const [availabletime , setAvailableTime] = useState([]);


    const [weekday , setWeekDay] = useState(
        [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
            
    ]
    );


    // const setClass = (date) => {
    //     const dateobj =
    //       datenumber.find((x) => {
    //         return (
    //           date.getDate() === parseInt(x['dates'])
    //         );
    //       });
    //     return !  dateobj ;}

    // const isWeekday = (date) => {
    //     const day = date.getDay(date);
    //     return day !== 1 && day !== 2 && day !== 6;
    //    }


      // const notAvailableDays = [1,2,6];

const isDisabled = (date) => {
   const day = date.getDay(date);
   return !doctorday.includes(day);
}
    
    // React.useEffect(()=>{
    //     const currentTime = todaydate.getTime();


    //     const myTime = moment(currentTime, 'h:mm a').format('h:mm a');

    //     setMyDate(moment(todaydate).format('dddd, MMMM DD, YYYY'));

    //     console.log(mydate);
    // })


    //get the exact days in which doctors are available


    React.useEffect(()=>{
       
        axios.get(`https://admin.asknello.com/api/nello_doctors_days/${docuuid}`, {
            

        }).then(response => {
           // console.log(response)

            if (response.data) {


               setDoctorDay(response.data);

                 console.log(response.data);
                // console.log(userlastname);
                // console.log(useremail);
                // console.log(usergender);


            }


        }).catch(error => {
            console.log(error)
        })


         
         
     },[])
 


    React.useEffect(() => {
        var pickedate = moment(selectedDate).format('dddd, MMMM DD, YYYY')
        var todaydated = moment().format('dddd, MMMM DD, YYYY')
        // console.log(moment(selectedDate).format('dddd, MMMM DD, YYYY'));
        // console.log(moment().format('dddd, MMMM DD, YYYY'))

        console.log(pickedate);
        console.log(todaydated)

        //console.log(moment(selectedTime, 'h:mm a').format('h:mm a'))

        //
        //console.log(moment().format('h:mm a'))
        console.log(moment().format('HH:mm:ss a'))
        var valuedate = moment().format('HH:mm:ss a');
        var mytimeselected = moment(selectedTime, 'h:mm a').format('HH:mm:ss a')
        console.log(mytimeselected);


console.log(moment(selectedTime, 'h:mm a').format())

var c = +moment().add(30, 'minutes').format('x');
var d = moment(selectedTime, 'h:mm a').format();

var e = +moment(selectedTime, 'h:mm a').format('x')
var f = e / 60000

var g = (e - c) / 60000

console.log(e)
console.log(f)
console.log(g)
    

if(pickedate == todaydated){
    console.log(moment().format('HH:mm:ss a'))
var valuedate = moment().format('HH:mm:ss a');
var mytimeselected = moment(selectedTime, 'h:mm a').format('HH:mm:ss a')
console.log(mytimeselected);


console.log(moment(selectedTime, 'h:mm a').format())

var c = +moment().add(30, 'minutes').format('x');
var d = moment(selectedTime, 'h:mm a').format();

var e = +moment(selectedTime, 'h:mm a').format('x')
var f = e / 60000

var g = (e - c) / 60000

// console.log(e)
// console.log(f)
console.log(parseInt(g))

/// check if g is greater than 0

if(g >= 1){
    //setShowBtn(true)
    console.log('available')
    if(selectedDate && selectedTime){
        axios.post(`${process.env.REACT_APP_API_URL}doctor/appointment/check`,{
                    
            //request body here to complete appointment process
                    
                    date : moment(selectedDate).format('YYYY-MM-DD'),
                    time: selectedTime,
                   
                        doctor_id:doctor_id,
                       
                        type:"doctor_appointment",
                        
        

            }).then(response => {
               
                //hideLoader();

                if(response.data=="true"){
                   
                    console.log('hide')
                    setShowBtn(false);
                    return NotificationManager.error("Doctor already schedule for current date and time");
                }

                // else if(response.data == 'false'){
                //     setShowBtn(true)
                //     console.log('correct')
                // }

                else{
                    console.log('show')
                    setShowBtn(true);
                }

                
              

     
            }).catch(error => {
                console.log(error)
            })


    }
}
else{
    setShowBtn(false)
    // return NotificationManager.error("Select at least 30 mins after the current time");

    if(selectedDate && selectedTime){
        return NotificationManager.error("Select at least 30 mins after the current time");
    }
}


}
else {
    //setShowBtn(true)
    console.log('available')

    if(selectedDate && selectedTime){
        axios.post(`${process.env.REACT_APP_API_URL}doctor/appointment/check`,{
                    
            //request body here to complete appointment process
                    
                    date : moment(selectedDate).format('YYYY-MM-DD'),
                    time: selectedTime,
                   
                        doctor_id:doctor_id,
                       
                        type:"doctor_appointment",
                        
        

            }).then(response => {
               
                //hideLoader();

                if(response.data=="true"){
                   
                    console.log('hide')
                    setShowBtn(false);
                    return NotificationManager.error("Doctor already schedule for current date and time");
                }

                // else if(response.data == 'false'){
                //     setShowBtn(true)
                //     console.log('correct')
                // }

                else{
                    console.log('show')
                    setShowBtn(true);
                }

                
              

     
            }).catch(error => {
                console.log(error)
            })


    }
}





    }, [selectedDate, selectedTime]);


    React.useEffect(() => {

       

   
    
        if(selectedDate){

            //console.log("Date format now is " + moment(selectedDate).format('DD-MM-YYYY'));
            axios.get(`https://admin.asknello.com/api/doctor_appointment_time?date=${moment(selectedDate).format('DD-MM-YYYY')}&specialization=${doctor.aos}&uuid=${uuid}`).then(response => {
               
                //hideLoader();
                console.log(response.data)

                setAvailableTime(response.data);
                
                if(response.data.length == 0){
                    setTimes({ value: '8:00:00', label: '8:00 am', match: true },
                    { value: '8:30:00', label: '8:30 am', match: true },
                    { value: '9:00:00', label: '9:00 am', match: true },
                    { value: '9:30:00', label: '9:30 am', match: true },
                    { value: '10:00:00', label: '10:00 am', match: true },
                    { value: '10:30:00', label: '10:30 am', match: true },
                    { value: '11:00:00', label: '11:00 am', match: true },
                    { value: '11:30:00', label: '11:30 am', match: true },
                    { value: '12:00:00', label: '12:00 pm', match: true },
                    { value: '13:30:00', label: '1:30 pm', match: true },
                    { value: '14:00:00', label: '2:00 pm', match: true },
                    { value: '14:30:00', label: '2:30 pm', match: true },
                    { value: '15:00:00', label: '15:00 pm', match: true },
                    { value: '15:30:00', label: '15:30 pm', match: true },
                    { value: '16:00:00', label: '4:00 pm', match: true })
                }

                else{



             
                     let booked = response.data;
               
                         let obj3 = []

                        times.map(function(a) {
                        let match = booked.filter(b => a.value === b);
                        if (match.length) {
                        obj3.push({value: a.value, label: a.label, match: false});
                        } else {
                        obj3.push({value: a.value, label: a.label, match: true});
                        }
                        })

                        console.log(obj3);

                        setTimes(obj3);

                    

                }



                

              

                    // let booked = response.data.time;
               
                    

                    

                   
                

                
              

     
            }).catch(error => {
                console.log(error)
            })


    }
    


    }, [selectedDate]);




    // React.useEffect(() => {

       

    // }, [selectedDate, selectedTime]);



    //function to display something like paystack button

    function displayPay(){
     
        if(moment(selectedDate).format('dddd, MMMM DD, YYYY') === mydate){
            return <button className='btn btn-success'>Working</button>;
        }
        else {
            return <div></div>;
        }
    }
    

    //Token

    const [token, SetToken] = useState("");

    // Paystack button Script Here

    const config = {
        reference: (new Date()).getTime(),
        email: "user@example.com",
        amount: 3000,
        publicKey: 'pk_live_c98b318b0a6960d258c3ea7ce676e804714b95eb',

        metadata: {
            "userfirstname":userfirstname,
            "userlastname":userlastname,
            "useremail":useremail,
            "usergender":usergender,
            "docfirstname":docfirstname,
            "doclastname":doclastname,
            "docuuid":docuuid,
            "docemail":docemail,
            "docaos":aos,
        },
    };

    // you can call this function anything
    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);

        //Call paystack Verify API HERE


    };

    // you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    const componentProps = {
        ...config,
        text: 'Schedule Appointment',
        onSuccess: (reference) => onSuccess(reference),
        onClose: onClose,
    };



    //End of Paystack Button Script


    const { isLoading: isLoadingSub, isFetching, refetch, isError: isErrorSub }
    = useQuery(['doctor-appointment', uuid], () => subscriptionsWithDoctor(uuid), {
        onError: (error) => errorResponse({ dispatch, error, history, state: { from: currentPath } }),
             
        onSuccess: ({ service, doctorData }) => {
            //console.log(service, doctorData, 'doctorData...');

            setService(service?.doctor);
            setDoctor(doctorData);
         /*   if (!service?.doctor) {
                history.push({ pathname: '/doctor-signup', state: { service: 'doctor', appointment: uuid } });
            }*/
        },
    });

    const onSubmit = (values) => {
        toggleFormState(true, 'submitting you in...');
        values = { ...values, doctor_id: doctor?.id, reason: "reason" }
        makeAppointment(values).then((response) => {

           console.log(response.message);

           if(response.noerror == true){
               //history.push(`/doctor/${uuid}/appointment/pay`);

               history.push({
                pathname: `/doctor/${uuid}/appointment/pay`, state: {
                 
                        date: moment(selectedDate).format('dddd, MMMM DD, YYYY'),
                        time: selectedTime,
                        doctor: `DR. ${docfirstname} ${doclastname}`,
                        aos:aos,
                        doctormail: docemail,
                        username: `${userfirstname} ${userlastname}`,
                       
                        useremail: useremail,
                        usergender:usergender,
                        user_uuid:user_uuid,
                        doctor_id:doctor_id,
                        doctorfee:doctor?.fee,


                    
                }
            })
           }

            // if(response.data.noerror == true){
            //     //history.push(`/doctor/${uuid}/appointment/pay`);

            //     console.log(response.data.noerror);
            // }

            // history.replace({
            //     pathname: '/appointment-done', state: {
            //         appointment: {
            //             date: appointment?.date,
            //             time: appointment?.time,
            //             doctor: `DR. ${doctor?.firstname} ${doctor?.lastname}`
            //         }
            //     }
            // })
            //uncomment this

        }).catch(error => {
            errorResponse({ error, dispatch, history, state: { from: currentPath } });
        }).then(() => toggleFormState(false));
    }
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

    React.useEffect(() => {
        //get user Information using token here

        SetToken(localStorage.getItem("token"))


        axios.get(`${process.env.REACT_APP_API_URL}auth/user`, {
            'headers': {
                Authorization: 'Bearer' + token,
            }

        }).then(response => {
           // console.log(response)

            if (response.data) {

                //SET USER APPOINTMENT STATES HERE

                //    const [userfirstname , setFirstName] = useState("");
                //    const [userlastname , setLastName] = useState("");
                //    const [useremail , setEmail] = useState("");
                //    const [usergender , setGender] = useState("");

                setUserId(response.data.user.uuid);
                setFirstName(response.data.user.firstname);

                setLastName(response.data.user.lastname);
                setEmail(response.data.user.email);
                setGender(response.data.user.gender);

                // console.log(userfirstname);
                // console.log(userlastname);
                // console.log(useremail);
                // console.log(usergender);


            }


        }).catch(error => {
            console.log(error)
        })





    })


    //DOCTOR APPOINTMENT STATE DETAILS HERE

    React.useEffect(() => {


        axios.get(`${process.env.REACT_APP_API_URL}doctor/${uuid}`, {

            'vendor':1,

        }).then(response => {
           // console.log(response.data)

            if (response.data) {

                //SET DOCTOR  APPOINTMENT STATES HERE

                // const [docuuid, setUuid] = useState("");
                // const [docfirstname, setDocFirstName] = useState("");
                // const [doclastname, setDocLastName] = useState("");
                // const [docemail, setDocEmail] = useState("");
                // const [aos, setDocAos] = useState("");
                setDoctorId(response.data.id);
                setDocFirstName(response.data.firstname);
                setDocLastName(response.data.lastname);
                setDocEmail(response.data.email);
                setDocAos(response.data.aos);
                setDoctorFee(response.data.fee);

               // console.log(response.data.aos);

               


            }


        }).catch(error => {
            console.log(error)
        })



    })

    return (<>
        {isLoadingSub ? <PageLoading /> : <>


            {isErrorSub && (<div className="p-5">
                <PlaceholderStatus onClick={refetch} />
            </div>)}


           <>
                <div class="account-badge-container">
                    <div class="container-width-sm">
                        <h3>Schedule Appointment </h3>
                        <div class="doc-mini-container">
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
                        </div>
                    </div>
                </div>

                <div className="container content-body container-layout">
                    <form id="form-appointment" onSubmit={handleSubmit(onSubmit)}>
                        <div className="appointment-box">
                            <div className="row">
                                <div class="col-md-6">
                                    <label className="font-weight-medium text-secondary mb-3 font-size-14">Select a Date </label>
                                    <Controller
                                        name="date"
                                        control={control}
                                        rules={{ required: 'Appointment date is required' }}
                                        render={({
                                            field: { onChange, onBlur, value, name, ref },
                                        }) => (
                                            <Calendar
                                                //minDate={new Date()}
                                                
                                                minDate={new Date()}
                                            maxDate={new Date(date.getFullYear(), date.getMonth() + 2, 0)}
                                                onChange={onChange}
                                                value={value}
                                                className="appointment-calendar"
                                                next2Label={null}
                                                prev2Label={null}
                                                nextLabel={<i class="fas fa-chevron-right text-secondary"></i>}
                                                prevLabel={<i class="fas fa-chevron-left text-secondary"></i>}

                                                tileDisabled={({ date }) => isDisabled(date) }


                                               

                                                
                                            />
                                        )}
                                    />
                                    <ErrorMsg errors={errors} name="date" />
                                </div>
                                <div class="col-md-6">
                                    <label className="font-weight-medium display-block
                    text-secondary mb-3 font-size-14">Select Time </label>
                                    <div className="time-picker-container">
                                        <div class="row">
                                            {times && times.map((row, index) => {

                                                // return (<Controller
                                                //     name="time"
                                                //     control={control}
                                                //     rules={{ required: 'Appointment time is required' }}
                                                //     render={({
                                                //         field: { onChange, onBlur, value, name, ref },
                                                //     }) => (<div key={index} class="col-4"
                                                //         onClick={() => setValue("time", row.value)}>
                                                //         <div class={`time-picker ${value === row.value && 'active'}`}>{row.label}</div>
                                                //     </div>)}
                                                // />)

                                                return (

                                                    <>
                                                    {row.match == false ? <Controller
                                                    
                                                    
                                                    name="time"
                                                    control={control}
                                                    rules={{ required: 'Appointment time is required' }}
                                                    render={({
                                                        field: { onChange, onBlur, value, name, ref },
                                                    }) => (
                                                    
                                                    
                                                    <div key={index} class="col-4"
                                                    onClick={() => setValue("time", row.value)}>

                                                     

                                                        <div class={`time-picker ${value === row.value && 'active'}`}>{row.label}</div>


                                                    </div>
                                                    
                                                    
                                                    )}
                                                /> : 
                                                <div 
                                                
                                               
                                                
                                                key={index} class="col-4"
                                                >
                                                    <div class="bg-secondary time-picker"style={{
                                                        color:"white",
                                                        border:"none",
                                                    
                                                    }}>{row.label}</div>
                                                </div>
                                            }
                                                    </>
                                               
                                                )

                                              
                                            })}
                                        </div>

                                        <ErrorMsg errors={errors} name="time" />
                                    </div>
                                    {selectedDate && selectedTime && (<div className="text-secondary font-weight-medium font-size-14">
                                        <span className="font-weight-normal text-muted">You have selected</span><br />
                                        <span className="text-sky"> {moment(selectedDate).format('dddd, MMMM DD, YYYY')}</span> by
                                        <span className="text-sky"> {moment(selectedTime, 'h:mm a').format('h:mm a')}</span>
                                    </div>)}

                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className="text-center" style={{
                            fontWeight: "bold",
                        }}>
                            Kindly note that online consultation cost  ₦{doctor?.fee} 
                        </div>

                        <hr />
                        <div className="text-center">
                           {showbtn ?  <button type="submit" class="btn btn-primary btn-arrow btn-lg btn-main">
                                Schedule Appointment
                            </button> : <div></div>}


                            {/* {displayPay()} */}
                                 

                                
                        </div>
                    </form>
                </div>
            </>

        </>}

    </>);
}