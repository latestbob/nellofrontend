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
        <p>I want to book an appiontment</p>
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
        <p> Please select medical center </p>
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
    user: [
      <div className="ongoingMsgReplyText">
        {" "}
        {/* <p>I’ dont have an acccount</p> */}
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
    id: 3,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      //   <div className="incomingMsgWrapMain">
      //     {" "}
      //     <p>Your order has been added to cart</p>
      //   </div>,
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Provide your reason for the appointment</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },
  {
    id: 4,
    interval: 500,
    nextIndex: 1,
    user: [
      <div className="ongoingMsgReplyText">
        {" "}
        {/* <p>I’ dont have an acccount</p> */}
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
    id: 5,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Please input a date for appointment</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 6,
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
    id: 7,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Please select a time for the appiontment</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },

  {
    id: 8,
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
    id: 9,
    interval: 500,
    nextIndex: 1,
    user: [],
    userReject: [],
    bot: [
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Booking appiontment</p>
      </div>,
      <div className="incomingMsgWrapMain">
        {" "}
        <p>Please Wait</p>
      </div>,
    ],
    botReject: [],
    type: "bot",
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
        <p style={{ color: "green" }}> Appiontment booked successfully</p>
      </div>,
      //   <div className="incomingMsgWrapMain">
      //     {" "}
      //     <p>Still have </p>
      //   </div>,
    ],
    botReject: [],
    type: "bot",
    yes: [],
    no: [],
  },
];
