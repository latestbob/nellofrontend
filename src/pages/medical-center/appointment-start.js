import * as React from 'react';
import { ErrorMsg } from './../../components';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function DoctorAppointment({ medicalCenters, initAppointment, values }) {
    const { register, handleSubmit, onChange, formState: { errors } } = useForm({
        defaultValues: values
    });

    const[center_uuid , setCenterUuid] = useState("");
    const[specialization , setSpecialization] = useState([]);

    const location = useLocation();
    const data = location.state;
  


   
    

    //////////

    React.useEffect(()=>{
        
        if(data){
       
        axios.get(`https://admin.asknello.com/api/healthcenter/spec?uuid=${data.uuid}`, {
            

        }).then(response => {
           console.log(response)

           setSpecialization(response.data)

        


        }).catch(error => {
            console.log(error)
        })
    }

    console.log("working well");

         
         
     },[data]);


    //////





    return (<div class="container-width-sm py-5">
        {/* <h2>{data.name}</h2> */}
        <form id="form-appointment-start" onSubmit={handleSubmit(initAppointment)}>
            <div class="form-group">
                
                <select id="mycenter" class="form-control" {...register('medical_center', {
                    required: "Select medical center"
                })}  >
                    <option value={data.uuid}>{data.name}</option>
                    {/* {medicalCenters && medicalCenters.map((row, index) =>
                        <option key={row.id} value={row.uuid}>{row.name}</option>)} */}
                </select>
                <ErrorMsg errors={errors} name="medical_center" />
            </div>

            {/* <div class="form-group">
                <label>Please select care type</label>
                <select class="form-control" {...register('caretype', {
                    required: "Select Care Type",
                    
                })}>
                    <option value="">- Select -</option>
                    <option value="Clinical Services">Clinical Services</option>
                    <option value="Antenatal">Antenatal</option>
                </select>
                <ErrorMsg errors={errors} name="caretype" />
            </div> */}

                <div className="form-group">
                <label>Please select care type</label>
                <select 
                    className="form-control" 
                    {...register('caretype', { required: "Select Care Type" })}
                  // handle the event
                >
                    <option value="">- Select -</option>
                    {/* <option value="Clinical Services">Clinical Services</option>
                    <option value="Antenatal">Antenatal</option> */}

                        {specialization && specialization.map((row, index) =>
                        <option key={row.id} value={row.specialization}>{row.specialization}</option>)}
                </select>
                <ErrorMsg errors={errors} name="caretype" />
                </div>

            <div class="form-group">
                <label>Provide purpose for appointment</label>
                <textarea class="form-control" style={{ resize: 'none', height: '100px' }}
                    {...register('reason', {
                        required: "Provide reason for appointment"
                    })} ></textarea>
                <ErrorMsg errors={errors} name="reason" />
            </div>

            <button type="submit" class="btn btn-primary btn-arrow btn-lg btn-main">
                Proceed
            </button>
        </form>
    </div>);
}