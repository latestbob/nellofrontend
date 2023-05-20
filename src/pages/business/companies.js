import React from 'react';
import '../newhome.css';

import { Link } from 'react-router-dom';



function Companies(){
    return (
        <>
            <section className="herosection">

<div className="row  align-items-center ">

    <div className="col-md-6 herotext">
        <h6 className='heroheading_one my-1'>Nello For Corporate Organizations</h6>

        <h1 className='heroheading_two my-2'>
Offer your employees wellness packages for their well-being.</h1>

        <p className='heropara'>
Explore our exclusive wellness packages designed for every individual in your team.</p>

        <Link to='' class="btn btn-primary btn-lg text-center my-4"style={{
                      
                    }} >JOIN NELLO TODAY</Link> 

    </div>


    <div className='col-md-6 heroimagcontainer text-right'>

      {/* <img alt='heroimg'className='heroimage' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682603241/Screenshot_2023-04-27_at_2.43_1_1_t2po5h.png' />
       */}

  <img className="aboutimageprovidercompany circle" src="https://res.cloudinary.com/edifice-solutions/image/upload/v1683293571/pexels-darlene-alderson-7970846-min_ba1nlp.jpg" alt="banner-img" />


    </div>

</div>


   
</section>



<section className="servicesection container">
        <h1 className='heading_two my-5 text-center'>Why Join Nello </h1>


        <div className='row'>
              <div className='col-md-4'>
                  <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601487/Group_40_sgrwi2.png' /> <span className="featurespan">Connect with doctors</span>
                        <p className='feature_para'>Employees will be granted free access to consult with any doctor of their choice.</p>

                        {/* <Link to={'/doctors'} class="btn btn-primary  text-center my-2"style={{
                          
                        }} >JOIN NELLO TODAY</Link>  */}
                  </div>

                  <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682613111/Group_43_uygmrn.png' /> <span className="featurespan">Schedule Physical Appointment</span>
                        <p className='feature_para'>Employees will have the ability to book appointments for free with nearby hospitals and clinics.</p>

                        {/* <Link to={} className="btn btn-primary  text-center my-2"style={{
                          
                        }} >SCHEDULE A VISIT</Link>  */}
                  </div>

                  <div className="text-center">
                       <Link to={''} class="btn btn-primary w-100 font-weight-bold  text-center my-2"style={{
                          
                        }} >JOIN NELLO TODAY</Link> 

                  </div>
              </div>

              <div className='col-md-4 py-5  '>

                <img className='feature_center text-center' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1683297426/Group_4_1_tlgtbd.svg' />
                
              </div>


              <div className='col-md-4'>

              <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601487/Group_40_sgrwi2.png' /> <span className="featurespan">Medical diagnosis from doctors.</span>
                        <p className='feature_para'>With Nello, employees can receive medical diagnoses from qualified doctors to address their health concerns.</p>

                        {/* <Link to={'/drugs'} class="btn btn-primary  text-center my-2"style={{
                          
                        }} >HEALTH PRODUCTS</Link>  */}
                  </div>

                  <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601488/Group_42_qqy5st.png' /> <span className="featurespan">Health Products & Prescriptions</span>
                        <p className='feature_para'>Employees can conveniently order health products and prescriptions through Nello.</p>

                        {/* <Link to={'/signup'} class="btn btn-primary  text-center my-2"style={{
                          
                        }} >GET STARTED</Link>  */}
                  </div>

                  <div className="text-center">
                       <Link to={''} class="btn btn-primary w-100 font-weight-bold  text-center my-2"style={{
                          
                        }} >JOIN NELLO TODAY</Link> 

                  </div>

            </div>


        </div>

                    

        </section>


        <section className="howsectiontwoprovider mt-5 ">

        <div className="row  align-items-center mt-4">



    <div className="col-md-6 herotext">
        {/* <h6 className='heroheading_one my-1'>Hi, I am Nello</h6> */}

        <h1 className='heading_two mt-2 py-3'>Improve your employees performance by enhancing their medical well-being.</h1>


                <p className='feature_para'style={
                    {
                        textAlign:"justify"
                    }
                }>Improve your employees' performance with Nello's tailored wellness packages. Investing in your employees' health not only promotes a positive work culture, but also attracts and retains top talent while improving productivity and work-life balance. Nello is committed to helping you build a happier, healthier, and more productive team.</p>

                <Link to='' class="btn btn-primary btn-lg text-center my-4"style={{
                      
                    }} >JOIN NELLO TODAY</Link> 

    </div>

    <div className='col-md-6 heroaboutimagcontainer text-right'>

<img alt='howimg'className='aboutimage mt-5' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1684438489/Group_48_1_bn9yyn.png' />


</div>


    

</div>


   
        </section>




        <section className='testimonies_partnerss'>

<h1 className='heading_two my-3 text-center'>Testimonials From Corporate Organizations</h1>



<div className="row mt-2 py-3">
                <div className="col-lg-4 col-md-6">
                
                    <div className="ccard-4">
                        <div className="ccard-4-inner">
                            {/* <img className="ccard-4-ico" src="./assets/images/home-user.svg" alt="home-user" /> */}
                            <i class="las la-quote-left ccard-4-ico"></i>
                            
                            <p className='myhover'>
                            "Asknello telehealth platform has transformed the way I deliver healthcare services. Its online consultation feature has enabled me to connect with patients remotely, and the access to their medical history and vital signs has made the consultations more efficient."
                            </p>
                        </div>
                        <a href="" className="ccard-4-more mt-3">
                            <span className='font-weight-bold mt-4'>Lauren Parker</span>
                            
                        </a>
                    </div>
                  
                </div>

                <div className="col-lg-4 col-md-6">
               
                    <div className="ccard-4">
                        <div className="ccard-4-inner">
                            {/* <img className="ccard-4-ico" src="./assets/images/home-shopping-cart.svg" alt="home-shopping-cart" /> */}
                            <i class="las la-quote-left ccard-4-ico"></i>
                           
                            <p className='myhover'>
                               "I've been using Asknello for a few months now, and I'm impressed with its diagnostic tools. It has made the process of diagnosing medical conditions  much more streamlined, and my patients appreciate the convenience and flexibility it provides."                         </p>
                        </div>
                        <Link to="" className="ccard-4-more mt-3">
                            <span className='font-weight-bold mt-4'>SISA</span>
                           
                        </Link>
                    </div>
                   
                </div>

                <div className="col-lg-4 col-md-6">
               
                    <div className="ccard-4">
                        <div className="ccard-4-inner">
                            {/* <img className="ccard-4-ico" src="./assets/images/home-calendar.svg" alt="home-calendar" /> */}
                            <i class="las la-quote-left ccard-4-ico"></i>
                            
                            <p className='myhover'>
                                "Asknello has helped me expand my healthcare services beyond traditional in-person consultations. It has enabled me to provide care to patients remotely, and medical history has helped me make more informed diagnoses. "    </p>
                        </div>
                        <a href="" className="ccard-4-more mt-3">
                            <span className='font-weight-bold mt-4'>Famacare</span>
                            
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


          

</section>

        </>
    );
}


export default Companies;