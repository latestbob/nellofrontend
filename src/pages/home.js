import * as React from 'react';
import { Link } from 'react-router-dom';
import MasterContext from '../layout/context'
import { useContext } from 'react';
import axios from 'axios';
import { showLoader, hideLoader } from '../helper/loader';

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
                    <h1>Hi, I am Nello! Your Personal Health Assistant</h1>
                    <p>
                    I'll help you get the high-quality health care you need to stay healthy. How may I assist in improving your health today?
                    </p>

                    <button  class="btn btn-primary btn-lg text-center" onClick={toggleChatBox} >Get Started</button> 
                </div>

                <img src="./assets/images/banner-img.svg" alt="banner-img" />
            </div>
        </div>


        <div className="how-it-works">
            <div className="container">
                <div className="mb-5">
                    <h1 className="mb-1">Our Features</h1>
                    We made our features easy and simple to help you achieve your desired goals.
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                    <Link to="/doctors">
                        <div className="ccard-4">
                            <div className="ccard-4-inner">
                                {/* <img className="ccard-4-ico" src="./assets/images/home-user.svg" alt="home-user" /> */}
                                <i class="las la-user ccard-4-ico"></i>
                                <h4>Find a Doctor</h4>
                                <p>
                                    Find specialized doctors to meet your healthcare needs.
                                </p>
                            </div>
                            <Link to="/doctors" className="ccard-4-more">
                                <span>Learn More</span>
                                <img className="main" src="./assets/images/home-arrow-right.svg" alt="home-arrow-right" />
                                <img className="alt" src="./assets/images/home-arrow-right-white.svg" alt="home-arrow-right-white" />
                            </Link>
                        </div>
                        </Link>
                    </div>

                    <div className="col-lg-4 col-md-6">
                    <Link to="/drugs">
                        <div className="ccard-4">
                            <div className="ccard-4-inner">
                                {/* <img className="ccard-4-ico" src="./assets/images/home-shopping-cart.svg" alt="home-shopping-cart" /> */}
                                <i class="las la-shopping-cart ccard-4-ico"></i>
                                <h4>Order Medication</h4>
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
                    <Link to="/appointment">
                        <div className="ccard-4">
                            <div className="ccard-4-inner">
                                {/* <img className="ccard-4-ico" src="./assets/images/home-calendar.svg" alt="home-calendar" /> */}
                                <i class="las la-calendar-minus ccard-4-ico"></i>
                                <h4>Hospital Appointment</h4>
                                <p>
                                    Schedule  appointment with hospitals close to you.    </p>
                            </div>
                            <Link to="/appointment" className="ccard-4-more">
                                <span>Learn More</span>
                                <img className="main" src="./assets/images/home-arrow-right.svg" alt="home-arrow-right" />
                                <img className="alt" src="./assets/images/home-arrow-right-white.svg" alt="home-arrow-right-white" />
                            </Link>
                        </div>
                        </Link>
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
            </div>
        </div>

    </>);
}