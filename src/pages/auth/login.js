import * as React from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import AppContext from "../../context";
import { login } from "../../Services";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ErrorMsg } from "../../components";
import { Checkbox } from "pretty-checkbox-react";
import useFormState from "./../../hooks/useFormState";

export default function Login({ history }) {
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
  let { from } = location.state || { from: { pathname: "/account" } };
  let { appointment, fitness } = location.state || {
    appointment: false,
    fitness: false,
  };
  const { toggleFormState } = useFormState("form-login");

  React.useEffect(() => {
    toggleFormState(false);
    return () => {
      toggleFormState(false);
    };
  }, [toggleFormState]);

  React.useEffect(() => {
    console.log(from, "appointment...");
  }, [from]);


  function passwordToggle(e){
    let myinput = document.getElementById("passwordInput");

    if(myinput.type === "password"){
      myinput.type = "text";
    }

    else{
      myinput.type = "password";
    }
  }

  const onSubmit = (data) => {
    toggleFormState(true, "logging you in...");
    login(data)
      .then(({ token, user }) => {
        setUserData(dispatch, token, user);
        localStorage.setItem("token",token)
        history.replace(from);
        /* if (appointment && !user.subscription?.doctor) {
                history.push({ pathname: '/doctor-signup', state: { service: 'doctor' } });
            } else {
                history.replace(from);
            } */
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
                      You need to Log In your account to enjoy the full Services
                      of Ask Nello so your tasks can be made easier.
                    </p>
                  </div>
                </div>

                <div class="ma-main">
                  <h5>CONTINUE TO YOUR ACCOUNT</h5>
                  <hr />

                  <form id="form-login" onSubmit={handleSubmit(onSubmit)}>
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
                        })}
                        name="password"
                        placeholder="Password"
                        id="passwordInput"
                      />
                      <ErrorMsg errors={errors} name="password" />

                      <input type='checkbox' onClick={passwordToggle} /> Show Password
                    </div>
                    <Link to="/forgot" class="font-weight-medium">
                      Forgot Password?
                    </Link>

                    <hr />

                    {/* <div class="mb-3">
                                    <Checkbox animation="tada" color="primary-o" 
                                    icon={<i className="mdi mdi-check" />} bigger>Remember me</Checkbox>
                                </div> */}

                    <button
                      type="submit"
                      class="btn btn-primary btn-block btn-lg mb-3 btn-main"
                    >
                      Continue
                    </button>
                  </form>

                  <div class="text-center">
                    <Link
                      to={{ pathname: "/signup", state: { from } }}
                      class="action-link cursor-pointer"
                    >
                      Don’t have an Account Yet? <span>SIGN UP</span>
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
