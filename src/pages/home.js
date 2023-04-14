import * as React from 'react';
import { Link } from 'react-router-dom';
import MasterContext from '../layout/context'
import { useContext } from 'react';
import axios from 'axios';
import { showLoader, hideLoader } from '../helper/loader';
import './home.css';


export default function Home() {
const {toggleChatBox}=useContext(MasterContext)


function addUsers(){

    axios.get('http://api2.famacare.eclathealthcare.com/patient?page=1',{
    
      
  }).then(response => {
      console.log(response)

     

      
  }).catch(error => {
      console.log(error)
  })



}



    return (<>
        <div className="banner-container">
            <div className="container banner-wrapper">
                <div className="banner-content">
                    <h1 className="intro">Hi, I am Nello! Your Personal Health Assistant</h1>
                    <p>
                    I'll help you get the high-quality health care you need to stay healthy. How may I assist in improving your health today?
                    </p>
                
              
                
                        
                        <Link to={'/signup'} class="btn btn-primary btn-lg text-center"style={{
                          
                        }} >Get Started</Link> 

                        

                        

                   
                </div>

                <img src="./assets/images/banner-img.svg" alt="banner-img" />
            </div>
        </div>


        <div className="how-it-works">
            <div className="container">
                <div className="mb-5 text-center">
                    <h1 className="mb-1 headings"style={{
                     
                    }}>Our Features</h1>
                    We made our features easy and simple to help you achieve your desired goals.
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                    <a href="/#doctor">
                        <div className="ccard-4">
                            <div className="ccard-4-inner">
                                {/* <img className="ccard-4-ico" src="./assets/images/home-user.svg" alt="home-user" /> */}
                                <i class="las la-user ccard-4-ico"></i>
                                <h4>Find a Health Specialist</h4>
                                <p>
                                    Find specialized medical personnels to meet your healthcare needs.
                                </p>
                            </div>
                            <a href="/#doctor" className="ccard-4-more">
                                <span>Learn More</span>
                                <img className="main" src="./assets/images/home-arrow-right.svg" alt="home-arrow-right" />
                                <img className="alt" src="./assets/images/home-arrow-right-white.svg" alt="home-arrow-right-white" />
                            </a>
                        </div>
                        </a>
                    </div>

                    <div className="col-lg-4 col-md-6">
                    <Link to="/drugs">
                        <div className="ccard-4">
                            <div className="ccard-4-inner">
                                {/* <img className="ccard-4-ico" src="./assets/images/home-shopping-cart.svg" alt="home-shopping-cart" /> */}
                                <i class="las la-shopping-cart ccard-4-ico"></i>
                                <h4>Order Health Products</h4>
                                <p>
                                    Buy drugs and have it delivered to you anywhere.                                </p>
                            </div>
                            <Link to="/drugs" className="ccard-4-more">
                                <span>Learn More</span>
                                <img className="main" src="./assets/images/home-arrow-right.svg" alt="home-arrow-right" />
                                <img className="alt" src="./assets/images/home-arrow-right-white.svg" alt="home-arrow-right-white" />
                            </Link>
                        </div>
                        </Link>
                    </div>

                    <div className="col-lg-4 col-md-6">
                    <a href="/#facility">
                        <div className="ccard-4">
                            <div className="ccard-4-inner">
                                {/* <img className="ccard-4-ico" src="./assets/images/home-calendar.svg" alt="home-calendar" /> */}
                                <i class="las la-calendar-minus ccard-4-ico"></i>
                                <h4>Visit A Health Facility</h4>
                                <p>
                                    Schedule  appointment with hospitals close to you.    </p>
                            </div>
                            <a href="/#facility" className="ccard-4-more">
                                <span>Learn More</span>
                                <img className="main" src="./assets/images/home-arrow-right.svg" alt="home-arrow-right" />
                                <img className="alt" src="./assets/images/home-arrow-right-white.svg" alt="home-arrow-right-white" />
                            </a>
                        </div>
                        </a>
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


                <div id="doctor" style={{
                    textAlign:"center"
                }}>
                    <h1 className='headings' style={{
                        
                        marginTop:60,
                        marginBottom:60,
                    }}>How it Works</h1>
                </div>


                <div className="infographics row mt-3 "style={{
                   background:"white",
                   paddingTop:70,
                   paddingBottom:70,
                   paddingLeft:20,
                   paddingRight:20
                
                }}>

                    <div className="infographic_image col-md-6">
                        <img style={{
                            width:"100%",
                            borderRadius:30,
                        }} className='imageinfor' src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668417655/Online_Consultation_2_yhbkod.png" />

                       
                    </div>

                    <div className="infographic_text col-md-6">
                        <h5 style={{
                            
                        }}>Book an Online Consultation with Qualified Doctors</h5>

                        <div className='steps mt-2'>
                            <h6 className='stepheading'>Setup an Asknello account</h6>
                            <p className='stepara'>As a new user, you have to setup an account. This can be done by navigating to Asknello.com or via Chatbot.</p>

                        </div>

                        <div className='steps mt-2'>
                            <h6 className='stepheading'>Find a preferred doctor based on specialization</h6>
                            <p className='stepara'>To help you get the right doctor for you needs, the doctor's list is based on specialization, choose the one that suit your needs. </p>

                        </div>

                        <div className='steps mt-2'>
                            <h6 className='stepheading'>Choose preferred date and time for available doctors</h6>
                            <p className='stepara'>You are almost there!. Now you are to choose preferred date and time to schedule online consultation with a doctor. </p>

                        </div>

                        <div className='steps mt-2'>
                            <h6 className='stepheading'>Secure the appointment</h6>
                            <p className='stepara'>Pay the consultation fee to secure the appointment. A link containing details of scheduled appointment and online video link will sent to you.  </p>

                        </div>
                        <div className='buttondiv text-center mt-5'>
                        <a href="https://wa.me/message/MCKR7N5KXAZJN1" class="btn "style={{
                            backgroundColor:"#25D366",
                            color:"white",
                            fontWeight:"bold"
                        }}> <img style={{
                            width:25
                        }}  src='https://cdn.usbrandcolors.com/images/logos/whatsapp-logo.svg'/>Get Started on WhatsApp</a>

                        </div>
                    </div>

                </div>


                {/* Hopsital Vistiation */}

                <div id="facility" className="infographics row  "style={{
                   
                            marginTop:90,
                            background:"white",
                            paddingTop:70,
                            paddingBottom:70,
                            paddingLeft:20,
                            paddingRight:20
                            
                            }}>

                    

                    <div className="infographic_text col-md-6">
                        <h5 style={{
                            
                        }}>Schedule appointment with Facility close to you</h5>

                        <div className='steps mt-2'>
                            <h6 className='stepheading'>Setup an Asknello account</h6>
                            <p className='stepara'>As a new user, you have to setup an account. This can be done by either navigating to Asknello.com or via Chatbot.</p>

                        </div>

                        <div className='steps mt-2'>
                            <h6 className='stepheading'>Choose the care you'd like to receive</h6>
                            <p className='stepara'>To help you get the right medical facility,  you are to choose the care-type you'd like to receive.  </p>

                        </div>

                        <div className='steps mt-2'>
                            <h6 className='stepheading'>Choose preferred location.</h6>
                            <p className='stepara'>Next step is to choose the location of your preferred facility. For convenience choose location closer to you. </p>

                        </div>

                        <div className='steps mt-2'>
                            <h6 className='stepheading'>Choose preferred date and time available for visit</h6>
                            <p className='stepara'>You are almost there!. Now you are to choose preferred date and time to schedule visit with the selected facility. </p>

                        </div>

                        <div className='steps mt-2'>
                            <h6 className='stepheading'>Secure the appointment</h6>
                            <p className='stepara'>Pay the consultation fee to secure the appointment. A link containing details of scheduled appointment and a downloadable confirmation slip will sent to you.  </p>

                        </div>
                        <div className='buttondiv text-center mt-2'>
                        <a href="https://wa.me/message/MCKR7N5KXAZJN1" class="btn "style={{
                            backgroundColor:"#25D366",
                            color:"white",
                            fontWeight:"bold"
                        }}> <img style={{
                            width:25
                        }}  src='https://cdn.usbrandcolors.com/images/logos/whatsapp-logo.svg'/>Get Started on WhatsApp</a>

                        </div>
                    </div>


                    <div className="infographic_image col-md-6">
                        <img style={{
                            width:"100%",
                            borderRadius:30,
                        }} className='imageinfor' src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668417715/Physical_Visit_1_scsr94.png" />

                       
                    </div>

                </div>


                <div className='py-5 mt-4 w-100 rounded'style={{
                        backgroundColor:"#1997cf",
                       
                    }}>

                        <h3  className='mb-1 feedbackheading' style={{
                            
                        }}>FAQs and Feedback</h3>

                        <p className='px-5 feedbackpara'>Explore our comprehensive FAQs for answers to common questions about our products and services, and share your feedback with us to help us improve your experience on our website. We value your input and strive to provide you with the best possible service. Thank you for choosing Nello!</p>

<div className='buttondiv text-center mt-5'>
                        <Link to="/faq" class="btn btn-primary mx-2"style={{
                            fontWeight:"bold"
                        }}> Explore Our FAQs</Link>  <Link to="/contact" class="btn btn-primary mx-2"style={{
                            fontWeight:"bold"
                        }}> Provide Feedback</Link>


                        </div>



                    </div>

                <div className="infographics row mt-3 "style={{
                   background:"white",
                   paddingTop:70,
                   paddingBottom:70,
                   paddingLeft:20,
                   paddingRight:20
                
                }}>

                    <div className="infographic_image col-md-6">
                        <img style={{
                            width:"85%",
                            borderRadius:30,
                        }} className='imageinfor' src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668417651/Order_Medication_1_nfkqkn.png" />

                       
                    </div>

                   

                    <div className="infographic_text col-md-6">
                        <h5 style={{
                            
                        }}>Order Medications</h5>

                        {/* <div className='steps mt-2'>
                            <h6 className='stepheading'>Setup an Asknello account</h6>
                            <p className='stepara'>As a new user, you have to setup an account, or login to existing account. </p>

                        </div> */}

                        <div className='steps mt-2'>
                            <h6 className='stepheading'>Navigate to Drug Store</h6>
                            <p className='stepara'>From the navigation menu, navigate to drug store </p>

                        </div>

                        <div className='steps mt-2'>
                            <h6 className='stepheading'>Search of Drugs</h6>
                            <p className='stepara'>Filter drugs based on drug name, category, price, etc. </p>

                        </div>

           

                        <div className='steps mt-2'>
                            <h6 className='stepheading'>Drug Prescription</h6>
                            <p className='stepara'>Request drug prescription  which will be prepared by a medical doctor. You can also upload existing prescriptions. </p>

                        </div>

                        <div className='steps mt-2'>
                            <h6 className='stepheading'>Complete Order</h6>
                            <p className='stepara'>Finally, Proceed to  checkout to complete the order process. Your order will be delivered to you in few hours. </p>

                        </div>

                        

                       
                        <div className='buttondiv text-center mt-5'>
                        <Link to="/drugs" class="btn btn-primary"style={{
                            fontWeight:"bold"
                        }}> Order Now</Link>

                        </div>
                    </div>

                </div>



                <div className='bannerimage'>
                    <Link to="/login">
                    <img style={{
                        maxWidth:"100%"
                    }} src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668417589/Hero_Banner_jy16ql.png" />
               </Link>
                </div>


                <div className="mb-5 mt-5 text-center">
                    <h1 className="mb-1 headings"style={{
                        
                    }}>What Our Customers are Saying</h1>
                   
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                    <a href="">
                        <div className="ccard-4">
                            <div className="ccard-4-inner">
                                {/* <img className="ccard-4-ico" src="./assets/images/home-user.svg" alt="home-user" /> */}
                                <i class="las la-quote-left ccard-4-ico"></i>
                                
                                <p>
                                "Very professional health service provider. Makes life easier by bringing quality health services to the clients fingertips. On time in appointment and doctor was amazing."
                                </p>
                            </div>
                            <a href="" className="ccard-4-more">
                                <span className='font-weight-bold'>Kelvin</span>
                                
                            </a>
                        </div>
                        </a>
                    </div>

                    <div className="col-lg-4 col-md-6">
                    <Link to="">
                        <div className="ccard-4">
                            <div className="ccard-4-inner">
                                {/* <img className="ccard-4-ico" src="./assets/images/home-shopping-cart.svg" alt="home-shopping-cart" /> */}
                                <i class="las la-quote-left ccard-4-ico"></i>
                               
                                <p>
                                    Asknello gives me the comfort of purchasing quality drugs and get it delivered in few hours. This also comes with issurance of proper drug prescriptions which are prescribed by certified doctors.                               </p>
                            </div>
                            <Link to="" className="ccard-4-more">
                                <span className='font-weight-bold'>Mrs Bola</span>
                               
                            </Link>
                        </div>
                        </Link>
                    </div>

                    <div className="col-lg-4 col-md-6">
                    <a href="">
                        <div className="ccard-4">
                            <div className="ccard-4-inner">
                                {/* <img className="ccard-4-ico" src="./assets/images/home-calendar.svg" alt="home-calendar" /> */}
                                <i class="las la-quote-left ccard-4-ico"></i>
                                
                                <p>
                                    With the use of chatbot to drive conversions with Nello, the overall experience has been wonderful, With the smart Bot I was able to enjoy all services with ease..    </p>
                            </div>
                            <a href="" className="ccard-4-more">
                                <span className='font-weight-bold'>Chuks</span>
                                
                            </a>
                        </div>
                        </a>
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


                <div className="mb-5 mt-5 text-center">
                    <h1 className="mb-1 headings"style={{
                        
                    }}>Why Choose Nello</h1>
                   
                </div>

                <div className="row">
                    <div className="col-lg-4 col-md-6">
                    <a href="">
                        <div className="ccard-4">
                            <div className="text-center">
                                <img style={{
                                     width:"70%"
                                 }} className="" src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668417534/Consult_Doctor_ljvcjf.png" alt="home-user" />
                                
                                
                           <p className='mt-2'>Easy access to  schedule appointment with medical experts and facility of your choice.</p>
                               
                            </div>
                           
                        </div>
                        </a>
                    </div>

                    <div className="col-lg-4 col-md-6">
                    <Link to="">
                        <div className="ccard-4">
                            <div className="text-center">
                                 <img style={{
                                     width:"70%"
                                 }} className="" src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668417652/Order_Medication_2_kv3vvm.png" alt="home-shopping-cart" /> 
                                {/* <i class="las la-quote-left ccard-4-ico"></i> */}
                               
                                <p className='mt-2 hoverme'>Get approved prescription prepared by medical experts, for every drugs ordered on Nello.</p>
                            </div>
                           
                        </div>
                        </Link>
                    </div>

                    <div className="col-lg-4 col-md-6">
                    <a href="">
                        <div className="ccard-4">
                            <div className="text-center ">
                                 <img style={{
                                     width:"70%"
                                 }} className="" src="https://res.cloudinary.com/edifice-solutions/image/upload/v1668417506/Chatbot_1_wuh1mi.png" alt="home-calendar" /> 
                             
                                
                               <p className="mt-2">Access to 24/7 free chat with medical support Agent. </p>
                            </div>
                            
                        </div>
                        </a>
                    </div>

                    

                    
                </div>

                <div className="mb-5 mt-5 text-center">
                    <h1 className="mb-1 headings"style={{
                        
                    }}>We are trusted by</h1>
                   
                </div>
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
        </div>

    </>);
}