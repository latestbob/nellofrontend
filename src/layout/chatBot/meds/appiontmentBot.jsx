import React, { useEffect, useState } from "react";
import nelloImg from "../../../images/nello.png";
import Typed from "react-typed";
import doc from "../../../images/doc.png";
import medicals from "../../../images/medicals.jpg";
import rate from "../../../images/rate.png";
import DatePicker from "react-datepicker";
import moment from "moment";
import { PaystackButton } from 'react-paystack';
import Swal from "sweetalert2";
import axios from "axios";
import { showLoader } from "../../../helper/loader";
import { hideLoader } from "../../../helper/loader";
import drugImg from "../../../images/drug.jpg";


export const RenderBotMsg = ({
  data,
  index,
  id,
  allMedication,
  getMedicationByName,
  getOrder,
  checkoutOrContinue,
  handleBotAcc,
  handleBotAccApp,
  healthCenter,
  getHealthCenterSelect,
  selectAppiontmentTime,
  bookAppionmentDate,
  userInfo,
  DOBDateHos,
  handleUserAccountGenderHos,
  getMoreUserDetailsHos,
  setLoginInfo,
  setSubmitLoginHos,
  medicalcenter,
  getAllSpecalistHos,
  bookAppiontmentWithHos,
  setAppiont,
  appiont,
  setAppiontMentDetails,
  appiontMentDetails,
  setappiontmentActiveMsg,
  handleBotAccMed,
}) => {
  const [show, setShow] = useState(false);
  const [appiontmentDat, setappiontmentDat] = useState(new Date());
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
      window.location.href = "#showNewMsg";
    }, 1000 * index);
  }, []);


  function handleGenderChange(e){
    console.log(e.target.value);
  }

  const format = "hh:mm a";
  const [createAccountDate, setcreateAccountDate] = useState(new Date());
  const [appiontmenTime, setappiontmenTime] = useState();
  function onChangeAppiontmentTimePicker(value) {
    console.log(value && value.format(format));
    setappiontmenTime(value && value.format(format));
  }

  //handle time picker for appointment doctor
  function handleTimeInpuChange(e){
    console.log(e.target.value);

    setAppiontMentDetails({
      ...appiontMentDetails,
      time: `${e.target.value}`,
      
    });
    console.log(appiontMentDetails.time);

  }



////////////////////////////////START OF PAYSTACK //////////////////////////////
const config = {
  reference: (new Date()).getTime(),
  email: appiontMentDetails.useremail,
  amount: appiontMentDetails.fee,
  publicKey: 'pk_test_02ce7d4340336726886f879f63b3b5fd13988f34',

  metadata: {
        
    date:moment(appiontMentDetails.date).format('YYYY-MM-DD'),
    time:appiontMentDetails.time,
    username:appiontMentDetails.username,
    useremail:appiontMentDetails.useremail,
    usergender:appiontMentDetails.usergender,
    user_uuid:appiontMentDetails.user_uuid,


    // center_name: "",
    // center_email: "",
    // center_type: "",
    // center_address: "",
    // center_uuid: "",


    center_name: appiontMentDetails.center_name,
    center_email:appiontMentDetails.center_email,
    center_type: appiontMentDetails.center_type,
    center_address: appiontMentDetails.center_address,
    center_uuid: appiontMentDetails.center_uuid,
    center_fee: appiontMentDetails.fee,
    reason: appiontMentDetails.reason,

    
    

},
};

// you can call this function anything
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);

  if(reference.message == "Approved"){

    console.log(reference.reference);

    
axios.get(`http://127.0.0.1:8000/api/appointments/verify/${reference.reference}`,{


}).then(response => {
//console.log(response);
//console.log(response.data.data.metadata);


//Check is the reference payment is Verified

if(response.data.data.status == "success"){

    console.log(response.data.data.metadata);
    showLoader();


    

    
        axios.post('http://127.0.0.1:8000/api/appointments/hospital/completebook',{
                
        //request body here to complete appointment process
        user_uuid : response.data.data.metadata.user_uuid,
        date : response.data.data.metadata.date,
        time: response.data.data.metadata.time,
        ref_no : reference.reference,
        type:response.data.data.metadata.center_type,
        username:response.data.data.metadata.username,
    useremail:response.data.data.metadata.useremail,
    usergender:response.data.data.metadata.usergender,
    center_name:response.data.data.metadata.center_name,
    center_email:response.data.data.metadata.center_email,
    center_address:response.data.data.metadata.center_address,
    center_uuid:response.data.data.metadata.center_uuid,
    reason:response.data.data.metadata.reason,
    

        }).then(response => {
            console.log(response)
            hideLoader();

            if(response.data.status == true){
                Swal.fire(
                    'Appointment Scheduled',
                    `Schedule At - ${response.data.date} , Time - ${response.data.time}` ,
                    
                    'success'
                  )
      
      
                  //history.replace('/account/appointments');
                  setappiontmentActiveMsg([]);
      
                 
               
            }

 
        }).catch(error => {
            console.log(error)
        })


}








//Return the User to the appointment done Page

}).catch(error => {
console.log(error)
})




}




  
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}

const componentProps = {
  ...config,
  text: 'Pay Now',
  onSuccess: (reference) => onSuccess(reference),
  onClose: onClose,
};


////////////////////////////END OF PAYSTACK //////////////////////



  return (
    <>
      {show && (
        <div className={`msgBotUserReply msgBotUserReplyRev`} key={index}>
          <div className="botDefaultMsgCol1 huopbotRes">
            <img src={nelloImg} alt="" />
          </div>
          <div className="incomingMsgWrap">
            {data}

            {/* {id == 1 && index == 0 ? (
              <div className="btnWrapActionMsg">
                <select
                  name=""
                  id=""
                  onChange={(e) => getHealthCenterSelect(e)}
                >
                  <option value="">Select medical center</option>
                  {healthCenter.map((data) => {
                    return <option value={data.name}>{data.name}</option>;
                  })}
                </select>
              </div>
            ) : (
              ""

              
            )} */}

          {/* {id == 62 && index == 0 ? (
              <div className="btnWrapActionMsg">
                <select
                  name=""
                  id=""
                  onChange={(e) => getAllSpecalistHos(e, "single")}
                >
                  <option value="">Select Medical Center Type</option>
                  
                    <option value="clinic">Clinic</option>
                    <option value="hospital">Hospital</option>

                
                </select>

                <button
                  type="button"
                 onClick={(e) => getAllSpecalistHos(e, "all")}
                >
                  All Medical Center 
                </button>
              </div>
            ) : (
              ""
            )} */}

          {id == 73 && index == 0 ? (
              <div className="btnWrapActionMsg">
                {/* <button
                  type="button"
                  className
                  // onClick={() => handleBotAcc("login", "doc")}
                >
                 Make Payment
                </button> */}

                 <PaystackButton
                        className=""
                        {...componentProps}
                      />
               
              </div>
            ) : (
              ""
            )}


            {id == 12 && index == 0 ? (
              <div className="redatWrsp">
                <DatePicker
                  selected={createAccountDate}
                  onChange={(date) => {
                    setcreateAccountDate(date);
                    // doctorAppiontmentDate(date);
                  }}
                  showMonthDropdown
                  showYearDropdown
                  // dropdownMode="scroll"
                  maxDate={new Date()}
                  placeholderText="Select DOB"
                  shouldCloseOnSelect={false}
                  onCalendarClose={(date) => {
                    DOBDateHos(createAccountDate);
                  }}
                />
              </div>
            ) : (
              ""
            )}



            {id == 1 && index == 0 ? (
              <div className="btnWrapActionMsg">
                <button
                  type="button"
                  className
                  onClick={() => handleBotAccMed("login", "med")}
                >
                  Yes, Login
                </button>
                <button
                  type="button"
                  onClick={() => handleBotAccMed("createAcc", "med")}
                >
                  No, Create an account
                </button>
              </div>
            ) : (
              ""
            )}


            {id == 31 && index == 0 ? (
              <div className="btnWrapActionMsg">
                <button
                  type="button"
                  className
                  onClick={() => handleBotAccApp("login", "appoint")}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => handleBotAccApp("createAcc", "appoint")}
                >
                  Create an account
                </button>
              </div>
            ) : (
              ""
            )}


            {id == 7 && index == 0 ? (
              <div className="btnWrapActionMsg">
                <select
                  name=""
                  id=""
                  onChange={(e) => selectAppiontmentTime(e)}
                >
                  <option value="">Select time</option>
                  <option value="08:00:00">8:00 am</option>
                  <option value="08:30:00">8:30 am</option>
                  <option value="10:00:00">10:00 am</option>
                  <option value="11:00:00">11:00 am</option>
                  <option value="12:00:00">12:00 pm</option>
                  <option value="02:00:00">2:00 pm</option>
                  <option value="01:30:00">1:30 pm</option>
                  <option value="04:00:00">4:00 pm</option>
                </select>
              </div>
            ) : (
              ""
            )}

            {/* {id == 5 && index == 0 ? (
              <div className="redatWrsp">
                <DatePicker
                  selected={appiontmentDat}
                  onChange={(date) => {
                    setappiontmentDat(date);
                    // doctorAppiontmentDate(date);
                  }}
                  showMonthDropdown
                  showYearDropdown
                  // dropdownMode="scroll"
                  minDate={moment().toDate()}
                  placeholderText="Select a day"
                  shouldCloseOnSelect={false}
                  onCalendarClose={(date) => {
                    bookAppionmentDate(appiontmentDat);
                  }}
                />
              </div>
            ) : (
              ""
            )} */}

            {/* {id == 4 && index == 1 ? (
              <div className="btnWrapActionMsg">
                <button
                  type="button"
                  className
                  onClick={() => checkoutOrContinue("cart")}
                >
                  Proceed to cart
                </button>
                <button
                  type="button"
                  onClick={() => checkoutOrContinue("shop")}
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              ""
            )} */}



        {id == 64 && index == 0 ? (
              <div className="speaclistDisplay">
                {medicalcenter.map((data) => {
                  
                  return (
                    <div className="speaclistDisplayDoc">
                      <div className="docImgbottt">
                        <img src={medicals} alt="" />
                      </div>
                      <div className="docImgbottname">
                        <p>{`${data?.name}`}</p>
                        <p className="badge badge-success p-1 text-light">Available</p>
                      </div>
                      <div className="whatDocjs">
                        <p>{data.center_type}</p>
                       
                        <div className="docratidn">
                          <img src={rate} alt="" />
                          <img src={rate} alt="" />
                          <img src={rate} alt="" />
                          <img src={rate} alt="" />
                          <img src={rate} alt="" />
                          <p style={{
                          fontSize:"12px",
                          color:"white",
                        }} className="badge badge-info px-2">Fee - N {data.fee}</p>
                        </div>
                      </div>
                      <div className="spabdbtns">
                        
                        <button onClick={() => bookAppiontmentWithHos(data)}>
                          Book Appoint...
                        </button>
                      
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}



            {id == 6 && index == 1 ? (
              <div className="speaclistDisplay">
                {allMedication.length == 0 ? (
                  ""
                ) : allMedication.total == 0 ? (
                  <div className="incomingMsgWrapMain">
                    <p>No drug found for this search</p>
                  </div>
                ) : (
                  allMedication.data.map((data) => {
                    return (
                      <div className="speaclistDisplayDoc">
                        <div className="docImgbottt">
                          <img src={doc} alt="" />
                        </div>
                        <div className="docImgbottname drugbotdis">
                          <p>{`${data?.name.slice(0, 25)}  `}</p>
                          <p>₦{data.price}</p>
                        </div>
                        <div className="whatDocjs">
                          <p>{data.aos}</p>
                          <div className="docratidn">
                            <img src={rate} alt="" />
                            <img src={rate} alt="" />
                            <img src={rate} alt="" />
                            <img src={rate} alt="" />
                            <img src={rate} alt="" />
                          </div>
                        </div>
                        <div className="spabdbtns">
                          <button onClick={() => getOrder(data)}>
                            Place order
                          </button>
                          <button>View item</button>
                          {/* <button onClick={() => bookAppiontmentWithDoc(data)}>
                        Book Appoint...
                      </button> */}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              ""
            )}


          {id == 69 && index == 0 ? (
                  <div className="btnWrapActionMsg">
                

       

                <select
                  name=""
                  id=""
                  //onChange={(e) => getAllSpecalist(e, "single")}

                  onChange={handleTimeInpuChange}
                >
                  <option value="08:00:00">8:00 am</option>
                  <option value="08:30:00">8:30 am</option>
                  <option value="10:00:00">10:30 am</option>
                  <option value="11:00:00">11:00 am</option>
                  <option value="12:00:00">12:00 pm</option>
                  <option value="13:30:00">1:30 pm</option>
                  <option value="14:00:00">2:00 pm</option>
                  <option value="16:00:00">4:00 pm</option>
                  
                </select>
              </div>
            ) : (
              ""
            )}



        {id == 32 && index == 2 ? (
              <div className="btnWrapActionMsg">
                {/* <button
                  type="button"
                  className
                  onClick={() => getMoreUserDetails("continue")}
                >
                  Alright, Proceed
                </button> */}
                <button
                  type="button"
                  onClick={() => getMoreUserDetailsHos("skip")}
                >
                  Proceed to Nello Store
                </button>
              </div>
            ) : (
              ""
            )}

        {id == 62 && index == 0 ? (
       
              <div className="speaclistDisplay">
                {allMedication.length == 0 ? (
                  ""
                ) : allMedication.total == 0 ? (
                  <div className="incomingMsgWrapMain">
                    <p>No drug found for this search</p>
                  </div>
                ) : (
                  allMedication.data.map((data) => {
                    return (
                      <div className="speaclistDisplayDoc">
                        <div className="docImgbottt">
                          <img
                            src={data.image == null ? drugImg : data.image}
                            alt=""
                          />
                        </div>
                        <div className="docImgbottname drugbotdis">
                          <p>{`${data?.name.slice(0, 25)}  `}</p>
                          <p>₦{data.price}</p>
                        </div>
                        <div className="whatDocjs">
                          <p>{data.aos}</p>
                          <div className="docratidn">
                            <img src={rate} alt="" placeholder="rate" />
                            <img src={rate} alt="" />
                            <img src={rate} alt="" />
                            <img src={rate} alt="" />
                            <img src={rate} alt="" />
                          </div>
                        </div>
                        <div className="spabdbtns">
                          <button
                            style={{ width: "50%" }}
                            onClick={() => getOrder(data)}
                          >
                            Place order
                          </button>

                          
                          {/* <button>View item</button> */}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              ""
            )}



            {id == 67 && index == 0 ? (
              <div className="redatWrsp">
                <DatePicker
                  selected={appiontmentDat}
                  onChange={(date) => {
                    setappiontmentDat(date);
                    // doctorAppiontmentDate(date);
                  }}
                  showMonthDropdown
                  showYearDropdown
                  // dropdownMode="scroll"
                  minDate={moment().toDate()}
                  placeholderText="Select a day"
                  shouldCloseOnSelect={false}
                  onCalendarClose={(date) => {
                    bookAppionmentDate(appiontmentDat);
                  }}
                />
              </div>
            ) : (
              ""
            )}

            {id == 14 && index == 0 ? (
              <div className="selectWrapActionMsg">
                <select onChange={(e) => handleUserAccountGenderHos(e)}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            ) : (
              ""
            )}

            {/* {id == 8 && index == 0 ? (
              <div className="btnWrapActionMsg">
                <button
                  type="button"
                  className
                  onClick={() => handleBotAcc("login", "med")}
                >
                  Yes, Login
                </button>
                <button
                  type="button"
                  onClick={() => handleBotAcc("createAcc", "med")}
                >
                  No, Create an account
                </button>
              </div>
            ) : (
              ""
            )} */}

            {/* {id == 8 && index == 0 ? (
              <div className="btnWrapActionMsgCheckBox">
                <div className="btnWrapActionMsgCheckBoxCol1 incomingMsgWrapMain">
                  <input type="checkbox" />
                  <p>Click this box to checkout as a guest</p>
                </div>
                <div className="btnWrapActionMsgCheckBoxCol2">
                  <span>You can create an account latter</span>
                </div>
              </div>
            ) : (
              ""
            )}

            {id == 8 && index == 1 ? (
              <div className="btnWrapActionMsgCheckBox">
                <div className="btnWrapActionMsgCheckBoxCol1 incomingMsgWrapMain">
                  <input type="checkbox" />
                  <p>Click this box to Sign in your account</p>
                </div>
                <div className="btnWrapActionMsgCheckBoxCol2">
                  <span>Checkout quicker with saved details</span>
                </div>
              </div>
            ) : (
              ""
            )} */}
          </div>
        </div>
      )}
    </>
  );
};

export const RenderUserMsg = ({ data, index }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
      window.location.href = "#showNewMsg";
    }, 1000 * index);
  }, []);
  return (
    <>
      {show && (
        <div className="msgBotUserReply ongoingMsgReply">
          {data}

          <div className="botDefaultMsgCol1 ongoingImgImg">
            <img src={nelloImg} alt="" />
          </div>
        </div>
      )}
    </>
  );
};
const AppiontmentBotMed = ({
  medicationMsgs,
  activeDocMsg,
  //speakDocActive,
  appiontmentMsg,
                  activeAppiontmentMsg,
                  appiontmentActiveMsg,
  allMedication,
  getMedicationByName,
  getOrder,
  checkoutOrContinue,
  handleBotAcc,
  handleBotAccApp,
  healthCenter,
  getHealthCenterSelect,
  selectAppiontmentTime,
  bookAppionmentDate,
  setappiontmentActiveMsg,
  userInfo,
  DOBDateHos,
  handleUserAccountGenderHos,
  getMoreUserDetailsHos,
  setLoginInfo,
  setSubmitLoginHos,
  medicalcenter,
  getAllSpecalistHos,
  bookAppiontmentWithHos,
  setAppiont,
  appiont,
  setChatInputDisable,
  setChatSubmitBtnDisable,
  appiontMentDetails,
  setAppiontMentDetails,
  handleBotAccMed,
  
}) => {
  useEffect(() => {
    console.log("appiontmentActiveMsg", appiontmentActiveMsg);
  }, [appiontmentActiveMsg]);

  return (
    <div>
      {appiontmentActiveMsg.map((MainData, index) => {
        return MainData.type == "bot"
          ? MainData.bot.map((data, i) => {
              return (
                <RenderBotMsg
                  data={data}
                  index={i}
                  id={MainData.id}
                  key={i}
                  allMedication={allMedication}
                  getMedicationByName={getMedicationByName}
                  getOrder={getOrder}
                  checkoutOrContinue={checkoutOrContinue}
                  handleBotAcc={handleBotAcc}
                  handleBotAccApp={handleBotAccApp}
                  handleBotAccMed={handleBotAccMed}
                  healthCenter={healthCenter}
                  getHealthCenterSelect={getHealthCenterSelect}
                  selectAppiontmentTime={selectAppiontmentTime}
                  bookAppionmentDate={bookAppionmentDate}
                  setappiontmentActiveMsg={setappiontmentActiveMsg}
                  userInfo={userInfo}
                  DOBDateHos={DOBDateHos}
                  handleUserAccountGenderHos={handleUserAccountGenderHos}
                  getMoreUserDetailsHos={getMoreUserDetailsHos}
                  setLoginInfo={setLoginInfo}
                  setSubmitLoginHos={setSubmitLoginHos}
                  medicalcenter={medicalcenter}
                  getAllSpecalistHos={getAllSpecalistHos}
                  bookAppiontmentWithHos={bookAppiontmentWithHos}
                  setAppiont={setAppiont}
                  appiont={appiont}
                  setChatInputDisable={setChatInputDisable}
                  setChatSubmitBtnDisable={setChatSubmitBtnDisable}
                  appiontMentDetails={appiontMentDetails}
                  setAppiontMentDetails={setAppiontMentDetails}
                />
              );
            })
          : MainData.user.map((data, i) => {
              return <RenderUserMsg data={data} index={i} key={i} />;
            });
      })}
      <span id="showNewMsg"></span>
    </div>
  );
};

export default AppiontmentBotMed;
