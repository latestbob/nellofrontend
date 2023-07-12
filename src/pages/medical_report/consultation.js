import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory} from 'react-router-dom';
import './consultation.css';
import symptom from './symptoms.js';
import diagnoses from './diagnosis.js';
import procedure from './procedures';
import axios from 'axios';
import moment from 'moment';
import laboratory from './laboratory';
import xray from './xray';
import ultrasound from './ultrasound';
import how_often from './howoften';
import medical_durations from './durations';
import { Checkbox } from 'pretty-checkbox-react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useForm, Controller } from "react-hook-form";
import { ErrorMsg } from '../../components';







function Consultation(){

    const history = useHistory();
    const { ref } = useParams();

    const[doctor_id , setDoctorId] = useState(0);
    const [doctorday , setDoctorDay] = useState([]);
    const[doctor_uuid, setDoctorUuid] = useState("");
    const[doctor_firstname, setDoctorFirstname] = useState("");
    const[doctor_lastname, setDoctorLastname] = useState("");
    const[doctor_title , setDoctorTitle] = useState("");
    const [notblockedtime , setNotBlockedTime] = useState([]);
    const { register, handleSubmit, setValue, getValues, watch, control, formState: { errors } } = useForm();
    const selectedDate = watch('date');
    const selectedTime = watch('time');
    const [isChecked, setIsChecked] = useState(false);



    React.useEffect(()=>{
        
     
       
        axios.get(`https://admin.asknello.com/api/healthrecords/${ref}`, {
            

        }).then(response => {
           console.log(response)
           if(response.data.firstname){
            history.push(`/summary/${ref}`)
           }

          

        


        }).catch(error => {
            console.log(error)
        })

         
         
     },[]);
    // 


    React.useEffect(()=>{
        
     
       
        axios.get(`https://admin.asknello.com/api/nellogetappointment/${ref}`, {
            

        }).then(response => {
           console.log(response)

           setRefNo(response.data.ref_no);
           setFirstName(response.data.user.firstname);
           setLastName(response.data.user.lastname);
           setEmail(response.data.user.email);
           setDob(response.data.user.dob);
           setGender(response.data.user.gender);
           setAppointmentType(response.data.type);

           if(response.data.type ==  'doctor_appointment'){
                setDoctorId(response.data.doctor_id)
           }

        


        }).catch(error => {
            console.log(error)
        })

         
         
     },[]);


     React.useEffect(()=>{
        
     
       
       if(doctor_id != 0){
        axios.get(`https://admin.asknello.com/api/doctor/${doctor_id}`, {
            

        }).then(response => {
           console.log(response)

           setDoctorUuid(response.data.uuid)
           setDoctorFirstname(response.data.firstname)
           setDoctorLastname(response.data.lastname)
           setDoctorTitle(response.data.title)

         

        


        }).catch(error => {
            console.log(error)
        })

       }
         
         
     },[doctor_id]);


     React.useEffect(()=>{
       
        if(doctor_uuid){
            axios.get(`https://admin.asknello.com/api/nellodoctordates?uuid=${doctor_uuid}`, {
            

        }).then(response => {
           // console.log(response)

            if (response.data) {


               setDoctorDay(response.data);

                 console.log(response.data);
               


            }


        }).catch(error => {
            console.log(error)
        })
        }


         
         
     },[doctor_uuid])

     const isDisabled = (date) => {
        //    const day = date.getDay(date);
        //    return !doctorday.includes(day);
        const dateobj =
        doctorday.find((x) => {
          return (
            date.getDate() === parseInt(x['dates'])
          );
        });
        return !  dateobj ;
        }


        React.useEffect(() => {

            if(selectedDate){
                axios.get(`https://admin.asknello.com/api/nellodoctortimes?uuid=${doctor_uuid}&date=${moment(selectedDate).format('dddd, MMMM DD, YYYY')}`).then(response => {
                   
                    //hideLoader();
                    console.log(response.data);
    
                 
                    const dataArray = Object.values(response.data);
                    setNotBlockedTime(dataArray);

    
    
                
    
                  
    
                   
                  
    
         
                }).catch(error => {
                    console.log(error)
                })
    
            }
        
          
        
    
    
        }, [selectedDate]);


     //user data

     const[firstname , setFirstName] = useState("");
     const[lastname , setLastName] = useState("");
     const[email , setEmail] = useState("");
     const[dob , setDob] = useState("");
     const[gender , setGender] = useState("");

     
     

     

//    Form datas to be submitted 
    const[symptomsList , setSymptomsList] = useState([]);
    const[refno, setRefNo] = useState("");
    const[appointmentType , setAppointmentType] = useState("");
    

    const[othersymptoms , setOtherSymptoms] = useState("");
    const[historyOfCompliants , setHistoryOfCompliants] = useState("");

    const[allergies , setAllergies] = useState([]);
    const[diagnosesList , setDiagnosesList]= useState({ name: '', isSuspected: false });;
    const[otherDiagnosis , setOtherDiagnosis] = useState({ name: '', isSuspected: false });
    const[procedureList , setProcedureList] = useState([]);
    const[comments , setComment] = useState('');
    const[prescriptions , setPrescriptions] = useState([]);
    const[followUpDate , setFollowUpDate] = useState("");
    const[followUpTime , setFollowUpTime] = useState("");

    const[laboratoryList , setLaboratoryList] = useState([]);
    const[xrayList , setXrayList] = useState([]);
    const[ultrasoundList , setUltrasoundList] = useState([]);


    /////Vital Signs
    const[temperature , setTemperature] = useState("");
    const[pulse_rate, setPulseRate] = useState("");
    const[blood_pressure , setBloodPressure] = useState("");
   
    const[respiratory_rate, setRespiratoryRate] = useState("");
    const[weight, setWeight] = useState("");
    const[height, setHeight] = useState("");
    ///end vital signs




// end of form data

   

    React.useEffect(() => {

        // console.log(symptom[1])
        if (!ref)
            history.push('/');
    }, [ref]);
    const [searchAllergy , setSearchAllergy] = useState('');
// For Symptoms searches functions
    const [searchTerm, setSearchTerm] = useState('');
   

    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredSymptoms = symptom.filter((symptoms) =>
      symptoms.toLowerCase().includes(searchTerm.toLowerCase())
    );

// For Symptoms searches functions


// For Diagnoses searches functions
const [diagnosisTerm, setDiagnosisTerm] = useState('');

// For Diagnoses 2 searches functions
const [diagnosisTerm2, setDiagnosisTerm2] = useState('');
   

    const handleDiagnosisChange = (event) => {
      setDiagnosisTerm(event.target.value);
    };

    const handleDiagnosisChange2 = (event) => {
        setDiagnosisTerm2(event.target.value);
      };
  
    const filteredDiagnosis = diagnoses.filter((dynos) =>
      dynos.toLowerCase().includes(diagnosisTerm.toLowerCase())
    );

    const filteredDiagnosis2 = diagnoses.filter((dynos) =>
    dynos.toLowerCase().includes(diagnosisTerm2.toLowerCase())
  );


// For Diagnoses searches functions


//For Procedure search

const [procedureTerm, setProcedureTerm] = useState('');
   

    const handleProcedureChange = (event) => {
      setProcedureTerm(event.target.value);
    };
  
    const filteredProcedures = procedure.filter((pros) =>
      pros.toLowerCase().includes(procedureTerm.toLowerCase())
    );



    //for laboratory search
    const [laboratoryTerm, setLaboratoryTerm] = useState('');
   

    const handleLaboratoryChange = (event) => {
      setLaboratoryTerm(event.target.value);
    };
  
    const filteredLaboratory = laboratory.filter((pros) =>
      pros.toLowerCase().includes(laboratoryTerm.toLowerCase())
    );



    // xray search

    const [xrayTerm, setXrayTerm] = useState('');
   

    const handleXrayChange = (event) => {
      setXrayTerm(event.target.value);
    };
  
    const filteredXray = xray.filter((pros) =>
      pros.toLowerCase().includes(xrayTerm.toLowerCase())
    );

    //ultasound

    const[ultrasoundTerm, setUtraSoundTerm] = useState('');

    const handleUltrasoundChange = (event) => {
        setUtraSoundTerm(event.target.value);
    }

    const filteredUltrasound = ultrasound.filter((pros) =>
      pros.toLowerCase().includes(ultrasoundTerm.toLowerCase())
    );




//For procedure search




    function clearAllergies(){
        setSearchAllergy("");

    }

// Prescription datas

    const[drugname, setDrugName] = useState("");
    const[drugname_error, setDrugNameError] = useState(false);
    const[dosageType , setDosageType] = useState("");
    const[dosageType_error, setDosageTypeError] = useState(false);

    const[strength , setStrength] = useState("");
    const[strength_error, setStrengthError] = useState(false);
    const[unit , setUnit] = useState("");
    const[unit_error, setUnitError] = useState(false);
    const[quantity , setQuanity] = useState("");
    const[quantity_error, setQuantityError] = useState(false);

  

    const[drugs , setDrugs] = useState([]);
    

    const[frequency, setFrequency] = useState("");
    const[frequency_error, setFrequencyError] = useState(false);
  
    const[duration , setDuration] = useState("");
    const[duration_error, setDurationError] = useState(false);
   
    const[durationType, setDurationType] = useState("");
    const[durationType_error, setDurationTypeError] = useState(false);


    // Follow up

   


    React.useEffect(()=>{
        
     
       
        axios.get('https://admin.asknello.com/api/nelloavailabledrugs', {
            

        }).then(response => {
           console.log(response)

           setDrugs(response.data)

        


        }).catch(error => {
            console.log(error)
        })

         
         
     },[]);


     const filteredDrugs = drugs.filter((med) =>
    med != drugname && med.toLowerCase().includes(drugname.toLowerCase())
   );



   React.useEffect(()=>{
        
     

     
 },[diagnosesList.isSuspected]);
   


    
function addToPrescription(){

    let hasError = false;

    if(drugname.trim() === ''){
        setDrugNameError(true)
        hasError = true;
    }
    if(dosageType.trim() === ''){
        setDosageTypeError(true)
        hasError = true;
    }
    if(strength.trim() === ''){
        setStrengthError(true)
        hasError = true;
    }

    if(unit.trim() === ''){
        setUnitError(true)
        hasError = true;
    }

    if(quantity.trim() === ''){
        setQuantityError(true)
        hasError = true;
    }

    if(frequency.trim() === ''){
        setFrequencyError(true)
        hasError = true;
    }

    if(duration.trim() === ''){
        setDurationError(true)
        hasError = true;
    }

    if(durationType.trim() === ''){
        setDurationTypeError(true)
        hasError = true;
    }


    if(!hasError){

        const newMedication = {
            drugname: drugname,
            dosageType: dosageType,
            strength: strength,
            unit: unit,
            quantity:quantity,
            frequency:frequency,
            duration:duration,
            durationType:durationType
    
          };
    
         
    
          
    
          setPrescriptions([...prescriptions, newMedication]);
    
          setDrugName('');
          setDosageType('');
          setStrength('');
          setUnit('');
          setQuanity('');
          setFrequency('');
          setDuration('');
          setDurationType('');
    
    
    }
    
    
     
}


    function handleSubmitBtn(e){
        e.preventDefault();

       if(symptomsList && historyOfCompliants && allergies && diagnosesList){
           //console.log(doctor_title)
        axios.post('https://admin.asknello.com/api/healthrecords', {

            
        

        //personal info
        firstname:firstname,
        lastname:lastname,
        email:email,
        dob:dob,
        gender:gender,

        // vitals
        weight:weight,
        height:height,
        temperature:temperature,
        pulse_rate:pulse_rate,
        blood_pressure:blood_pressure,
        respiratory_rate:respiratory_rate,

        // symptoms

        symptomsList:symptomsList,
        historyOfCompliants:historyOfCompliants,
        allergies:allergies,

         // diagnosis

        diagnosesList:diagnosesList,
        otherDiagnosis:otherDiagnosis,

           //procedures

        laboratory:laboratoryList,
        xray:xrayList,
        ultrasound:ultrasoundList,

        //prescription


        prescriptions:prescriptions,
        doctor_uuid:doctor_uuid,

         //followup

        require_followup:require_followup,
        followup_date:moment(selectedDate).format('dddd, MMMM DD, YYYY'),
        followup_time:moment(selectedTime, 'h:mm a').format('h:mm a'),


         //appointmentt ref

        appointment_ref:refno,


         // doctor
         doctor_firstname:doctor_firstname,
         doctor_lastname:doctor_lastname,
         doctor_title:doctor_title,

       
    
        



        
       
            

        }).then(response => {
           console.log(response)

           if(response){
            history.push(`/summary/${refno}`)
           }

        


        }).catch(error => {
            console.log(error)
        })
       }

       else{
           alert("Some Required Values are empty");
       }
    }

   
    

    
    const date = new Date()
    

    const [times , setTimes] = React.useState([
        
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

    
    const[require_followup , setRequireFollowup] = useState(false);
   
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);

      if(isChecked == false){
        setRequireFollowup(true)
      }

      else if(isChecked){
        setRequireFollowup(false)
      }
     
    };




    return (
        <>
             <form onSubmit={handleSubmitBtn}>
            <div className='col-md-10 py-2 m-auto intro rounded '>
                <h3 className='introheading text-center' >Consultation With Reference no. {refno}  </h3>
            </div>
        

        <section className='personalinfo col-md-10 m-auto'>

            <h5 className='personalheading'>Patient's Information</h5>

           
            <div class="form-row">
                <div class="form-group col-md-3">
                <label for="inputEmail4">Firstname</label>
                <input type="text" class="form-control disabled" id="inputEmail4" value={firstname}/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputPassword4">Lastname</label>
                    <input type="text" class="form-control disabled" id="inputPassword4" value={lastname}/>
                </div>

                <div class="form-group col-md-3">
                <label for="inputEmail4">Date Of Birth</label>
                <input type="text" class="form-control disabled" id="inputEmail4" value={dob}/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputPassword4">Gender</label>
                    <input type="text" class="form-control disabled" id="inputPassword4" value={gender}/>
                </div>

                {/* <div class="form-group col-md-4">
                    <label for="inputPassword4">Email </label>
                    <input type="text" class="form-control disabled" id="inputPassword4" value={email}/>
                </div> */}
            </div>


            <div class="form-row ">
               

                <div class="form-group col-md-4">
                    {/* <label for="inputPassword4">Email </label>
                    <input type="text" class="form-control disabled" id="inputPassword4" value="edidiongbobson@gmail.com"/> */}
                </div>
            </div>
  
  
 
  
  


        </section>


<hr/>


{/* const[temperature , setTemperature] = useState("");
    const[pulse_rate, setPulseRate] = useState("");
    const[blood_pressure , setBloodPressure] = useState("");
   
    const[respiratory_rate, setRespiratoryRate] = useState("");
    const[weight, setWeight] = useState(""); */}

<section className='personalinfo col-md-10 m-auto'>

<h5 className='personalheading'>Vital Signs for {firstname}</h5>


<div class="form-row">
    <div class="form-group col-md-2">
    <label for="inputEmail4">Weight(kg)</label>
    <input type="number"onChange={function(e){
        setWeight(e.target.value)
    }} value={weight} class="form-control " id="inputEmail4" />
    </div>

    <div class="form-group col-md-2">
    <label for="inputEmail4">Height(cm)</label>
    <input type="number"onChange={function(e){
        setHeight(e.target.value)
    }} value={height} class="form-control " id="inputEmail4" />
    </div>
    <div class="form-group col-md-2">
        <label for="inputPassword4">Temperature(25&deg;C)</label>
        <input onChange={function(e){
            setTemperature(e.target.value)
        }} value={temperature} type="number" class="form-control disabled" id="inputPassword4"/>
    </div>

    <div class="form-group col-md-2">
        <label for="inputPassword4">Pulse Rate (bpm) </label>
        <input onChange={function(e){
            setPulseRate(e.target.value)
        }} value={pulse_rate} type="number" class="form-control disabled" id="inputPassword4" />
    </div>

    <div class="form-group col-md-2">
    <label for="inputEmail4">Blood Pressure(mmHg)</label>
    <input onChange={function(e){
        setBloodPressure(e.target.value)
    }} value={blood_pressure} type="text" class="form-control disabled" id="inputEmail4" placeholder='e.g 120 / 70'/>
    </div>
    <div class="form-group col-md-2">
        <label for="inputPassword4">Respiratory Rate(bpm)</label>
        <input onChange={function(e){
            setRespiratoryRate(e.target.value);

        }} value={respiratory_rate} type="number" class="form-control disabled" id="inputPassword4" />
    </div>

    <div class="form-group col-md-2">
        {/* <label for="inputPassword4">Email </label>
        <input type="text" class="form-control disabled" id="inputPassword4" value="edidiongbobson@gmail.com"/> */}
    </div>
</div>


{/* <div class="form-row ">
    
</div> */}







</section>


<hr/>


        <section className='symptoms col-md-10 m-auto'>

        <h5 className='personalheading'>Symptoms and Medical History</h5>
                    <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label">Main Symptom(s) <span className='text-danger font-weight-bold'>*</span> </label>
                <div class="col-sm-9">
                <input onChange={handleInputChange} value={searchTerm} type="text" class="form-control" id="inputPassword" placeholder="Enter Main Symptoms"/>
                
                {searchTerm && filteredSymptoms.length > 0 && 
                <ul className=''>
                    {filteredSymptoms.map((item, index) => (
                    <li onClick={function(e){

                        setSymptomsList([...symptomsList , item]);
                        setSearchTerm('');
                    }} className='searchItem font-weight-bold' key={index}>{item}</li>
                    ))}
                </ul>

                    }

                    {symptomsList.map((list, index) => (
                        <p className='badge badge-info mx-1'key={index}>{list} <a onClick={function(e){
                            e.preventDefault();
                            const updatedSymptoms = [...symptomsList];
                            updatedSymptoms.splice(index, 1);
                            setSymptomsList(updatedSymptoms);
                        }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
                    ))}
                </div>

                   
                
            </div>

            {/* <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label">Other Symptoms</label>
                <div class="col-sm-9">
                <textarea onChange={function(e){
                    setOtherSymptoms(e.target.value);
                }} value={othersymptoms} type="text" class="form-control" id="inputPassword"></textarea>
                </div>
            </div> */}


            <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label">History of Presenting Compliants <span className='text-danger font-weight-bold'>*</span></label>
                <div class="col-sm-9">
                <textarea onChange={function(e){
                    setHistoryOfCompliants(e.target.value);
                }} value={historyOfCompliants} type="text" class="form-control" id="inputPassword"></textarea>
                </div>
            </div>


            <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label">Allergies <span className='text-danger font-weight-bold'>*</span></label>
                <div class="col-sm-4">
                <input  onChange={function(e){
                    setSearchAllergy(e.target.value);
                }} value={searchAllergy} type="text" class="form-control" id="inputPassword"/>
                
                
                
                </div>

                <button onClick={function(e){
                    e.preventDefault();
                    if(searchAllergy != ''){
                    setAllergies([...allergies , searchAllergy]);
                    setSearchAllergy('');
                    clearAllergies()
                    }

                }} className='col-sm-1 buttoncolor font-weight-bold rounded'>+

                </button>

                
            </div>
                <div className='row'>
                    <div className='col-sm-3'></div>
                    <div className='col-sm-9'>
                    {allergies.map((list, index) => (
                        <p className='badge badge-info mx-1'key={index}>{list} <a onClick={function(e){
                            e.preventDefault();
                            const updatedAllergiess = [...allergies];
                            updatedAllergiess.splice(index, 1);
                            setAllergies(updatedAllergiess);
                            setSearchAllergy('');
                            clearAllergies()
                        }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
                    ))}
                    </div>

                </div>
        </section>

        <hr/>


        <section className='symptoms col-md-10 m-auto'>

<h5 className='personalheading'>Diagnosis & Procedures</h5>

        <div className='row'>
            <div class="form-group col-md-6">
        <label for="inputPassword" class=""> Diagnosis <span className='text-danger font-weight-bold'>*</span></label>
        
        <input onChange={handleDiagnosisChange} value={diagnosisTerm} type="text" class="form-control" id="inputPassword" placeholder="Search Diagnosis"/>

        {diagnosisTerm && filteredDiagnosis.length > 0 && 
                <ul className=''>
                    {filteredDiagnosis.map((item, index) => (
                    <li onClick={function(e){

                        setDiagnosesList({...diagnosesList, name:item});
                        setDiagnosisTerm('');
                    }} className='searchItem font-weight-bold' key={index}>{item}</li>
                    ))}
                </ul>

                    }

                    {/* {diagnosesList.map((list, index) => (
                        <p className='badge badge-info mx-1'key={index}>{list} <a onClick={function(e){
                            e.preventDefault();
                            const updatedDiagnoses = [...diagnosesList];
                            updatedDiagnoses.splice(index, 1);
                            setDiagnosesList(updatedDiagnoses);
                        }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
                    ))} */}

                    {diagnosesList.name !== '' &&  <div className='row'> <p className='col-md-6 badge badge-info mx-1'>{diagnosesList.name} </p>
                    
                    <input className='' type='checkbox'onChange={function(e){
                        let SuspectedStatus = diagnosesList.isSuspected;
                            setDiagnosesList({...diagnosesList, isSuspected:!SuspectedStatus});
                            console.log("checked");
                        }}  /><span style={{
                            fontSize:"12px",
                            fontWeight:"bold",
                        }}>Suspected <img data-toggle="modal" data-target="#exampleModal" style={{
                            width:"15px",
                        }} src='https://res.cloudinary.com/edifice-solutions/image/upload/v1686664736/Vector_p5jnby.svg' /> </span>
                    
                    <span className='px-5'></span>
                    <a onClick={function(e){
                            e.preventDefault();
                            
                            setDiagnosesList({...diagnosesList, name:"", isSuspected: false});
                        }} href='' className='symptomscancel   text-info px-2 font-weight-bold text-right'> X</a>
                    </div>}

     
    </div>

    {/* other diagnosis */}

    <div class="form-group col-md-6">
        <label for="inputPassword" class=""> Diagnosis 2</label>
        
        <input onChange={handleDiagnosisChange2} value={diagnosisTerm2} type="text" class="form-control" id="inputPassword" placeholder="Search Diagnosis"/>

        {diagnosisTerm2 && filteredDiagnosis2.length > 0 && 
                <ul className=''>
                    {filteredDiagnosis2.map((item, index) => (
                    <li onClick={function(e){

                        setOtherDiagnosis({...otherDiagnosis, name:item});
                        setDiagnosisTerm2('');
                    }} className='searchItem font-weight-bold' key={index}>{item}</li>
                    ))}
                </ul>

                    }

                    {/* {diagnosesList.map((list, index) => (
                        <p className='badge badge-info mx-1'key={index}>{list} <a onClick={function(e){
                            e.preventDefault();
                            const updatedDiagnoses = [...diagnosesList];
                            updatedDiagnoses.splice(index, 1);
                            setDiagnosesList(updatedDiagnoses);
                        }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
                    ))} */}

                    {otherDiagnosis.name !== '' &&  <div className='row'> <p className='col-md-6 badge badge-info mx-1'>{otherDiagnosis.name} </p>
                    
                    <input className='' type='checkbox'onChange={function(e){
                        let SuspectedStatus = otherDiagnosis.isSuspected;
                        setOtherDiagnosis({...otherDiagnosis, isSuspected:!SuspectedStatus});
                            console.log("checked");
                        }}  /><span style={{
                            fontSize:"12px",
                            fontWeight:"bold",
                        }}>Suspected <img data-toggle="modal" data-target="#exampleModal" style={{
                            width:"15px",
                        }} src='https://res.cloudinary.com/edifice-solutions/image/upload/v1686664736/Vector_p5jnby.svg' /> </span>
                    
                    <span className='px-5'></span>
                    <a onClick={function(e){
                            e.preventDefault();
                            
                            setOtherDiagnosis({...otherDiagnosis, name:"", isSuspected: false});
                        }} href='' className='symptomscancel   text-info px-2 font-weight-bold text-right'> X</a>
                    </div>}

     
    </div>


 

    </div>

    

    {/* <div class="form-group row">
        <label for="inputPassword" class="col-sm-3 col-form-label">Others </label>
        <div class="col-sm-9">
        <input onChange={function(e){
            setOtherDiagnosis(e.target.value)
        }} value={otherDiagnosis} type="text" class="form-control" id="inputPassword"/>
        </div>
    </div> */}

        <div className="row">

        <div class="form-group col-md-4">
            <label for="inputEmail4">Laboratory Test</label>
            <input onChange={handleLaboratoryChange} value={laboratoryTerm} type="text" class="form-control" id="inputPassword" placeholder="Search Laboratory Test"/>
        
            {laboratoryTerm && filteredLaboratory.length > 0 && 
                <ul className='mt-3'>
                    {filteredLaboratory.map((item, index) => (
                    <li onClick={function(e){

                        setLaboratoryList([...laboratoryList , item]);
                        setLaboratoryTerm('');
                    }} className='searchItem font-weight-bold' key={index}>{item}</li>
                    ))}
                </ul>

            }

        {laboratoryList.map((list, index) => (
                <p className='badge badge-info mx-1 my-2'key={index}>{list} <a onClick={function(e){
                    e.preventDefault();
                    const updatedLaboratory = [...laboratoryList];
                    updatedLaboratory.splice(index, 1);
                    setLaboratoryList(updatedLaboratory);
                }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
            ))}



        </div>

        {/* end of laboratory */}





        <div class="form-group col-md-4">
            <label for="inputEmail4">X-ray</label>
            <input onChange={handleXrayChange} value={xrayTerm} type="text" class="form-control" id="inputPassword" placeholder="Search X-ray"/>
        
            {xrayTerm && filteredXray.length > 0 && 
                <ul className='mt-3'>
                    {filteredXray.map((item, index) => (
                    <li onClick={function(e){

                        setXrayList([...xrayList , item]);
                        setXrayTerm('');
                    }} className='searchItem font-weight-bold' key={index}>{item}</li>
                    ))}
                </ul>

            }

        {xrayList.map((list, index) => (
                <p className='badge badge-info mx-1 my-2'key={index}>{list} <a onClick={function(e){
                    e.preventDefault();
                    const updatedXray = [...xrayList];
                    updatedXray.splice(index, 1);
                    setXrayList(updatedXray);
                }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
            ))}



        </div>

        {/* end of xray */}


        <div class="form-group col-md-4">
            <label for="inputEmail4">Ultrasound</label>
            <input onChange={handleUltrasoundChange} value={ultrasoundTerm} type="text" class="form-control" id="inputPassword" placeholder="Search Ultrasound"/>
        
            {ultrasoundTerm && filteredUltrasound.length > 0 && 
                <ul className='mt-3'>
                    {filteredUltrasound.map((item, index) => (
                    <li onClick={function(e){

                        setUltrasoundList([...ultrasoundList , item]);
                        setUtraSoundTerm('');
                    }} className='searchItem font-weight-bold' key={index}>{item}</li>
                    ))}
                </ul>

            }

        {ultrasoundList.map((list, index) => (
                <p className='badge badge-info mx-1 my-2'key={index}>{list} <a onClick={function(e){
                    e.preventDefault();
                    const updatedUltrasound = [...ultrasoundList];
                    updatedUltrasound.splice(index, 1);
                    setUltrasoundList(updatedUltrasound);
                }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
            ))}



        </div>
{/* end of ultrasound */}


     </div>
    

    {/* <div class="form-group row">
        <label for="inputPassword" class="col-sm-3 col-form-label"> Procedures </label>
        <div class="col-sm-9">
        <input onChange={handleProcedureChange} value={procedureTerm} type="text" class="form-control" id="inputPassword" placeholder="Search Procedures"/>
        

        {procedureTerm && filteredProcedures.length > 0 && 
                <ul className=''>
                    {filteredProcedures.map((item, index) => (
                    <li onClick={function(e){

                        setProcedureList([...procedureList , item]);
                        setProcedureTerm('');
                    }} className='searchItem font-weight-bold' key={index}>{item}</li>
                    ))}
                </ul>

         }



        {procedureList.map((list, index) => (
                <p className='badge badge-info mx-1'key={index}>{list} <a onClick={function(e){
                    e.preventDefault();
                    const updatedProcedures = [...procedureList];
                    updatedProcedures.splice(index, 1);
                    setProcedureList(updatedProcedures);
                }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
            ))}

                    
        </div>
    </div> */}


    {/* <div class="form-group row">
        <label for="inputPassword" class="col-sm-3 col-form-label">Comments <span className='text-danger font-weight-bold'>*</span></label>
        <div class="col-sm-9">
        <textarea onChange={function(e){
            setComment(e.target.value);
        }}  value={comments} type="text" class="form-control" id="inputPassword"></textarea>
        </div>
    </div> */}


  
</section>

<hr/>


<section className='symptoms col-md-10 m-auto'>

<h5 className='personalheading'>Drugs & Prescriptions </h5>
         
<div class="form-row">
                <div class="form-group col-md-2">
                <label for="inputEmail4">Drug</label>
                <input onChange={function(e){
                    setDrugName(e.target.value);
                    setDrugNameError(false)
                }} value={drugname} type="text" class="form-control disabled" id="inputEmail4" />
            {drugname_error && <p className="text-danger"style={{
                fontSize:"11px",
            }}>required</p>}

        {drugname && filteredDrugs.length > 0 && 
                <ul className=''>
                    {filteredDrugs.map((item, index) => (
                    <li onClick={function(e){

                        // setSymptomsList([...symptomsList , item]);
                        // setSearchTerm('');
                        setDrugName(item);
                    }} className='searchItem font-weight-bold' key={index}>{item}</li>
                    ))}
                </ul>

                    }


                </div>
                <div class="form-group col-md-2">
                    <label for="inputPassword4">Dosage Form</label>
                    <select onChange={function(e){
                        setDosageType(e.target.value)
                        setDosageTypeError(false)
                    }} value={dosageType} class="form-control disabled" id="inputPassword4" >
                        <option value="">Choose</option>
                        <option value="Tablets">Tablets</option>
                        <option value="Capsules">Capsules</option>
                        <option value="Syrups">Syrups</option>
                        <option value="Granules">Granules</option>
                        <option value="Gels">Gels</option>
                        <option value="Paste">Paste</option>


                    </select>
                    {dosageType_error && <p className="text-danger"style={{
                fontSize:"11px",
            }}>required</p>}
                </div>

                <div class="form-group col-md-1">
                    <label for="inputPassword4">Strength </label>
                    
                    <input onChange={function(e){
                        setStrength(e.target.value);
                        setStrengthError(false)
                    }}  value={strength} type="text" class="form-control" id="inputPassword4" />
                        {/* <option value=""></option> */}

                        {strength_error && <p className="text-danger"style={{
                fontSize:"11px",
            }}>required</p>}
                       

                        
                    
                </div>


                <div class="form-group col-md-1">
                    <label for="inputPassword4">Unit </label>
                    
                    <select onChange={function(e){
                        setUnit(e.target.value)
                        setUnitError(false)
                    }} value={unit}class="form-control disabled" id="inputPassword4" >
                    <option value="">Choose</option>
                    <option value="Milligram (mg)">Milligram (mg)</option>
                        <option value="Gram (g)">Gram (g)</option>
                        <option value="Kilogram (kg)">Kilogram (kg)</option>
                        <option value="Milliliter (mL)">Milliliter (mL)</option>
                        <option value="Cubic centimeter (cc)">Cubic centimeter (cc)</option>
                        <option value="Drop (gtt)">Drop (gtt)</option>
                        
                    </select>
                    {unit_error && <p className="text-danger"style={{
                fontSize:"11px",
            }}>required</p>}
                </div>

                <div class="form-group col-md-1">
                    <label for="inputPassword4">Qty/Dose </label>
                    
                    <select onChange={function(e){
                        setQuanity(e.target.value)
                        setQuantityError(false)
                    }} value={quantity} class="form-control disabled" id="inputPassword4" >
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>

                        
                    </select>
                    {quantity_error && <p className="text-danger"style={{
                fontSize:"11px",
            }}>required</p>}
                </div>

                <div class="form-group col-md-1">
                    <label for="inputPassword4">How Often </label>
                    
                    <select onChange={function(e){
                        setFrequency(e.target.value)
                        setFrequencyError(false)
                    }} value={frequency} class="form-control disabled" id="inputPassword4" >
                        <option value=""></option>

                        {how_often.map(function(item,index){
                            return (<option key={index} value={item}>{item}</option>)
                        })}

                        
                    </select>
                    {frequency_error && <p className="text-danger"style={{
                fontSize:"11px",
            }}>required</p>}
                </div>

                <div class="form-group col-md-1">
                    <label for="inputPassword4">Duration </label>
                    
                    <select onChange={function(e){
                        setDuration(e.target.value)
                        setDurationError(false)
                    }} value={duration} class="form-control disabled" id="inputPassword4" >
                        
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>


                        
                    </select>
                    {duration_error && <p className="text-danger"style={{
                fontSize:"11px",
            }}>required</p>}
                </div>


                <div class="form-group col-md-1">
                    <label for="inputPassword4">Days/Weeks </label>
                    
                    <select onChange={function(e){
                        setDurationType(e.target.value)
                        setDurationTypeError(false)
                    }} value={durationType} class="form-control disabled" id="inputPassword4" >
                        
                        <option value=""></option>
                        <option value="Day(s)">Day(s)</option>
                        <option value="Weeks(s)">Week(s)</option>
                        


                        
                    </select>
                    {durationType_error && <p className="text-danger"style={{
                fontSize:"11px",
            }}>required</p>}
                </div>


                {/* <div class="form-group col-md-2">
                    <label for="inputPassword4">Dosage</label>
                    
                    <input onChange={function(e){
                        setDosage(e.target.value);
                    }} value={dosage} type="text" class="form-control disabled" id="inputEmail4" />
                </div> */}


                <div class="form-group col-md-2 mt-4">
                    
                    
                    <button onClick={function(e){
                        e.preventDefault();

                        addToPrescription();
                    }} class=" btn buttoncolor font-weight-bold">+</button>
                </div>

            
            </div>

            {/* dosageType: dosageType,
        strength: strength,
        unit: unit,
        quantity:quantity,
        dosage:dosage */}


            {prescriptions.length > 0 && 
                <div className="row">
                  {prescriptions.map((list, index) => (
                <p className='badge badge-info mx-1 my-2 col-md-5 font-weight-bold'key={index}>{list.drugname} - {list.dosageType} - {list.strength} - {list.unit} - {list.quantity} - {list.dosage}<a onClick={function(e){
                    e.preventDefault();
                    const updatedPrescription = [...prescriptions];
                   updatedPrescription.splice(index, 1);
                    setPrescriptions(updatedPrescription);
                }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
            ))}

                </div>
            
            
            }

           
    


   

  
</section>

            <hr/>


          



            <section className='symptoms col-md-10 m-auto'>
            <div className='col-md-10'>
                    <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} /> <span style={{
                    fontSize:"13px",
                    fontStyle:"italic",
                    fontWeight:"bold",
                    color:"black"
                }}>Require Follow up ? </span>

            </div>

          <hr/>


    {isChecked && <div>
 <h5 className='personalheading'>Follow Up Appointment</h5>

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

        
                           


                                {/* time div below */}

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
                                                    
                                                    
                                                    <div key={index} class="col-3"
                                                    onClick={() => setValue("time", row.value)}>

                                                     

                                                        <div class={`time-picker ${value === row.value && 'active'}`}>{row.label}</div>


                                                    </div>
                                                    
                                                    
                                                    )}
                                                /> : 
                                                <div 
                                                
                                               
                                                
                                                key={index} class="col-3"
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

                            {/* end here */}


      




</div>}
 

  
</section>

    <br>
    </br>

    <br>
    </br>

    {/* const[symptomsList , setSymptomsList] = useState([]);
    const[refno, setRefNo] = useState("");

    const[othersymptoms , setOtherSymptoms] = useState("");
    const[historyOfCompliants , setHistoryOfCompliants] = useState("");

    const[allergies , setAllergies] = useState([]);
    const[diagnosesList , setDiagnosesList]= useState([]);
    const[otherDiagnosis , setOtherDiagnosis] = useState("");
    const[procedureList , setProcedureList] = useState([]);
    const[comments , setComment] = useState('');
    const[prescriptions , setPrescriptions] = useState([]);
    const[followUpDate , setFollowUpDate] = useState("");
    const[followUpTime , setFollowUpTime] = useState(""); */}

    {/* finalbutton */}

{symptomsList && historyOfCompliants && allergies && diagnosesList.name !== '' && 
            <div className='col-md-4 m-auto'>

                <button type="submit"className="btn btn-success w-100 py-2 font-weight-bold"style={{
                    fontSize:"20px",
                    textAlign:"center"
                }}>Save and Submit</button>

            </div>

 }

            <br>
            </br>
            <br></br>




        </form>

       
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p className='text-center'>Please check the box if the diagnosis is based on suspicion. Uncheck if you are certain.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
        </>
    );
}

export default Consultation;