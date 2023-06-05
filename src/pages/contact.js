import React from 'react';

import './contact.css';
import { useState } from 'react';
import axios from 'axios';



function Contact (){

    const[name , setName] = useState("");
    const[email , setEmail] = useState("");
    const[type , setType] = useState("");
    const[message , setMessage] = useState();

    const[selectedSla , setSelectedSla] = useState(null);

    const Swal = require('sweetalert2')

    const[sla, setSla] = useState([
        {
            "name": "General customer enquiry and complaint",
            "priority": 1,
            "resolution_time" : "30 mins",
            "dependencies":"N/A"
        },

        {
            "name": "Product Delivery",
            "priority": 1,
            "resolution_time" : "4 hours",
            "dependencies":"Service provider, Dispatch"
        },

        {
            "name": "Product is unavailable",
            "priority": 1,
            "resolution_time" : "24 hours",
            "dependencies":"Service Provider"
        },

        {
            "name": "Product undelivered",
            "priority": 1,
            "resolution_time" : "30 mins",
            "dependencies":"Service Provider , Dispatch"
        },

        {
            "name": "Wrong prescription & Product mismatch",
            "priority": 2,
            "resolution_time" : "4 hours",
            "dependencies":"Service Provider"
        },

        {
            "name": "Side effect from drugs",
            "priority": 2,
            "resolution_time" : "4 hours",
            "dependencies":"Service Provider"
        },

        {
            "name": "Expired, broken and unsealed drug",
            "priority": 1,
            "resolution_time" : "4 hours",
            "dependencies":"Service Provider, Dispatch"
        },


        {
            "name": "Delayed appointment",
            "priority": 2,
            "resolution_time" : "4 hours",
            "dependencies":"Service Provider"
        },


        {
            "name": "Delay in uploading test results",
            "priority": 2,
            "resolution_time" : "4 hours",
            "dependencies":"Service Provider"
        },

        {
            "name": "Misconduct",
            "priority": 2,
            "resolution_time" : "4 hours",
            "dependencies":"Service Provider"
        },


    ])


  function handleSubmitFeedback (e){
    e.preventDefault();

   // console.log(sla[selectedSla].name);

 
    axios.post(`https://mw.asknello.com/api/customerfeedback`,{
                    
        //request body here to complete appointment process
                
                name : name,
                email: email,
               
                //  type:type,

                type:sla[selectedSla].name,
                priority:sla[selectedSla].priority,
                resolution_time : sla[selectedSla].resolution_time,
                dependencies: sla[selectedSla].dependencies,

                   
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
                        setSelectedSla(e.target.value);
                        console.log(e.target.value);
                    }} className=' form-control 'required>
                      <option value="">Select Feedback Type</option>

                      {sla.map((item, index) => (
                          <option key={index} value={index}>{item.name}</option>
                    ))}
                      

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
                        name && email && selectedSla && message && <button className="contact1-form-btn">
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