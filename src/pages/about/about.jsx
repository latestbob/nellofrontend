import * as React from "react";
import { Link } from "react-router-dom";
import "./index.css";
export default function Browse() {
  return (
    <>
      <section className="bg-sky-light">
        <div className="container section">
          <div className="product-hero appPadding" style={{ height: "270px" }}>
            <h2> ABOUT NELLO</h2>
            <p>
              {/* PLEASE READ THESE TERMS AND CONDITIONS OF USE CAREFULLY BEFORE <br />
          USING OUR MOBILE DEVICE SERVICE AND RELATED WEBSITE. */}
            </p>
          </div>

          <div id="ermsBody" className=" appPadding">
            <h2 className="ermsBodyH2">ABOUT NELLO</h2>
            <p style={{
              textAlign:'justify'
            }}>
            AskNello is an integrative healthcare platform that serves as an online medical assistant, partnering with various players in the health sector to provide personalised healthcare services to customers. AskNello aggregates the health data of customers and gives them access to health providers, helping them make decisions on their healthcare needs and giving them information on their health history.
            </p>

            <br/>

            <h2 className="ermsBodyH2">OUR MISSION</h2>

            <p style={{
              textAlign:'justify'
            }}>
            Our mission is to give everyone control of their health by arming them with the information and tools they need to make the best decision for their wellbeing. We do this by leveraging partnerships with pharmacies and other health institutions to deliver quality healthcare services. Some of the services include access to medical records and history, prescription and over-the-counter drug sales, access to medical specialists, health tips and recommendations, etc. Incorporated in July 2020, our technology and processes are well designed to provide excellent industry-standard healthcare on the go for our users.

            </p>
          </div>
        </div>
      </section>
    </>
  );
}
