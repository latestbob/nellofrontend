import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { subscriptionsWithMedicalCenters, makeHospitalAppointment } from '../../Services';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import AppContext from '../../context';
import { PlaceholderStatus, ErrorMsg, randomString } from './../../components';
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';
import useFormState from './../../hooks/useFormState';

import SearchBarSvg from './../../svg/search-bar-svg';
import SquareRadiusSvg from './../../svg/square-radius-svg';
import TimeSvg from './../../svg/time-svg';

import Init from './appointment-start'
import { useState } from 'react';
import axios from 'axios';
import { NotificationManager } from "react-notifications";

export default function DoctorAppointment({ history }) {
    const { dispatch, baseUrl, errorResponse, userData, currentPath } = React.useContext(AppContext);
  
    const { register, handleSubmit, setValue, getValues, watch, control, formState: { errors } } = useForm();

    const { toggleFormState } = useFormState('form-appointment');

    const selectedDate = watch('date');
    const selectedTime = watch('time');
    const date = new Date();

    const [caretype, setCareType] = React.useState(null);
    const [service, setService] = React.useState(null);
    const [medicalCenters, setMedicalCenters] = React.useState([]);
    const [selectedMedicalCenter, setSelectedMedicalCenter] = React.useState(null);
    const [currentIndex, setCurrentIndex] = React.useState(1);
    const [values, setValues] = React.useState({});
    const [rand] = React.useState(randomString());
    const [notblockedtime , setNotBlockedTime] = useState([]);

    const [times] = React.useState([
       
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
        { value: '15:00:00', label: '3:00 pm', match: true },
        { value: '15:30:00', label: '3:30 pm', match: true },
        { value: '16:00:00', label: '4:00 pm', match: true },

        { value: '16:30:00', label: '4:30 pm', match: true },
        { value: '17:00:00', label: '5:00 pm', match: true },
        { value: '17:30:00', label: '5:30 pm', match: true },
        { value: '18:00:00', label: '6:00 pm', match: true },
        { value: '18:30:00', label: '6:30 pm', match: true },
        { value: '19:00:00', label: '7:00 pm', match: true },
    ]);

    const [facilityday , setFacilityDay] = useState([]);

    const { isLoading: isLoadingSub, refetch, isError: isErrorSub }
        = useQuery(['medical-center-appointment', rand], subscriptionsWithMedicalCenters, {
            onError: (error) => errorResponse({ dispatch, error, history, state: { from: currentPath } }),
            onSuccess: ({ service, medicalCenters, user }) => {
                console.log(user, 'onSubmit...')

                // if (!user?.hasSub || !service?.doctor) {
                //     history.push({ pathname: '/doctor-signup', state: { service: 'doctor-md' } });
                // }
                setService(service?.doctor);
                setMedicalCenters(medicalCenters);
            },
        });



       






        //Get Login Users Information 

            //Token

    const [token, SetToken] = useState("");

      //User Appointment Details States Here

      const [user_uuid , setUserId]=useState("");
      const [userfirstname, setFirstName] = useState("");
      const [userlastname, setLastName] = useState("");
      const [useremail, setEmail] = useState("");
      const [usergender, setGender] = useState("");



      //HIDE BOTTON FOR PAYSTACK
    const [hidebutton , setHideButton] = useState("");

    const todaydate = new Date();


    const [mydate , setMyDate] = useState("");

    const [showbtn, setShowBtn] = useState(false);




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

    if(selectedDate && selectedTime){
        axios.post(`${process.env.REACT_APP_API_URL}med/appointment/check`,{
                    
            //request body here to complete appointment process
                    
                    date : moment(selectedDate).format('YYYY-MM-DD'),
                    time: selectedTime,
                   
                        name:selectedMedicalCenter.name,
                       
                        // $request->date
                        
        

            }).then(response => {
               console.log(response)
                //hideLoader();

                if(response.data=="true"){
                   
                    console.log('hide')
                    setShowBtn(false);
                    return NotificationManager.error(`${selectedMedicalCenter.name} already schedule for current date and time`);
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

    if(selectedDate && selectedTime){
        axios.post(`${process.env.REACT_APP_API_URL}med/appointment/check`,{
                    
            //request body here to complete appointment process
                    
                    date : moment(selectedDate).format('YYYY-MM-DD'),
                    time: selectedTime,
                   
                        name:selectedMedicalCenter.name,
                       
                       
                        
        

            }).then(response => {
               console.log(response)
                //hideLoader();

                if(response.data=="true"){
                   
                    console.log('hide')
                    setShowBtn(false);
                    return NotificationManager.error(`${selectedMedicalCenter.name} already schedule for current date and time`);
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



      //get user details from Api

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


                setUserId(response.data.user.uuid);
                setFirstName(response.data.user.firstname);

                setLastName(response.data.user.lastname);
                setEmail(response.data.user.email);
                setGender(response.data.user.gender);

                console.log(userfirstname);
                console.log(userlastname);
                console.log(useremail);
                console.log(usergender);


            }


        }).catch(error => {
            console.log(error)
        })





    })



    const onSubmit = ({ date, time }) => {
        toggleFormState(true, 'submitting you in...');
        const postData = { ...values, date, time }
        //console.log(selectedMedicalCenter?.name, 'onSubmit...')
        makeHospitalAppointment(postData).then((response) => {

            console.log(response);

            if(response.noerror == true){
                history.push({
                    pathname: '/appointment/pay',state:{
                        date: moment(selectedDate).format('dddd, MMMM DD, YYYY'),
                       // time: moment(selectedTime, 'h:mm a').format('h:mm a'),
                       time: selectedTime,
                       
                        
                        username: `${userfirstname} ${userlastname}`,
                       
                        useremail: useremail,
                        usergender:usergender,
                        user_uuid:user_uuid,

                        //medical center details

                        center_name:selectedMedicalCenter.name,
                        center_email:selectedMedicalCenter.email,
                        center_type:selectedMedicalCenter.center_type,
                        center_address:selectedMedicalCenter.address1,
                        center_uuid:selectedMedicalCenter.uuid,
                        center_fee:selectedMedicalCenter.fee,
                        reason:response.reason,
                        

                    }
                })


            }
           
        }).catch(error => {
            errorResponse({ error, dispatch, history, state: { from: currentPath } });
        }).then(() => toggleFormState(false));
    }

    const initAppointment = (vals) => {
        const mc = medicalCenters.find(dt => dt.uuid === vals.medical_center)
        const mytype = vals.caretype;
        //console.log(mc, medicalCenters, vals, 'values..');
        setSelectedMedicalCenter(mc);
        setValues(vals);
        setCurrentIndex(2);
        setCareType(mytype);
    }



    React.useEffect(()=>{
        
        if(caretype){
       
        axios.get(`https://admin.asknello.com/api/nellofacilitydates?specialization=${caretype}&center_uuid=${selectedMedicalCenter?.uuid}`, {
            

        }).then(response => {
           console.log(response)

            if (response.data) {


               setFacilityDay(response.data);

                 console.log(response.data);
                // console.log(userlastname);
                // console.log(useremail);
                // console.log(usergender);


            }


        }).catch(error => {
            console.log(error)
        })
    }

         
         
     },[caretype]);


    //  const isDisabled = (date) => {
    //     const day = date.getDay(date);
    //     return !facilityday.includes(day);
    //  }

     const isDisabled = (date) => {
        //    const day = date.getDay(date);
        //    return !doctorday.includes(day);
        const dateobj =
        facilityday.find((x) => {
          return (
            date.getDate() === parseInt(x['dates'])
          );
        });
        return !  dateobj ;
        }


        
        React.useEffect(() => {

            axios.get(`https://admin.asknello.com/api/nellofacilitytimes?uuid=${selectedMedicalCenter?.uuid}&date=${moment(selectedDate).format('dddd, MMMM DD, YYYY')}&specialization=${caretype}`).then(response => {
                   
                    //hideLoader();
                    console.log(response.data);
    
                 
                    setNotBlockedTime(response.data);
    
    
                
    
                  
    
                   
                  
    
         
                }).catch(error => {
                    console.log(error)
                })
    
        
          
        
    
    
        }, [selectedDate, caretype]);
        
         




    React.useEffect(() => {
        //console.log(values, values?.medical_center, 'values..')
        //setValue([{ name: userData.name }, { phone: userData.phone }]);
    }, [values]);

    const PageLoading = () =>
        <div className="p-5">

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

    return (<>
        {isLoadingSub ? <PageLoading /> : <>


            {isErrorSub && (<div className="p-5">
                <PlaceholderStatus onClick={refetch} />
            </div>)}

            {!isErrorSub && (<>
                <div class="account-badge-container">
                    <div class="container-width-sm">
                        <h3 className="mb-2">Schedule Appointment  </h3>
                        {currentIndex === 2 ? (<div class="doc-mini-container">
                            <div class="dmc-content-box text-center">
                                <div class="dmc-1">{selectedMedicalCenter?.name}</div>
                                <div class="dmc-2">{selectedMedicalCenter?.address1}</div>
                                {/* <div class="dmc-2">{selectedMedicalCenter?.uuid}</div> */}
                               
                                <div class="dmc-4">
                                    <i class="la la-star"></i>
                                    <i class="la la-star"></i>
                                    <i class="la la-star"></i>
                                    <i class="la la-star"></i>
                                    <i class="la la-star"></i>
                                </div>
                                {caretype}
                            </div>
                        </div>) : ""}
                    </div>
                </div>

                {currentIndex === 2 ? (<div className="container content-body container-layout">
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
                                                minDate={new Date()}
                                                maxDate={new Date(date.getFullYear(), date.getMonth() + 1, 0)}

                                                
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
                                <div className='timediv col-md-6'>

                                            {
                                                
                                                selectedDate && (
                                                <div class="row">
                                            {times && times.map((row, index) => {

                                            if(notblockedtime.includes(row.label)){
                                            row.match = false;
                                            }
                                            if(!notblockedtime.includes(row.label)){
                                            row.match = true;
                                            }







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
                                            <ErrorMsg errors={errors} name="time" />
                                            </div>

                                            )
                                            // kkk




                                            }







                                            {selectedDate && selectedTime && (<div className='alert alert-info'>
                                            <p style={{
                                            fontSize:"15px",

                                            }}>You have selected </p> 
                                            <p style={{
                                            fontSize:"14px",
                                            fontWeight:"bold",
                                            }}><span className="text-sky"> {moment(selectedDate).format('dddd, MMMM DD, YYYY')}</span> by
                                            <span className="text-sky"> {moment(selectedTime, 'h:mm a').format('h:mm a')}</span></p>
                                            </div>)}

                                            </div> 
                            </div>
                        </div>

                        <hr />
                        <div className="text-center">

                            <button type="button" onClick={() => setCurrentIndex(1)}
                                class="btn btn-inverse mr-3 btn-ico">
                                <i class="fal fa-long-arrow-left"></i> Back
                            </button>

                            {showbtn ?  <button type="submit" class="btn btn-primary btn-arrow btn-lg btn-main">
                                Schedule Appointment
                            </button> : <div></div>}
                        </div>
                    </form>
                </div>) : (
                    <Init
                        initAppointment={initAppointment}
                        medicalCenters={medicalCenters}
                        values={values}
                    />
                )}
            </>)}

        </>}

    </>);
}