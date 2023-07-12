import React from 'react';

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function ConsultationSummary(){
    const { ref } = useParams();
    const[records, setRecords] = useState({});
    const[symptomList , setSymptomsList] = useState([]);
    const[allergies , setAllergies] = useState([]);
    const[diagnosesList , setDiagnosesList] = useState({});
    const[otherDiagnosis , setOtherDiagnosis] = useState({})
    const[laboratoryList , setLaboratoryList]= useState([]);
    const[xrayList , setXrayList] = useState([]);
    const[ultrasoundList, setUltrasoundList] = useState([]);
    const[prescription, setPrescriptions] = useState([]);

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

        


        }).catch(error => {
            console.log(error)
        })

         
         
     },[]);
    
    return (
        <>
           <br/>
            

            <div className='col-md-10 m-auto rounded card py-2 '>
             

             


          
              

                <div className='card py-1'>
                    <h5 className='text-center  rounded  text-center '>Consultation Summary for {ref}</h5>
                </div>

                <div className='card py-2 px-2 text-center'style={{
                    minHeight:"600px",
                    backgroundColor:"#F2F9FF",
                }}>

                    {/* patients information */}
                    
                    

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
                    

                    <hr/>

                    <div className='row py-1'>
                        <div className='col-md-4'>
                            <p className='summarypara'><span><b>Symptoms</b></span> </p>
                             
                            <ul className="symptomlist">
                                {symptomList.map(function(item,index){
                                    return (
                                        <li className='list-style-none summarypara'key={index}>{item},</li>
                                    );
                                })}
                            </ul>

                            
                            
                        </div>

                        <div className='col-md-4'>
                        <p className='summarypara'><span><b>History Of Compliants</b></span> </p>

                            <div className="summarypara">
                                {records.history_of_complaints}
                            </div>

                            
                            
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

                            <a className='text-center'style={{
                                color:"#1997cf",
                                fontSize:"13px",
                                fontWeight:"bold"
                            }}>UPLOAD RESULTS</a>

                            
                            
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


                            <a className='text-center'style={{
                                color:"#1997cf",
                                fontSize:"13px",
                                fontWeight:"bold"
                            }}>UPLOAD RESULTS</a>

                           
                            
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

                            <a className='text-center'style={{
                                color:"#1997cf",
                                fontSize:"13px",
                                fontWeight:"bold"
                            }}>UPLOAD RESULTS</a>
                           
                            
                        </div>

                       

                    </div>

                    <hr/>

                    <div className='row py-1'>
                        <div className='col-md-12'>
                            <p className='summarypara'><span><b>Prescriptions</b></span> </p>

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

                   


                    <hr/>


                  


                </div>


            </div>
        </>
    );
}

export default ConsultationSummary;