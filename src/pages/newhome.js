import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './newhome.css';
import axios from 'axios';
import { useState, useEffect } from 'react';




function NewHome(){

  const history = useHistory();
  const[fetchedLocation , setFetcheLocation] = useState([]);
  const[fetchedServices, setFetchedServices] = useState([]);

  React.useEffect(()=>{
      
      axios.get(`https://admin.asknello.com/api/facilitylocation`, {
          
      }).then(response => {
         console.log(response)

         setFetcheLocation(response.data)

      }).catch(error => {
          console.log(error)
      })

   },[]);


   React.useEffect(()=>{
      
    axios.get(`https://admin.asknello.com/api/getsearchinput`, {
        
    }).then(response => {
       console.log(response)

       setFetchedServices(response.data)

    }).catch(error => {
        console.log(error)
    })

 },[]);


   const [searchTerm, setSearchTerm] = useState("");
   const [serviceTerm , setServiceTerm] = useState("");

const filteredData = fetchedLocation.filter((item) =>
 searchTerm != item &&  item.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredService = fetchedServices.filter((item) =>
 serviceTerm != item &&  item.toLowerCase().includes(serviceTerm.toLowerCase())
);


 function handleSubmit(e){
  e.preventDefault();

  history.push(`/searchresults?services=${serviceTerm}&location=${searchTerm}`);
 }

  return (
      <>

<section className="herosection">

    <div className="row  align-items-center ">

        <div className="col-md-6 herotext">
            <h6 className='heroheading_one my-1'>Hi, I am Nello</h6>

            <h1 className='heroheading_two my-2'>Your Personal Healthcare Assistant</h1>

            <p className='heropara'>I'll help you get the high-quality health care you need to stay healthy. How may I assist in improving your health today?</p>

            <Link to={'/signup'} class="btn btn-primary btn-lg text-center my-4"style={{
                          
                        }} >GET STARTED</Link> 

        </div>


        <div className='col-md-6 heroimagcontainer text-right'>

          {/* <img alt='heroimg'className='heroimage' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682603241/Screenshot_2023-04-27_at_2.43_1_1_t2po5h.png' />
           */}

      <img src="./assets/images/banner-img.svg" alt="banner-img" />


        </div>

    </div>

    
       
    </section>


<div className='my-5'>

</div>

        <div className="searchbox m-auto px-5 py-5 container">
        <form onSubmit={handleSubmit}>
  <div class="form-row align-items-center">
  <div class="col-sm-5 my-2">
  
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text nellocolor"><i className="fa fa-search"></i></div>
        </div>
        <input onChange={function(e){
          setServiceTerm(e.target.value)
        }}  value={serviceTerm} type="text" class="form-control" id="inlineFormInputGroupUsername"style={{
          background:"white",
        }} placeholder="Search Doctors, Conditions, Procedures" />
      </div>

      {serviceTerm && filteredService.length > 0 && 
                <ul className='searchedList my-3 rounded'>
                    {filteredService.map((item, index) => (
                    <li onClick={function(e){

                        
                      setServiceTerm(item);
                    }} className='searchItem font-weight-bold' key={index}>{item}</li>
                    ))}
                </ul>

                    }
    </div>
    <div class="col-sm-5 my-2">
      
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text nellocolor"><i className="fa fa-map"></i></div>
        </div>
        <input value={searchTerm} onChange={function(e){
          setSearchTerm(e.target.value)
        }} type="text" class="form-control" id="inlineFormInputGroupUsername"style={{
          background:"white",
        }} placeholder="Choose A Location" />
      </div>
      {searchTerm && filteredData.length > 0 && 
                <ul className='searchedList my-3 rounded'>
                    {filteredData.map((item, index) => (
                    <li onClick={function(e){

                        
                        setSearchTerm(item);
                    }} className='searchItem font-weight-bold' key={index}>{item}</li>
                    ))}
                </ul>

                    }
    </div>
    {/* <div class="col-auto my-1">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="autoSizingCheck2">
        <label class="form-check-label" for="autoSizingCheck2">
          Remember me
        </label>
      </div>
    </div> */}
    <div class="col-auto my-1">
      <button type="submit" class="btn btn-primary py-3 px-5">SEARCH</button>
    </div>
  </div>
</form>


    <h4 className='youmay py-3'>You may be looking for ?</h4>

    <div className="lookingfor">

      <Link to={{ pathname: '/medcenters', state: {
                "care_type":"Laboratory Services",
            } }}className='servicess'>Laboratory Services</Link> <Link to={{ pathname: '/medcenters', state: {
              "care_type":"Antenatal",
          } }}className='servicess'>Antenatal</Link> <Link  to={{ pathname: '/medcenters', state: {
            "care_type":"Ultrasound Scan",
        } }} className='servicess'>Ultrasound Scan</Link> <a href='/doctors?specialization=General%20Practitioner(GP)'className='servicess'>General Practictioner</a> <a href=''className='servicess'>Gynacologist</a> <Link  to={{ pathname: '/medcenters', state: {
          "care_type":"Immunisation",
      } }}className='servicess'>Immunisation</Link> <a href='/doctors?specialization=Nurse'className='servicess'>Nurses</a> <Link to={{ pathname: '/medcenters', state: {
        "care_type":"Preventive Cancer Screening",
    } }} className='servicess'>Preventive Cancer Screening</Link> 

    </div>




        </div>



        <section className="aboutsection">

<div className="row  align-items-center ">

<div className='col-md-6 heroaboutimagcontainer text-center'>

<img alt='heroimg'className='aboutimage' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1668417534/Consult_Doctor_ljvcjf.png' />


</div>

    <div className="col-md-6 herotext">
        {/* <h6 className='heroheading_one my-1'>Hi, I am Nello</h6> */}

        <h1 className='heading_two my-2'>About Us</h1>

        <p className='aboutpara'>AskNello is an integrative healthcare platform that serves as an online medical assistant, partnering with various players in the health sector to provide personalised healthcare services to customers. AskNello aggregates the health data of customers and gives them access to health providers, helping them make decisions on their healthcare needs and giving them information on their health history.</p>

        <Link to={'/about'}class="btn btn-primary btn-lg text-center my-4"style={{
                      
                    }} >LEARN MORE</Link> 


        <div className='banner-box row'>
                    <div className='single_item col-4 text-center'>
                        <i className='fa fa-check myicon'></i>
                        <p className='icontext'>Qualified</p>


                    </div>

                    <div className='single_item col-4 text-center'>
                        <i className='fa fa-certificate myicon'></i>
                        <p className='icontext'>Certified</p>


                    </div>

                    <div className='single_item col-4 text-center'>
                        <i className='fa fa-lock myicon'></i>
                        <p className='icontext'>Secured</p>


                    </div>

        </div>

    </div>


    

</div>


   
</section>

        <section className="servicesection container">
        <h1 className='heading_two my-5 text-center'>Our Features</h1>


        <div className='row'>
              <div className='col-md-4'>
                  <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601487/Group_40_sgrwi2.png' /> <span className="featurespan">Find A Health Specialist</span>
                        <p className='feature_para'>Find specialized healthcare personnels to meet your healthcare needs.</p>

                        <Link to={'/doctors'} class="btn btn-primary  text-center my-2"style={{
                          
                        }} >CONSULT A DOCTOR</Link> 
                  </div>

                  <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601488/Group_39_stljby.png' /> <span className="featurespan">Visit A Health Facility</span>
                        <p className='feature_para'>Schedule appointment with hospitals and clinics close to you.</p>

                        <Link to={'/medcenters'} className="btn btn-primary  text-center my-2"style={{
                          
                        }} >SCHEDULE A VISIT</Link> 
                  </div>
              </div>

              <div className='col-md-4 py-5 '>

                <img className='feature_center text-center' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682607630/Hero_Banner_jy16ql_1-removebg-preview_fmigfh.png' />
                
              </div>


              <div className='col-md-4'>

              <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601488/Group_41_ivnncl.png' /> <span className="featurespan">Order Health Products</span>
                        <p className='feature_para'>Buy drugs and have it delivered to you anywhere</p>

                        <Link to={'/drugs'} class="btn btn-primary  text-center my-2"style={{
                          
                        }} >HEALTH PRODUCTS</Link> 
                  </div>

                  <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601488/Group_42_qqy5st.png' /> <span className="featurespan">Access To Medical Records</span>
                        <p className='feature_para'>With AskNello, you can easily access and securely manage your medical records at your fingertips.</p>

                        <Link to={'/signup'} class="btn btn-primary  text-center my-2"style={{
                          
                        }} >GET STARTED</Link> 
                  </div>

            </div>


        </div>

                    

        </section>

      <div className='howcover'>
                        {/* doctor section */}
        <section className="howsection">

        <div className="row  align-items-center ">



    <div className="col-md-6 herotext">
        {/* <h6 className='heroheading_one my-1'>Hi, I am Nello</h6> */}

        <h1 className='heading_two my-2'>Find the right doctor at your fingertips</h1>

        <div className='feature_item_how'>
              <img className='feature_image_how' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601487/Group_40_sgrwi2.png' /> <span className="featurespan">Find a preferred doctor based on specialization</span>
                <p className='feature_para'>To help you get the right doctor for you needs, the doctor's list is based on specialization, choose the one that suit your needs.</p>

                
          </div>


          <div className='feature_item_how'>
              <img className='feature_image_how' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682613111/Group_43_uygmrn.png' /> <span className="featurespan">Choose preferred data and time</span>
                <p className='feature_para'>You are almost there!. Now you are to choose preferred date and time to schedule online consultation with a doctor.

</p>

                
          </div>

          <div className='feature_item_how'>
              <img className='feature_image_how' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682613112/Group_44_e3ylu1.png' /> <span className="featurespan">Secure the appointment</span>
                <p className='feature_para'>Pay the consultation fee to secure the appointment. A link containing details of scheduled appointment and online consultation link will sent to you.</p>

                
          </div>

       
          <a href="https://wa.me/message/MCKR7N5KXAZJN1" className="btnwhatsapp mt-5"> <img className='' style={{
                  width:25
              }}  src='https://cdn.usbrandcolors.com/images/logos/whatsapp-logo.svg'/>Get Started on WhatsApp</a>
    </div>

    <div className='col-md-6 heroaboutimagcontainer text-center'>

<img alt='howimg'className='howpicture' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682769466/Group_1_pt8akg.svg' />


</div>


    

        </div>


   
        </section>

        {/* Hospital Session */}


        <section className="howsectiontwo">

        <div className="row  align-items-center ">



    <div className="col-md-6 herotext">
        {/* <h6 className='heroheading_one my-1'>Hi, I am Nello</h6> */}

        <h1 className='heading_two my-2'>Schedule appointment with facility close to you</h1>

        <div className='feature_item_how'>
              <img className='feature_image_how' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682681956/Group_44_1_ekfyky.png' /> <span className="featurespan">Search the care you'd like to receive</span>
                <p className='feature_para'>To help you get the right medical facility, you are to choose the care-type you'd like to receive.</p>

                
          </div>


          <div className='feature_item_how'>
              <img className='feature_image_how' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682681956/Group_45_eg07fz.png' /> <span className="featurespan">Choose preferred location</span>
                <p className='feature_para'>Next step is to choose the location of your preferred facility. For convenience choose location closer to you.

</p>

                
          </div>


          <div className='feature_item_how'>
              <img className='feature_image_how' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682613111/Group_43_uygmrn.png' /> <span className="featurespan">Choose preferred date and time for the visit</span>
                <p className='feature_para'>You are almost there!. Now you are to choose preferred date and time to schedule visit with the selected facility.

</p>

                
          </div>

          <div className='feature_item_how'>
              <img className='feature_image_how' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682613112/Group_44_e3ylu1.png' /> <span className="featurespan">Secure the appointment</span>
                <p className='feature_para'>Pay the consultation fee to secure the appointment. A link containing details of scheduled appointment and a downloadable confirmation slip will sent to you.</p>

                
          </div>

       
          <a href="https://wa.me/message/MCKR7N5KXAZJN1" className="btnwhatsapp mt-5"> <img className='' style={{
                  width:25
              }}  src='https://cdn.usbrandcolors.com/images/logos/whatsapp-logo.svg'/>Get Started on WhatsApp</a>
    </div>

    <div className='col-md-6 heroaboutimagcontainer text-right'>

<img alt='howimg'className='howpicture' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682774743/Group_2_p15k5s.svg' />


</div>


    

</div>


   
        </section>
        </div>


    {/* Why Nello section */}

    <section className="aboutsection mb-4">

<div className="row  align-items-center ">

<div className='col-md-6 heroimagaboutcontainer text-center'>

<img alt='heroimg'className='aboutimage' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1668417506/Chatbot_1_wuh1mi.png' />


</div>

    <div className="col-md-6 herotext">
        {/* <h6 className='heroheading_one my-1'>Hi, I am Nello</h6> */}

        <h1 className='heading_two my-2'>Why Choose Nello</h1>

        <div className='feature_item_why'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601487/Group_40_sgrwi2.png' /> <span className="featurespan">Easy Booking</span>
                        <p className='feature_para'>Easy access to schedule appointment with medical experts and facility of your choice.</p>

         </div>

         <div className='feature_item_why'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601488/Group_41_ivnncl.png' /> <span className="featurespan">Approved Prescription</span>
                        <p className='feature_para'>Get Approved prescription prepared by medical experts, for every drugs ordered on Nello.</p>

         </div>

         <div className='feature_item_why'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682613111/Group_43_uygmrn.png' /> <span className="featurespan">24/7 Support</span>
                        <p className='feature_para'>Access to 24/7 free chat with medical support agent.</p>

         </div>

      
 


        

    </div>


    

</div>


   
</section>


{/* Faq and feedback */}


<div className="searchbox faqfeeback m-auto px-5 py-5 container"style={{
  backgroundColor:"#1997cf",
  color:"white"

}}>
<h1 className='heading_two my-2 text-center'style={{
  color:"white"
}}>FAQs and Feedback</h1>
<p className='feature_para text-justify'style={{
  color:"white"
}}>Explore our comprehensive FAQs for answers to common questions about our products and services, and share your feedback with us to help us improve your experience on our website. We value your input and strive to provide you with the best possible service. <br/> Thank you for choosing Nello!</p>

<div class="col-auto  mt-2 py-2 text-center">
      <Link to={'/faq'} className="btn btn-primary py-3 px-5 mx-1 mt-3">EXPLORE OUR FAQs</Link>   <Link to={'/contact'} className="btn btn-primary py-3 mx-1 px-5 mt-3">PROVIDE FEEDBACK</Link>
    </div>
{/* <h4 className='youmay py-3'>Be the first to Know</h4>
        <form>
  <div class="form-row align-items-center">
  <div class="col-sm-8 my-1">
  
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text nellocolor"><i className="fa fa-search"></i></div>
        </div>
        <input type="text" class="form-control" id="inlineFormInputGroupUsername"style={{
          background:"white",
        }} placeholder="Search Doctors, Conditions, Procedures" />
      </div>
    </div>
   
    
    <div class="col-auto my-1">
      <button type="submit" class="btn btn-primary py-3 px-5">SEARCH</button>
    </div>
  </div>
</form>
 */}

    

   



        </div>


{/* section for partner and test timoney */}

    <section className='testimonies_partners'>

    <h1 className='heading_two my-3 text-center'>What Our Customers Are Saying</h1>



    <div className="row mt-2 py-3">
                    <div className="col-lg-4 col-md-6">
                    
                        <div className="ccard-4">
                            <div className="ccard-4-inner">
                                {/* <img className="ccard-4-ico" src="./assets/images/home-user.svg" alt="home-user" /> */}
                                <i class="las la-quote-left ccard-4-ico"></i>
                                
                                <p className='myhover'>
                                "Very professional health service provider. Makes life easier by bringing quality health services to the clients fingertips. On time in appointment and doctor was amazing."
                                </p>
                            </div>
                            <a href="" className="ccard-4-more">
                                <span className='font-weight-bold'>Kelvin</span>
                                
                            </a>
                        </div>
                      
                    </div>

                    <div className="col-lg-4 col-md-6">
                   
                        <div className="ccard-4">
                            <div className="ccard-4-inner">
                                {/* <img className="ccard-4-ico" src="./assets/images/home-shopping-cart.svg" alt="home-shopping-cart" /> */}
                                <i class="las la-quote-left ccard-4-ico"></i>
                               
                                <p className='myhover'>
                                    Asknello gives me the comfort of purchasing quality drugs and get it delivered in few hours. This also comes with issurance of proper drug prescriptions which are prescribed by certified doctors.                               </p>
                            </div>
                            <Link to="" className="ccard-4-more">
                                <span className='font-weight-bold'>Mrs Bola</span>
                               
                            </Link>
                        </div>
                       
                    </div>

                    <div className="col-lg-4 col-md-6">
                   
                        <div className="ccard-4">
                            <div className="ccard-4-inner">
                                {/* <img className="ccard-4-ico" src="./assets/images/home-calendar.svg" alt="home-calendar" /> */}
                                <i class="las la-quote-left ccard-4-ico"></i>
                                
                                <p className='myhover'>
                                    With the use of chatbot to drive conversions with Nello, the overall experience has been wonderful, With the smart Bot I was able to enjoy all services with ease..    </p>
                            </div>
                            <a href="" className="ccard-4-more">
                                <span className='font-weight-bold'>Chuks</span>
                                
                            </a>
                        </div>
                        
                    </div>

                    {/* <div className="col-lg-3 col-md-6">
                        <Link to="/fitness">
                        <div className="ccard-4">
                            <div className="ccard-4-inner">
                                <i class="fal fa-heart ccard-4-ico"></i>
                                {/* <img className="ccard-4-ico" src="./assets/images/home-heart.svg" alt="home-heart" /> */}
                                {/* <h4>Health & Fitness</h4>
                                <p>
                                    Get latest health and fitness tips to help you stay healthy
                                </p>
                            </div> */}
                            {/* <Link to="/fitness" className="ccard-4-more">
                                <span>Learn More</span>
                                <img className="main" src="./assets/images/home-arrow-right.svg" alt="home-arrow-right" />
                                <img className="alt" src="./assets/images/home-arrow-right-white.svg" alt="home-arrow-right-white" />
                            </Link> */}
                        {/* </div>
                        </Link>
                    </div>  */}

                    
                </div>


                <div className='my-4'>
                <h1 className='heading_two my-3 py-3 text-center'>We Are Trusted By</h1>

                <marquee> <img className='mx-3' style={{
                    
                  }} src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668425261/Group_14_t468rv.png"/> <img className='mx-3' style={{
                     
                  }} src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668425293/Group_16_kkhkxq.png"/> <img className='mx-3' style={{
                    
                  }} src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668425293/Group_15_g8njpb.png"/>
                  
                  <img className='mx-3' style={{
                    
                  }} src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668425294/Group_18_jqwv3n.png"/>
  
  <img className='mx-3' style={{
                    
                  }} src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668425294/Group_17_pziqdg.png"/>
  
  <img className='mx-3' style={{
                    
                  }} src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668425294/Group_19_uqq4cw.png"/>
                  
  
                  <img className='mx-3' style={{
                    
                  }} src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668425307/logofour_1_nvthvu.png"/>
                  </marquee>

                </div>

    </section>

       
      </>
  );
}

export default NewHome;