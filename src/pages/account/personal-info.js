import * as React from "react";
import { Link } from "react-router-dom";
import {
  Currency,
  ErrorMsg,
  SelectDays,
  SelectMonths,
  SelectYears,
} from "./../../components";
import AppContext from "../../context";
import { useForm } from "react-hook-form";
import useFormState from "./../../hooks/useFormState";
import { userUpdate } from "../../Services";
import { useMutation, useQuery } from "react-query";
import moment from "moment";
import { Modal } from "react-bootstrap";
import useModal from "../../hooks/useModal";
import { useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";

export default function Browse({ history }) {
  const {
    dispatch,
    updateUserData,
    userData,
    validateEmail,
    notify,
    errorResponse,
  } = React.useContext(AppContext);
  //let { firstname, lastname, email, gender, phone, dob } = userData;
  const { modalState, closeModal, showModal } = useModal();

  const [dobDay] = React.useState(() => moment(userData?.dob).format("DD"));
  const [dobMonth] = React.useState(() => moment(userData?.dob).format("MM"));
  const [dobYear] = React.useState(() => moment(userData?.dob).format("YYYY"));

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: userData?.firstname,
      lastname: userData?.lastname,
      email: userData?.email,
      gender: userData?.gender,
      phone: userData?.phone,
      dobDay,
      dobMonth,
      dobYear,
    },
  });
  const { toggleFormState } = useFormState("form-user-update");


  ///UPDATE PASSWORD FORM STATE

  const [currentpassword , setCurrentPassword] = useState("");
  const [newpassword ,  setNewPassword] = useState("");
  const [confirmpassword , setConfirmPassword] = useState("");
  const [passwordmatched , setPasswordMatched] = useState(false);

//password Toggle 

function passwordToggle(e){
  let myinput = document.getElementById("passwordInput");
  let myinputwo = document.getElementById("passwordInputtwo");
  let myinputhree = document.getElementById("passwordInputthree");

  if(myinput.type === "password"){
    myinput.type = "text";
    myinputwo.type = "text";
    myinputhree.type = "text";
  }

  else{
    myinput.type = "password";
    myinputwo.type = "password";
    myinputhree.type = "password";
  }
}


  //current password input handler

  function handleCurrentPassword(e){
    setCurrentPassword(e.target.value);
  }

  //new passworf input handler 

  function handleNewPassword(e){
    setNewPassword(e.target.value);
  }

  //confirm password input handler

  function handleConfirmPassword(e){
    setConfirmPassword(e.target.value);

    
  }


  function handleKeyUp(e){
    
    if(e.target.value == newpassword){
      setPasswordMatched(true);
    } 

    else{
      setPasswordMatched(false);
    }
  }

  function onFormSubmit(e){
    e.preventDefault();

    //change password Route

    
    axios.post('http://127.0.0.1:8000/api/auth/password',{
     'current_password':currentpassword,
     'password':newpassword
      
  }).then(response => {
      console.log(response)

      if(response.data.status == true){
          Swal.fire(
              'Password Updated!',
              `${response.data.message}`,
              'success'
            )
         
      }

      else if(response.data.status == false){
        Swal.fire(
          'Invalid Credential',
          `${response.data.error}`,
          'error'
        )
      }
  }).catch(error => {
      console.log(error)
  })

    

   
    
  }


  React.useEffect(() => {
    //console.log(userData, 'userData..')
    //setValue([{ name: userData.name }, { phone: userData.phone }]);
  }, [userData]);

  /* User data */
  /* useQuery('user-data', benefitTypesList, {
        onError: (error) => setBenefitTypes([]),
        onSuccess: (data) => setBenefitTypes(data),
    }); */

  const onSubmit = (data) => {
    data = { ...data, dob: `${data.dobDay}-${data.dobMonth}-${data.dobYear}` };
    toggleFormState(true, "updating...");
    userUpdate(data)
      .then(({ user }) => {
        notify(
          "success",
          "Info Update!",
          "Personal information successfully updated!"
        );
        updateUserData(dispatch, user);
      })
      .catch((error) => {
        errorResponse({ error, dispatch, history });
      })
      .then(() => toggleFormState(false));
  };

  return (
    <>
      <div class="page-title">Personal Information</div>
      <form id="form-user-update" onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>First Name</label>
              <input
                type="text"
                class="form-control"
                {...register("firstname", {
                  required: "First name is required!",
                })}
                placeholder="First Name"
              />
              <ErrorMsg errors={errors} name="firstname" />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label>Last Name</label>
              <input
                type="text"
                class="form-control"
                {...register("lastname", {
                  required: "Last name is required!",
                })}
                placeholder="Last Name"
              />
              <ErrorMsg errors={errors} name="lastname" />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label>Email Address</label>
              <input
                type="text"
                class="form-control"
                {...register("email", {
                  validate: () => validateEmail(getValues("email")),
                })}
                placeholder="Email Address"
              />
              <ErrorMsg errors={errors} name="email" />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                class="form-control"
                {...register("phone", {
                  required: "Phone number is required!",
                })}
                placeholder="Phone Number"
              />
              <ErrorMsg errors={errors} name="phone" />
            </div>
          </div>

          <div class="col-md-6">
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
          </div>

          <div class="col-md-6">
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
                    <option value="">- Day -</option>
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
                    <option value="">- Month -</option>
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
                    <option value="">- Year -</option>
                    <SelectYears />
                  </select>
                </div>
              </div>
              <ErrorMsg errors={errors} name="dobDay" />
              <ErrorMsg errors={errors} name="dobMonth" />
              <ErrorMsg errors={errors} name="dobYear" />
            </div>
          </div>
        </div>

        <span
          onClick={showModal}
          class="font-weight-bold text-primary font-size-md cursor-pointer"
        >
          Update Password
        </span>

        <hr />

        <div class="row">
          <div class="col-md-6">
            <button
              type="submit"
              class="btn btn-primary btn-lg btn-block btn-main"
            >
              Update Info
            </button>
          </div>
        </div>
      </form>

      <Modal
        show={modalState}
        onHide={closeModal}
        animation={false}
        keyboard={false}
        className="modal-reset-password"
        backdrop="static"
      >
        <Modal.Body className="p-4">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={closeModal}
          >
            <i class="fal fa-times"></i>
          </button>

          <h5>CHANGE PASSWORD</h5>
          <hr />

         <form method="POST" onSubmit={onFormSubmit}>

         <div class="form-group">
            <label>Current Password</label>
            <input
              type="password"
              class="form-control"
              name=""
              placeholder="Current Password"
              onChange={handleCurrentPassword}

              id="passwordInputthree"

              required
            />
          </div>

          <div class="form-group">
            <label>New Password</label>
            <input
              type="password"
              class="form-control"
              name=""
              placeholder="New Password"
              onChange={handleNewPassword}

              id="passwordInput"

              minLength="6"

              required
            />
          </div>

          <input type='checkbox' onClick={passwordToggle} /> <span style={{
            fontSize:"12px"
          }}>Show Password</span>

          <div class="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              class="form-control"
              name=""
              placeholder="Confirm New Password"
              onChange={handleConfirmPassword}
              id="passwordInputtwo"

              onKeyUp={handleKeyUp}

              required
            />
            
            {!passwordmatched ? 
          <span style={{
            fontSize:"10px"
          }} className="text-danger font-weight-bold">Password Not Matched</span>
          :
          <div></div>  
          }
          </div>
          

          <hr />

         

          {passwordmatched ? 
          <button class="btn btn-primary btn-block btn-lg mb-3">
          Continue
        </button> :
        <div></div>
        }

         </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
