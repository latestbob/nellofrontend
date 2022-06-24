import * as React from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';

export default function Browse() {

    return (<>

        <section className="bg-sky-light">
            <div className="container section text-center">
                <div className="container-width-sm">
                    <h2 className="font-weight-bold">Browse Various Medical/Health Services</h2>
                    <p className="font-size-md mb-sm-5">We have various services to suit your medical needs</p>
                </div>

                <div className="row">
                    <div className="col-lg-3 col-md-6 col-6">
                        <div className="ccard-2">
                            <Link to="/doctors">
                                <img src="./assets/images/doctor.svg" className="mb-4" alt="doctor" />
                                <h5 className="text-secondary-dark font-weight-bold">Find a Doctor</h5>
                                <p>Find specialized doctors to meet your healthcare needs.</p>
                                <img src="./assets/images/ico-arrow-right-primary.svg" alt="" className="arrow" />
                                <img src="./assets/images/ico-circle-arrow-right.svg" alt="" className="arrow-hover" />
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-6">
                        <div className="ccard-2">
                            <Link to="/drugs">
                                <img src="./assets/images/drugs.svg" className="mb-4" alt="doctor" />
                                <h5 className="text-secondary-dark font-weight-bold">Order Medication</h5>
                                <p>Buy drugs and have it delivered.</p>
                                <img src="./assets/images/ico-arrow-right-primary.svg" alt="" className="arrow" />
                                <img src="./assets/images/ico-circle-arrow-right.svg" alt="" className="arrow-hover" />
                            </Link>
                        </div>
                    </div>


                    <div className="col-lg-3 col-md-6 col-6">
                        <div className="ccard-2">
                            <Link to="/appointment">
                                <img src="./assets/images/schedule.svg" className="mb-4" alt="doctor" />
                                <h5 className="text-secondary-dark font-weight-bold">Schedule Appointment</h5>
                                <p>Request an appointment with one of our doctors.</p>
                                <img src="./assets/images/ico-arrow-right-primary.svg" alt="" className="arrow" />
                                <img src="./assets/images/ico-circle-arrow-right.svg" alt="" className="arrow-hover" />
                            </Link>
                        </div>
                    </div>


                    <div className="col-lg-3 col-md-6 col-6"    onClick={() =>
                NotificationManager.info("Service temporally down")
              }>
                        <div className="ccard-2">
                            {/* <Link to="/fitness"> */}
                            {/* <Link> */}
                                <img src="./assets/images/fitness.svg" className="mb-4" alt="doctor" />
                                <h5 className="text-secondary-dark font-weight-bold">Health & Fitness Plan</h5>
                                <p>Get latest health and fitness tips to help you stay healthy.</p>
                                <img src="./assets/images/ico-arrow-right-primary.svg" alt="" className="arrow" />
                                <img src="./assets/images/ico-circle-arrow-right.svg" alt="" className="arrow-hover" />
                            {/* </Link> */}
                        </div>
                    </div>

                </div>

            </div>
        </section>


        {/* <section className="section">
            <div className="container text-center">
                <div className="container-width-md call-ta-1">
                    <h1 className="h1-lg">Did You know you can Perform All these Tasks with AskNello?</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum diam orci pretium a pharetra, feugiat
          cursus. </p>

                    <img src="./assets/images/broswe-img.svg" alt="" />


                    <div>
                        <button className="btn btn-primary btn-arrow btn-lg">Learn more</button>
                    </div>


                </div>
            </div>
        </section> */}
    </>);
}