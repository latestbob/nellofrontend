import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import './faq.css';


export default function Faq() {

const[location , setLocation] = useState([]);

  React.useEffect(()=>{
        

   
    axios.get('https://mw.asknello.com/api/locations', {
        

    }).then(response => {
       console.log(response)

        if (response.data) {
          setLocation(response.data);




        }


    }).catch(error => {
        console.log(error)
    })


     
     
 },[]);



  return (
    <>
      <section className="">
        <div className="container section">
          <div className="product-hero appPadding" style={{ height: "150px" }}>
            <h3 className="faqheading"> Frequently Asked Questions</h3>


          </div>

          <div className="accordion" id="accordionExample">
  <div className="card">
    <a href="" className="card-header" id="headingOne"data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      <h2 className="py-3 faqlink">
        
        Is Asknello free?

       
      </h2>
    </a>

    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div className="card-body">
        <p className="faqpara">
        Registration is absolutely FREE! 😊  <br></br><br></br>
Customers are expected to pay for the services they receive from Nello such as consultation with a specialist, healthcare product sales, etc. Nello is your Personal Healthcare Assistant providing you with ease and convenience to fulfill your healthcare needs.

        </p>
      </div>
    </div>
  </div>


  <div className="card">
  <a href="" className="card-header" id="headingTwo"data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
      <h2 className="py-3 faqlink">
        
        How do I get started on Asknello?

       
      </h2>
    </a>
    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div className="card-body">
      <p className="faqpara">
        To register, please visit us at asknello.com and follow the step-by-step guide on the screen to register. <br></br><br></br>
        Once registration is successful, you are good to go!

        </p>
      </div>
    </div>
  </div>

  {/* Third faq */}

  <div className="card">
  <a href="" className="card-header" id="headingThree"data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
      <h2 className="py-3 faqlink">
        
        Can I get prescriptions through Nello?

       
      </h2>
    </a>
    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div className="card-body">
      <p className="faqpara">
        Yes! Medication requiring prescription can be provided at a cost 😊.

        </p>
      </div>
    </div>
  </div>


{/* fourth faq */}

<div className="card">
  <a href="" className="card-header" id="headingFour"data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
      <h2 className="py-3 faqlink">
        
        How do I schedule an appointment on Nello?

       
      </h2>
    </a>
    <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
      <div className="card-body">
      <p className="faqpara">
        To schedule an appointment on nello, please use this link https://asknello.com.<br></br> <br></br>At the menu bar choose <b>Schedule Appointment</b>, then click on <b>Find a Health Specialist</b> to schedule an appointment with a specialist or click <b>Visit a Health Facility</b> to schedule appointment with a facility close to you.

        </p>
      </div>
    </div>
  </div>


  {/* fifth faq */}


  <div className="card">
  <a href="" className="card-header" id="headingFive"data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
      <h2 className="py-3 faqlink">
        
        Can I choose my doctor in Nello website?

       
      </h2>
    </a>
    <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
      <div className="card-body">
      <p className="faqpara">
       Yes! If your doctor is with the Nello specialist community. However, if your doctor is not, kindly share this link https://asknello.com/ to your doctor to join the Nello community 😊

        </p>
      </div>
    </div>
  </div>



  {/* Six Faq */}


  {/* Seven Faq */}



  <div className="card">
  <a href="" className="card-header" id="headingSeven"data-toggle="collapse" data-target="#collapseSeven" aria-expanded="true" aria-controls="collapseSeven">
      <h2 className="py-3 faqlink">
        
        Do I need to pay for a consultation?

       
      </h2>
    </a>
    <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
      <div className="card-body">
      <p className='faqpara'>
        Yes! Nello offers consultations for as low as ₦2000 

        </p>
      </div>
    </div>
  </div>
{/* Eight fa */}



<div className="card">
  <a href="" className="card-header" id="headingEight"data-toggle="collapse" data-target="#collapseEight" aria-expanded="true" aria-controls="collapseEight">
      <h2 className="py-3 faqlink">
        
        Can I book a physical examination through Nello? 

       
      </h2>
    </a>
    <div id="collapseEight" className="collapse" aria-labelledby="headingEight" data-parent="#accordionExample">
      <div className="card-body">
      <p className="faqpara">
        Yes, you can visit any of our partner facility for a physical examination, kindly use this link https://asknello.com/appointment to schedule an appointment.


        </p>
      </div>
    </div>
  </div>


  {/* Nine Faq */}


<div className="card">
  <a href="" className="card-header" id="headingNine"data-toggle="collapse" data-target="#collapseNine" aria-expanded="true" aria-controls="collapseNine">
      <h2 className="py-3 faqlink">
        
        Will I receive a receipt for my order?

       
      </h2>
    </a>
    <div id="collapseNine" className="collapse" aria-labelledby="headingNine" data-parent="#accordionExample">
      <div className="card-body">
      <p className="faqpara">
        Yes, you will receive an order confirmation via email.


        </p>
      </div>
    </div>
  </div>


  {/* Ten Faq */}


  <div className="card">
  <a href="" className="card-header" id="headingTen"data-toggle="collapse" data-target="#collapseTen" aria-expanded="true" aria-controls="collapseTen">
      <h2 className="py-3 faqlink">
        
        How can I sign up to offer wellness related services on Nello?

       
      </h2>
    </a>
    <div id="collapseTen" className="collapse" aria-labelledby="headingTen" data-parent="#accordionExample">
      <div className="card-body">
      <p className="faqpara">
       We kindly request that to sign up for Nello, you send an email to <b>support@asknello.com.</b> Our team will then take it from there and assist you with the registration process.

        </p>
      </div>
    </div>
  </div>


  {/* Eleven Faq */}


  <div className="card">
  <a href="" className="card-header" id="headingEleven"data-toggle="collapse" data-target="#collapseEleven" aria-expanded="true" aria-controls="collapseEleven">
      <h2 className="py-3 faqlink">
        
        How much is the delivery charge if I opt for it? 
       
      </h2>
    </a>
    <div id="collapseEleven" className="collapse" aria-labelledby="headingEleven" data-parent="#accordionExample">
      <div className="card-body">
      <p className="faqpara">
       Delivery charges are location-based and will be applied at the time of checkout.

          <br></br><br></br>
      
      <div className="table-responsive">

       <table className="table table-striped">
          <thead>
              <tr>
                  <th>Location</th>
                    <th> Same Day (Order delivered before 4pm)</th>
                    <th>Next Day</th>
                    <th>Standard</th>
              </tr>
          </thead>

          <tbody>
              {
                location.map(function(e){
                  return <tr>
                    <td>{e.name}</td>
                    <td>{e.same_day_price}</td>
                    <td>{e.next_day_price}</td>
                    <td>{e.standard_price}</td>
                  </tr>
                })
              }
          </tbody>

       </table>
        <p className="font-weight-bold"style={{
          fontSize:13,
      
        }}><i>Please note that delivery is to Lagos ONLY. We are working towards a Nationwide Delivery service.</i></p>
      </div>

        </p>
      </div>
    </div>
  </div>


  {/* Twelve Faq */}

  <div className="card">
  <a href="" className="card-header" id="headingTwelve"data-toggle="collapse" data-target="#collapseTwelve" aria-expanded="true" aria-controls="collapseTwelve">
      <h2 className="py-3 faqlink">
        
        What happens when my payment is not successful ?

       
      </h2>
    </a>
    <div id="collapseTwelve" className="collapse" aria-labelledby="headingTwelve" data-parent="#accordionExample">
      <div className="card-body">
      <p className="faqpara">
    Kindly check that all input are correct , if the problem persists please chat with our support at <b>support@asknello.com</b>, <br></br> <br></br>

    If it’s a network error, and you are yet to be debited, kindly wait for 30 minutes and try again. <br></br><br></br>

    If you have been debited and didn’t get an email confirmation, please reach out to our support at <b>support@asknello.com</b>.


        </p>
      </div>
    </div>
  </div>

</div>

        </div>

        
      </section>
    </>
  );
}
