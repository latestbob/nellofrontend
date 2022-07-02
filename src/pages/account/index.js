import * as React from "react";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import { Currency } from "./../../components";
import AppContext from "../../context";

import PersonalInfo from "./personal-info";
import Billing from "./billing";
import Orders from "./orders";
import ViewOrder from "./viewOrder";
import Appointments from "./appointments";

export default function Browse({ history }) {
  const {
    dispatch,
    getInitials,
    currentPath,
    userData,
    notify,
    errorResponse,
    logoutUser,
  } = React.useContext(AppContext);
  let { path, url } = useRouteMatch();
  let { isExact } = useRouteMatch("/account");

  React.useEffect(() => {
    //history.push('/browse')
    //console.log(path, isExact, 'loginMatch...')
   
  }, []);



  return (
    <>
      <div class="account-badge-container">
        <span class="name-badge">
          <span>{getInitials(userData?.firstname, userData?.lastname)}</span>
        </span>
        <p>
          Hi, {userData?.firstname} {userData?.lastname}
        </p>
      </div>

      <div class="container content-body container-layout">
        <div class="side-container">
          <ul class="menu-side">
            <li>
              <NavLink exact to={`${url}/personal-information`}>
                Personal Information
              </NavLink>
            </li>
            {/* <li>
              <NavLink exact to={`${url}/billing`}>
                Billing
              </NavLink>
            </li> */}
            <li>
              <NavLink exact to={`${url}/my-orders`}>
                My Orders
              </NavLink>
            </li>
            <li>
              <NavLink exact to={`${url}/appointments`}>
                Appointments
              </NavLink>
            </li>
            {/* <li><NavLink exact to={`${url}/health-records`}>Health Records</NavLink></li>
                    <li><NavLink exact to={`${url}/chat-history`}>Chat History</NavLink></li> */}
            <li onClick={() => logoutUser(dispatch, history)}>
              <span>Log Out</span>
            </li>
          </ul>
        </div>
        <div class="main-container">
          <Switch>
            {isExact ? (
              <Route
                exact
                path={path}
                render={(props) => (
                  <Redirect to={`${path}/personal-information`} />
                )}
              />
            ) : (
              <>
                <Route
                  exact
                  path={`${path}/personal-information`}
                  render={() => <PersonalInfo />}
                />
                <Route
                  exact
                  path={`${path}/billing`}
                  render={() => <Billing />}
                />
                <Route path={`${path}/my-orders`} render={() => <Orders path={path} />} />
                <Route path={`${path}/my-order/view/:id`} render={() => <ViewOrder />} />
                <Route
                  path={`${path}/appointments`}
                  render={() => <Appointments />}
                />
              </>
            )}
          </Switch>
        </div>
      </div>
    </>
  );
}
