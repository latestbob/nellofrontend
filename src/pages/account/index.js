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
import "./account.css";


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

        <hr/>


     

       <div className="hideonmobile">
       <p style={{
          fontSize:"15px",
          paddingTop:"30px"
        }}>Quick Actions</p>

        <div className="col-10 m-auto pt-3">
            <div className="row">
            <div className="col-4">
                <Link to="/doctors" className="btn btn-primary">Schedule a doctor consultation</Link>
            </div>

            <div className="col-4">
                <Link to="/appointment" className="btn btn-primary">Schedule a hospital visit</Link>
            </div>

            <div className="col-4">
                <Link to="/drugs" className="btn btn-primary">Order Medications</Link>
            </div>
            </div>
        </div>
       </div>
      </div>


      <div  className="onMobileView">
      <p className="text-center">

<button style={{
  background:"#1997cf",
  color:"white"
}} class="btn btn-sm  col-8 py-2 mt-3" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
  Quick Actions
</button>
</p>
<div class="collapse" id="collapseExample">
<div class="card card-body">
  <ul className="text-center">
    <li>   <Link style={{
      background:"none",
      color:"black",
      textAlign:"center",
    }} to="/doctors" className="btn btn-primary">Schedule a doctor consultation</Link></li> 

    <Link style={{
      background:"none",
      color:"black",
      textAlign:"center",
    }} to="/appointment" className="btn btn-primary">Schedule a hospital visit</Link><br/>

    <Link style={{
      background:"none",
      color:"black",
      textAlign:"center",
    }} to="/drugs" className="btn btn-primary">Order Medications</Link>
  </ul>
</div>
</div>

      </div>


      <div class="container content-body container-layout">
        <div class="side-container">
        
           
{/*             
                <p className="font-weight-bold text-center">Quick Actions</p>
              
          
                <ul class="menu-side">
            <li className="font-weight-bold">
              <NavLink exact to="/doctors">
                Speak To A Doctor
              </NavLink>
            </li>

            <li className="font-weight-bold">
              <NavLink exact to="/appointment">
                Schedule Hospital Appointments
              </NavLink>
            </li>

            <li className="font-weight-bold">
              <NavLink exact to="/drugs">
                Order Medications
              </NavLink>
            </li>

          </ul> */}
            
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
