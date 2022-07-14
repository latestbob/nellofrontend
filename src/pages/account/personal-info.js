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
import { NotificationManager } from "react-notifications";
import { showLoader, hideLoader } from "../../helper/loader";

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
  const [states, setStates] = useState([]);

  
  const [lag, setUserLga] = useState([]);
  const [selected , setSelected] = useState("");

  const [selectedlga , setSelectedlga] = useState("");

  const [address , setAddress] = useState("");

  //previous details

  const [prestate , setPreState] = useState("");
  const [prelga , setPreLga] = useState("");
  const [preaddress , setPreAddress] = useState("");

//password Toggle 

//hanndle update click 

function handleUpdateClick(e){
  e.preventDefault();
  //alert('Working')

  if(selected == "" || selectedlga == "" || address == ""){
    return NotificationManager.error("Complete the necessary Fields");
  }

  else{
    
    showLoader();
    axios.post(`${process.env.REACT_APP_API_URL}profile/update/address`,{
          
      //request body here to complete appointment process
  state : selected ,
  lga : selectedlga ,
  address : address
  

      }).then(response => {
          console.log(response)
          hideLoader();
          console.log(response.data)
          
          if(response.data.noerror == true){
            //return NotificationManager.success("Contact Address Updated Successfully");
            Swal.fire(
              'Address Updated Successfully',
             
              'success'
            )
            window.location.reload(false);
            
             
          }


      }).catch(error => {
          console.log(error)
      })

  }
}

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


  function handleSelected(e){
    e.preventDefault()

    console.log(e.target.value)

    
   

    // console.log(`http://locationsng-api.herokuapp.com/api/v1/states/${userstate}/lgas`)
//     axios.get(`http://locationsng-api.herokuapp.com/api/v1/states/${userstate}/lgas`, {
     
//     }).then(response => {
//     console.log(response.data)

//     //setUserLga(response.data)

    

   


// }).catch(error => {
//     console.log(error)
// })

  }
  function onFormSubmit(e){
    e.preventDefault();

    //change password Route

    
    axios.post(`${process.env.REACT_APP_API_URL}auth/password`,{
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
    //console.log(userData)
  }, [userData]);

  React.useEffect(() => {
    
    var token = localStorage.getItem('token');

    if(token){
      axios.get(`${process.env.REACT_APP_API_URL}auth/user`, {
     
      }).then(response => {
      console.log('uservalue',response.data.user.address)

      console.log('user',response.data.user)

      setPreState(response.data.user.state);
      setPreLga(response.data.user.city);
      setPreAddress(response.data.user.address)
  
     
  
     
  
  
  }).catch(error => {
      console.log(error)
  })
    }





    
  }, [preaddress]);


  React.useEffect(() => {
    
    if(selected == "Federal Capital Territory"){
      axios.get(`https://locationsng-api.herokuapp.com/api/v1/states/abuja/lgas`, {
     
      }).then(response => {
      console.log(response.data)

      setUserLga(response.data)

     


  }).catch(error => {
      console.log(error)
  })
    }

    else{
      axios.get(`https://locationsng-api.herokuapp.com/api/v1/states/${selected}/lgas`, {
     
      }).then(response => {
      console.log(response.data)

      setUserLga(response.data)

     


  }).catch(error => {
      console.log(error)
  })
    }


  }, [selected]);



  React.useEffect(() => {
    
    axios.get('https://locationsng-api.herokuapp.com/api/v1/states', {
     
      }).then(response => {
      console.log(response.data)

      setStates(response.data)

     


  }).catch(error => {
      console.log(error)
  })









  }, []);




  React.useEffect(() => {
    
   







  }, [preaddress]);


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

        <span
         
          class="font-weight-bold text-primary font-size-md cursor-pointer"
        >
          Contact Addreess
        </span>

       {preaddress ? <div>
         <p style={{
           fontSize : "16px",
         }}>Address : {preaddress}, {prelga}, {prestate} <span className="ml-5">      <button  onClick={function(e){
          e.preventDefault()
        }} data-toggle="modal" data-target="#exampleModal" className="btn btn-sm btn-warning">
          Edit
          </button></span></p>

       </div> :  <div className="py-3 text-center">
          <p>Contact Address not Available </p>

          <button  onClick={function(e){
            e.preventDefault()
          }} data-toggle="modal" data-target="#exampleModal" className="btn btn-sm btn-secondary">
            Add Address
            </button>
        </div>}


       


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Contact Address</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
      <label>State</label>
        <select className="form-control"onChange={function(e){
          e.preventDefault()
          //console.log(e.target.value)


          setSelected(e.target.value)
          console.log(selected);


          
          

       

        
        }}>
          <option value="">Select State</option>

          {states.map(function(state,i){
            return (
              <option value={state["name"]}>{state["name"]}</option>
            );
          })}

        </select>

        <label>L.G.A</label>
        <select className="form-control"onChange={function(e){
          e.preventDefault()
          //console.log(e.target.value)


          setSelectedlga(e.target.value)
          console.log(selectedlga);


          
          

       

        
        }}>
          <option value="">Select L.G.A</option>

          {lag.map(function(city,i){
            return (
              <option value={city}>{city}</option>
            );
          })}
        </select>

        <hr/>

        <label>Address</label>

        <textarea className="form-control" id="address" onChange={function(e){
          //console.log(e.target.value)

          setAddress(e.target.value);
        }} />
         
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={handleUpdateClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>

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
