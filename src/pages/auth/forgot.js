import * as React from "react";
import { useHistory, Link, useLocation, useRedirect, Redirect } from "react-router-dom";
import AppContext from "../../context";

import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ErrorMsg } from "../../components";
import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2';
import { showLoader, hideLoader } from "../../helper/loader";


import useFormState from "./../../hooks/useFormState";

export default function Forgot({ history }) {
  const { dispatch, setUserData, validateEmail, errorResponse, baseUrl } =
    React.useContext(AppContext);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/account" } };
  let { appointment, fitness } = location.state || {
    appointment: false,
    fitness: false,
  };
  
const [forgotemail,setForgotEmail] = useState("");

const Swal = require('sweetalert2')


function handleChange(event){
    setForgotEmail(event.target.value);

}

function onSubmitForgot(e){
e.preventDefault();
    // alert(forgotemail);

    showLoader();

    axios.post(`${process.env.REACT_APP_API_URL}auth/forgot-password`,{
      'email':forgotemail,
      
  }).then(response => {
      console.log(response)
      hideLoader();

      if(response.data.status == true){
          Swal.fire(
              'Email Verified!',
              `${response.data.message}`,
              'success'
            )


            history.replace('/reset-password', response.data.email);

           
         
      }

      else if(response.data.status == false){
        Swal.fire(
          'Email Not Registered!',
          `${response.data.msg}`,
          'error'
        )
      }
  }).catch(error => {
      console.log(error)
  })



   


}
  return (
    <>
      <header>
        <div className="container header container-layout">
          <div className="logo">
            <Link to="/">
              <img src="http://asknello.com:5500//assets/images/logo.svg" alt="" />
            </Link>
          </div>
        </div>
      </header>
      <div class="auth-container">
        <div class="modal-login" tabIndex="-1" role="dialog">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <Link class="close" to="/">
                  <i class="fal fa-times"></i>
                </Link>
                <div class="ma-side">
                  <div class="ma-side-content">
                    <img src="./assets/images/img-ldy.svg" alt="" />
                    <img src="./assets/images/logo-w-isp.svg" alt="" />

                    <p>
                     Forgot you password ? We got you covered, <br/> 
                     Kindly fill the email to reset your password.
                    </p>
                  </div>
                </div>

                <div class="ma-main">
                  <h5>FORGOT PASSWORD</h5>
                  <hr />

                  <form id="form-login" onSubmit={onSubmitForgot}>
                    <div class="form-group">
                      <label>Email Address</label>
                      <input

                      onChange={handleChange}
                        type="email"
                        class="form-control"
                        // {...register("email", {
                        //   validate: () => validateEmail(getValues("email")),
                        // })}
                        name="email"
                        placeholder="Email Address"
                        value={forgotemail}
                      
                        required

                      />
                      <ErrorMsg errors={errors} name="email" />
                    </div>

                  
                    <Link to="/login" class="font-weight-medium">
                      Back to Login
                    </Link>

                    <hr />

                 

                    <button
                      type="submit"
                      class="btn btn-primary btn-block btn-lg mb-3 btn-main"
                    >
                      Continue
                    </button>
                  </form>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
