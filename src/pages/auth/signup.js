import * as React from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import AppContext from "../../context";
import { signup } from "../../Services";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  ErrorMsg,
  SelectDays,
  SelectMonths,
  SelectYears,
} from "../../components";
import { Checkbox } from "pretty-checkbox-react";
import useFormState from "./../../hooks/useFormState";
import { useState } from "react";
import { NotificationManager } from "react-notifications";

export default function SignUp() {
  const { dispatch, setUserData, validateEmail, errorResponse, baseUrl } =
    React.useContext(AppContext);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      terms: true,
    },
  });
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/account" } };
  let { appointment } = location.state || { appointment: false };
  const { toggleFormState } = useFormState("form-login");

  React.useEffect(() => {
    console.log(from, "from SignUp...");
    toggleFormState(false);
    return () => {
      toggleFormState(false);
    };
  }, []);

  const [passwordData , setPasswordData] = useState("");
  const [passed , setPassed] = useState(false);
  //password Toggle 

  function passwordToggle(e){
    let myinput = document.getElementById("passwordInput");

    if(myinput.type === "password"){
      myinput.type = "text";
    }

    else{
      myinput.type = "password";
    }
  }

  function handlePasswordChanged(e){
    setPasswordData(e.target.value);

    let lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    
    var special = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;

    if (
      !passwordData.match(lowerCaseLetters) ||
      !passwordData.match(upperCaseLetters) ||
      !passwordData.match(numbers) ||
      !passwordData.match(special) ||
      passwordData.length < 7 
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

  const onSubmit = (data) => {
    console.log(data)
    toggleFormState(true, "signing you in...");
    data = {
      ...data,
      password_confirmation: data?.password,
      dob: `${data.dobDay}-${data.dobMonth}-${data.dobYear}`,
    };
    signup(data)
      .then((response) => {
        const { token, user } = response;
        setUserData(dispatch, token, user);
        if (appointment && !user.subscription?.doctor) {
          history.push({
            pathname: "/doctor-signup",
            state: { service: "doctor" },
          });
        } else {
          history.replace(from);
        }
      })
      .catch((error) => {
        errorResponse({ error, exclude: [401] });
      })
      .then(() => toggleFormState(false));
  };

  return (
    <>
      <header>
        <div className="container header container-layout">
          <div className="logo">
            <Link to="/">
              <img src={`${baseUrl}/assets/images/logo.svg`} alt="" />
            </Link>
          </div>
        </div>
      </header>
      <div class="auth-container">
        <div class="modal-login" tabindex="-1" role="dialog">
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
                      You need to Sign Up to enjoy the full Services of Ask
                      Nello so your tasks can be made easier.
                    </p>
                  </div>
                </div>

                <div class="ma-main">
                  <h5 className="h-bordered">CREATE AN ACCOUNT</h5>

                  <form id="form-login" onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        {...register("firstname", {
                          required: "First name is required!",
                          pattern: /^[A-Za-z]+$/i 
                          
                        })}
                        placeholder="First Name"
                      />
                      <ErrorMsg errors={errors} name="firstname" />
                      {errors?.firstname?.type === "pattern" && (
                        <p style={{
                          fontSize:"11px",
                        }} className="text-danger">Alphabetical characters only</p>
                      )}
                    </div>

                    <div class="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        {...register("lastname", {
                          required: "Last name is required!",
                          pattern: /^[A-Za-z]+$/i 
                        })}
                        placeholder="Last Name"
                      />
                      <ErrorMsg errors={errors} name="lastname" />

                      {errors?.lastname?.type === "pattern" && (
                        <p style={{
                          fontSize:"11px",
                        }} className="text-danger">Alphabetical characters only</p>
                      )}
                    </div>

                    <div class="form-group">
                      <label>Email Address</label>
                      <input
                        type="text"
                        class="form-control"
                        {...register("email", {
                          validate: () => validateEmail(getValues("email")),
                        })}
                        name="email"
                        placeholder="Email Address"
                      />
                      <ErrorMsg errors={errors} name="email" />
                    </div>

                    <div class="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        class="form-control"
                        {...register("password", {
                          required: "Password is required!",
                          minLength: {
                            value: 6,
                            message: "Password must have at least 6 characters",
                          },
                        })}

                        onKeyUp={handlePasswordChanged}
                        name="password"
                        placeholder="Password"
                        id="passwordInput"
                      />
                   
                   {!passed ?     <span className="text-danger"style={{
                        fontSize:"11px",
                      }}>Password must contain, uppercase, lowercase, number, special character and greater than 7 caracters</span>
                    :
                    <span className="text-success"style={{
                      fontSize:"11px",
                    }}>Password Validation Checked </span>
                    }
                    <br/>
                      <input type='checkbox' onClick={passwordToggle} /> Show Password
                      <ErrorMsg errors={errors} name="password" />
                      
                    </div>

                    <div class="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        class="form-control"
                        {...register("phone", {
                          required: "Phone number is required!",
                          minLength:10,
                          pattern:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
                        })}
                        placeholder="Phone Number"
                      />
                      <ErrorMsg errors={errors} name="phone" />

                      {errors?.phone?.type === "minLength" && (
                        <p style={{
                          fontSize:"11px",
                        }} className="text-danger">Phone number should be at least 10 in value</p>
                      )}

                      {errors?.phone?.type === "pattern" && (
                        <p style={{
                          fontSize:"11px",
                        }} className="text-danger">Invalid phone format</p>
                      )}
                    </div>

                    <div class="form-group">
                      <label>Gender</label>
                      <select
                        class="form-control"
                        {...register("gender", {
                          required: "Gender is required!",
                        })}
                      >
                        <option value="">- Select -</option>
                        <option>Female</option>
                        <option>Male</option>
                      </select>
                      <ErrorMsg errors={errors} name="gender" />
                    </div>

                    <div>
                      <label class="form-label display-block">Birth Date</label>
                      <div class="form-group">
                        <div class="row">
                          <div class="col-4">
                            <select
                              class="form-control"
                              {...register("dobDay", {
                                required: "Day is required!",
                              })}
                            >
                              <option value="" selected>
                                - Day -
                              </option>
                              <SelectDays />
                            </select>
                          </div>

                          <div class="col-4">
                            <select
                              class="form-control"
                              {...register("dobMonth", {
                                required: "Month is required!",
                              })}
                            >
                              <option value="" selected>
                                - Month -
                              </option>
                              <SelectMonths />
                            </select>
                          </div>

                          <div class="col-4">
                            <select
                              class="form-control"
                              {...register("dobYear", {
                                required: "Year is required!",
                              })}
                            >
                              <option value="" selected>
                                - Year -
                              </option>
                              <SelectYears />
                            </select>
                          </div>
                        </div>
                        <ErrorMsg errors={errors} name="dobDay" />
                        <ErrorMsg errors={errors} name="dobMonth" />
                        <ErrorMsg errors={errors} name="dobYear" />
                      </div>
                    </div>

                    <hr />

                    <div class="mb-2">
                      <Checkbox
                        color="primary-o"
                        icon={<i className="mdi mdi-check" />}
                        {...register("terms", {
                          required: "Please accept terms and conditions!",
                        })}
                        bigger
                      >
                        I agree to the{" "}
                        <Link to="/">
                          <u className="text-sky">Terms and Conditions</u>
                        </Link>
                      </Checkbox>
                      <ErrorMsg errors={errors} name="terms" />
                    </div>

                    <div class="mb-3">
                      <Checkbox
                        color="primary-o"
                        icon={<i className="mdi mdi-check" />}
                        bigger
                      >
                        I want health news and updates from Nello
                      </Checkbox>
                    </div>

                    {passed && <button
                      type="submit"
                      class="btn btn-primary btn-block btn-lg mb-3 btn-main"
                    >
                      Continue
                    </button>}
                  </form>

                  <div class="text-center">
                    <Link
                      to={{ pathname: "/login", state: { from } }}
                      class="action-link cursor-pointer"
                    >
                      I already have an account? <span>LOG IN</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
