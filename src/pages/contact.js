import React from 'react';

import './contact.css';
import { useState } from 'react';
import axios from 'axios';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { showLoader, hideLoader } from '../helper/loader';


function Contact (){

    const[name , setName] = useState("");
    const[email , setEmail] = useState("");
    const[type , setType] = useState("");
    const[message , setMessage] = useState();

    const Swal = require('sweetalert2')


  function handleSubmitFeedback (e){
    e.preventDefault();

 
    axios.post(`https://mw.asknello.com/api/customerfeedback`,{
                    
        //request body here to complete appointment process
                
                name : name,
                email: email,
               
                 type:type,
                   
                message:message
                    
    

        }).then(response => {
           
    
            console.log(response)

     
               
               console.log(response.data.message)

               setName("");
               setEmail("");
               setMessage("");
               

               Swal.fire(
                'Sent!',
                `${response.data.message}`,
                'success'
              )
               // return NotificationManager.success(response.message);
            

            // else if(response.data == 'false'){
            //     setShowBtn(true)
            //     console.log('correct')
            // }

            
          

 
        }).catch(error => {
            console.log(error)
        })

   }

   
   

    return (
        <div className="contact1">
		<div className="container-contact1">
			<div className="contact1-pic js-tilt" data-tilt>
				<img src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668417653/Online_Consultation_1_xorwmm.png" alt="IMG"/>
			</div>

			<form className="contact1-form validate-form"onSubmit={handleSubmitFeedback}>
				<span className="contact1-form-title">
					Feedback and Enquiry 
				</span>

				<div className="wrap-input1 validate-input" data-validate = "Name is required">
					<input onChange={function(e){
                        setName(e.target.value);
                        console.log(e.target.value);
                    }} className=" form-control" type="text"value={name} name="name" placeholder="Name" required/>
					<span className="shadow-input1"></span>
				</div>

				<div className="wrap-input1 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
					<input onChange={function(e){
                        setEmail(e.target.value);
                        
                    }} className="form-control" type="email" name="email"value={email} placeholder="Email" required/>
					<span className="shadow-input1"></span>
				</div>

				<div className="wrap-input1 validate-input" data-validate = "Subject is required">
					
                    <select onChange={function(e){
                        setType(e.target.value);
                        console.log(e.target.value);
                    }} className=' form-control 'required>
                      <option value="">Select Feedback Type</option>

                      <option value="Issues">Issues</option>
                      <option value="Complaints ">Complaints </option>
                      <option value="Enquiry ">Enquiry </option>

                      

                    </select>
				</div>

				<div className="wrap-input1 validate-input" data-validate = "Message is required">
					<textarea onChange={function(e){
                        setMessage(e.target.value);
                        console.log(e.target.value);
                    }} className=" form-control" name="message"value={message} placeholder="Message"></textarea>
					<span className="shadow-input1"></span>
				</div>

				<div className="container-contact1-form-btn">

                    {
                        name && email && type && message && <button className="contact1-form-btn">
						<span>
							Send Feedback
							
						</span>
					</button>
                    }
					
				</div>
			</form>
		</div>
	</div>
    );
}

export default Contact;