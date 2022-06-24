import * as React from "react";
import { Link } from "react-router-dom";
import { Currency } from "./../../components";
import AppContext from "../../context";
import MastercardLogo from "../../images/mastercardLogo.svg";

export default function Browse({ history }) {
  const {
    dispatch,
    setQueryString,
    useQueryString,
    currentPath,
    formatDateBr,
    notify,
    errorResponse,
    formatDate,
  } = React.useContext(AppContext);

  return (
    <>
      <div class="page-title">Billing</div>

      <div className="billPage">
        <div className="billPageBox card">
          <div className="page-title billpageHead">Payment Plan</div>
          <div className="billpageItem font-weight-bolder optional-head">
            Family Plan: 4,000/MO.
          </div>
          <div className="billpageItem">
            <div className="font-weight-bold optional-head">Plan Date:</div>
            <div>10/28/21</div>
          </div>
          <div className="billpageItem">
            <div className="font-weight-bold optional-head">Status</div>
            <div>Currently active</div>
          </div>
          <div className="billPageButton">
            <div className="login-logout billbutt">
              <Link>
                <span>Change Plan</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="billPageBox card">
          <div className="page-title billpageHead">Billing Details</div>
          <div className="billpageItem">
            <div className="font-weight-bold optional-head">John Tayo</div>
            <div className="billedit">edit</div>
          </div>
          <div className="billpageItem">
            <div>{`X  X  X  X`}</div>
            <div>{`X  X  X  X`}</div>
            <div>{`X  X  X  X`}</div>
            <div>{`7  8  9  0`}</div>
          </div>
          <div className="billpageItem">
            <img src={MastercardLogo} alt="" />
            <div className="billedit font-weight-bold">12/12</div>
          </div>
          <div className="billPageButton">
            <div className="login-logout billbutt">
              <Link>
                <span>Add New Method</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
