import * as React from "react";
import { Link } from "react-router-dom";
import AppContext from "./../context";

export default function Browse({ history }) {
  const { dispatch, baseUrl } = React.useContext(AppContext);
  return (
    <footer>
      <div class="container footer container-layout">
        <div class="row">
          <div class="col-lg-3 col-md-3 col-md-6 col-sm-6">
            <h3>
              <img src={`${baseUrl}assets/images/logo-inverse.svg`} alt="" />
            </h3>
            <p>Hi, I am Nello, your personal healthcare assistant.</p>
            {/* <div class="social-set">
              <a href="http://instagram.com" target="_blank" rel="noreferrer">
                <img
                  src={`${baseUrl}assets/images/ico-instagram.svg`}
                  alt="instagram"
                />
              </a>
              <a href="http://facebook.com" target="_blank" rel="noreferrer">
                <img
                  src={`${baseUrl}assets/images/ico-facebook.svg`}
                  alt="instagram"
                />
              </a>
              <a href="http://twitter.com" target="_blank" rel="noreferrer">
                <img
                  src={`${baseUrl}assets/images/ico-twitter.svg`}
                  alt="twitter"
                />
              </a>
              <a href="http://youtube.com" target="_blank" rel="noreferrer">
                <img
                  src={`${baseUrl}assets/images/ico-youtube.svg`}
                  alt="youtube"
                />
              </a>
            </div> */}
          </div>

          <div class="col-lg-3 col-md-3 col-md-6 col-sm-6">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/drugs">Order Medication</a>
              </li>
              <li>
                <Link to="/about">About Ask Nello</Link>
              </li>
              {/* <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li> */}
            </ul>
          </div>

          <div class="col-lg-3 col-md-3 col-md-6 col-sm-6">
            <h3>Reach us</h3>
            <ul class="has-ico">
              <li class="message">
                <a href="mailto:hello@asknello.com">hello@asknello.com</a>
              </li>
              <li class="mobile">
                <a href="tel:+2349070041292">+234 90700 41292</a>
              </li>
              <li class="location">
                <a href="#">
                  7a, Milverton Road,
                  <br />
                  Ikoyi Lagos
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-3 col-md-6 col-sm-6">
            <h3>Stay up to date</h3>
            <form>
              <div class="form-group">
                <input
                  type="email"
                  name="newsletter-email"
                  class="form-control newsletter-email"
                  placeholder="Your email address"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container py-4">
          <div class="row">
            <div class="col-md-6">© 2021 AskNello. All rights reserved</div>
            <div class="col-md-6 text-md-right footer-inline">
              <a href="/terms_and_conditions">Terms & Conditions</a>
              <a href="/privacy_policy">Privacy Policy</a>
              {/* <a href="#">Sitemap</a>
              <a href="#">Disclaimer</a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
