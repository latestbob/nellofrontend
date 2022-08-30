var myDate = new Date();
var hrs = myDate.getHours();

var greet;

if (hrs < 12) greet = "Good Morning";
else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon";
else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";
export const appiontmentMsg = [
  {
    id: 0,
    interval: 500,
    nextIndex: 1,
    user: [
      <div className="ongoingMsgReplyText">
        {" "}
        <p>I’d like to Schedule a Hospital Appointment</p>
      </div>,
    ],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },
  {
    id: 1,
    interval: 500,
    nextIndex: 1,
    user: [],
    botReject: [],
    bot: [
     
      <div className="incomingMsgWrapMain">
        <p> Do you have an account with us? </p>
      </div>,
      <div className="incomingMsgWrapMain">
        <p>Please click on the button to continue</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },



  {
    id: 2,
    interval: 500,
    nextIndex: 1,
    user: [],
    botReject: [],
    bot: [],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },
  {
    id: 3,
    interval: 500,
    nextIndex: 1,
    user: [
      <div className="ongoingMsgReplyText">
        {" "}
        <p>I’ dont have an acccount</p>
      </div>,
      <div className="ongoingMsgReplyText">
        {" "}
        <p>Please create an account for me</p>
      </div>,
    ],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },
  {
    id: 4,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Nice! Let's jump in</p>
      </div>,
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Please input your first name</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 5,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 6,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Please input your last name</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 7,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 8,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Please input your email</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 9,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },
  {
    id: 10,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Please input your phone number</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },
  {
    id: 11,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },
  {
    id: 12,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Please input your date of birth</p>
      </div>
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 13,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },
  {
    id: 14,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Please select your gender</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 15,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 16,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Please input a password </p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 17,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 18,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        {" "}
        <p>What a password that is </p>
      </div>,
      <div className="incomingMsgWrapMain">
        <p>Thats all for now.</p>
      </div>,

      <div className="incomingMsgWrapMain">
        <p>Give me a sec to setup an account for you</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 19,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>I gueess that email has been used plz try another email </p>
      </div>,

      <div className="incomingMsgWrapMain">
        <p>Enter another email </p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 20,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 21,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>On it</p>
      </div>,

      <div className="incomingMsgWrapMain">
        <p>Give me a sec to retry </p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 22,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>Phone number has been used by another user</p>
      </div>,

      <div className="incomingMsgWrapMain">
        <p>Input phone number</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 23,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 24,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>On it</p>
      </div>,

      <div className="incomingMsgWrapMain">
        <p>Give me a sec to retry </p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 25,
    interval: 500,
    nextIndex: 1,
    user: [
      <div className="ongoingMsgReplyText">
        {" "}
        <p>Yes i have an account</p>
      </div>,
      // <div className="ongoingMsgReplyText">
      //   {" "}
      //   <p>Please create an account for me</p>
      // </div>,
    ],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 26,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>Ok, let's see</p>
      </div>,

      <div className="incomingMsgWrapMain">
        <p>Please input your email address</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 27,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 28,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>Input password</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 29,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 30,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>Give me a sec to process</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 31,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>Invalid Login details</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 32,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>Great! I’ll connect you to a medical center shortly.</p>
      </div>,
      <div className="incomingMsgWrapMain">
        <p>
          {" "}
          I will need you to provide your preferred appointment date and time
        </p>
      </div>,

      <div className="incomingMsgWrapMain">
        <p>
        Be rest assured that the information provided will be handled with the utmost confidentiality.
        </p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },
  {
    id: 33,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },
  {
    id: 34,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>
          What is your height? <span>Indicate in feet(ft) e.g 5’ 6</span>
        </p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 35,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 36,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>
          Interesting! And What is your weight? <span>Indicate e.g 65kg</span>
        </p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 37,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 38,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>How many times in a week do you plan on exercising?</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 39,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 40,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>How many minutes  a day do you plan on exercising?</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },
  {
    id: 41,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 42,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>How would u best describe ur normal daily activities?</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },
  {
    id: 43,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },
  {
    id: 44,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>What are your health interest</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 45,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },
  {
    id: 46,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>Please input your sleep goal?</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },
  {
    id: 47,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },
  {
    id: 48,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p> Please input your weight goal?</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },
  {
    id: 49,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },
  {
    id: 50,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>How do you want to track your unit of energy?</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 51,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 52,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>Do you currently suffer from any allergies?</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },
  {
    id: 53,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>Please provide more information if necessary</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 54,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 55,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>Have you been diagnosed with any medical conditions?</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 56,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>
          Please provide more information, including diagnosis, symptoms and
          treatment.{" "}
        </p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 57,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 58,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>Are you currently taking any medication? </p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 59,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>Please provide more information if necessary</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },
  {
    id: 60,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 61,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>Saving fitness</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 62,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>
          What type of medical center  do you want me to help you find?
        </p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 63,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },
  {
    id: 64,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [<div className="incomingMsgWrapMain"></div>],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 65,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        <p>Please input why you wish to visit the Medical Center.</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },
  {
    id: 66,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [<div className="incomingMsgWrapMain"></div>],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 67,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Please select a preferred date for your appointment</p>
      </div>,
      
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 68,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  
  {
    id: 69,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Please input your preferred time for the appointment, <br/>preferrably 30mins after the current time</p>
      </div>
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 70,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },

  {
    id: 71,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Checking appiontment</p>
      </div>,
      ,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 72,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [],
    botReject: [],
    type: "user",
    yes: [],
    no: [],
  },


  {
    id: 73,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      

      <div className="incomingMsgWrapMain">
        <p>Proceed to payment to complete process</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },




];
