import React, { useState } from 'react';
import { Link, useParams, useHistory} from 'react-router-dom';
import './consultation.css';
import symptom from './symptoms.js';
import diagnoses from './diagnosis.js';
import procedure from './procedures';
import axios from 'axios';
import moment from 'moment';








function Consultation(){

    const history = useHistory();
    const { ref } = useParams();



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

        


        }).catch(error => {
            console.log(error)
        })

         
         
     },[]);


     //user data

     const[firstname , setFirstName] = useState("");
     const[lastname , setLastName] = useState("");
     const[email , setEmail] = useState("");
     const[dob , setDob] = useState("");
     const[gender , setGender] = useState("");

     
     

     

//    Form datas to be submitted 
    const[symptomsList , setSymptomsList] = useState([]);
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
    const[followUpTime , setFollowUpTime] = useState("");




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
   

    const handleDiagnosisChange = (event) => {
      setDiagnosisTerm(event.target.value);
    };
  
    const filteredDiagnosis = diagnoses.filter((dynos) =>
      dynos.toLowerCase().includes(diagnosisTerm.toLowerCase())
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





//For procedure search




    function clearAllergies(){
        setSearchAllergy("");

    }

// Prescription datas

    const[drugname, setDrugName] = useState("");
    const[dosageType , setDosageType] = useState("");

    const[strength , setStrength] = useState("");
    const[unit , setUnit] = useState("");
    const[quantity , setQuanity] = useState("");

    const[dosage , setDosage] = useState("");


    const[drugs , setDrugs] = useState([]);


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



    
function addToPrescription(){
    
    const newMedication = {
        drugname: drugname,
        dosageType: dosageType,
        strength: strength,
        unit: unit,
        quantity:quantity,
        dosage:dosage

      };

     

      

      setPrescriptions([...prescriptions, newMedication]);

      setDrugName('');
      setDosageType('');
      setStrength('');
      setUnit('');
      setQuanity('');
      setDosage('');


     
}


    function handleSubmit(e){
        e.preventDefault();

       if(symptomsList && historyOfCompliants && allergies && diagnosesList && comments){
        axios.post('https://admin.asknello.com/api/nellomedicalrecords', {

            // const[symptomsList , setSymptomsList] = useState([]);
            // const[refno, setRefNo] = useState("");
        
            // const[othersymptoms , setOtherSymptoms] = useState("");
            // const[historyOfCompliants , setHistoryOfCompliants] = useState("");
        
            // const[allergies , setAllergies] = useState([]);
            // const[diagnosesList , setDiagnosesList]= useState([]);
            // const[otherDiagnosis , setOtherDiagnosis] = useState("");
            // const[procedureList , setProcedureList] = useState([]);
            // const[comments , setComment] = useState('');
            // const[prescriptions , setPrescriptions] = useState([]);
            // const[followUpDate , setFollowUpDate] = useState("");
            // const[followUpTime , setFollowUpTime] = useState("");
        refno:refno,
        symptomsList:symptomsList,
        othersymptoms:othersymptoms,
        historyOfCompliants:historyOfCompliants,
        allergies:allergies,
        diagnosesList:diagnosesList,
        otherDiagnosis:otherDiagnosis,
        procedureList:procedureList,
        comments:comments,
        prescriptions:prescriptions,
        followUpDate:followUpDate,
        followUpTime:followUpTime
            

        }).then(response => {
           console.log(response)

           if(response){
               alert(response.data);
           }

        


        }).catch(error => {
            console.log(error)
        })
       }

       else{
           alert("Some Required Values are empty");
       }
    }




    return (
        <>
             <form onSubmit={handleSubmit}>
            <div className='col-md-10 py-2 m-auto intro rounded '>
                <h3 className='introheading text-center' >Consultation With Reference no. {refno} </h3>
            </div>
        

        <section className='personalinfo col-md-10 m-auto'>

            <h5 className='personalheading'>Patient's Information</h5>

           
            <div class="form-row">
                <div class="form-group col-md-4">
                <label for="inputEmail4">Firstname</label>
                <input type="text" class="form-control disabled" id="inputEmail4" value={firstname}/>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputPassword4">Lastname</label>
                    <input type="text" class="form-control disabled" id="inputPassword4" value={lastname}/>
                </div>

                <div class="form-group col-md-4">
                    <label for="inputPassword4">Email </label>
                    <input type="text" class="form-control disabled" id="inputPassword4" value={email}/>
                </div>
            </div>


            <div class="form-row ">
                <div class="form-group col-md-4">
                <label for="inputEmail4">Date Of Birth</label>
                <input type="text" class="form-control disabled" id="inputEmail4" value={dob}/>
                </div>
                <div class="form-group col-md-4">
                    <label for="inputPassword4">Gender</label>
                    <input type="text" class="form-control disabled" id="inputPassword4" value={gender}/>
                </div>

                <div class="form-group col-md-4">
                    {/* <label for="inputPassword4">Email </label>
                    <input type="text" class="form-control disabled" id="inputPassword4" value="edidiongbobson@gmail.com"/> */}
                </div>
            </div>
  
  
 
  
  


        </section>


<hr/>


        <section className='symptoms col-md-10 m-auto'>

        <h5 className='personalheading'>Symptoms and Medical History</h5>
                    <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label">Main Symptom(s) <span className='text-danger font-weight-bold'>*</span> </label>
                <div class="col-sm-9">
                <input onChange={handleInputChange} value={searchTerm} type="text" class="form-control" id="inputPassword" placeholder="Enter Main Symptoms"/>
                
                {searchTerm && filteredSymptoms.length > 0 && 
                <ul className='searchedList'>
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

            <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label">Other Symptoms</label>
                <div class="col-sm-9">
                <textarea onChange={function(e){
                    setOtherSymptoms(e.target.value);
                }} value={othersymptoms} type="text" class="form-control" id="inputPassword"></textarea>
                </div>
            </div>


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
            <div class="form-group row">
        <label for="inputPassword" class="col-sm-3 col-form-label"> Diagnosis <span className='text-danger font-weight-bold'>*</span></label>
        <div class="col-sm-9">
        <input onChange={handleDiagnosisChange} value={diagnosisTerm} type="text" class="form-control" id="inputPassword" placeholder="Search Diagnosis"/>

        {diagnosisTerm && filteredDiagnosis.length > 0 && 
                <ul className='searchedList'>
                    {filteredDiagnosis.map((item, index) => (
                    <li onClick={function(e){

                        setDiagnosesList([...diagnosesList , item]);
                        setDiagnosisTerm('');
                    }} className='searchItem font-weight-bold' key={index}>{item}</li>
                    ))}
                </ul>

                    }

                    {diagnosesList.map((list, index) => (
                        <p className='badge badge-info mx-1'key={index}>{list} <a onClick={function(e){
                            e.preventDefault();
                            const updatedDiagnoses = [...diagnosesList];
                            updatedDiagnoses.splice(index, 1);
                            setDiagnosesList(updatedDiagnoses);
                        }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
                    ))}

            
        </div>
    </div>

    <div class="form-group row">
        <label for="inputPassword" class="col-sm-3 col-form-label">Others </label>
        <div class="col-sm-9">
        <input onChange={function(e){
            setOtherDiagnosis(e.target.value)
        }} value={otherDiagnosis} type="text" class="form-control" id="inputPassword"/>
        </div>
    </div>

    <div class="form-group row">
        <label for="inputPassword" class="col-sm-3 col-form-label"> Procedures </label>
        <div class="col-sm-9">
        <input onChange={handleProcedureChange} value={procedureTerm} type="text" class="form-control" id="inputPassword" placeholder="Search Procedures"/>
        

        {procedureTerm && filteredProcedures.length > 0 && 
                <ul className='searchedList'>
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
    </div>


    <div class="form-group row">
        <label for="inputPassword" class="col-sm-3 col-form-label">Comments <span className='text-danger font-weight-bold'>*</span></label>
        <div class="col-sm-9">
        <textarea onChange={function(e){
            setComment(e.target.value);
        }}  value={comments} type="text" class="form-control" id="inputPassword"></textarea>
        </div>
    </div>


  
</section>

<hr/>


<section className='symptoms col-md-10 m-auto'>

<h5 className='personalheading'>Drugs & Prescriptions </h5>
         
<div class="form-row">
                <div class="form-group col-md-3">
                <label for="inputEmail4">Drug</label>
                <input onChange={function(e){
                    setDrugName(e.target.value);
                }} value={drugname} type="text" class="form-control disabled" id="inputEmail4" />


        {drugname && filteredDrugs.length > 0 && 
                <ul className='searchedList'>
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
                    }} value={dosageType} class="form-control disabled" id="inputPassword4" >
                        <option value="">Choose</option>
                        <option value="Tablets">Tablets</option>
                        <option value="Capsules">Capsules</option>
                        <option value="Syrups">Syrups</option>
                        <option value="Granules">Granules</option>
                        <option value="Gels">Gels</option>
                        <option value="Paste">Paste</option>


                    </select>
                </div>

                <div class="form-group col-md-1">
                    <label for="inputPassword4">Strength </label>
                    
                    <input onChange={function(e){
                        setStrength(e.target.value);
                    }}  value={strength} type="text" class="form-control" id="inputPassword4" />
                        {/* <option value=""></option> */}
                       

                        
                    
                </div>


                <div class="form-group col-md-1">
                    <label for="inputPassword4">Unit </label>
                    
                    <select onChange={function(e){
                        setUnit(e.target.value)
                    }} value={unit}class="form-control disabled" id="inputPassword4" >
                    <option value="">Choose</option>
                    <option value="Milligram (mg)">Milligram (mg)</option>
                        <option value="Gram (g)">Gram (g)</option>
                        <option value="Kilogram (kg)">Kilogram (kg)</option>
                        <option value="Milliliter (mL)">Milliliter (mL)</option>
                        <option value="Cubic centimeter (cc)">Cubic centimeter (cc)</option>
                        <option value="Drop (gtt)">Drop (gtt)</option>
                        
                    </select>
                </div>

                <div class="form-group col-md-1">
                    <label for="inputPassword4">Qty/Dose </label>
                    
                    <select onChange={function(e){
                        setQuanity(e.target.value)
                    }} value={quantity} class="form-control disabled" id="inputPassword4" >
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
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPassword4">Dosage</label>
                    
                    <input onChange={function(e){
                        setDosage(e.target.value);
                    }} value={dosage} type="text" class="form-control disabled" id="inputEmail4" />
                </div>


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

<h5 className='personalheading'>Follow Up Appointment</h5>
            <div class="form-group row">
        <label for="inputPassword" class="col-sm-3 col-form-label">Follow Up Date</label>
        <div class="col-sm-9">
        <input onChange={function(e){
            setFollowUpDate(e.target.value);
        }} value={followUpDate} type="date"min={moment().format('MM-DD-YYYY')} class="form-control" id="inputPassword" />

       
      

            
        </div>
    </div>

{followUpDate && 
    <div class="form-group row">
        <label for="inputPassword" class="col-sm-3 col-form-label">Follow Up Time </label>
        <div class="col-sm-9">
     

                        <select onChange={function(e){
                            setFollowUpTime(e.target.value);
                        }} value={followUpTime} class="form-control" id="inputPassword4" >
                        <option value="8:00 am">8:00 am</option>
                        <option value="9:00 am">9:00 am</option>
                        <option value="10:00 am">10:00 am</option>
                        <option value="11:00 am">11:00 am</option>
                        <option value="12:00 pm">12:00 pm</option>
                        <option value="1:00 pm">1:00 pm</option>
                        <option value="2:00 pm">2:00 pm</option>
                        <option value="3:00 pm">3:00 pm</option>
                        <option value="4:00 pm">4:00 pm</option>
                        <option value="5:00 pm">5:00 pm</option>

                        
                    </select>
        </div>
    </div>
}
   





  
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

{symptomsList && historyOfCompliants && allergies && diagnosesList && comments && 
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
        </>
    );
}

export default Consultation;