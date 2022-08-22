import React from "react";
import nelloImg from "../../images/nello.png";
import nelloOp1 from "../../images/nelloOp1.png";
import nelloOp2 from "../../images/nelloOp2.png";
import nelloOp3 from "../../images/nelloOp3.png";
import nelloOp4 from "../../images/nelloOp4.png";

import { NotificationManager } from "react-notifications";
const ChatBotDefaultMsg = ({ handleUserRequest, activeTab }) => {
  return (
    <div>
      <div className="botDefaultMsg">
        <div className="botDefaultMsgCol1">
          <img src={nelloImg} alt="" />
        </div>
        <div className="botDefaultMsgCol2" style={{ paddingLeft: "17px" }}>
          <div className="askNelloOptions">
            <div
              className="askNelloOptionsGrid"
              onClick={() => handleUserRequest("speakToDoc")}
            >
              <img src={nelloOp1} alt="" />
              <p>Help me schedule a Doctor's appointment</p>
            </div>

            <div
              className="askNelloOptionsGrid"
              onClick={() => handleUserRequest("Medication")}
            >
              <img src={nelloOp2} alt="" />
              <p>I want to order Medication</p>
            </div>

            <div
              className="askNelloOptionsGrid"
              onClick={() => handleUserRequest("appiontment")}
            >
              <img src={nelloOp3} alt="" />
              <p>Help me Schedule a Hospital Appointment</p>
            </div>

            {/* <div
                  className="askNelloOptionsGrid"
                  onClick={() =>
                    NotificationManager.info("Service temporally down")
                  }
            >
              <img src={nelloOp4} alt="" />
              <p>I want Health & Fitness Tips</p>
            </div> */}

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotDefaultMsg;
