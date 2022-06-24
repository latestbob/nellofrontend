import React, { useEffect, useState } from "react";
import Typed from "react-typed";
import nelloImg from "../../images/nello.png";
import BotOptions from "./chatBotDefaultMsg";
export const RenderBotMsg = ({
  data,
  index,
  id,
  allMedication,
  getMedicationByName,
  getOrder,
  checkoutOrContinue,
  handleBotAcc,
  activeTab,
  handleUserRequest,
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
      window.location.href = "#showNewMsg";
    }, 1800 * index);
  }, []);

  return (
    <>
      {show && (
        <div className={`msgBotUserReply msgBotUserReplyRev`} key={index}>
          <div className="botDefaultMsgCol1 huopbotRes">
            <img src={nelloImg} alt="" />
          </div>
          <div className="incomingMsgWrap">
            {data}

            {id == 0 && index == 3 ? (
              <BotOptions
                handleUserRequest={handleUserRequest}
                activeTab={activeTab}
              />
            ) : (
              ""
            )}
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
const DoctorMsg = ({
  medicationMsgs,
  activeDocMsg,
  speakDocActive,
  allMedication,
  getMedicationByName,
  getOrder,
  checkoutOrContinue,
  handleBotAcc,
  activeTab,
  handleUserRequest,
}) => {
  useEffect(() => {
    console.log("speakDocActive", speakDocActive);
  }, [speakDocActive]);

  return (
    <div>
      {speakDocActive.map((MainData, index) => {
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
                  activeTab={activeTab}
                  handleUserRequest={handleUserRequest}
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
