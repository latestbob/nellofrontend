import React, { useState } from "react";
const Checkoutmed = () => {
  const [activeChkTab, setActiveChkTab] = useState("tab1");
  const handleCheckOutStage = (e, tab) => {
    e.preventDefault();
    setActiveChkTab(tab);
  };
  return (
    <div className="checkOutWrapMain">
      <div className="checkoutStage">
        <div className="stageCol1">
          <div className="circleCrapstageCol1 huopbotRes">
            <div
              className="activeMediChek"
              style={
                activeChkTab == "tab1"
                  ? {}
                  : { backgroundColor: "rgba(14, 86, 118, 0.45)" }
              }
            ></div>
          </div>
          <div className="circleCrapstageCol2">Shipping</div>
        </div>

        <div className="stageCol2"></div>

        <div className="stageCol1">
          <div className="circleCrapstageCol1">
            <div
              className="activeMediChek"
              style={
                activeChkTab == "tab2"
                  ? {}
                  : { backgroundColor: "rgba(14, 86, 118, 0.45)" }
              }
            ></div>
          </div>
          <div className="circleCrapstageCol2">Method</div>
        </div>

        <div
          className="stageCol2"
          style={
            activeChkTab == "tab2"
              ? {}
              : { backgroundColor: "rgba(14, 86, 118, 0.45)" }
          }
        ></div>

        <div className="stageCol1">
          <div className="circleCrapstageCol1">
            <div
              className="activeMediChek "
              style={
                activeChkTab == "tab3"
                  ? {}
                  : { backgroundColor: "rgba(14, 86, 118, 0.45)" }
              }
            ></div>
          </div>
          <div className="circleCrapstageCol2">Payment</div>
        </div>
      </div>

      {activeChkTab == "tab1" ? (
        <form action="" className="billingAddreess">
          <div className="billingAddreessHeader">
            <h2>Shipping Address</h2>
          </div>

          <div className="shipingInputWrap">
            <label htmlFor="">First Name</label>
            <input type="text" />
          </div>
          <div className="shipingInputWrap">
            <label htmlFor="">Last Name</label>
            <input type="text" />
          </div>

          <div className="shipingInputWrap">
            <label htmlFor="">Street</label>
            <input type="text" />
          </div>
          <div className="shipingInputWrap">
            <label htmlFor="">City</label>
            <input type="text" />
          </div>
          <div className="shipingInputWrap">
            <label htmlFor="">ZIP Code</label>
            <input type="text" />
          </div>

          <div className="shipingInputWrap">
            <label htmlFor="">State</label>
            <input type="text" />
          </div>

          <div className="shipingInputWrap">
            <label htmlFor="">Country</label>
            <input type="text" />
          </div>

          <div className="shipingInputWrap">
            <label htmlFor="">Phone Number</label>
            <input type="text" />
          </div>

          <div className="drugTotalBot">
            <div className="drugTotalBotCol1">
              <p>Order Total</p>
              <h2>₦5,200</h2>
            </div>

            <div className="drugTotalBotCol2">
              <button onClick={(e) => handleCheckOutStage(e, "tab2")}>
                Proceed to Shipping
              </button>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}

      {activeChkTab == "tab2" ? (
        <form action="" className="billingAddreess">
          <div className="billingAddreessHeader">
            <h2>Delivery Method</h2>
          </div>
          <br />

          <div className="reciverDrugDe">
            <h2>Adebayo Tomi</h2>
            <p>No 22, Johnson Street, Ikeja, Lagos, Nigeria.</p>
          </div>

          <form action="" className="DeliverymethodBt">
            <div className="checkoutRadiontab2">
              <div className="absdbotcol1">
                <input
                  type="radio"
                  id="css"
                  name="fav_language"
                  value="The user might select C"
                  // onChange={handleSelectDailyAct}
                />
                <label for="css">Door Delivery</label>
              </div>

              <div className="absdbotcol2">
                <p>Delivered Thurs 15 Apr within 2hrs 56m 37s for ₦ 1,000</p>
              </div>
            </div>

            <div className="checkoutRadiontab2">
              <div className="absdbotcol1">
                <input
                  type="radio"
                  id="css"
                  name="fav_language"
                  value="The user might select C"
                  // onChange={handleSelectDailyAct}
                />
                <label for="css">Pick Up Center (Free)</label>
              </div>
            </div>
          </form>
          <br />

          <div className="drugTotalBot">
            <div className="drugTotalBotCol1">
              <p>Order Total</p>
              <h2>₦5,200</h2>
            </div>

            <div className="drugTotalBotCol2">
              <button onClick={(e) => handleCheckOutStage(e, "tab3")}>
                Proceed to Payment
              </button>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}

      {activeChkTab == "tab3" ? (
        <form action="" className="billingAddreess">
          <div className="billingAddreessHeader">
            <h2>Payment</h2>
          </div>

          <form action="" className="DeliverymethodBt">
            <div className="checkoutRadiontab2">
              <div className="absdbotcol1">
                <input
                  type="checkbox"
                  id="css"
                  name="fav_language"
                  value="The user might select C"
                  // onChange={handleSelectDailyAct}
                />
                <label for="css">
                  My billing and shipping address are the same
                </label>
              </div>

              <div className="absdbotcol2">
                <p>
                  Adebayo Tomi - No 22, Johnson Street, Ikeja, Lagos, Nigeria.
                </p>
              </div>
            </div>
          </form>

          <div className="curponChkCode">
            <p>Enter Coupon Code</p>
            <form action="" className="CurponFormBot">
              <input type="text" />
              <button>Apply</button>
            </form>
          </div>

          <div className="billingAddreessHeader" style={{ marginTop: "20px" }}>
            <h2>Summary</h2>
          </div>

          <div className="drugPaySum">
            <p>Subtotal</p>
            <p>₦5,200</p>
          </div>

          <div className="drugPaySum">
            <p>Delivery</p>
            <p>₦5,200</p>
          </div>

          <div className="drugPaySum">
            <p>V.A.T (7.5%)</p>
            <p>₦5,200</p>
          </div>

          <div className="drugPaySum">
            <p>Order total</p>
            <p>₦5,200</p>
          </div>

          <div className="drugTotalBot">
            <div className="drugTotalBotCol1">
              <p>Order Total</p>
              <h2>₦5,200</h2>
            </div>

            <div className="drugTotalBotCol2">
              <button onClick={(e) => handleCheckOutStage(e, "tab3")}>
                Check Out Now
              </button>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default Checkoutmed;
