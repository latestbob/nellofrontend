import React, { useEffect, useState } from "react";
import nelloImg from "../../../images/nello.png";
import Typed from "react-typed";
import doc from "../../../images/doc.png";
import rate from "../../../images/rate.png";
import BotOptions from "../chatBotDefaultMsg";
import DatePicker from "react-datepicker";
import moment from "moment";
import "rc-time-picker/assets/index.css";
import TimePicker from "rc-time-picker";
import Multiselect from "multiselect-react-dropdown";
import { PaystackButton } from 'react-paystack';
import axios from "axios";
//import { hideLoader, showLoader } from "../../helper/loader";
import { hideLoader, showLoader  } from "../../../helper/loader";
import Swal from "sweetalert2";
import { appointments } from "../../../Services";
import { NotificationManager } from "react-notifications";

export const RenderBotMsg = ({
  data,
  index,
  handleBotAcc,
  id,
  accountInfo,
  handleUserChange,
  handleUserAccountGender,
  
  getMoreUserDetails,
  handleSelectDailyAct,
  setactiveInputValue,
  activeInputValue,
  handleSelecEnergyUnit,
  healthEffects,
  getAllSpecalist,
  specialization,
  doctors,
  bookAppiontmentWithDoc,
  activeTab,
  handleUserRequest,
  doctorAppiontmentDate,
  doctorAppiontmentTime,
  DOBDate,
  setAppiont,
  appiont,
}) => {
  const [show, setShow] = useState(false);
  const [value, onChangeD] = useState(new Date());
  const [appIontmentTime, setappIontmentTime] = useState(new Date());

////////////////////////////////START OF PAYSTACK //////////////////////////////
const config = {
  reference: (new Date()).getTime(),
  email: appiont.useremail, 
  amount: appiont.fee * 100,
  publicKey: 'pk_test_02ce7d4340336726886f879f63b3b5fd13988f34',

  metadata: {
        
    date:moment(appiont.date).format('YYYY-MM-DD'),
    time:appiont.time,
    doctor:appiont.doctor_name,
    aos:appiont.doctor_aos,
    doctormail:appiont.doctor_email,
    
    doctor_id:appiont.doctor_id,

    username:appiont.username,
    useremail:appiont.useremail,
    usergender:appiont.usergender,
    user_uuid:appiont.user_uuid,
    

},
};

// you can call this function anything
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);

  if(reference.message == "Approved"){

    console.log(reference.reference);

    
axios.get(`${process.env.REACT_APP_API_URL}appointments/verify/${reference.reference}`,{


}).then(response => {
console.log(response);
console.log(response.data.data.metadata);


//Check is the reference payment is Verified

if(response.data.data.status == "success"){
  console.log(response.data.data.amount);

    console.log(response.data.data.metadata);
    showLoader();


    // Add the Appoiment Meta Details to the database using a Post Request


    
        axios.post(`${process.env.REACT_APP_API_URL}appointments/completebook`,{
                
        //request body here to complete appointment process
    user_uuid : response.data.data.metadata.user_uuid,
    date : response.data.data.metadata.date,
    time: response.data.data.metadata.time,
    ref_no : reference.reference,
        doctor_id:response.data.data.metadata.doctor_id,
        doctor_name:response.data.data.metadata.doctor,
        doctor_aos:response.data.data.metadata.aos,
        type:"doctor_appointment",
        link:`https://meet.jit.si/asknello/${reference.reference}`,
        user_email:response.data.data.metadata.useremail,
        doctor_email:response.data.data.metadata.doctormail,
        username:response.data.data.metadata.username,
        amount:response.data.data.amount / 100,
    

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
      
                  window.location.href = "/account/appointments";
                 
               
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



  const format = "hh:mm a";

  const now = moment().hour(0).minute(0);
  useEffect(() => {
    //console.log(accountInfo);
    console.log(appiont.useremail);
    setTimeout(() => {
      setShow(true);
      window.location.href = "#showNewMsg";
    }, 1000 * index);
  }, []);

 






  //handle time picker for appointment doctor
  function handleTimeInpuChange(e){
    console.log('Working')
    console.log(e.target.value)
    console.log('date',appiont.date)
    var pickedate = moment(appiont.date).format('dddd, MMMM DD, YYYY')
    var todaydated = moment().format('dddd, MMMM DD, YYYY')

    console.log(todaydated)
    console.log(pickedate)


    if(pickedate == todaydated){
      console.log(moment().format('HH:mm:ss a'))
  var valuedate = moment().format('HH:mm:ss a');
  var mytimeselected = moment(e.target.value, 'h:mm a').format('HH:mm:ss a')
  console.log(mytimeselected);
  
  
  
  var c = +moment().add(30, 'minutes').format('x');
  var d = moment(e.target.value, 'h:mm a').format();
  
  var h = +moment(e.target.value, 'h:mm a').format('x')
  var f = h / 60000
  
  var g = (h - c) / 60000
  
  // console.log(e)
  // console.log(f)
  console.log(parseInt(g))
  
  /// check if g is greater than 0
  
  if(g >= 1){
    console.log('appointment Available')

    setAppiont({
      ...appiont,
      time: `${e.target.value}`,
    });
    
      return NotificationManager.success("Valid,, click send to continue");

  }
  else{
      
    console.log('appointment not available')
     
          return NotificationManager.error("Select at least 30 mins after the current time");
          
      
  }
  
  
  }
  else {
      console.log('Appointment Available')
     setAppiont({
      ...appiont,
      time: `${e.target.value}`,
    });
      return NotificationManager.success("Valid,, click send to continue");
  }
  
  




    ////end

    
    // setAppiont({
    //   ...appiont,
    //   time: `${e.target.value}`,
    // });





  }

  const intreast = [
    {
      name: "Calories",
    },
    {
      name: "Diet and Nutrition",
    },
    {
      name: "Work Out",
    },
    {
      name: "Sleep",
    },
    {
      name: "Meditation",
    },
    {
      name: "Weight loss",
    },
    {
      name: "Yoga",
    },
    {
      name: "Anaorobic",
    },
  ];
  const [selectedIntrests, setSelectedIntrests] = useState([]);
  const getIntrests = (int, index) => {
    let selI = int.map((data) => {
      return data.name;
    });
    setactiveInputValue(selI);
    return console.log(selI);
  };

  const [appiontmentDat, setappiontmentDat] = useState(new Date());
  const [createAccountDate, setcreateAccountDate] = useState(new Date());
  const [appiontmenTime, setappiontmenTime] = useState();
  function onChangeAppiontmentTimePicker(value) {
    console.log(value && value.format(format));
    setappiontmenTime(value && value.format(format));
  }

  function onCloseAppiontmentTimePicker(value) {
    // console.log(value && value.format(format));
    doctorAppiontmentTime(appiontmenTime);
  }
  return (
    <>
      {show && (
        <div className={`msgBotUserReply msgBotUserReplyRev`} key={index}>
          {/* {id == 1 && index == 0 ? (
            <BotOptions
              handleUserRequest={handleUserRequest}
              activeTab={activeTab}
            />
          ) : (
            ""
          )} */}
          <div className="botDefaultMsgCol1 huopbotRes">
            <img src={nelloImg} alt="" />
          </div>

          <div className="incomingMsgWrap">
            {/* {id == 6 ? (
              <div className="incomingMsgWrapMain">
                <p>Nice name {accountInfo?.firstname}</p>
              </div>
            ) : (
              ""
            )} */}
            {data}

            {id == 42 && index == 0 ? (
              <form>
                <div className="radioBtnWrapDoc">
                  <input
                    type="radio"
                    id="html"
                    name="dailyActivity"
                    value="Sedentary"
                    onChange={handleSelectDailyAct}
                  />
                  <label for="html">
                    Sedentary: Spend most of the day sitting(e.g bank
                    teller,desk job)
                  </label>
                  <br></br>
                </div>

                <div className="radioBtnWrapDoc">
                  <input
                    type="radio"
                    id="css"
                    name="dailyActivity"
                    value="Lightly Active"
                    onChange={handleSelectDailyAct}
                  />
                  <label for="css">
                    Lightly Active:Spend a good part of the day on your
                    feet(e.g. Teacher,salesperson)
                  </label>
                </div>

                <div className="radioBtnWrapDoc">
                  <input
                    type="radio"
                    id="css"
                    name="dailyActivity"
                    value="Active"
                    onChange={handleSelectDailyAct}
                  />
                  <label for="css">
                    Active:Spend a good part of the day doing some physical
                    activity (e.g). Food server,postal carrier
                  </label>
                </div>

                <div className="radioBtnWrapDoc">
                  <input
                    type="radio"
                    id="css"
                    name="dailyActivity"
                    value="Hyper Active"
                    onChange={handleSelectDailyAct}
                  />
                  <label for="css">
                    Hyper Active:Spend most of the day doing heavy physical
                    activities(e.g. bike messenger,carpenter)
                  </label>
                </div>
              </form>
            ) : (
              ""
            )}

            {id == 52 && index == 0 ? (
              <form>
                <div className="radioBtnWrapDoc">
                  <input
                    type="radio"
                    id="yes"
                    name="allergies"
                    value="yes"
                    onChange={(e) => healthEffects(e, "allergies")}
                  />
                  <label for="yes">Yes</label>
                  <br></br>
                </div>

                <div className="radioBtnWrapDoc">
                  <input
                    type="radio"
                    id="html"
                    name="allergies"
                    value="no"
                    onChange={(e) => healthEffects(e, "allergies")}
                  />
                  <label for="no">No</label>
                </div>
              </form>
            ) : (
              ""
            )}

            {id == 55 && index == 0 ? (
              <form>
                <div className="radioBtnWrapDoc">
                  <input
                    type="radio"
                    id="yes"
                    name="diagnosis"
                    value="yes"
                    onChange={(e) => healthEffects(e, "diagnosis")}
                  />
                  <label for="yes">Yes</label>
                  <br></br>
                </div>

                <div className="radioBtnWrapDoc">
                  <input
                    type="radio"
                    id="html"
                    name="diagnosis"
                    value="no"
                    onChange={(e) => healthEffects(e, "diagnosis")}
                  />
                  <label for="no">No</label>
                </div>
              </form>
            ) : (
              ""
            )}

            {id == 58 && index == 0 ? (
              <form>
                <div className="radioBtnWrapDoc">
                  <input
                    type="radio"
                    id="yes"
                    name="medication"
                    value="yes"
                    onChange={(e) => healthEffects(e, "medication")}
                  />
                  <label for="yes">Yes</label>
                  <br></br>
                </div>

                <div className="radioBtnWrapDoc">
                  <input
                    type="radio"
                    id="html"
                    name="medication"
                    value="no"
                    onChange={(e) => healthEffects(e, "medication")}
                  />
                  <label for="no">No</label>
                </div>
              </form>
            ) : (
              ""
            )}

            {id == 50 && index == 0 ? (
              <form>
                <div className="radioBtnWrapDoc">
                  <input
                    type="radio"
                    id="html"
                    name="energy_unit"
                    value="Calories"
                    onChange={handleSelecEnergyUnit}
                  />
                  <label for="html">Calories</label>
                  <br></br>
                </div>

                <div className="radioBtnWrapDoc">
                  <input
                    type="radio"
                    id="css"
                    name="energy_unit"
                    value="Kilojoules"
                    onChange={handleSelecEnergyUnit}
                  />
                  <label for="css">Kilojoules</label>
                </div>
              </form>
            ) : (
              ""
            )}

            {id == 44 && index == 0 ? (
              <div className="">
                <Multiselect
                  options={intreast} // Options to display in the dropdown
                  // selectedValues="none" // Preselected value to persist in dropdown
                  onSelect={(items) => {
                    getIntrests(items);
                  }} // Function will trigger on select event
                  onRemove={(items) => {
                    getIntrests(items);
                  }} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
                {/* {intreast.map((data, i) => {
                  return (
                    <div
                      className="docmsgIntrsjdj"
                      key={i}
                      onClick={() => getIntrests(data)}
                    >
                      {data}
                    </div>
                  );
                })} */}
              </div>
            ) : (
              ""
            )}

            {id == 1 && index == 1 ? (
              <div className="btnWrapActionMsg">
                <button
                  type="button"
                  className
                  onClick={() => handleBotAcc("login", "doc")}
                >
                  Yes, Login
                </button>
                <button
                  type="button"
                  onClick={() => handleBotAcc("createAcc", "doc")}
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
                  onClick={() => handleBotAcc("login", "doc")}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => handleBotAcc("createAcc", "doc")}
                >
                  Create an account
                </button>
              </div>
            ) : (
              ""
            )}


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
                  onClick={() => getMoreUserDetails("skip")}
                >
                  Proceed to Book Appointment
                </button>
              </div>
            ) : (
              ""
            )}

            {id == 14 && index == 0 ? (
              <div className="selectWrapActionMsg">
                <select onChange={handleUserAccountGender}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            ) : (
              ""
            )}

            {id == 62 && index == 0 ? (
              <div className="btnWrapActionMsg">
                <select
                  name=""
                  id=""
                  onChange={(e) => getAllSpecalist(e, "single")}
                >
                  <option value="">Select Specialist</option>
                  {specialization.map((data) => {
                    return <option value={data.aos}>{data.aos}</option>;
                  })}
                </select>

                <button
                  type="button"
                  onClick={(e) => getAllSpecalist(e, "all")}
                >
                  All Specialist
                </button>
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
                    doctorAppiontmentDate(appiontmentDat);
                  }}
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
                    DOBDate(createAccountDate);
                  }}
                />
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
                  <option value="18:00:00">6:00 pm</option>
                  
                </select>
              </div>
            ) : (
              ""
            )}

            {id == 64 && index == 0 ? (
              <div className="speaclistDisplay">
                {doctors.map((data) => {
                  
                  return (
                    <div className="speaclistDisplayDoc">
                      <div className="docImgbottt">
                        <img src={doc} alt="" />
                      </div>
                      <div className="docImgbottname">
                        <p>{`${data?.firstname} ${``} ${data?.lastname} `}</p>
                        <p className="badge badge-success p-1 text-light">Available</p>
                      </div>
                      <div className="whatDocjs">
                        <p>{data.aos}</p>
                       
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
                        
                        <button onClick={() => bookAppiontmentWithDoc(data)}>
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

            {/* {id == 67 && index == 0 ? (
              <div className="speaclistDisplay">
              
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
        <div className="msgBotUserReply ongoingMsgReply" key={index}>
          {data}

          <div className="botDefaultMsgCol1 ongoingImgImg">
            {/* <img src={nelloImg} alt="" /> */}
            <i class="fa fa-2x fa-user"></i>
          </div>
        </div>
      )}
    </>
  );
};
const DoctorMsg = ({
  speakDoc,
  activeDocMsg,
  speakDocActive,
  handleBotAcc,
  accountInfo,
  handleUserChange,
  handleUserAccountGender,
  getMoreUserDetails,
  handleSelectDailyAct,
  setactiveInputValue,
  activeInputValue,
  handleSelecEnergyUnit,
  healthEffects,
  getAllSpecalist,
  specialization,
  doctors,
  bookAppiontmentWithDoc,
  activeTab,
  handleUserRequest,
  doctorAppiontmentDate,
  doctorAppiontmentTime,
  DOBDate,
  setAppiont,
  appiont,
}) => {
  useEffect(() => {}, [speakDocActive]);

  return (
    <div>
      {speakDocActive.map((MainData, index) => {
        return MainData.type == "bot"
          ? MainData.bot.map((data, i) => {
              return (
                <RenderBotMsg
                  data={data}
                  index={i}
                  key={i}
                  handleBotAcc={handleBotAcc}
                  id={MainData.id}
                  accountInfo={accountInfo}
                  handleUserChange={handleUserChange}
                  handleUserAccountGender={handleUserAccountGender}
                  getMoreUserDetails={getMoreUserDetails}
                  handleSelectDailyAct={handleSelectDailyAct}
                  setactiveInputValue={setactiveInputValue}
                  activeInputValue={activeInputValue}
                  handleSelecEnergyUnit={handleSelecEnergyUnit}
                  healthEffects={healthEffects}
                  getAllSpecalist={getAllSpecalist}
                  specialization={specialization}
                  doctors={doctors}
                  bookAppiontmentWithDoc={bookAppiontmentWithDoc}
                  activeTab={activeTab}
                  handleUserRequest={handleUserRequest}
                  doctorAppiontmentDate={doctorAppiontmentDate}
                  doctorAppiontmentTime={doctorAppiontmentTime}
                  DOBDate={DOBDate}
                  setAppiont={setAppiont}
                  appiont={appiont}
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

export default DoctorMsg;
