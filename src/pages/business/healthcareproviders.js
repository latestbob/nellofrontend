import React from 'react';
import '../newhome.css';

import { Link } from 'react-router-dom';



function HealthCareProviders(){
    return (
        <>
            <section className="herosection">

<div className="row  align-items-center ">

    <div className="col-md-6 herotext">
        <h6 className='heroheading_one my-1'>Nello For Healthcare Providers</h6>

        <h1 className='heroheading_two my-2'>A seamless method for delivering healthcare services.</h1>

        <p className='heropara'>Nello offers a convenient solution for managing your healthcare services.</p>

        <Link to='/join' class="btn btn-primary btn-lg text-center my-4"style={{
                      
                    }} >JOIN NELLO TODAY</Link> 

    </div>


    <div className='col-md-6 heroimagcontainer text-right'>

      {/* <img alt='heroimg'className='heroimage' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682603241/Screenshot_2023-04-27_at_2.43_1_1_t2po5h.png' />
       */}

  <img className="aboutimageprovider" src="https://res.cloudinary.com/edifice-solutions/image/upload/v1682597267/Physical_Visit_1_scsr94-removebg-preview_jjs50a.png" alt="banner-img" />


    </div>

</div>


   
</section>



<section className="servicesection container">
        <h1 className='heading_two my-5 text-center'>Nello For Doctors & Nurses</h1>


        <div className='row'>
              <div className='col-md-4'>
                  <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601487/Group_40_sgrwi2.png' /> <span className="featurespan">Organize patient listings</span>
                        <p className='feature_para'>Acces to  all relevant patient information in one place.</p>

                        {/* <Link to={'/doctors'} class="btn btn-primary  text-center my-2"style={{
                          
                        }} >JOIN NELLO TODAY</Link>  */}
                  </div>

                  <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682613111/Group_43_uygmrn.png' /> <span className="featurespan">Manage Schedules & Appointments</span>
                        <p className='feature_para'>Establish your availability and have a comprehensive overview of all previous and upcoming appointments.</p>

                        {/* <Link to={} className="btn btn-primary  text-center my-2"style={{
                          
                        }} >SCHEDULE A VISIT</Link>  */}
                  </div>

                  <div className="text-center">
                       <Link to='/join' class="btn btn-primary w-100 font-weight-bold  text-center my-2"style={{
                          
                        }} >JOIN NELLO TODAY</Link> 

                  </div>
              </div>

              <div className='col-md-4 py-5 '>

                <img className='feature_center text-center' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1683284619/Group_4_houhxv.svg' />
                
              </div>


              <div className='col-md-4'>

              <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1683285903/Group_45_1_jvp5o2.png' /> <span className="featurespan">Online Consultation with patients</span>
                        <p className='feature_para'>Gain access to a dependable online consultation platform with patient.</p>

                        {/* <Link to={'/drugs'} class="btn btn-primary  text-center my-2"style={{
                          
                        }} >HEALTH PRODUCTS</Link>  */}
                  </div>

                  <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601488/Group_42_qqy5st.png' /> <span className="featurespan">Prescription and Diagnostic tools</span>
                        <p className='feature_para'>After consultations, diagnose medical conditions, prescribe medications, and suggest diagnostic tests if necessary.</p>

                        {/* <Link to={'/signup'} class="btn btn-primary  text-center my-2"style={{
                          
                        }} >GET STARTED</Link>  */}
                  </div>

                  <div className="text-center">
                       <Link to='/join' class="btn btn-primary w-100 font-weight-bold  text-center my-2"style={{
                          
                        }} >JOIN NELLO TODAY</Link> 

                  </div>

            </div>


        </div>

                    

        </section>



        <section className="servicesection howsectiontwoprovider">
                <div className='container '>
                    <br/>
                    <br/>
                <h1 className='heading_two text-center'>Nello For Pharmacies </h1>


<div className='row'>
      <div className='col-md-4'>
          <div className='feature_item'>
              <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1683628469/Group_46_mj9qg9.png' /> <span className="featurespan">Organize your products & Inventory</span>
                <p className='feature_para text-justify'>As a pharmacy or healthcare vendor on Asknello, organizing your product and inventory is crucial for providing the best possible experience to your customers. </p>

                {/* <Link to={'/doctors'} class="btn btn-primary  text-center my-2"style={{
                  
                }} >JOIN NELLO TODAY</Link>  */}
          </div>

          <div className='feature_item'>
              <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1683628469/Group_47_kq2tyl.png' /> <span className="featurespan">Manage customer orders easily </span>
                <p className='feature_para text-justify'>If you are selling your products on Asknello, managing your customer orders has never been easier! As an Asknello vendor, you can easily keep track of all your orders from start to finish, including pending orders, delivered orders, and cancelled orders. </p>

                {/* <Link to={} className="btn btn-primary  text-center my-2"style={{
                  
                }} >SCHEDULE A VISIT</Link>  */}
          </div>

          <div className="text-center">
               <Link to='/join' class="btn btn-primary w-100 font-weight-bold  text-center my-2"style={{
                  
                }} >JOIN NELLO TODAY</Link> 

          </div>
      </div>

      <div className='col-md-4 py-5 '>

        <img className='feature_center text-center' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1668417651/Order_Medication_1_nfkqkn.png' />
        
      </div>


      <div className='col-md-4'>

      <div className='feature_item'>
              <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601488/Group_41_ivnncl.png' /> <span className="featurespan">Generate and Track Sales Report</span>
                <p className='feature_para text-justify'>As an Asknello vendor, you can easily view and export sales data for any time period, making it simple to analyze your business performance and make informed decisions.</p>

                {/* <Link to={'/drugs'} class="btn btn-primary  text-center my-2"style={{
                  
                }} >HEALTH PRODUCTS</Link>  */}
          </div>

          <div className='feature_item'>
              <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601488/Group_42_qqy5st.png' /> <span className="featurespan">Stock Management</span>
                <p className='feature_para text-justify'>If you are selling your products on Asknello, managing your stock levels has never been easier! As an Asknello vendor, you can easily keep track of your inventory and make informed decisions about when to restock. </p>

                {/* <Link to={'/signup'} class="btn btn-primary  text-center my-2"style={{
                  
                }} >GET STARTED</Link>  */}
          </div>

          <div className="text-center">
               <Link to='/join'class="btn btn-primary w-100 font-weight-bold  text-center my-2"style={{
                  
                }} >JOIN NELLO TODAY</Link> 

          </div>

    </div>


</div>


                </div>
                    

        </section>


        <section className="servicesection container">
        <h1 className='heading_two my-5 text-center'>Nello For Diagnostic Centre</h1>


        <div className='row'>
              <div className='col-md-4'>
                  <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682681956/Group_44_1_ekfyky.png' /> <span className="featurespan">Increased visibility and patient reach</span>
                        <p className='feature_para'>Joining Asknello expands diagnostics centers' customer base by exposing them to a larger audience of patients seeking a variety of diagnostic services.</p>

                        {/* <Link to={'/doctors'} class="btn btn-primary  text-center my-2"style={{
                          
                        }} >JOIN NELLO TODAY</Link>  */}
                  </div>

                  <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682613111/Group_43_uygmrn.png' /> <span className="featurespan">Flexibility and adaptability</span>
                        <p className='feature_para'>Asknello's platform empowers diagnostics centers to tailor their profile, services, pricing, and availability, meeting specific patient requirements and enhancing their offerings.</p>

                        {/* <Link to={} className="btn btn-primary  text-center my-2"style={{
                          
                        }} >SCHEDULE A VISIT</Link>  */}
                  </div>

                  <div className="text-center">
                       <Link to='/join' class="btn btn-primary w-100 font-weight-bold  text-center my-2"style={{
                          
                        }} >JOIN NELLO TODAY</Link> 

                  </div>
              </div>

              <div className='col-md-4 py-5 '>

                <img className='feature_center text-center' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1684579655/Group_7_1_cy8bal.svg' />
                
              </div>


              <div className='col-md-4'>

              <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1682601488/Group_39_stljby.png' /> <span className="featurespan">Access to a broader healthcare network</span>
                        <p className='feature_para'>
By joining Asknello, diagnostics centers can collaborate with doctors, hospitals, and healthcare providers, expanding their network and generating valuable referrals.</p>

                        {/* <Link to={'/drugs'} class="btn btn-primary  text-center my-2"style={{
                          
                        }} >HEALTH PRODUCTS</Link>  */}
                  </div>

                  <div className='feature_item'>
                      <img className='feature_image' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1683628469/Group_47_kq2tyl.png' /> <span className="featurespan">Enhanced Customers experience:</span>
                        <p className='feature_para'>Asknello's integration enhances diagnostics centers' patient experience with user-friendly features like online test booking, digital reports, and secure follow-up consultations.</p>

                        {/* <Link to={'/signup'} class="btn btn-primary  text-center my-2"style={{
                          
                        }} >GET STARTED</Link>  */}
                  </div>

                  <div className="text-center">
                       <Link to='/join' class="btn btn-primary w-100 font-weight-bold  text-center my-2"style={{
                          
                        }} >JOIN NELLO TODAY</Link> 

                  </div>

            </div>


        </div>

                    

        </section>


        <section className="howsectiontwoprovider">

        <div className="row  align-items-center ">



    <div className="col-md-6 herotext">
        {/* <h6 className='heroheading_one my-1'>Hi, I am Nello</h6> */}

        <h1 className='heading_two mt-2 py-3'>Track your patients' vital signs and review their complete medical history.</h1>


                <p className='feature_para'>Effortlessly retrieve patient vital signs and medical history through a streamlined and fast process.</p>

                <Link to='/join' class="btn btn-primary btn-lg text-center my-4"style={{
                      
                    }} >JOIN NELLO TODAY</Link> 

    </div>

    <div className='col-md-6 heroaboutimagcontainer text-right'>

<img alt='howimg'className='aboutimage mt-5' src='https://res.cloudinary.com/edifice-solutions/image/upload/v1684438489/Group_48_1_bn9yyn.png' />


</div>


    

</div>


   
        </section>




        <section className='testimonies_partnerss'>

<h1 className='heading_two my-3 text-center'>Testimonials From Healthcare Providers</h1>



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
                            <span className='font-weight-bold mydoc mt-2'>Dr. Seyi</span>
                            
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
                            <span className='font-weight-bold'>Dr. Ayo</span>
                           
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
                            <span className='font-weight-bold'>Nurse Frances</span>
                            
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


export default HealthCareProviders;