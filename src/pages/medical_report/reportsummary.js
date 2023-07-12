import React from 'react';
import './consultation.css';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { NotificationManager } from 'react-notifications';
import symptom from './symptoms.js';
import diagnoses from './diagnosis.js';
import laboratory from './laboratory';
import xray from './xray';
import ultrasound from './ultrasound';


function ReportSummary(){


    const { ref } = useParams();
    const history = useHistory();
    const[records, setRecords] = useState({});
    const[symptomsList , setSymptomsList] = useState([]);
    const[allergies , setAllergies] = useState([]);
    
    const[diagnosesList , setDiagnosesList] = useState({ name: '', isSuspected: false });
    const[otherDiagnosis , setOtherDiagnosis] = useState({ name: '', isSuspected: false });
    // const[diagnosesList1 , setDiagnosesList1]= useState({ name: '', isSuspected: false });
    // const[otherDiagnosis1 , setOtherDiagnosis1] = useState({ name: '', isSuspected: false });
    const[laboratoryList , setLaboratoryList]= useState([]);
    
    const[xrayList , setXrayList] = useState([]);
  
    const[ultrasoundList, setUltrasoundList] = useState([]);
    
    const[prescription, setPrescriptions] = useState([]);
    const[historyOfCompliants, setHistoryOfCompliants] = useState("");

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

    // vital signs

    const[temperature , setTemperature] = useState("");
    const[pulse_rate, setPulseRate] = useState("");
    const[blood_pressure , setBloodPressure] = useState("");
   
    const[respiratory_rate, setRespiratoryRate] = useState("");
    const[weight, setWeight] = useState("");
    const[height, setHeight] = useState("");

    const [searchAllergy , setSearchAllergy] = useState('');

    function clearAllergies(){
        setSearchAllergy("");

    }

    React.useEffect(()=>{
        
     
       
        axios.get(`https://admin.asknello.com/api/healthrecords/${ref}`, {
            

        }).then(response => {
           console.log(response)

           setRecords(response.data)

           //const symptomsArray = JSON.parse(symptomsString);

           setSymptomsList(JSON.parse(response.data.symptoms))
           setAllergies(JSON.parse(response.data.allergies))
           setDiagnosesList(JSON.parse(response.data.diagnosis))
           setOtherDiagnosis(JSON.parse(response.data.other_diagnosis))
           setLaboratoryList(JSON.parse(response.data.laboratory))
           setXrayList(JSON.parse(response.data.xray))
           setUltrasoundList(JSON.parse(response.data.ultrasound))
           setPrescriptions(JSON.parse(response.data.prescriptions))

           setWeight(response.data.weight)
           setHeight(response.data.height)
           setTemperature(response.data.temperature)
           setPulseRate(response.data.pulse_rate)
           setBloodPressure(response.data.blood_pressure)
           setRespiratoryRate(response.data.respiratory_rate)
           setHistoryOfCompliants(response.data.history_of_complaints)


        


        }).catch(error => {
            console.log(error)
        })

         
         
     },[]);

     function updateUI(){
        axios.get(`https://admin.asknello.com/api/healthrecords/${ref}`, {
            

        }).then(response => {
           console.log(response)

           setRecords(response.data)

           //const symptomsArray = JSON.parse(symptomsString);

           setSymptomsList(JSON.parse(response.data.symptoms))
           setAllergies(JSON.parse(response.data.allergies))
           setDiagnosesList(JSON.parse(response.data.diagnosis))
           setOtherDiagnosis(JSON.parse(response.data.other_diagnosis))
           setLaboratoryList(JSON.parse(response.data.laboratory))
           setXrayList(JSON.parse(response.data.xray))
           setUltrasoundList(JSON.parse(response.data.ultrasound))
           setPrescriptions(JSON.parse(response.data.prescriptions))

           setWeight(response.data.weight)
           setHeight(response.data.height)
           setTemperature(response.data.temperature)
           setPulseRate(response.data.pulse_rate)
           setBloodPressure(response.data.blood_pressure)
           setRespiratoryRate(response.data.respiratory_rate)


        


        }).catch(error => {
            console.log(error)
        })

     }

     function handleVitalsSubmit(e){
         e.preventDefault()

         /////

         
            //console.log(doctor_title)
         axios.put(`https://admin.asknello.com/api/vitals/update/${ref}`, {
 
         // vitals
         weight:weight,
         height:height,
         temperature:temperature,
         pulse_rate:pulse_rate,
         blood_pressure:blood_pressure,
         respiratory_rate:respiratory_rate,
 
 
             
 
         }).then(response => {
            console.log(response)
 
            if(response){
            
            //history.push(`/summary/${ref}`)

            updateUI()

            return NotificationManager.success("Vitals Updated Successfully");
           

            
            }
 
         
 
 
         }).catch(error => {
             console.log(error)
         })
        
 
        


         ////

         
     }

    //  handle symptoms

    function handleSymptomsEdit(e){
        e.preventDefault()
        axios.put(`https://admin.asknello.com/api/symptoms/update/${ref}`, {
 
            // symptoms
            symptomsList:symptomsList
       
    
            }).then(response => {
               console.log(response)
    
               if(response){
               
               //history.push(`/summary/${ref}`)
   
               updateUI()
   
               return NotificationManager.success("Symptoms Updated Successfully");
              
   
               
               }
    
            
    
    
            }).catch(error => {
                console.log(error)
            })

       
    }

    // edit handle historyofcomplaints

    function handleHistoryEdit(e){
        e.preventDefault()
        axios.put(`https://admin.asknello.com/api/history/update/${ref}`, {
 
            // symptoms
            historyOfCompliants:historyOfCompliants
       
    
            }).then(response => {
               console.log(response)
    
               if(response){
               
               //history.push(`/summary/${ref}`)
   
               updateUI()
   
               return NotificationManager.success("History of Compliants Updated Successfully");
            
               
               }
    
            }).catch(error => {
                console.log(error)
            })
    }

    // edit allergies

    function handleAllergiesEdit(e){
        e.preventDefault()
        axios.put(`https://admin.asknello.com/api/allergies/update/${ref}`, {
 
            // symptoms
            allergies:allergies
       
    
            }).then(response => {
               console.log(response)
    
               if(response){
               
               //history.push(`/summary/${ref}`)
   
               updateUI()
   
               return NotificationManager.success("Allergies Updated Successfully");
            
               
               }
    
            }).catch(error => {
                console.log(error)
            })
    }

    // handle diagnosis edit



    //end of handle diagnosis edit


    function handleDiagnosisEdit(e){
        e.preventDefault()
        axios.put(`https://admin.asknello.com/api/diagnosis/update/${ref}`, {
 
            // symptoms
            diagnosesList:diagnosesList,
            otherDiagnosis:otherDiagnosis,
       
    
            }).then(response => {
               console.log(response)
    
               if(response){
               
               //history.push(`/summary/${ref}`)
   
               updateUI()
   
               return NotificationManager.success("Diagnosis Updated Successfully");
            
               
               }
    
            }).catch(error => {
                console.log(error)
            })
    }



    // handlelaboratory edit


    function handleLaboratoryEdit(e){
        e.preventDefault()
        axios.put(`https://admin.asknello.com/api/laboratory/update/${ref}`, {
 
            laboratory:laboratoryList,
            
       
    
            }).then(response => {
               console.log(response)
    
               if(response){
               
               //history.push(`/summary/${ref}`)
   
               updateUI()
   
               return NotificationManager.success("Laboratory Updated Successfully");
            
               
               }
    
            }).catch(error => {
                console.log(error)
            })
    }

    //handle Edit Xray


    function handleXrayEdit(e){
        e.preventDefault()
        axios.put(`https://admin.asknello.com/api/xray/update/${ref}`, {
 
         xray:xrayList,
            
       
    
            }).then(response => {
               console.log(response)
    
               if(response){
               
               //history.push(`/summary/${ref}`)
   
               updateUI()
   
               return NotificationManager.success("Xray Updated Successfully");
            
               
               }
    
            }).catch(error => {
                console.log(error)
            })
    }



// handle ultrasound Edit

function handleUltrasoundEdit(e){
    e.preventDefault()
    axios.put(`https://admin.asknello.com/api/ultrasound/update/${ref}`, {

     ultrasound:ultrasoundList
        
   

        }).then(response => {
           console.log(response)

           if(response){
           
           //history.push(`/summary/${ref}`)

           updateUI()

           return NotificationManager.success("Ultrasound Updated Successfully");
        
           
           }

        }).catch(error => {
            console.log(error)
        })
}



     // For Symptoms searches functions
    const [searchTerm, setSearchTerm] = useState('');
   

    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredSymptoms = symptom.filter((symptoms) =>
      symptoms.toLowerCase().includes(searchTerm.toLowerCase())
    );

// For Symptoms searches functions

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

    
    return (
        <>
           <br/>
            <br/>

            <div className='col-md-10 m-auto rounded card py-2 '>
             

                <div className='alert alert-success py-3 text-center'>
                    <p className='font-weight-bold text-success'style={{
                        fontSize:"15px",
                    }}>Consultation Records has been submitted succesfully</p>

                </div>


                <br/>
              

                <div className='card py-1'>
                    <h5 className='text-center  rounded  text-center '>Consultation Summary for {ref}</h5>
                </div>

                <div className='card py-2 px-2 text-center'style={{
                    minHeight:"600px",
                    backgroundColor:"#F2F9FF",
                }}>

                    {/* patients information */}
                    <div className='row py-1'>
                        <div className='col-md-3'>
                            <p className='summarypara'><span><b>First Name</b></span> <br/> {records.firstname}</p>
                            
                        </div>

                        <div className='col-md-3'>
                            <p className='summarypara'><span><b>Last Name</b></span> <br/> {records.lastname}</p>
                            
                        </div>

                        <div className='col-md-3'>
                            <p className='summarypara'><span><b>DOB</b></span> <br/> {records.dob}</p>
                            
                        </div>

                        <div className='col-md-3'>
                            <p className='summarypara'><span><b>Gender</b></span> <br/> {records.gender}</p>
                            
                        </div>

                    </div>

                    <hr/>
                    

                        {/* patients vitals */}
                        <div className='row py-1'>
                                <div className='col-md-2'>
                                    <p className='summarypara'><span><b>Weight</b></span> <br/> {records.weight} kg</p>
                                    
                                </div>

                                <div className='col-md-2'>
                                    <p className='summarypara'><span><b>Height</b></span>  <br/> {records.height} cm</p>
                                    
                                </div>

                                <div className='col-md-2'>
                                    <p className='summarypara'><span><b>Temperature</b></span> <br/> ({records.temperature}&deg;C)</p>
                                    
                                </div>

                                <div className='col-md-2'>
                                    <p className='summarypara'><span><b>Pulse Rate</b></span> <br/> {records.pulse_rate}(bpm)</p>
                                    
                                </div>

                                <div className='col-md-2'>
                                    <p className='summarypara'><span><b>Blood Pressure</b></span> <br/> {records.blood_pressure} mmHg</p>
                                    
                                </div>

                                <div className='col-md-2'>
                                    <p className='summarypara'><span><b>Respiratory Rate</b></span> <br/> {records.respiratory_rate} bpm</p>
                                    
                                </div>

                        

                    </div>
                    <a   type="button"data-toggle="modal" data-target="#exampleModal"className='text-center'style={{
                        color:"#1997cf",
                        fontSize:"13px",
                        fontWeight:"bold"
                    }}>Edit Vital Signs</a>

                    <hr/>

                    <div className='row py-1'>
                        <div className='col-md-4'>
                            <p className='summarypara'><span><b>Symptoms</b></span> </p>
                             
                            <ul className="symptomlist">
                                {symptomsList.map(function(item,index){
                                    return (
                                        <li className='list-style-none summarypara'key={index}>{item},</li>
                                    );
                                })}
                            </ul>

                            <a type="button"data-toggle="modal" data-target="#exampleModaltwo"className='text-center'style={{
                                color:"#1997cf",
                                fontSize:"13px",
                                fontWeight:"bold"
                            }}>Edit Symptoms</a>
                            
                        </div>

                        <div className='col-md-4'>
                        <p className='summarypara'><span><b>History Of Compliants</b></span> </p>

                            <div className="summarypara">
                                {records.history_of_complaints}
                            </div>

                            <a type="button"data-toggle="modal" data-target="#exampleModalthree"className='text-center'style={{
                                color:"#1997cf",
                                fontSize:"13px",
                                fontWeight:"bold"
                            }}>Edit History of Compliants</a>
                            
                        </div>

                        <div className='col-md-4'>
                        <p className='summarypara'><span><b>Allergies</b></span> </p>

                        <ul className="">
                                {allergies.map(function(item,index){
                                    return (
                                        <li className='list-style-none summarypara'key={index}>{item},</li>
                                    );
                                })}
                            </ul>

                            <a type="button"data-toggle="modal" data-target="#exampleModalfour"className='text-center'style={{
                                color:"#1997cf",
                                fontSize:"13px",
                                fontWeight:"bold"
                            }}>Edit Allergies</a>
                            
                        </div>

                       

                    </div>

                    <hr/>


                    <div className='row py-1'>
                        <div className='col-md-6'>
                            <p className='summarypara'><span><b>Diagnosis</b></span> </p>

                            
                                
                            <p className='list-style-none summarypara'>{diagnosesList.name}  {diagnosesList.isSuspected == true && <div>  <input type="checkbox"checked={true}/>Suspected</div>}</p>
                                   
                              
                            

                           
                            
                        </div>

                        <div className='col-md-6'>
                        <p className='summarypara'><span><b>Other Diagnosis</b></span> </p>

                           {otherDiagnosis &&  <p className='list-style-none summarypara'>{otherDiagnosis.name}  {otherDiagnosis.isSuspected == true && <div>  <input type="checkbox"checked={true}/>Suspected</div>}</p>}

                            
                            
                        </div>

                    </div>
                            <a type="button"data-toggle="modal" data-target="#exampleModalfive" className='text-center'style={{
                                color:"#1997cf",
                                fontSize:"13px",
                                fontWeight:"bold"
                            }}>Edit Diagnosis</a>

                    <hr/>

                    <div className='row py-1'>
                        <div className='col-md-4'>
                            <p className='summarypara'><span><b>Laboratory Test</b></span> </p>
                             
                            <ul className="symptomlist">
                                {laboratoryList.map(function(item,index){
                                    return (
                                        <li className='list-style-none summarypara'key={index}>{item},</li>
                                    );
                                })}
                            </ul>

                            <a type="button"data-toggle="modal" data-target="#exampleModalsix"className='text-center'style={{
                                color:"#1997cf",
                                fontSize:"13px",
                                fontWeight:"bold"
                            }}>Edit Laboratory</a>
                            
                        </div>

                        <div className='col-md-4'>
                        <p className='summarypara'><span><b>X-ray</b></span> </p>

                        <ul className="symptomlist">
                                {xrayList.map(function(item,index){
                                    return (
                                        <li className='list-style-none summarypara'key={index}>{item},</li>
                                    );
                                })}
                            </ul>

                            <a type="button"data-toggle="modal" data-target="#exampleModalseven"className='text-center'style={{
                                color:"#1997cf",
                                fontSize:"13px",
                                fontWeight:"bold"
                            }}>Edit X-ray</a>
                            
                        </div>

                        <div className='col-md-4'>
                        <p className='summarypara'><span><b>Ultrasound</b></span> </p>

                        <ul className="">
                                {ultrasoundList.map(function(item,index){
                                    return (
                                        <li className='list-style-none summarypara'key={index}>{item},</li>
                                    );
                                })}
                            </ul>

                            <a type="button"data-toggle="modal" data-target="#exampleModaleight"className='text-center'style={{
                                color:"#1997cf",
                                fontSize:"13px",
                                fontWeight:"bold"
                            }}>Edit Ultrasound</a>
                            
                        </div>

                       

                    </div>

                    <hr/>

                    <div className='row py-1'>
                        <div className='col-md-12'>
                            <p className='summarypara'><span><b>Prescription</b></span> </p>

                            {prescription.map(function(item,index){
                                    return (
                                       
                            <div className='row py-1'key={index}>
                            <div className='col-md-2'>
                                <p className='summarypara'><span><b>Drug Name</b></span> <br/> {item.drugname} </p>
                                
                            </div>

                            <div className='col-md-2'>
                                <p className='summarypara'><span><b>Dosage Type</b></span>  <br/> {item.dosageType} </p>
                                
                            </div>

                            <div className='col-md-2'>
                                <p className='summarypara'><span><b>Strength</b></span> <br/> {item.strength}</p>
                                
                            </div>

                            <div className='col-md-2'>
                                <p className='summarypara'><span><b>Unit</b></span> <br/> {item.unit}</p>
                                
                            </div>

                            <div className='col-md-2'>
                                <p className='summarypara'><span><b>Quantity</b></span> <br/> {item.quantity} </p>
                                
                            </div>

                            <div className='col-md-2'>
                                <p className='summarypara'><span><b>How Often</b></span> <br/> {item.frequency}</p>
                                
                            </div>

                    

                </div>
                                    );
                                })}

                    <a className='text-center'style={{
                        color:"#1997cf",
                        fontSize:"13px",
                        fontWeight:"bold"
                    }}>Edit Prescriptions</a>

                    <hr/>
                            
                        </div>

                        

                    </div>
                 


                    <div className='row py-1'>
                        <div className='col-md-6'>
                            <p className='summarypara'><span><b>Follow Up Date</b></span> <br/> {records.followup_date} </p>

                            

                            
                            
                        </div>


                        <div className='col-md-6'>
                            <p className='summarypara'><span><b>Follow Up Time</b></span> <br/> {records.followup_time} </p>

                            

                           
                            
                        </div>

                        

                    </div>

                    <a className='text-center'style={{
                                color:"#1997cf",
                                fontSize:"13px",
                                fontWeight:"bold"
                            }}>Edit Follow Up</a>


                    <hr/>


                  


                </div>


            </div>


            {/* vitals modal */}

            
{/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button> */}


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Vital Signs</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form onSubmit={handleVitalsSubmit}>

            <div class="form-row">
    <div class="form-group col-md-4">
    <label for="inputEmail4">Weight(kg)</label>
    <input type="number"onChange={function(e){
        setWeight(e.target.value)
    }} value={weight} class="form-control " id="inputEmail4" />
    </div>

    <div class="form-group col-md-4">
    <label for="inputEmail4">Height(cm)</label>
    <input type="number"onChange={function(e){
        setHeight(e.target.value)
    }} value={height} class="form-control " id="inputEmail4" />
    </div>
    <div class="form-group col-md-4">
        <label for="inputPassword4">Temperature(25&deg;C)</label>
        <input onChange={function(e){
            setTemperature(e.target.value)
        }} value={temperature} type="number" class="form-control disabled" id="inputPassword4"/>
    </div>

    <div class="form-group col-md-4">
        <label for="inputPassword4">Pulse Rate (bpm) </label>
        <input onChange={function(e){
            setPulseRate(e.target.value)
        }} value={pulse_rate} type="number" class="form-control disabled" id="inputPassword4" />
    </div>

    <div class="form-group col-md-4">
    <label for="inputEmail4">Blood Pressure(mmHg)</label>
    <input onChange={function(e){
        setBloodPressure(e.target.value)
    }} value={blood_pressure} type="text" class="form-control disabled" id="inputEmail4" placeholder='e.g 120 / 70'/>
    </div>
    <div class="form-group col-md-4">
        <label for="inputPassword4">Respiratory Rate(bpm)</label>
        <input onChange={function(e){
            setRespiratoryRate(e.target.value);

        }} value={respiratory_rate} type="number" class="form-control disabled" id="inputPassword4" />
    </div>

    
</div>
<div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
            </form>
      </div>
      
    </div>
  </div>
</div>


            {/* end of vitals modal */}


            {/* symptoms edit  */}

            <div class="modal fade" id="exampleModaltwo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabeltwo" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabeltwo">Edit Symptoms</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form onSubmit={handleSymptomsEdit}>

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

         
<div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
            </form>
      </div>
      
    </div>
  </div>
</div>




            {/* end of symptoms edit */}


            {/*Edit  History of complaints */}

            <div class="modal fade" id="exampleModalthree" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabelthree" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabelthree">Edit History oF Compliants</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form onSubmit={handleHistoryEdit}>

            <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label">History of Presenting Compliants <span className='text-danger font-weight-bold'>*</span></label>
                <div class="col-sm-9">
                <textarea onChange={function(e){
                    setHistoryOfCompliants(e.target.value);
                }} value={historyOfCompliants} type="text" class="form-control" id="inputPassword"></textarea>
                </div>
            </div>


            

         
<div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
            </form>
      </div>
      
    </div>
  </div>
</div>



            {/* End edit history of complaints */}

            {/* Edit Allergies */}


            <div class="modal fade" id="exampleModalfour" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabelfour" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabelfour">Edit Allergies</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form onSubmit={handleAllergiesEdit}>


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

            


            

         
<div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
            </form>
      </div>
      
    </div>
  </div>
</div>


            {/* end of edit allergies */}


            {/* Edit Diagnosis */}




            <div class="modal fade" id="exampleModalfive" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabelfive" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabelfive">Edit Diagnoses</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form onSubmit={handleDiagnosisEdit}>

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
                    
                    <input className=''checked={diagnosesList.isSuspected} type='checkbox'onChange={function(e){
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


          
            


            

         
<div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
            </form>
      </div>
      
    </div>
  </div>
</div>



            {/* End of Edit Diagnosis */}

            {/* Edit Laboratory  */}


            <div class="modal fade" id="exampleModalsix" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabelsix" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabelsix">Edit Laboratory Procedure(s)</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form onSubmit={handleLaboratoryEdit}>

            <div class="form-group ">
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

                     


            

         
<div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
            </form>
      </div>
      
    </div>
  </div>
</div>




            {/* End of Edit Laboratory */}


            {/* Edit xray  */}


            <div class="modal fade" id="exampleModalseven" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabelseven" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabelseven">Edit Xray Procedure(s)</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form onSubmit={handleXrayEdit}>
                

            <div class="form-group">
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
        

                     


            

         
<div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
            </form>
      </div>
      
    </div>
  </div>
</div>



            {/* end of edit xray */}


            {/* Edit Ultrasound */}

            <div class="modal fade" id="exampleModaleight" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabeleight" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabeleight">Edit Ultrasound Scan</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form onSubmit={handleUltrasoundEdit}>


        <div class="form-group">
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
                


                     


            

         
<div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
            </form>
      </div>
      
    </div>
  </div>
</div>


                


            {/* End of Edit Ultrasound */}
        </>
    );
}

export default ReportSummary;