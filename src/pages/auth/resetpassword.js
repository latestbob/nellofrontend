import * as React from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import AppContext from "../../context";

import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ErrorMsg } from "../../components";
import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2';
import { showLoader, hideLoader } from "../../helper/loader";

import useFormState from "./../../hooks/useFormState";

export default function ResetPassword({ history }) {
  const { dispatch, setUserData, validateEmail, errorResponse, baseUrl } =
    React.useContext(AppContext);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  //let history = useHistory();
  let location = useLocation();
  // let { from } = location.state || { from: { pathname: "/account" } };
  // let { appointment, fitness } = location.state || {
  //   appointment: false,
  //   fitness: false,
  // };


  const [myemail , setEmail] = useState(location.state);
  const [code , setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation , setConfirm] = useState("");

  const [passed , setPassed] = useState(false);
  

const Swal = require('sweetalert2')

  //password Toggle 

  function passwordToggle(e){
    let myinput = document.getElementById("passwordInput");
    let myinputwo = document.getElementById("passwordInputtwo");

    if(myinput.type === "password"){
      myinput.type = "text";
      myinputwo.type = "text";
    }

    else{
      myinput.type = "password";
      myinputwo.type = "password";
    }
  }



function handleResetChange(e){
  setResetCode(e.target.value);
}

// function handlePasswordChange(e){
// setPassword(e.target.value);
// }
function handlePasswordChanged(e){
  setPassword(e.target.value);

  let lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;
  
  var special = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;

  if (
    !password.match(lowerCaseLetters) ||
    !password.match(upperCaseLetters) ||
    !password.match(numbers) ||
    !password.match(special) ||
    password.length < 8
  ) {
    // return NotificationManager.error(
    //   "Invalid password, password must contain,uppercase,lowercase and greater than 8 caracters"
    // );

    setPassed(false);
  }

  else{
    setPassed(true);
  }

  

}

function handleConfirm(e){
  setConfirm(e.target.value);
}


function onSubmitReset(e){
e.preventDefault();
     
//reset the password
showLoader();
axios.post(`${process.env.REACT_APP_API_URL}auth/reset-password`,{
  'email':myemail,
  'password':password,
  'code':code,
  'password_confirmation':password_confirmation
  
}).then(response => {
  console.log(response)
  hideLoader();

  if(response.data.status == true){
      Swal.fire(
          'Password Reset Successful',
          `${response.data.message}`,
          'success'
        )



        history.replace('/login');


        

        
     
  }

  else if(response.data.status == "invalid"){
    Swal.fire(
      'Invalid Credentials !',
      `${response.data.message}`,
      'error'
    )
  }
  else if(response.data.status == "expired"){
    Swal.fire(
      'Reset Code Expired !',
      `${response.data.message}`,
      'error'
    )

    history.replace('/forgot');
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

                    <p> <br/> 
                     Kindly fill the the necessary fields to reset your password.
                    </p>
                  </div>
                </div>

                <div class="ma-main">
                  <h5>RESET PASSWORD </h5>
                  <hr />

                  <form id="form-login" onSubmit={onSubmitReset}>
                    
                      <input

                      
                        type="hidden"
                        class="form-control"
                        // {...register("email", {
                        //   validate: () => validateEmail(getValues("email")),
                        // })}
                        
                        name="email"
                        placeholder="Email Address"
                        
                        value={myemail}
                      
                        

                      />
                      
                    

                    <div class="form-group">
                      <label>Reset Code</label>
                      <input

                      
                        type="text"
                        class="form-control"
                        // {...register("email", {
                        //   validate: () => validateEmail(getValues("email")),
                        // })}
                        onChange={handleResetChange}
                        name="code"
                        placeholder="Enter 6 digts(s) Reset Code"
                        value={code}
                      
                        required

                      />
                      
                    </div>

                    <div class="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        class="form-control"
                       
                        onChange={handlePasswordChanged}
                        name="password"
                        placeholder="New Password"
                        minLength="8"
                        id="passwordInput"

                        value={password}
                        // onKeyUp={handlePasswordChanged}

                        required
                      />
                      
                      {!passed ?     <span className="text-danger"style={{
                        fontSize:"11px",
                      }}>Password must contain, uppercase, lowercase, number, special character and greater than 7 caracters</span>
                    :
                    <span className="text-success"style={{
                      fontSize:"11px",
                    }}>Password Validation Checked </span>
                    }
                    </div>

                    <input type='checkbox' onClick={passwordToggle} /> Show Password

                    <div class="form-group">
                      <label>Confirm Password</label>
                      <input

                      onChange={handleConfirm}
                        type="password"
                        class="form-control"
                       
                        name="password_confirmation"
                        placeholder="Confirm Password Password"
                        minLength="8"
                        id="passwordInputtwo"

                        value={password_confirmation}
                        required
                      />
                      
                    </div>

                  
                    {/* <Link to="/login" class="font-weight-medium">
                      Back to Login
                    </Link> */}

                    <hr />

                 

                    <button
                      type="submit"
                      class="btn btn-primary btn-block btn-lg mb-3 btn-main"
                    >
                      Reset Password
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
