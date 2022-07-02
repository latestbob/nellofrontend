import React, { useEffect, useState } from "react";
import nelloImg from "../../../images/nello.png";
import Typed from "react-typed";
import doc from "../../../images/doc.png";
import rate from "../../../images/rate.png";
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
  medicationActiveMsg,
}) => {
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
        <div className={`msgBotUserReply msgBotUserReplyRev`} key={index}>
          <div className="botDefaultMsgCol1 huopbotRes">
            <img src={nelloImg} alt="" />
          </div>
          <div className="incomingMsgWrap">
            {data}

            {id == 1 && index == 0 ? (
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
                            style={{ width: "100%" }}
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

            {id == 4 && index == 1 ? (
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

            {id == 8 && index == 0 ? (
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
            )}

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
const MedicationMsg = ({
  medicationMsgs,
  activeDocMsg,
  speakDocActive,
  allMedication,
  getMedicationByName,
  getOrder,
  checkoutOrContinue,
  handleBotAcc,
  medicationActiveMsg,
}) => {
  useEffect(() => {
    console.log("medicationActiveMsg", medicationActiveMsg);
  }, [medicationActiveMsg]);

  return (
    <div>
      {medicationActiveMsg.map((MainData, index) => {
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
                  medicationActiveMsg={medicationActiveMsg}
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

export default MedicationMsg;

