import React, { useState, useEffect, useContext } from "react";
import "./chatbox.css";
import ChatBotDefaultMsg from "./chatBotDefaultMsg";
import DoctorMsg from "./speakToDoctor/doctorMsg";
import { notifyManager } from "react-query";
import { NotificationManager } from "react-notifications";
import moment from "moment";
import { httpGet, httpPost } from "../../helper/httpMethods";
import { hideLoader, showLoader } from "../../helper/loader";
import { UserDataContext } from "../../context/auth/user";
import { speakDoc } from "./speakToDoctor/speakToDocMsg";
//import { medicationMsgs } from "./medications/orderMedicationMsg";
import MedicationMsg from "./medications/medicationMsg";
import { medicationMsgs } from "./medications/orderMedicationMsg";
import { appiontmentMsg } from "./appiontment/msg";
import handleMedicationSubmit from "./medications/handleSubmit";
import doctorHandleChange from "./speakToDoctor/doctorHandleChange";
import handleDocMsgSubmit from "./speakToDoctor/handleSubmit";
//import medicationHandleChange from "./medications/handleChange";
import medicationHandleChange from "./medications/handleChange";
import appiontmentChange from "./appiontment/handleChange";
//import handleMedicationSubmit from "./medications/handleSubmit";
import handleAppiontmentSubmit from "./appiontment/submit";
//import MedicationMsg from "./medications/medicationMsg";
import AppiontmentBot from "./appiontment/appiontmentBot";
import { BackArrow, ChatSvg, AttachFileSvg, VerticalDots } from "../../svg/svg";
import Checkoutmed from "./medications/checkoutMed";
import DefaultMsg from "./default";
import ChatBotDefaultMsgWithImg from "./chatBotDefaultWithImg";
// medication new attributes



//appointment as medication 

import { appiontmentMsgs } from "./meds/msg";
import AppiontmentBotMed from "./meds/appiontmentBot";

import appiontmentChangeMed from "./meds/handleChange";
import handleAppiontmentSubmitMed from "./meds/submit";


export default function Index({
  closeChatBox,
  setCloseChatBox,
  toggleChatBox,
  mdSignUpShow,
  AccountOpenSuc,
  mdSignUpClose,
  initCartAdd,
  gotoCheckout,
  setUserData,
  dispatch,
  botPaymentSuc,
  userData,
}) {
  var myDate = new Date();
  var hrs = myDate.getHours();
  var greet;
  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";
  const { userActive, checkUserState, user } = useContext(UserDataContext);
  const [activeTab, setActiveTab] = useState("");
  const [defaultActiveMsgAll, seDefaultActiveMsgAll] = useState([
    {
      id: 0,
      interval: 500,
      nextIndex: 1,
      user: [],
      userReject: [],
      bot: [
        <div className="incomingMsgWrapMain">
          <p> {greet} </p>
        </div>,
        <div className="incomingMsgWrapMain">
          <p>I'm Nello your personal health assistant</p>
        </div>,

        <div className="incomingMsgWrapMain">
          <p>How can I help you today?</p>
        </div>,

        <div className="incomingMsgWrapMain">
          <p>
            I have four options for you to choose from, you can click on any to
            get started{" "}
          </p>
        </div>,
      ],
      botReject: [],
      type: "bot",
      yes: [],
      no: [],
    },
  ]);

  const [defaultActiveMsg, seDefaultActiveMsg] = useState([]);
  const [speakDocActive, setSpeakToDocActive] = useState([]);
  const [medicationActiveMsg, setMedicationActiveMsg] = useState([]);
  const [appiontmentActiveMsg, setappiontmentActiveMsg] = useState([]);
  const [drugappiontmentActiveMsg, setdrugappiontmentActiveMsg] = useState([]);
  const [isUserLogin, setIsUserLogin] = useState(true);
  const [chatInputDisable, setChatInputDisable] = useState(true);
  const [chatSubmitBtnDisable, setChatSubmitBtnDisable] = useState(true);
  const [activeDocMsg, setActiveDocMsg] = useState("");
  const [activeMedicationMsg, setActiveMedicationMsg] = useState("");
  const [activeAppiontmentMsg, setActiveAppiontmentMsg] = useState("");
  const [drugactiveAppiontmentMsg, setdrugActiveAppiontmentMsg] = useState("");
  //order drugs
  const [activeOrderDrugsMsg, setActiveOrderDrugsMsg] = useState("");
  const [activeDefaultNum, setactiveDefaultNum] = useState("");
  const [activeInputValue, setactiveInputValue] = useState("");
  const [LoginData, setLoginData] = useState(null);
  const [accountInfo, setAccountInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    dob: new Date(),
    password_confirmation: "",
    user_uuid: "",
  });

  const [fitness, setFitness] = useState({
    weight: "",
    height: "",
    workOutDays: "",
    workOutTime: "",
    dailyActivities: "",
    activities: "",
    weightGoal: "",
    sleepGoal: "",
    energyUnit: "",

    diagnosis: {
      status: "",
      detail: "",
    },

    allergies: {
      status: "",
      detail: "",
    },

    medication: {
      status: "",
      detail: "",
    },
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [LoadSubmitData, setLoadSubmitData] = useState(false);
  const [submitLogin, setSubmitLogin] = useState(false);
  const [submitLoginHos, setSubmitLoginHos] = useState(false);
  const [submitAppiontment, setSubmitAppiontment] = useState(false);
  const [submitFitness, setSubmitFitness] = useState(false);
  const [bookDocB, submitBookDoctor] = useState(false);
  const [specialization, setSpecialization] = useState([]);
  const [appiont, setAppiont] = useState({
    doctor_id: "",
    
    description: "",
    type: "doctor_appointment",
    date: "",
    time: "",
    doctor_email: "",
    fee: 0,
    doctor_uuid: "",
    doctor_aos: "",
    doctor_name: "",
    ref_no: "",  
    username: "",
    useremail: "",
    usergender: "",
    user_uuid: "",
  


    //for hostpial appointmnet
      center_name: "",
        center_email: "",
        center_type: "",
        center_address: "",
        center_uuid: "",
        
        reason: "",
       
    
    


    
  });
  const [doctors, setDoctors] = useState([]);
  // add medicalcenter
  const [medicalcenter, setMedicalCenter] = useState([]);
  const [searchSpeacialistByName, setsearchSpeacialistByName] = useState("");
  const [allMedication, setAllMedication] = useState([]);
  const [allAppiontment, setAllAppiontment] = useState([]);
  const [showMedicationCheckOut, setShowMedicationCheckOut] = useState(false);
  const [authFrom, setAuthFrom] = useState("");
  const [appiontMentDetails, setAppiontMentDetails] = useState({
    
    


    //hospital Appointment Details 

    doctor_id: "",
    
    description: "",
    type: "doctor_appointment",
    date: "",
    time: "",
    doctor_email: "",
    fee: 0,
    doctor_uuid: "",
    doctor_aos: "",
    doctor_name: "",
    ref_no: "",  
    username: "",
    useremail: "",
    usergender: "",
    user_uuid: "",
  


    //for hostpial appointmnet
      center_name: "",
        center_email: "",
        center_type: "",
        center_address: "",
        center_uuid: "",
        
        reason: "",
       
    
    


  });

  useEffect(() => {
    if (submitAppiontment == true && activeAppiontmentMsg == 9) {
      setTimeout(() => {
        bookAppiontMent();
      }, 2000);
    }
  }, [submitAppiontment]);

  useEffect(() => {
    if (activeDocMsg == 71 && bookDocB == true) {
      setTimeout(() => {
        bookDoctor();
      }, 2000);
    }
  }, [activeDocMsg]);

  //for hospital appointmet 


  useEffect(() => {
    if (activeAppiontmentMsg == 71) {
      setTimeout(() => {
        bookHospital();
      }, 2000);
    }
  }, [activeAppiontmentMsg]);


  //for doctor appointment Login 
  useEffect(() => {
    if (activeDocMsg == 30 && submitLogin == true) {
      setTimeout(() => {
        handleLogin();
      }, 2000);
    }
  }, [activeDocMsg]);


  //for Hospital Appointment Login

  useEffect(() => {
    if (activeAppiontmentMsg == 30) {
      console.log(activeAppiontmentMsg)
      setTimeout(() => {
        handleLoginHos();
      }, 2000);
    }
  }, [activeAppiontmentMsg]);





  useEffect(() => {
    if (activeDocMsg == 61 && submitFitness == true) {
      setTimeout(() => {
        updateFitness();
      }, 1000);
    }
  }, [activeDocMsg]);

  useEffect(() => {
    getSpecalists();
    getAllHealthCenter();
    // getAllMedication();
  }, []);

  // useEffect(() => {
  //   setActiveTab(activeTab);
  // }, [activeTab]);
  const [firsTimePS, setfirsTimePS] = useState(true);
  useEffect(() => {
    if (botPaymentSuc == true) {
      setMedicationActiveMsg([]);
      setActiveMedicationMsg("");
    }
    setfirsTimePS(false);
    if (botPaymentSuc == false || firsTimePS == false) {
      setMedicationActiveMsg([]);
      setActiveMedicationMsg("");
    }
  }, [botPaymentSuc]);

  function validateNumber(e) {
    console.log(isNaN(e));
    return isNaN(e);
  }

  const getSpecalists = async () => {
    showLoader();
    const res = await httpGet(`doctors/specializations`);
    hideLoader();
    if (res) {
      console.log(res);
      setSpecialization(res);
    }
  };

  const updateFitness = async () => {
    showLoader();
    console.log(fitness);
    setSubmitFitness(false);
    let allMsg = speakDoc;
    let active = speakDocActive;
    let data = {
      height_in_feet: fitness.height,
      height_in_inches: fitness.height,
      weight_in_kgs: fitness.weight,
      weight_in_lbs: fitness.weight,
      energy_unit: fitness.energyUnit,
      normal_daily_activity: fitness.dailyActivities,
      weight_goal: fitness.weightGoal,
      sleep_goal: fitness.sleepGoal,
      health_interests: fitness.activities,
      weekly_exercise_plan: {
        workouts_per_week: fitness.workOutDays,
        minutes_per_workout: fitness.workOutTime,
      },
      diagnosis: fitness.diagnosis,

      allergies: fitness.allergies,

      medication: fitness.medication,
    };
    const res = await httpPost(`service/doctor`, data);
    if (res) {
      hideLoader();
      setActiveDocMsg(62);
      setChatInputDisable(false);
      setSpeakToDocActive([...active, allMsg[62]]);
    }

    console.log(res);
  };

  // for Doctor Appointment 
  useEffect(() => {
    if (
      activeDocMsg == 18 ||
      activeDocMsg == 24 ||
      activeDocMsg == 21 ||
      activeDocMsg == 19 ||
      (activeDocMsg == 22 && LoadSubmitData == true)
    ) {
      setTimeout(() => {
        handleSubmit();
      }, 4000);
    }
  }, [activeDocMsg]);

  //for Hospital Appointment

  useEffect(() => {
    if (
      activeAppiontmentMsg == 18 ||
      activeAppiontmentMsg == 24 ||
      activeAppiontmentMsg == 21 ||
      activeAppiontmentMsg == 19 ||
      (activeAppiontmentMsg == 22 && LoadSubmitData == true)
    ) {
      setTimeout(() => {
        handleSubmitHos();
      }, 4000);
    }
  }, [activeAppiontmentMsg]);

  useEffect(() => {
    if (closeChatBox == true) {
      seDefaultActiveMsg([]);
      handleDefaultMsg();
    }

    return () => {
      seDefaultActiveMsg([]);
    };
  }, [closeChatBox]);

  const handleDefaultMsg = (req) => {
    setChatInputDisable(false);
    setChatSubmitBtnDisable(false);
    setActiveTab("default");
    let allMsg = defaultActiveMsgAll;
    let active = defaultActiveMsg;
    let allMsgSpread = [...active, allMsg[0]];
    seDefaultActiveMsg(allMsgSpread);
    console.log("userData>>", userData);
  };


  //for Doctor appointment
  const handleBotAcc = (action, from) => {
    //alert(from);
    setAuthFrom(from);
    setActiveTab("speakToDoc");
    if (action == "createAcc") {
      setChatInputDisable(false);
      setChatSubmitBtnDisable(false);
      let allMsg = speakDoc;
      let active = speakDocActive;
      console.log(speakDocActive);

      let allMsgSpread = null;
      if (from == "doc") {
        allMsgSpread = [...active, allMsg[3]];
      }

      // if (from == "med") {
      //   allMsgSpread = [...active, ...medicationActiveMsg, allMsg[3]];
      // }
      setSpeakToDocActive(allMsgSpread);
      setActiveDocMsg(3);
      setTimeout(() => {
        setActiveDocMsg(4);
        setChatInputDisable(false);
        setSpeakToDocActive([...allMsgSpread, allMsg[4]]);
        window.location.href = "#showNewMsg";
      }, 2000);
    }

    if (action == "login") {
      setActiveTab("speakToDoc");
      let allMsgSpread = null;
      setChatInputDisable(false);
      setChatSubmitBtnDisable(false);
      let allMsg = speakDoc;
      let active = speakDocActive;
      console.log(speakDocActive);

      if (from == "doc") {
        allMsgSpread = [...active, allMsg[25]];
        setSpeakToDocActive(allMsgSpread);
        setTimeout(() => {
          setActiveDocMsg(26);
          setChatInputDisable(false);
          setSpeakToDocActive([...allMsgSpread, allMsg[26]]);
          window.location.href = "#showNewMsg";
        }, 2000);
      }

      // if (from == "med") {
      //   setActiveTab("speakToDoc");
      //   setActiveDocMsg(26);
      //   allMsgSpread = [
      //     ...active,
      //     ...medicationActiveMsg,
      //     allMsg[25],
      //     allMsg[26],
      //   ];
      //   setSpeakToDocActive([...allMsgSpread]);
      // }
    }
  };


  //hospital Appointment 

  const handleBotAccApp = (action, from) => {
    //alert(from);
    setAuthFrom(from);
    if(from == "appoint"){

      setActiveTab("appiontment");
      if (action == "createAcc") {
        setChatInputDisable(false);
        setChatSubmitBtnDisable(false);
        // let allMsg = speakDoc;
        // let active = speakDocActive;
        // console.log(speakDocActive);
  
        let allMsg = appiontmentMsg;
        let active = appiontmentActiveMsg;
        console.log(appiontmentActiveMsg);
  
        let allMsgSpread = null;
        
          allMsgSpread = [...active, allMsg[3]];
        
  
        //setSpeakToDocActive(allMsgSpread);
        setappiontmentActiveMsg(allMsgSpread);
        //setActiveDocMsg(3);
        setActiveAppiontmentMsg(3)
        setTimeout(() => {
          //setActiveDocMsg(4);
          setActiveAppiontmentMsg(4);
          setChatInputDisable(false);
          setappiontmentActiveMsg([...allMsgSpread, allMsg[4]]);
          window.location.href = "#showNewMsg";
        }, 2000);
  
  
      }
  
      if (action == "login") {
        setActiveTab("appiontment");
        let allMsgSpread = null;
        setChatInputDisable(false);
        setChatSubmitBtnDisable(false);
        let allMsg = appiontmentMsg;
        let active = appiontmentActiveMsg;
  
       
          allMsgSpread = [...active, allMsg[25]];
         // setSpeakToDocActive(allMsgSpread);
          setappiontmentActiveMsg(allMsgSpread);
          setTimeout(() => {
            setActiveAppiontmentMsg(26);
            setChatInputDisable(false);
            //setSpeakToDocActive([...allMsgSpread, allMsg[26]]);
            setappiontmentActiveMsg([...allMsgSpread, allMsg[26]]);
            window.location.href = "#showNewMsg";
          }, 2000);
       
  
      
      }


    }

    

  };


  
  //for Medication 

  const handleBotAccMed = (action, from) => {
    //alert(from);
    setAuthFrom(from);
    setActiveTab("Medication");
    if (action == "createAcc") {
      setChatInputDisable(false);
      setChatSubmitBtnDisable(false);
      // let allMsg = speakDoc;
      // let active = speakDocActive;
      // console.log(speakDocActive);

      let allMsg = appiontmentMsgs;
      let active = appiontmentActiveMsg;
      console.log(appiontmentActiveMsg);

      let allMsgSpread = null;
      if (from == "med") {
        allMsgSpread = [...active, allMsg[3]];
      }

      //setSpeakToDocActive(allMsgSpread);
      setappiontmentActiveMsg(allMsgSpread);
      //setActiveDocMsg(3);
      setActiveAppiontmentMsg(3)
      setTimeout(() => {
        //setActiveDocMsg(4);
        setActiveAppiontmentMsg(4);
        setChatInputDisable(false);
       setappiontmentActiveMsg([...allMsgSpread, allMsg[4]]);
        window.location.href = "#showNewMsg";
      }, 2000);
    }

    //do that of login after

    if (action == "login") {
      setActiveTab("Medication");
      let allMsgSpread = null;
      setChatInputDisable(false);
      setChatSubmitBtnDisable(false);
      let allMsg = appiontmentMsgs;
      let active = appiontmentActiveMsg;

      if (from == "med") {
        allMsgSpread = [...active, allMsg[25]];
       // setSpeakToDocActive(allMsgSpread);
        setappiontmentActiveMsg(allMsgSpread);
        setTimeout(() => {
          setActiveAppiontmentMsg(26);
          setChatInputDisable(false);
          //setSpeakToDocActive([...allMsgSpread, allMsg[26]]);
          setappiontmentActiveMsg([...allMsgSpread, allMsg[26]]);
          window.location.href = "#showNewMsg";
        }, 2000);
      }

    
    }
  };



  const handleUserRequest = (req) => {
    setChatInputDisable(false);
    setChatSubmitBtnDisable(false);
    setActiveTab(req);
    if (req == "speakToDoc") {

      //if User wants to book doctor apppointment
      let allMsg = speakDoc;
      let active = speakDocActive;
      if (userActive) {
        //check if user has logged in
        console.log(user);
        if (user.doctor_subscription == null) {
          // alert(user.height);
          let allMsgSpread = [...active, allMsg[32]];
          setSpeakToDocActive(allMsgSpread);
        } else {
          setActiveDocMsg(62);
          let allMsgSpread = [...active, allMsg[62]];

          setSpeakToDocActive(allMsgSpread);
        }

        return;
      }

      let allMsgSpread = [...active, allMsg[0]];
      setSpeakToDocActive(allMsgSpread);

      setTimeout(() => {
        console.log(speakDocActive);
        setSpeakToDocActive([...allMsgSpread, allMsg[1]]);
        console.log(speakDocActive);
        window.location.href = "#showNewMsg";
        setActiveDocMsg(1);
        // mdSignUpShow();
      }, 500);
    }

    if (req == "Medication") {
      let allMsg = medicationMsgs;
      let active = medicationActiveMsg;
      let allMsgSpread = [...active, allMsg[0]];
      setMedicationActiveMsg(allMsgSpread);

      setTimeout(() => {
        console.log(medicationActiveMsg);
        setMedicationActiveMsg([...allMsgSpread, allMsg[1]]);
        console.log(medicationActiveMsg);
        window.location.href = "#showNewMsg";
        setActiveMedicationMsg(1);
        // mdSignUpShow();
      }, 500);
    }


    // if (req == "Medicationreal") {
    //   let allMsg = medicationMsgs;
    //   let active = medicationActiveMsg;
    //   let allMsgSpread = [...active, allMsg[0]];
    //   setMedicationActiveMsg(allMsgSpread);

    //   setTimeout(() => {
    //     console.log(appiontmentActiveMsg);
    //     setMedicationActiveMsg([...allMsgSpread, allMsg[1]]);
    //     //console.log(medicationActiveMsg);
    //     window.location.href = "#showNewMsg";
    //     setActiveMedicationMsg(1);
    //     // mdSignUpShow();
    //   }, 500);
    // }

    if (req == "appiontment") {
      let allMsg = appiontmentMsg;
      let active = appiontmentActiveMsg;
      let allMsgSpread = [...active, allMsg[0]];
      // setActiveAppiontmentMsg(allMsgSpread);
      setappiontmentActiveMsg(allMsgSpread);
      setTimeout(() => {
        console.log(activeMedicationMsg);

        console.log(healthCenter)
        setappiontmentActiveMsg([...allMsgSpread, allMsg[1]]);
        //console.log(medicationActiveMsg);
        setActiveAppiontmentMsg(1);
        // mdSignUpShow();
      }, 500);
    }


    //for order Medications 

   
  };


  //for doctor Appointment
  const getAllSpecalist = (e, req) => {
    let allMsg = speakDoc;
    let active = speakDocActive;

    if (req == "single") {
      getSpecalistsByName(e.target.value, "single");
      setactiveInputValue(e.target.value);
    }

    if (req == "all") {
      getSpecalistsByName("All", "all");
      setactiveInputValue(e.target.value);
    }

    if (req == "byName") {
      getSpecalistsByName(e, "byName");
      setactiveInputValue(e);
    }
  };


  //for Hospital Appointment get Medical Center

  const getAllSpecalistHos = (e, req) => {
    
    let allMsg = appiontmentMsg;
      let active = appiontmentActiveMsg;

    if (req == "single") {
      getSpecalistsByNameHos(e.target.value, "single");
      setactiveInputValue(e.target.value);
    }

    if (req == "all") {
      getSpecalistsByNameHos("All", "all");
      setactiveInputValue(e.target.value);
    }

    // if (req == "byName") {
    //   getSpecalistsByNameHos(e, "byName");
    //   setactiveInputValue(e);
    // }
  };




  // MEDICATIONS FUNCTIONS STARTS HERE

  // MEDICATIONS FUNCTIONS STARTS HERE

  // MEDICATIONS FUNCTIONS STARTS HERE
  const [healthCenter, sethealthCenter] = useState([]);
  const getAllHealthCenter = async (value) => {
    const res = await httpGet(`health-centers`);
    hideLoader();
    if (res) {
      sethealthCenter(res);
      console.log(res);
    }
  };

  const getAllMedication = async (value) => {
    const res = await httpGet(`drugs/?search=${value}`);
    hideLoader();
    if (res) {
      setAllMedication(res);
      console.log(">>>", res);
      window.location.href = "#showNewMsg";
      setTimeout(() => {
        document.getElementById("focusBotInput").focus();
      }, 450);

      console.log(res);
    }
    //alert(value);
  };

  const getMedicationByName = async (sp, wereTo) => {
    let allMsg = medicationMsgs;
    let active = medicationActiveMsg;

    const userRes = {
      id: 2,
      interval: 500,
      nextIndex: 1,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{sp.target.value}</p>
        </div>,
      ],
      userReject: [],
      botReject: [],
      type: "user",
      yes: [],
      no: [],
    };
    let allMsgSpread = [...active, userRes];
    console.log(allMsgSpread);
    setMedicationActiveMsg(allMsgSpread);
  };

  //To view product Details
  const handleMedClick = () =>{
    //setActiveMedicationMsg(2);
    let allMsg = medicationMsgs;
    let active = medicationActiveMsg;

    const userRes = {
      id: 11,
      interval: 500,
      nextIndex: 1,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>Ok Great!</p>
        </div>,
      ],
      userReject: [],
      botReject: [],
      type: "bot",
      yes: [],
      no: [],
    };
    setactiveInputValue("");
    let allMsgSpread = [...active, userRes];

    setMedicationActiveMsg(allMsgSpread);
    setTimeout(() => {
      setActiveMedicationMsg(12);
      setMedicationActiveMsg([...allMsgSpread, allMsg[12]]);
      window.location.href = "#showNewMsg";
    }, 1000);

   
  }

  const getOrder = (data) => {
    setActiveMedicationMsg(2);
    let allMsg = medicationMsgs;
    let active = medicationActiveMsg;

    const userRes = {
      id: 3,
      interval: 500,
      nextIndex: 1,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{`I want to order ${data.name}`}</p>
        </div>,
      ],
      userReject: [],
      botReject: [],
      type: "user",
      yes: [],
      no: [],
    };
    setactiveInputValue("");
    let allMsgSpread = [...active, userRes];

    setMedicationActiveMsg(allMsgSpread);
    setTimeout(() => {
      setActiveMedicationMsg(4);
      setMedicationActiveMsg([...allMsgSpread, allMsg[4]]);
      window.location.href = "#showNewMsg";
    }, 2000);

    initCartAdd({ drug_id: data.id, quantity: 1 });
    setTimeout(() => {
      window.location.href = "#showNewMsg";
    }, 2000);
  };

  const checkoutOrContinue = (wereTo) => {
    setactiveInputValue("");
    let allMsg = medicationMsgs;
    let active = medicationActiveMsg;
    if (wereTo == "shop") {
      setActiveMedicationMsg(2);
      const userRes = {
        id: 5,
        interval: 500,
        nextIndex: 1,
        user: [
          <div className="ongoingMsgReplyText">
            {" "}
            <p>{`Continue shopping`}</p>
          </div>,
        ],
        userReject: [],
        botReject: [],
        type: "user",
        yes: [],
        no: [],
      };
      setAllMedication([]);
      let allMsgSpread = [...active, userRes];
      setMedicationActiveMsg(allMsgSpread);
      setTimeout(() => {
        setActiveMedicationMsg(6);
        setMedicationActiveMsg([...allMsgSpread, allMsg[6]]);
        window.location.href = "#showNewMsg";
      }, 2000);
    }

    if (wereTo == "cart") {
      setActiveMedicationMsg(7);
      const userRes = {
        id: 7,
        interval: 500,
        nextIndex: 1,
        user: [
          <div className="ongoingMsgReplyText">
            {" "}
            <p>{`Please proceed to cart`}</p>
          </div>,
        ],
        userReject: [],
        botReject: [],
        type: "user",
        yes: [],
        no: [],
      };
      let allMsgSpread = [...active, userRes];
      setMedicationActiveMsg(allMsgSpread);
      if (userActive) {
        gotoCheckout();
      } else {
        setTimeout(() => {
          setActiveMedicationMsg(8);
          setMedicationActiveMsg([...allMsgSpread, allMsg[8]]);
          window.location.href = "#showNewMsg";
        }, 2000);
      }
    }
  };

  const closeCart = () => {
    // setActiveTab("Medication");
    setShowMedicationCheckOut(false);
  };

  // MEDICATIONS FUNCTIONS ENDS HERE
  // MEDICATIONS FUNCTIONS ENDS HERE
  // MEDICATIONS FUNCTIONS ENDS HERE

  //for Doctors Appointment

  const getSpecalistsByName = async (sp, wereTo) => {
    // change to that of hostpital
    let allMsg = speakDoc;
    let active = speakDocActive;

    
    const userRes = {
      id: 63,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>All Specialist</p>
        </div>,
      ],
      type: "user",
    };
    setactiveInputValue("");
    showLoader();
    const res =
      wereTo == "byName"

      //change the api routes for hospital
        ? await httpGet(`doctors/?search=${sp}`)
        : await httpGet(`doctors/?specialization=${sp == "All" ? "" : sp} `);

    hideLoader();
    if (res) {
      if (wereTo == "byName") {

        //change to setMedicalCenter
        setDoctors(res.data);
      }
      setDoctors(res.data);
      console.log(res);
      setactiveInputValue("");
      let allMsgSpread = [...active, userRes];
      setSpeakToDocActive(allMsgSpread);
      window.location.href = "#showNewMsg";
      setTimeout(() => {
        setActiveDocMsg(64);
        setSpeakToDocActive([...allMsgSpread, allMsg[64]]);
        window.location.href = "#showNewMsg";
      }, 2000);
    }
  };


  // For Medical Center Appointment

  const getSpecalistsByNameHos = async (sp, wereTo) => {
    // change to that of hostpital
   

    let allMsg = appiontmentMsg;
      let active = appiontmentActiveMsg;

    
    const userRes = {
      id: 63,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>oh!, Great</p>
        </div>,
      ],
      type: "user",
    };
    setactiveInputValue("");
    showLoader();
    const res = await httpGet(`medicalcenter/?specialization=${sp == "All" ? "" : sp} `);

    hideLoader();
    if (res) {
      // if (wereTo == "byName") {

      //   //change to setMedicalCenter
      //   setDoctors(res.data);
      // }
      setMedicalCenter(res.data);
      console.log(res);
      setactiveInputValue("");
      let allMsgSpread = [...active, userRes];


      setappiontmentActiveMsg(allMsgSpread);

      // setActiveAppiontmentMsg(22);
      //       setappiontmentActiveMsg([...allSentMsg, allMsg[22]]);


      window.location.href = "#showNewMsg";
      setTimeout(() => {
        setActiveAppiontmentMsg(64);
        setappiontmentActiveMsg([...allMsgSpread, allMsg[64]]);
        window.location.href = "#showNewMsg";
      }, 2000);
    }
  };

  const handleSelectDailyAct = (e) => {
    let allMsg = speakDoc;
    let active = speakDocActive;
    const userRes = {
      id: 43,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{e.target.value}</p>
        </div>,
      ],
      type: "user",
    };
    if (activeDocMsg == 42) {
      let allMsgSpread = [...active, userRes];
      setSpeakToDocActive(allMsgSpread);
      setFitness({ ...fitness, dailyActivities: e.target.value });
      setTimeout(() => {
        console.log(speakDocActive);
        setSpeakToDocActive([...allMsgSpread, allMsg[44]]);
        console.log(speakDocActive);
        window.location.href = "#showNewMsg";
        setActiveDocMsg(44);
      }, 2000);
    }
  };

  //handle book appointment click boooking

  const bookAppiontmentWithDoc = (data) => {
    setChatInputDisable(false);
    setChatSubmitBtnDisable(false);
    let allMsg = speakDoc;
    let active = speakDocActive;
    setAppiont({
      ...appiont,
      doctor_id: data.id,
      doctor_email: data.email,
      fee: data.fee,
      doctor_uuid: data.uuid,
      doctor_aos: data.aos,
      doctor_name: `${data.firstname} ${data.lastname}`
    });
    console.log(appiont.doctor_email);
    let allMsgSpread = [...active, allMsg[65]];
    setSpeakToDocActive(allMsgSpread);
    setActiveDocMsg(65);
  };

  // handle medical center book appointment click booking 

  const bookAppiontmentWithHos = (data) => {
    setChatInputDisable(false);
    setChatSubmitBtnDisable(false);

   

    let allMsg = appiontmentMsg;
      let active = appiontmentActiveMsg;

    setAppiontMentDetails({
      ...appiontMentDetails,
     
      
      fee: data.fee,

      center_name: data.name,
        center_email: data.email,
        center_type: data.center_type,
        center_address: data.address1,
        center_uuid: data.uuid,
      
      
    });
    console.log(appiontMentDetails.center_name);
    let allMsgSpread = [...active, allMsg[65]];


    setappiontmentActiveMsg(allMsgSpread);
    setActiveAppiontmentMsg(65);

    
  };

  const handleSelecEnergyUnit = (e) => {
    let allMsg = speakDoc;
    let active = speakDocActive;
    const userRes = {
      id: 51,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{e.target.value}</p>
        </div>,
      ],
      type: "user",
    };
    if (activeDocMsg == 50) {
      let allMsgSpread = [...active, userRes];
      setSpeakToDocActive(allMsgSpread);

      setFitness({ ...fitness, energyUnit: e.target.value });
      setTimeout(() => {
        console.log(speakDocActive);
        setSpeakToDocActive([...allMsgSpread, allMsg[52]]);
        console.log(speakDocActive);
        window.location.href = "#showNewMsg";
        setActiveDocMsg(52);
      }, 2000);
    }
  };

  const healthEffects = (e, type) => {
    let allMsg = speakDoc;
    let active = speakDocActive;

    if (type == "allergies") {
      if (e.target.value == "yes") {
        setActiveDocMsg(53);
        let allMsgSpread = [...active, allMsg[53]];
        setFitness({
          ...fitness,
          allergies: { ...fitness.allergies, status: e.target.value },
        });
        console.log(fitness);
        setSpeakToDocActive(allMsgSpread);
      }

      if (e.target.value == "no") {
        setActiveDocMsg(55);
        setFitness({
          ...fitness,
          allergies: { ...fitness.allergies, status: e.target.value },
        });
        console.log(fitness);
        let allMsgSpread = [...active, allMsg[55]];
        setSpeakToDocActive(allMsgSpread);
      }
    }

    if (type == "diagnosis") {
      if (e.target.value == "yes") {
        setActiveDocMsg(56);
        let allMsgSpread = [...active, allMsg[56]];
        setFitness({
          ...fitness,
          diagnosis: { ...fitness.diagnosis, status: e.target.value },
        });
        console.log(fitness);
        setSpeakToDocActive(allMsgSpread);
      }

      if (e.target.value == "no") {
        setActiveDocMsg(58);
        setFitness({
          ...fitness,
          diagnosis: { ...fitness.diagnosis, status: e.target.value },
        });
        console.log(fitness);
        let allMsgSpread = [...active, allMsg[58]];
        setSpeakToDocActive(allMsgSpread);
      }
    }

    if (type == "medication") {
      if (e.target.value == "yes") {
        setActiveDocMsg(59);
        let allMsgSpread = [...active, allMsg[59]];
        setFitness({
          ...fitness,
          medication: { ...fitness.medication, status: e.target.value },
        });
        console.log(fitness);
        setSpeakToDocActive(allMsgSpread);
      }

      if (e.target.value == "no") {
        setActiveDocMsg(61);
        setFitness({
          ...fitness,
          medication: { ...fitness.medication, status: e.target.value },
        });
        console.log(fitness);
        let allMsgSpread = [...active, allMsg[61]];
        setSpeakToDocActive(allMsgSpread);
        setSubmitFitness(true);
      }
    }
  };

  // this is for Doctor Appointment

  const getMoreUserDetails = (action) => {
    checkUserState();
    let allMsg = speakDoc;
    let active = speakDocActive;

    if (action == "continue") {
      const userRes = {
        id: 33,
        user: [
          <div className="ongoingMsgReplyText">
            {" "}
            <p>Continue</p>
          </div>,
        ],
        type: "user",
      };
      let allMsgSpread = [...active, userRes, allMsg[34]];
      if (LoginData == null) {
        if (user.doctor_subscription == null) {
          setChatInputDisable(false);
          setChatSubmitBtnDisable(false);
          setActiveDocMsg(34);
          setSpeakToDocActive(allMsgSpread);
        }
      } else if (LoginData.doctor_subscription == null) {
        {
          setChatInputDisable(false);
          setChatSubmitBtnDisable(false);
          setActiveDocMsg(34);
          setSpeakToDocActive(allMsgSpread);
        }
      }
    }

    if (action == "skip") {
      const userRes = {
        id: 33,
        user: [
          <div className="ongoingMsgReplyText">
            {" "}
            <p>I will update that later.</p>
          </div>,
        ],
        type: "user",
      };
      let allMsgSpread = [...active, userRes, allMsg[62]];

      setChatInputDisable(false);
      setChatSubmitBtnDisable(false);
      setActiveDocMsg(62);
      setSpeakToDocActive(allMsgSpread);
    }
  };



    // this is for Hospital Appointment

    const getMoreUserDetailsHos = (action) => {
      checkUserState();
   

      //ir activeTab is appiontment
      if(activeTab == "appiontment"){
        console.log(activeTab);

      let allMsg = appiontmentMsg;
      let active = appiontmentActiveMsg;
  
     
  
      if (action == "skip") {
        const userRes = {
          id: 33,
          user: [
            <div className="ongoingMsgReplyText">
              {" "}
              <p>Ok I will.</p>
            </div>,
          ],
          type: "user",
        };
        let allMsgSpread = [...active, userRes, allMsg[62]];
  
        setChatInputDisable(false);
        setChatSubmitBtnDisable(false);
        setActiveAppiontmentMsg(62);
        setappiontmentActiveMsg(allMsgSpread);
       
      }


      }
      //end of if activeTab is appiontnment

      //if activeTab is Medication 

     
    };











  const handleUserAccountGender = (e) => {
    if (activeDocMsg == 14) {
      // if (accountInfo.gender == "") {
      //   return NotificationManager.error("Gender is required to continue");
      // }
      setAccountInfo({ ...accountInfo, gender: e.target.value });
      console.log(e.target.value);
      let allMsg = speakDoc;
      let active = speakDocActive;
      const userRes = {
        id: 15,
        user: [
          <div className="ongoingMsgReplyText">
            {" "}
            <p>{e.target.value}</p>
          </div>,
        ],
        type: "user",
      };
      setActiveDocMsg(16);
      let allMsgSpread = [...active, userRes];
      setSpeakToDocActive(allMsgSpread);
      setTimeout(() => {
        setactiveInputValue("");
        setActiveDocMsg(16);
        setSpeakToDocActive([...allMsgSpread, allMsg[16]]);
        window.location.href = "#showNewMsg";
        setChatInputDisable(false);
        setChatSubmitBtnDisable(false);
      }, 2000);
    }

    if (activeDocMsg == 14) {
      if (activeDocMsg == 12) {
        setAccountInfo({ ...accountInfo, gender: e.target.value });
      }
    }
  };

  //Choose Gender Hospital Create account

  const handleUserAccountGenderHos = (e) => {
    console.log(activeAppiontmentMsg);
    if (activeAppiontmentMsg == 14) {
      // if (accountInfo.gender == "") {
      //   return NotificationManager.error("Gender is required to continue");
      // }
      setAccountInfo({ ...accountInfo, gender: e.target.value });
      console.log(e.target.value);
      console.log(accountInfo.gender);
      let allMsg = appiontmentMsg;
      let active = appiontmentActiveMsg;
      const userRes = {
        id: 15,
        user: [
          <div className="ongoingMsgReplyText">
            {" "}
            <p>{e.target.value}</p>
          </div>,
        ],
        type: "user",
      };

      setActiveAppiontmentMsg(16);
    
      
      let allMsgSpread = [...active, userRes];
      setappiontmentActiveMsg(allMsgSpread);
      setTimeout(() => {
        setactiveInputValue("");
        setActiveAppiontmentMsg(16);
        setappiontmentActiveMsg([...allMsgSpread, allMsg[16]]);
        window.location.href = "#showNewMsg";
        setChatInputDisable(false);
        setChatSubmitBtnDisable(false);
      }, 2000);

     
    }

    // if (activeAppiontmentMsg == 14) {
    //   if (activeAppiontmentMsg == 12) {
    //     setAccountInfo({ ...accountInfo, gender: e.target.value });
    //   }
    // }
  };


   //for Doctor Appointment Create Account 
  const handleSubmit = async () => {
    setLoadSubmitData(false);
    let allMsg = speakDoc;
    let allSentMsg = speakDocActive;
    console.log();
    let data = accountInfo;
    // console.log(accountInfo);
    // console.log(
    //   " data>>>",
    //   (data["dob"] = moment(accountInfo.dob).format("DD-MM-YYYY"))
    // );
    // data["dob"] = moment(accountInfo.dob).format("DD-MM-YYYY");

    showLoader();
    const res = await httpPost(`auth/register`, data);
    if (res) {
      hideLoader();
      if (res.er) {
        hideLoader();
        console.log(res.er.errors);
        let errors = [];
        for (let key in res.er.errors) {
          if (res.er.errors[key] !== "" && key !== "javascript") {
            errors.push(res.er.errors[key]);
          }
        }
        console.log(">>>>>>ERR", errors[0][0]);
        if (errors.length) {
          NotificationManager.error(`${errors[0][0]}.`);
          if (errors[0][0] == "The email has already been taken.") {
            setactiveInputValue("");
            setActiveDocMsg(19);
            setSpeakToDocActive([...allSentMsg, allMsg[19]]);
            window.location.href = "#showNewMsg";
          }

          if (errors[0][0] == "The phone has already been taken.") {
            setactiveInputValue("");
            setActiveDocMsg(22);
            console.log(">>>MSG", allSentMsg);
            setSpeakToDocActive([...allSentMsg, allMsg[22]]);
            window.location.href = "#showNewMsg";
          }
          return false;
        }
      } else {
        NotificationManager.success(`Account successfully created.`);
        setLoginData(res.user);
        setUserData(dispatch, res.token, res.user);
        localStorage.setItem("token", res.token);

        setAppiont({
          ...appiont,
          username: `${res.user.firstname} ${res.user.lastname}`,
          useremail: `${res.user.email}`,
          usergender: `${res.user.gender}`,
          user_uuid: `${res.user.uuid}`,
        });
        


        alert(authFrom);
        if (authFrom == "med") {
          setActiveTab("Medication");
          window.location.href = "#cart";
          setTimeout(() => {
            window.location.href = "#cart";
          }, 3000);
          return;
        }

        if (authFrom == "doc") {
          setSpeakToDocActive([...allSentMsg, allMsg[32]]);
        }

        // setAccountInfo({
        //   firstname: "",
        //   lastname: "",
        //   email: "",
        //   phone: "",
        //   password: "",
        //   password_confirmation: "",
        //   gender: "",
        //   dob: new Date(),
        //   weight: "",
        //   height: "",
        // });
        // initLogin();
      }
    }
  };





     //for Hospital Appointment Create Account 
     const handleSubmitHos = async () => {
     
        

      //if activeTab == "appiontment"

      if(activeTab == "appiontment"){
        //console.log(activeTab);
        setLoadSubmitData(false);
        let allMsg = appiontmentMsg;
        let allSentMsg = appiontmentActiveMsg;
        console.log();
        let data = accountInfo;
        // console.log(accountInfo);
        // console.log(
        //   " data>>>",
        //   (data["dob"] = moment(accountInfo.dob).format("DD-MM-YYYY"))
        // );
        // data["dob"] = moment(accountInfo.dob).format("DD-MM-YYYY");
    
        showLoader();
        const res = await httpPost(`auth/register`, data);
        if (res) {
          hideLoader();
          if (res.er) {
            hideLoader();
            console.log(res.er.errors);
            let errors = [];
            for (let key in res.er.errors) {
              if (res.er.errors[key] !== "" && key !== "javascript") {
                errors.push(res.er.errors[key]);
              }
            }
            console.log(">>>>>>ERR", errors[0][0]);
            if (errors.length) {
              NotificationManager.error(`${errors[0][0]}.`);
              if (errors[0][0] == "The email has already been taken.") {
                setactiveInputValue("");
                setActiveAppiontmentMsg(19);
                setappiontmentActiveMsg([...allSentMsg, allMsg[19]]);
  
      
                window.location.href = "#showNewMsg";
  
              
  
              }
    
              if (errors[0][0] == "The phone has already been taken.") {
                setactiveInputValue("");
                setActiveAppiontmentMsg(22);
                console.log(">>>MSG", allSentMsg);
                setappiontmentActiveMsg([...allSentMsg, allMsg[22]]);
                window.location.href = "#showNewMsg";
              }
              // setActiveAppiontmentMsg(22);
              // setappiontmentActiveMsg([...allSentMsg, allMsg[22]]);
              return false;
            }
          } else {
            NotificationManager.success(`Account successfully created.`);
            setLoginData(res.user);
            setUserData(dispatch, res.token, res.user);
            localStorage.setItem("token", res.token);
  
            setAppiontMentDetails({
              ...appiontMentDetails,
              username: `${res.user.firstname} ${res.user.lastname}`,
              useremail: `${res.user.email}`,
              usergender: `${res.user.gender}`,
              user_uuid: `${res.user.uuid}`,
            });
            
            alert(authFrom);
           
    
            setappiontmentActiveMsg([...allSentMsg, allMsg[32]]);
            
    
          
          }
        }
  
      }


      //end of if activeTab is appiontment


      

    };



    //Doctor Appointment Login 

  const handleLogin = async () => {
    setSubmitLogin(false);
    let allMsg = speakDoc;
    let allSentMsg = speakDocActive;
    console.log();
    let data = accountInfo;
    console.log(accountInfo);
    console.log(
      " data>>>",
      (data["dob"] = moment(accountInfo.dob).format("DD-MM-YYYY"))
    );
    data["dob"] = moment(accountInfo.dob).format("DD-MM-YYYY");

    showLoader();
    const res = await httpPost(`auth/login`, loginInfo);
    if (res) {
      hideLoader();
      console.log("RES>>>>", res);
      if (res.er) {
        hideLoader();
        console.log("ERRIR", res.er.msg);
        NotificationManager.error(res.er.msg);
        if (res.er.msg == "Invalid Credentials.") {
          if (authFrom == "doc") {
            setSpeakToDocActive([...allSentMsg, allMsg[31]]);
            window.location.href = "#showNewMsg";
            setChatInputDisable(true);
            setChatSubmitBtnDisable(true);
            setactiveInputValue("");
          }

          if (authFrom == "med") {
            setActiveTab("Medication");

            let allMsg = medicationMsgs;
            let active = medicationActiveMsg;
            setActiveMedicationMsg(8);
            let allMsgSpread = [...active, allMsg[8]];
            console.log(allMsgSpread);
            setMedicationActiveMsg(allMsgSpread);

            setChatInputDisable(true);
            setChatSubmitBtnDisable(true);
            setactiveInputValue("");
          }
        }
      } else {
        setactiveInputValue("");
        setUserData(dispatch, res.token, res.user);
        localStorage.setItem("token", res.token);
        // alert(res.token);
        checkUserState();
        NotificationManager.success(`Login successful .`);
        setLoginData(res.user);
        console.log(user);
        console.log(res.user.email);

        setAppiont({
          ...appiont,
          username: `${res.user.firstname} ${res.user.lastname}`,
          useremail: `${res.user.email}`,
          usergender: `${res.user.gender}`,
          user_uuid: `${res.user.uuid}`,
        });
        

        if (authFrom == "med") {
          setActiveTab("Medication");
          // gotoCheckout();
          window.location.href = "#cart";
          setTimeout(() => {
            window.location.href = "#cart";
          }, 3000);
        }

        if (authFrom == "doc") {
          if (res.user.doctor_subscription == null) {
            // alert(user.height);
            let allMsgSpread = [...allSentMsg, allMsg[32]];
            setSpeakToDocActive(allMsgSpread);
          } else {
            setActiveDocMsg(62);
            let allMsgSpread = [...allSentMsg, allMsg[62]];

            setSpeakToDocActive(allMsgSpread);
          }

          setActiveTab("speakToDoc");
        }

        return;
      }
    }
  };


  //Hospital Appointment Login    

  const handleLoginHos = async () => {
   

    //if active Tap is Appointment 

    if(activeTab == "appiontment"){

      console.log(activeTab);

    

      let allMsg = appiontmentMsg;
      let allSentMsg = appiontmentActiveMsg;
  
  
   
  
      showLoader();
      const res = await httpPost(`auth/login`, {
        'email':accountInfo.email,
        'password':accountInfo.password
      });
  
      //Ucomment
      if (res) {
        hideLoader();
        console.log("RES>>>>", res);
        if (res.er) {
          hideLoader();
          console.log("ERRIR", res.er.msg);
          NotificationManager.error(res.er.msg);
          if (res.er.msg == "Invalid Credentials.") {
          
            setappiontmentActiveMsg([...allSentMsg, allMsg[31]]);
  
              
              window.location.href = "#showNewMsg";
              setChatInputDisable(true);
              setChatSubmitBtnDisable(true);
              setactiveInputValue("");
            
  
            
          }
        } else {
          setactiveInputValue("");
          setUserData(dispatch, res.token, res.user);
          localStorage.setItem("token", res.token);
          // alert(res.token);
          checkUserState();
          NotificationManager.success(`Login successful .`);
          setLoginData(res.user);
          console.log(user);
          console.log(res.user.email);
  
          setAppiontMentDetails({
            ...appiontMentDetails,
            username: `${res.user.firstname} ${res.user.lastname}`,
            useremail: `${res.user.email}`,
            usergender: `${res.user.gender}`,
            user_uuid: `${res.user.uuid}`,
          });
          
  
         
          
            
              // alert(user.height);
              let allMsgSpread = [...allSentMsg, allMsg[32]];
              setappiontmentActiveMsg(allMsgSpread);
            
  
            setActiveTab("appiontment");
          
  
           return;
        }
      }

    }


    // end of if Active Tab is Appiointmen



    //if active Tab is Medication

    


  };


//for doctor apppoinment
  const bookDoctor = async () => {
    setSubmitAppiontment(false);
    let allMsg = speakDoc;
    let allSentMsg = speakDocActive;
    console.log();
    let data = appiont;
    console.log(data);

    showLoader();
    const res = await httpPost(`appointments/book`, data);
    if (res) {
      hideLoader();
      console.log("RES>>>>", res);
      if (res.er) {
        hideLoader();
        console.log("ERRIR", res.er.message);
        console.log(res.er.errors);
        //NotificationManager.error(res.er.message);
        if (res.er.message == "The given data was invalid.") {

          NotificationManager.error(res.er.errors.time[0]);
          console.log(res.er.errors.time[0]);
          //setSpeakToDocActive([...allSentMsg, allMsg[72]]); uncomment later
          window.location.href = "#showNewMsg";
          // setChatInputDisable(true);
          // setChatSubmitBtnDisable(true);
          // setactiveInputValue("");

          //setSpeakToDocActive([]);
           setSpeakToDocActive([...allSentMsg, allMsg[67]]);
          return;

         
        }
      } else {

       
       
        NotificationManager.success(`Schedule Available.`);
        
         let allMsg = speakDoc;
      let active = speakDocActive;
      console.log(speakDocActive);



    const userRes = {
      id: 72,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>Oh, Great!</p>
        </div>,
      ],
      type: "user",
    };
    setChatInputDisable(true);
    setChatSubmitBtnDisable(true);
    let allMsgSpread = [...active, userRes, allMsg[73]];
    setSpeakToDocActive(allMsgSpread);
    setActiveDocMsg(73);
    submitBookDoctor(true);
    setTimeout(() => {
      setactiveInputValue("");
      //setSpeakToDocActive([...allMsgSpread, allMsg[73]]);
      window.location.href = "#showNewMsg";
    }, 1000);

      
        // let allMsgSpread = [...active, allMsg[76]];
        // setSpeakToDocActive(allMsgSpread);
        // setTimeout(() => {
        //   setActiveDocMsg(76);
        //   setChatInputDisable(false);
        //   setSpeakToDocActive([...allMsgSpread, allMsg[76]]);
        //   window.location.href = "#showNewMsg";
        // }, 2000);



      
        //return;  uncomment later
      }
    }
  };


  //for medical center appointment

  const bookHospital = async () => {
    //setSubmitAppiontment(false);


    let allMsg = appiontmentMsg;
    let allSentMsg = appiontmentActiveMsg;


    console.log();
    let data = appiontMentDetails;
    console.log(data);

    showLoader();
    const res = await httpPost(`appointments/hospital/book`, data);
    if (res) {
      hideLoader();
      console.log("RES>>>>", res);
      if (res.er) {
        hideLoader();
        console.log("ERRIR", res.er.message);
        console.log(res.er.errors);
        //NotificationManager.error(res.er.message);
        if (res.er.message == "The given data was invalid.") {

          NotificationManager.error(res.er.errors.time[0]);
          console.log(res.er.errors.time[0]);
          //setSpeakToDocActive([...allSentMsg, allMsg[72]]); uncomment later
          window.location.href = "#showNewMsg";
          // setChatInputDisable(true);
          // setChatSubmitBtnDisable(true);
          // setactiveInputValue("");

          setappiontmentActiveMsg([...allSentMsg, allMsg[67]]);
          return;

         
        }
      } else {

       
       
        NotificationManager.success(`Schedule Available.`);
        
     

      let allMsg = appiontmentMsg;
    let active = appiontmentActiveMsg;


      console.log(appiontmentActiveMsg);



    const userRes = {
      id: 72,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>Oh, Great!</p>
        </div>,
      ],
      type: "user",
    };
    setChatInputDisable(true);
    setChatSubmitBtnDisable(true);
    let allMsgSpread = [...active, userRes, allMsg[73]];


    setappiontmentActiveMsg(allMsgSpread);
    setActiveAppiontmentMsg(73);
    //submitBookDoctor(true);
    setTimeout(() => {
      setactiveInputValue("");
      //setSpeakToDocActive([...allMsgSpread, allMsg[73]]);
      window.location.href = "#showNewMsg";
    }, 1000);

      
        // let allMsgSpread = [...active, allMsg[76]];
        // setSpeakToDocActive(allMsgSpread);
        // setTimeout(() => {
        //   setActiveDocMsg(76);
        //   setChatInputDisable(false);
        //   setSpeakToDocActive([...allMsgSpread, allMsg[76]]);
        //   window.location.href = "#showNewMsg";
        // }, 2000);



      
        //return;  uncomment later
      }
    }
  };


  const handleBotSubmit = (e, index) => {
    if (activeTab == "speakToDoc") {
      handleDocMsgSubmit(
        e,
        activeDocMsg,
        speakDoc,
        accountInfo,
        speakDocActive,
        setSpeakToDocActive,
        setactiveInputValue,
        setActiveDocMsg,
        setChatInputDisable,
        setChatSubmitBtnDisable,
        setLoadSubmitData,
        loginInfo,
        setSubmitLogin,
        fitness,
        validateNumber,
        activeInputValue,
        setFitness,
        setSubmitFitness,
        getAllSpecalist,
        searchSpeacialistByName,
        appiont,
        submitBookDoctor,
        setAppiont,
        setAccountInfo
      );
    }

    if (activeTab == "Medicationreal") {
      // alert("clic");
      handleMedicationSubmit(
        e,
        activeMedicationMsg,
        medicationMsgs,
        accountInfo,
        medicationActiveMsg,
        setMedicationActiveMsg,
        setActiveMedicationMsg,
        setactiveInputValue,
        setActiveMedicationMsg,
        setChatInputDisable,
        setChatSubmitBtnDisable,
        setLoadSubmitData,
        loginInfo,
        setSubmitLogin,
        fitness,
        validateNumber,
        activeInputValue,
        setFitness,
        setSubmitFitness,
        getAllSpecalist,
        searchSpeacialistByName,
        appiont,
        submitBookDoctor,
        setAccountInfo,


        
      );
    }

    if (activeTab == "appiontment") {
      // alert("clic");
      handleAppiontmentSubmit(
        e,
        activeAppiontmentMsg,
        setActiveAppiontmentMsg,
        appiontmentActiveMsg,
        setappiontmentActiveMsg,
        appiontmentMsg,
        appiontMentDetails,
        setAppiontMentDetails,
        setactiveInputValue,
        activeInputValue,
        setSubmitAppiontment,
        accountInfo,
        
     
        setChatInputDisable,
        setChatSubmitBtnDisable,
        setLoadSubmitData,
        loginInfo,
        validateNumber,
       setAccountInfo,
       setFitness,
       fitness,
       setSubmitLogin,
       setSubmitFitness,
        getAllSpecalist,
        searchSpeacialistByName,
        speakDocActive,
        setLoginInfo,
        setSubmitLoginHos,
        submitLoginHos,
        activeAppiontmentMsg,
        getAllSpecalistHos,
        appiont,
        setAppiont,

      );
    }

    if (activeTab == "Medication") {
      // alert("clic");
      handleMedicationSubmit(
        e,
        activeMedicationMsg,
        speakDoc,
        accountInfo,
        speakDocActive,
        setSpeakToDocActive,
        setactiveInputValue,
        setActiveDocMsg,
        setChatInputDisable,
        setChatSubmitBtnDisable,
        setLoadSubmitData,
        loginInfo,
        setSubmitLogin,
        fitness,
        validateNumber,
        activeInputValue,
        setFitness,
        setSubmitFitness,
        getAllSpecalist,
        searchSpeacialistByName,
        appiont,
        submitBookDoctor,
        setAccountInfo


      );
    }

  
  };

  const handleBotInputChange = (e) => {
    if (activeTab == "speakToDoc") {
      doctorHandleChange(
        e,
        activeDocMsg,
        accountInfo,
        setAccountInfo,
        appiont,
        setAppiont,
        fitness,
        setFitness,
        loginInfo,
        setLoginInfo,
        setactiveInputValue,
        setsearchSpeacialistByName
      );
    }

    if (activeTab == "Medicationreal") {
      medicationHandleChange(
        e,
        activeMedicationMsg,
        setactiveInputValue,
        accountInfo,
        setAccountInfo,
        appiont,
        setAppiont,
        fitness,
        setFitness,
        loginInfo,
        setLoginInfo,
        setactiveInputValue,
        setsearchSpeacialistByName,
        getAllMedication


        
        
      );
    }

    if (activeTab == "appiontment") {
      appiontmentChange(
        e,
        activeAppiontmentMsg,
        setactiveInputValue,
        setAppiontMentDetails,
        appiontMentDetails,
        accountInfo,
        setAccountInfo,
        loginInfo,
        setLoginInfo,
        setactiveInputValue,
        setAppiont,
        appiont,
        fitness,
        setFitness,
        setsearchSpeacialistByName,
        
        

      );
    }


    if (activeTab == "Medication") {
      medicationHandleChange(
        e,
        activeMedicationMsg,
        accountInfo,
        setAccountInfo,
        appiont,
        setAppiont,
        fitness,
        setFitness,
        loginInfo,
        setLoginInfo,
        setactiveInputValue,
        setsearchSpeacialistByName,
        getAllMedication

        

      );
    }

   
  };

  const bookAppiontMent = async () => {
    console.log(appiontMentDetails);
    setSubmitAppiontment(false);
    let allMsg = appiontmentMsg;
    let allSentMsg = appiontmentActiveMsg;
    let data = {
      date: appiontMentDetails.date,
      medical_center: appiontMentDetails.hospital,
      reason: appiontMentDetails.reason,
      time: `${appiontMentDetails.time}`,
    };

    showLoader();
    const res = await httpPost(`appointments/book`, data);
    if (res) {
      hideLoader();
      console.log("RES>>>>", res);
      if (res.er) {
        hideLoader();
        console.log("ERRIR", res.er.msg);
        NotificationManager.error(res.er.msg);
        if (res.er.msg == "Invalid Credentials.") {
          // setSpeakToDocActive([...allSentMsg, allMsg[31]]);
          // window.location.href = "#showNewMsg";
          // setactiveInputValue("");
        }
      } else {
        setactiveInputValue("");
        NotificationManager.success(`Appiontment booked successfully.`);

        setappiontmentActiveMsg([...allSentMsg, allMsg[10]]);
        setTimeout(() => {
          // setActiveTab("default");
          setappiontmentActiveMsg([]);
          // toggleChatBox();
        }, 3000);

        return;
      }
    }
  };

  const getHealthCenterSelect = (e) => {
    let allMsg = appiontmentMsg;
    let active = appiontmentActiveMsg;

    const filterHospital = healthCenter.filter((data) => {
      return data.name == e.target.value;
    });
    const userRes = {
      id: 2,
      interval: 500,
      nextIndex: 1,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{`${e.target.value}`}</p>
        </div>,
      ],
      userReject: [],
      botReject: [],
      type: "user",
      yes: [],
      no: [],
    };
    setAppiontMentDetails({
      ...appiontMentDetails,
      hospital: filterHospital[0].uuid,
    });
    setactiveInputValue("");
    let allMsgSpread = [...active, userRes];
    setappiontmentActiveMsg(allMsgSpread);
    setTimeout(() => {
      setappiontmentActiveMsg([...allMsgSpread, allMsg[3]]);
      setActiveAppiontmentMsg(3);
    }, 2000);
  };

  const selectAppiontmentTime = (e) => {
    let allMsg = appiontmentMsg;
    let active = appiontmentActiveMsg;

    const userRes = {
      id: 2,
      interval: 500,
      nextIndex: 1,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{`${e.target.value}`}</p>
        </div>,
      ],
      userReject: [],
      botReject: [],
      type: "user",
      yes: [],
      no: [],
    };
    setAppiontMentDetails({
      ...appiontMentDetails,
      time: e.target.value,
    });
    setactiveInputValue("");
    let allMsgSpread = [...active, userRes];
    setappiontmentActiveMsg(allMsgSpread);
    setActiveAppiontmentMsg(9);
    setTimeout(() => {
      setappiontmentActiveMsg([...allMsgSpread, allMsg[9]]);
      setSubmitAppiontment(true);
    }, 2000);
  };

  const doctorAppiontmentTime = (time) => {
    let t = time;
    let chk = t.split(" ").some(function (w) {
      return w === "am";
    });

    let chkPm = t.split(" ").some(function (w) {
      return w === "pm";
    });

    if (chk == true) {
      let repl = t.replace(/ am/i, ":00");
      t = repl;
    }

    if (chkPm == true) {
      let repl = t.replace(/ pm/i, ":00");
      t = repl;
    }
    time = t;
    console.log(t);
    // t.replace("pm", ":00");

    const AppionTime = {
      ...appiont,
      time: t,
    };
    setAppiont(AppionTime);
    let allMsg = speakDoc;
    if (time == "") {
      return NotificationManager.error(
        "Appiontment time is required to continue"
      );
    }

    let active = speakDocActive;
    const userRes = {
      id: 70,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{time}</p>
        </div>,
      ],
      type: "user",
    };
    setChatInputDisable(true);
    setChatSubmitBtnDisable(true);
    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    setActiveDocMsg(71);
    submitBookDoctor(true);
    setTimeout(() => {
      setactiveInputValue("");
      setSpeakToDocActive([...allMsgSpread, allMsg[71]]);
      window.location.href = "#showNewMsg";
    }, 1000);
  };

  //for Medical Center  date appointment
  const bookAppionmentDate = (date) => {
    let allMsg = appiontmentMsg;
    if (date == "") {
      return NotificationManager.error(
        "Appiontment date is required to continue"
      );
    }
    let converDate = moment(date).format("YYYY-MM-DD");
    let DisplayDate = moment(date).format("DD-MM-YYYY");
    console.log(">>>converDate", converDate, date);
    if (converDate == "Invalid date") {
      return NotificationManager.error(
        "Invalid date format,please use the format below"
      );
    }
    setAppiontMentDetails({
      ...appiontMentDetails,
      date: converDate,
    });
    let active = appiontmentActiveMsg;
    const userRes = {
      id: 68,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{DisplayDate}</p>
        </div>,
      ],
      type: "user",
    };
    let allMsgSpread = [...active, userRes];



    setappiontmentActiveMsg(allMsgSpread);

// setActiveAppiontmentMsg(22);
            // setappiontmentActiveMsg([...allSentMsg, allMsg[22]]);

    setTimeout(() => {
      setactiveInputValue("");
      setActiveAppiontmentMsg(69);
      setappiontmentActiveMsg([...allMsgSpread, allMsg[69]]);
      window.location.href = "#showNewMsg";
    }, 2000);
  };

  const doctorAppiontmentDate = (date) => {
    let allMsg = speakDoc;
    if (date == "") {
      return NotificationManager.error(
        "Appiontment date is required to continue"
      );
    }
    let converDate = moment(date).format("YYYY-MM-DD");
    let DisplayDate = moment(date).format("DD-MM-YYYY");
    console.log(">>>converDate", converDate, date);
    if (converDate == "Invalid date") {
      return NotificationManager.error(
        "Invalid date format,please use the format below"
      );
    }
    setAppiont({
      ...appiont,
      date: converDate,
    });
    let active = speakDocActive;
    const userRes = {
      id: 68,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{DisplayDate}</p>
        </div>,
      ],
      type: "user",
    };
    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    setTimeout(() => {
      setactiveInputValue("");
      setActiveDocMsg(69);
      setSpeakToDocActive([...allMsgSpread, allMsg[69]]);
      window.location.href = "#showNewMsg";
    }, 2000);
  };



  const DOBDate = (date) => {
    console.log(date);
    let allMsg = speakDoc;
    if (date == "") {
      return NotificationManager.error("DOB is required to continue");
    }
    let converDate = moment(date).format("DD-MM-YYYY");
    let DisplayDate = moment(date).format("DD-MM-YYYY");
    if (converDate == "Invalid date") {
      return NotificationManager.error(
        "Invalid date format,please use the format below"
      );
    }
    setAccountInfo({
      ...accountInfo,
      dob: converDate,
    });
    let active = speakDocActive;
    const userRes = {
      id: 13,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{DisplayDate}</p>
        </div>,
      ],
      type: "user",
    };
    setChatInputDisable(true);
    setChatSubmitBtnDisable(true);
    let allMsgSpread = [...active, userRes];
    setSpeakToDocActive(allMsgSpread);
    setTimeout(() => {
      setactiveInputValue("");
      setActiveDocMsg(14);
      setSpeakToDocActive([...allMsgSpread, allMsg[14]]);
      window.location.href = "#showNewMsg";
    }, 2000);
  };

  //hospital date
  const DOBDateHos = (date) => {
    console.log(date);
    let allMsg = appiontmentMsg;
    if (date == "") {
      return NotificationManager.error("DOB is required to continue");
    }
    let converDate = moment(date).format("DD-MM-YYYY");
    let DisplayDate = moment(date).format("DD-MM-YYYY");
    if (converDate == "Invalid date") {
      return NotificationManager.error(
        "Invalid date format,please use the format below"
      );
    }
    setAccountInfo({
      ...accountInfo,
      dob: converDate,
    });
    let active = appiontmentActiveMsg;
    const userRes = {
      id: 13,
      user: [
        <div className="ongoingMsgReplyText">
          {" "}
          <p>{DisplayDate}</p>
        </div>,
      ],
      type: "user",
    };
    setChatInputDisable(true);
    setChatSubmitBtnDisable(true);
    let allMsgSpread = [...active, userRes];
    setappiontmentActiveMsg(allMsgSpread);
    setTimeout(() => {
      setactiveInputValue("");
      setActiveAppiontmentMsg(14);
      setappiontmentActiveMsg([...allMsgSpread, allMsg[14]]);
      window.location.href = "#showNewMsg";
    }, 2000);
  };

  // const bookAppionmentDate = (date) => {
  //   let allMsg = appiontmentMsg;
  //   if (date == "") {
  //     return NotificationManager.error(
  //       "Appiontment date is required to continue"
  //     );
  //   }
  //   console.log(moment(date).format("YYYY-MM-DD"));
  //   let converDate = moment(date).format("YYYY-MM-DD");
  //   let DisplayDate = moment(date).format("DD-MM-YYYY");
  //   if (converDate == "Invalid date") {
  //     return NotificationManager.error(
  //       "Invalid date format,please use the format below"
  //     );
  //   }
  //   setAppiontMentDetails({ ...appiontMentDetails, date: converDate });
  //   let active = appiontmentActiveMsg;
  //   const userRes = {
  //     id: 4,
  //     user: [
  //       <div className="ongoingMsgReplyText">
  //         {" "}
  //         <p>{DisplayDate}</p>
  //       </div>,
  //     ],
  //     type: "user",
  //   };
  //   // setChatInputDisable(true);
  //   // setChatSubmitBtnDisable(true);
  //   let allMsgSpread = [...active, userRes];
  //   setappiontmentActiveMsg(allMsgSpread);
  //   setActiveAppiontmentMsg(7);
  //   setTimeout(() => {
  //     setactiveInputValue("");
  //     setappiontmentActiveMsg([...allMsgSpread, allMsg[7]]);
  //     window.location.href = "#showNewMsg";
  //   }, 1000);
  // };

  return (
    <div>
      <div
        className={`chatbox-container ${
          closeChatBox ? "" : "hideChatBoxOverlay"
        }`}
        onClick={toggleChatBox}
      ></div>

      <div className={`chatbox-main ${closeChatBox ? "" : "hideChatBox"}`}>
        <div className="chatbox-main-inner">
          <div className="chatboxHeader">
            {showMedicationCheckOut ? (
              <div
                className="chatboxHeaderCol1"
                onClick={closeCart}
                style={{ cursor: "pointer" }}
              >
                <BackArrow />
                <p style={{ marginTop: "-5px" }}>Back to Cart</p>
              </div>
            ) : (
              <div className="chatboxHeaderCol1">
                <ChatSvg />
                <p>AskNello</p>
              </div>
            )}
            {showMedicationCheckOut ? (
              ""
            ) : (
              <div className="chatboxHeaderCol2">
                <VerticalDots />
              </div>
            )}
          </div>
          <div className="chatBoxBody checkoutForm">
            {activeTab == "default" ? (
              defaultActiveMsg.length == 0 ? (
                ""
              ) : (
                <DefaultMsg
                  speakDoc={defaultActiveMsg}
                  activeDocMsg={activeDefaultNum}
                  speakDocActive={defaultActiveMsg}
                  allMedication={allMedication}
                  handleBotAcc={handleBotAcc}
                  handleBotAccApp={handleBotAccApp}
                  handleBotAccMed={handleBotAccMed}
                  activeTab={activeTab}
                  handleUserRequest={handleUserRequest}
                />
              )
            ) : (
              ""
            )}

            {activeTab == "speakToDoc" ? (
              <React.Fragment>
                <ChatBotDefaultMsgWithImg
                  handleUserRequest={handleUserRequest}
                  activeTab={activeTab}
                />
                <DoctorMsg
                  speakDoc={speakDoc}
                  activeDocMsg={activeDocMsg}
                  speakDocActive={speakDocActive}
                  handleBotAcc={handleBotAcc}
                  handleBotAccApp={handleBotAccApp}
                  userInfo={accountInfo}
                  // handleUserChange={handleUserChange}
                  handleUserAccountGender={handleUserAccountGender}
                  handleUserAccountGenderHos={handleUserAccountGenderHos}
                  getMoreUserDetails={getMoreUserDetails}
                  getMoreUserDetailsHos={getMoreUserDetailsHos}
                  handleSelectDailyAct={handleSelectDailyAct}
                  setactiveInputValue={setactiveInputValue}
                  activeInputValue={activeInputValue}
                  handleSelecEnergyUnit={handleSelecEnergyUnit}
                  healthEffects={healthEffects}
                  specialization={specialization}
                  getAllSpecalist={getAllSpecalist}
                  doctors={doctors}
                  bookAppiontmentWithDoc={bookAppiontmentWithDoc}
                  activeTab={activeTab}
                  handleUserRequest={handleUserRequest}
                  doctorAppiontmentDate={doctorAppiontmentDate}
                  doctorAppiontmentTime={doctorAppiontmentTime}
                  DOBDate={DOBDate}
                  DOBDateHos={DOBDateHos}
                  setAppiont={setAppiont}
                  appiont={appiont}
                />
              </React.Fragment>
            ) : (
              ""
            )}

            {activeTab == "Medication" ? (
              <React.Fragment>
                <ChatBotDefaultMsgWithImg
                  handleUserRequest={handleUserRequest}
                  activeTab={activeTab}
                />
                <MedicationMsg
                  medicationMsgs={medicationMsgs}
                  activeMedicationMsg={activeMedicationMsg}
                  medicationActiveMsg={medicationActiveMsg}
                  allMedication={allMedication}
                  getMedicationByName={getMedicationByName}
                  getOrder={getOrder}
                  checkoutOrContinue={checkoutOrContinue}
                  handleBotAcc={handleBotAcc}



                  
                 


                  
                />
              </React.Fragment>
            ) : (
              ""
            )}

         
     
            {activeTab == "appiontment" ? (
              <React.Fragment>
                <ChatBotDefaultMsgWithImg
                  handleUserRequest={handleUserRequest}
                  activeTab={activeTab}
                />
                <AppiontmentBot
                  
                  appiontmentMsg={appiontmentMsg}
                  activeAppiontmentMsg={activeAppiontmentMsg}
                  appiontmentActiveMsg={appiontmentActiveMsg}
                  allMedication={allAppiontment}
                  healthCenter={healthCenter}
                  getHealthCenterSelect={getHealthCenterSelect}
                  selectAppiontmentTime={selectAppiontmentTime}
                  bookAppionmentDate={bookAppionmentDate}
                  handleBotAccApp={handleBotAccApp}
                  appiontMentDetails={appiontMentDetails}
                  setappiontmentActiveMsg={setappiontmentActiveMsg}
                  userInfo={accountInfo}
                  DOBDateHos={DOBDateHos}
                  handleUserAccountGenderHos={handleUserAccountGenderHos}
                  handleUserAccountGender={handleUserAccountGender}
                  getMoreUserDetailsHos={getMoreUserDetailsHos}
                  setLoginInfo={setLoginInfo}
                  setSubmitLoginHos={setSubmitLoginHos}
                  medicalcenter={medicalcenter}
                  setMedicalCenter={setMedicalCenter}
                  getAllSpecalistHos={getAllSpecalistHos}
                  bookAppiontmentWithHos={bookAppiontmentWithHos}
                  setAppiont={setAppiont}
                  appiont={appiont}
                  setAppiontMentDetails={setAppiontMentDetails}

                  

                  ///////////////////
            

                  // getMedicationByName={getMedicationByName}
                  // getOrder={getOrder}
                  // checkoutOrContinue={checkoutOrContinue}
                  // handleBotAcc={handleBotAcc}
                />
              </React.Fragment>
            ) : (
              ""
            )}

        
          </div>
          {showMedicationCheckOut ? (
            ""
          ) : (
            <div className="chatBoxInputBox">
              <form>
                <textarea
                  name=""
                  id="focusBotInput"
                  cols="30"
                  rows="10"
                  placeholder="Enter your message..."
                  onChange={(e) => handleBotInputChange(e)}
                  disabled={chatInputDisable}
                  value={activeInputValue}
                ></textarea>
                <div className="chatBoxActionSend">
                  <AttachFileSvg />

                  <button
                    onClick={(e) => handleBotSubmit(e, activeDocMsg)}
                    // disabled={chatSubmitBtnDisable}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
