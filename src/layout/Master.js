import * as React from "react";
import { Link, withRouter, useLocation, useRouteMatch } from "react-router-dom";
import AppContext from "./../context";
import MasterContext from "./context";
import { Currency } from "./../components";
import moment from "moment";
import { Modal } from "react-bootstrap";
import useModal from "../hooks/useModal";
import {
  carts,
  cartRemove,
  cartAdd,
  cartUpdate,
  packages as selectPackages,
} from "./../Services";
import { useQuery, useQueryClient, useMutation } from "react-query";
import Cart from "./../pages/cart";
import CheckOut from "./../pages/checkout";
import Packages from "../pages/packages";
import useScrollPosition from "../hooks/useScrollPosition";
import { hideLoader, showLoader } from "../helper/loader";
import { httpPost } from "../helper/httpMethods";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-datepicker";
import Footer from "./footer";
import ChatBox from "./chatBot/index";
const Master = ({ children, history }) => {
  const queryClient = useQueryClient();
  const {
    dispatch,
    userToken,
    pageTitle,
    baseUrl,
    logoutUser,
    userData,
    errorResponse,
    getCartSessionId,
    cartSessionId,
    cartItems,
    setUserData
  } = React.useContext(AppContext);
  let { pathname, hash } = useLocation();
  let homeMatch = useRouteMatch("/");
  let loginMatch = useRouteMatch("/login");
  let signupMatch = useRouteMatch("/signup");
  let forgotMatch = useRouteMatch("/forgot-password");
  const [cartItemsData, setCartItemsData] = React.useState(null);
  const [cartTotal, setCartTotal] = React.useState(0);
  const [cartItemsCount, setCartItemsCount] = React.useState(0);
  const [cartBackdrop, setCartBackdrop] = React.useState(false);
  const [currentCheckoutIndex, setCurrentCheckoutIndex] = React.useState(null);
  const [allowCheckout, setAllowCheckout] = React.useState(false);
  const scrollPosition = useScrollPosition();
  const [fabless, setFabless] = React.useState(!homeMatch?.isExact);
  const [closeChatBox, setCloseChatBox] = React.useState(false);
  const [AccountOpenSuc, setAccountOpenSuc] = React.useState(false);
  const [botPaymentSuc,setBotPaymentSuc]=React.useState(false)
  const modalPrice = useModal();
  const {
    modalState: mdCartState,
    closeModal: mdCartClose,
    showModal: mdCartShow,
  } = useModal();
  const {
    modalState: mdCheckoutState,
    closeModal: mdCheckoutClose,
    showModal: mdCheckoutShow,
  } = useModal();
  const {
    modalState: mdSignUpState,
    closeModal: mdSignUpClose,
    showModal: mdSignUpShow,
  } = useModal();

  const [accountInfo, setAccountInfo] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    gender: "",
    dob: new Date(),
    weight: "",
    height: "",
  });
  const [dob, setDob] = React.useState(new Date());
  /* Get cart */
  const {
    isLoading: isLoadingCart,
    isFetching: isFetchingCart,
    refetch: refetchCart,
    status: statusCart,
    isError: isErrorCart,
    error: errorCart,
  } = useQuery("cart-items", () => carts(cartSessionId), {
    //retry: 1,
    //refetchOnWindowFocus: true,
    //refetchAllOnWindowFocus: true,
    keepPreviousData: true,
    staleTime: 5000,
    //onError: (error) => errorResponse({ error }),
    onSuccess: (data) => {
      setCartItemsData(data);
      if (data.length > 0) {
        let tt = data.reduce((a, b) => +a + +b.price, 0);
        let tcount = data.reduce((a, b) => +a + +b.quantity, 0);
        setCartTotal(tt);
        setCartItemsCount(tcount);
      }
    },
  });

  /* loading subscription packages */
  const packages = useQuery("packages", selectPackages, { retry: 10 });

  /* Add to cart */
  const { mutate: handleCartAdd } = useMutation((values) => cartAdd(values), {
    onSuccess: () => {
      //notify('success', 'Data Added', 'New data successfully added!');
    },
    onError: (error) => errorResponse({ error, dispatch }),
    onSettled: async () => {
      await queryClient.refetchQueries("cart-items");
      setCartBackdrop(false);
    },
  });

  /* Delete update */
  const { mutate: handleCartUpdate } = useMutation(
    (values) => cartUpdate(values),
    {
      onMutate: async (item) => {
        await queryClient.cancelQueries("cart-items");
        const previousData = await queryClient.getQueryData("cart-items");
        let thisItem = previousData.find((dt) => dt.drug_id === item.drug_id);
        thisItem = { ...thisItem, quantity: item.quantity };
        const newData = previousData.map((dt) =>
          dt.drug_id === item.drug_id ? thisItem : dt
        );
        return queryClient.setQueryData("cart-items", newData);
      },
      onError: (error) => errorResponse({ error }),
      onSettled: async () => {
        await queryClient.refetchQueries("cart-items");
        setCartBackdrop(false);
      },
    }
  );

  /* Delete cart */
  const { mutate: handleCartDelete } = useMutation(
    (values) => cartRemove(values),
    {
      /* onMutate: async (item) => {
            await queryClient.cancelQueries('cart-items');
            let previousData = await queryClient.getQueryData('cart-items');
            const newData = previousData.filter(dt => dt.drug_id !== item.drug_id);
            return queryClient.setQueryData('cart-items', newData);
        }, */
      onError: (error) => errorResponse({ error, dispatch }),
      onSettled: async () => {
        await queryClient.refetchQueries("cart-items");
        setCartBackdrop(false);
      },
    }
  );

  const initCartAdd = (values) => {
    setCartBackdrop(true);
    const cart_uuid = getCartSessionId(dispatch);
    values = { ...values, cart_uuid };
    handleCartAdd(values);
    history.push(`${pathname}#cart`);
  };

  const initCartUpdate = (quantity, drug_id) => {
    //quantity = action ? quantity + 1 : quantity - 1;
    if (quantity < 1) return;
    setCartBackdrop(true);
    const cart_uuid = getCartSessionId(dispatch);
    handleCartUpdate({ drug_id, cart_uuid, quantity });
  };

  const initCartDelete = (drug_id) => {
    setCartBackdrop(true);
    const cart_uuid = getCartSessionId(dispatch);
    handleCartDelete({ drug_id, cart_uuid });
  };

  const initCart = () => {
    mdCartShow();
    mdCheckoutClose();
  };

  const initCheckout = () => {
    if (!userData)
      history.push({
        pathname: "/login",
        state: { from: `${pathname}#checkout` },
      });

    mdCartClose();
    mdCheckoutShow();
  };

  const gotoCheckout = () => {
    history.push(`${pathname}#checkout`);
  };

  const modalSwitch = (hash) => {
    switch (hash) {
      case "#cart":
        initCart();
        break;
      case "#checkout":
      case "#checkout-shipping":
      case "#checkout-payment":
        initCheckout();
        break;
      default:
        mdCartClose();
        mdCheckoutClose();
    }
  };

  const resetPath = () => history.push(pathname);

  const initSubscribe = (index) => {
    modalPrice.closeModal();
    history.push({ pathname: "/subscriptions", state: { package_id: index } });
  };



  const toggleChatBox = () => {
    setCloseChatBox(!closeChatBox);
    // alert(closeChatBox);
  };

  React.useEffect(() => {
    // if(botPaymentSuc==true){
    // toggleChatBox()}
  }, [botPaymentSuc])

  React.useEffect(() => {
    refetchCart();
    modalSwitch(hash);

    return () => {};
  }, [pathname, hash, refetchCart]);

  React.useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  React.useEffect(() => {
    if (pathname === "/") {
      if (scrollPosition > 500) {
        setFabless(true);
      } else {
        setFabless(false);
      }
      //console.log(scrollPosition, 'scrollPosition...')
    } else {
      setFabless(true);
    }
  }, [pathname, scrollPosition]);

  const validate = async () => {
    let errors = [];
    for (let key in accountInfo) {
      if (accountInfo[key] === "" && key !== "javascript") {
        errors.push(key);
        // return;
      }
    }

    if (errors.length) {
      NotificationManager.info(`${errors[0]} field is required.`);
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setAccountInfo({
      ...accountInfo,
      [e.target.name]: e.target.value,
    });

    console.log(accountInfo);
  };

  const handleSubmit = async () => {
    let validated = await validate();
    if (!validated) {
      return;
    }
    let data = accountInfo;
    data["dob"] = moment(dob).format("DD-MM-YYYY");
    showLoader();
    const res = await httpPost(`auth/register`, data);
    if (res) {
      hideLoader();
      if (res.er) {
        hideLoader();
        console.log(res.er.errors);
        let errors = [];
        for (let key in res.er.errors) {
          if (res.er.errors[key] !== "" && key !== "javascript") {
            errors.push(res.er.errors[key]);
          }
        }
        console.log(">>>>>>ERR", errors[0][0]);
        if (errors.length) {
          NotificationManager.info(`${errors[0][0]}.`);
          setAccountOpenSuc(false);
          return false;
        }
      } else {
        setAccountOpenSuc(true);
        NotificationManager.success(`Account successfully created.`);
        setAccountInfo({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          password: "",
          password_confirmation: "",
          gender: "",
          dob: new Date(),
          weight: "",
          height: "",
        });
        // initLogin();
      }
    }
  };
  const initLogin = () => {
    mdSignUpClose();
  };

  // const handleLogin = async () => {
  //   // console.log(loginData);
  //   showLoader();
  //   const res = await httpPost(`auth/login`);
  //   if (res) {
  //     hideLoader();
  //     if (res.er) {
  //       hideLoader();
  //       console.log(res.er.errors);
  //       let errors = [];
  //       for (let key in res.er.errors) {
  //         if (res.er.errors[key] !== "" && key !== "javascript") {
  //           errors.push(res.er.errors[key]);
  //         }
  //       }
  //       console.log(">>>>>>ERR", errors[0][0]);
  //       if (errors.length) {
  //         NotificationManager.info(`${errors[0][0]}.`);
  //         return false;
  //       }
  //     } else {
  //       console.log("res>>>>>", res);
  //       NotificationManager.success(`Welcome back ${res.user.firstname}`);
  //       setLoginData({
  //         email: "",
  //         password: "",
  //       });
  //       initLogin();
  //     }
  //   }
  // };
// React.useEffect(() => {
//  alert(botPaymentSuc)
// }, [])
  return loginMatch || signupMatch || forgotMatch ? (
    children
  ) : (
    <MasterContext.Provider
      value={{
        initCartAdd,
        initCartUpdate,
        currentCheckoutIndex,
        setCurrentCheckoutIndex,
        packages,
        modalPrice,
        botPaymentSuc,
        setBotPaymentSuc,
        toggleChatBox
      }}
    >
      <header>
        <div className="container header container-layout">
          <div className="logo logoMobile">
            <Link to="/">
              <img style={{height:"45px"}} src={`http://asknello.com/assets/images/logo.png`} alt="" />
            </Link>
          </div>

          <ul className="menu">
            <li>
              <Link to="/drugs">
                <span>Drug Store</span>
              </Link>
            </li>

            <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Schedule Appointments
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link class="dropdown-item" to="/doctors">Specialist</Link>
          <Link class="dropdown-item" to="/appointment">Facility</Link>
          
        </div>
      </li>

            {pathname !== "/checkout-completed" && (
              <li className="has-ico">
                <Link to={`${pathname}#cart`}>
                  <div className="sc-box">
                    <div className="sc-counter bg-danger">{!cartItemsData ? "0" : `${cartItemsData.length}`}</div>
                    {/* <img
                      src="http://asknello.com/assets/images/shopping-cart.svg"
                      alt="shopping-cart"
                    /> */}
                  <i class="fa fa-2x fa-shopping-cart" aria-hidden="true"></i>
                  </div>
                  <span>My Cart</span>
                </Link>
              </li>
            )}
            <li className="login-logout">
              <Link to={userToken ? "/account/personal-information" : "/login"}>
                <span>{userToken ? "My Account" : "Login/Signup"}</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>

      <header className="mobile">
        <div className="header">
          <div className="header-left">
            <Link to="/drugs">
              Drug Store
            </Link>

            
          </div>
          <Link to="/">
            <img style={{height:"40px"}} src="http://asknello.com/assets/images/logo.png"alt="" />
          </Link>
          <div
            className="header-right"
            data-toggle="modal"
            data-target=".modal-cart"
          >
            {pathname !== "/checkout-completed" && (
              <Link to={`${pathname}#cart`} className="sc-box">
                <div className="sc-counter bg-danger">{cartItemsCount}</div>
                <img
                  src="http://asknello.com/assets/images/shopping-cart.svg"
                  alt="shopping-cart"
                />
              </Link>
            )}
            {userToken ? (
              <>
                <span className="user-ico">
                  <img
                    src="http://asknello.com/assets/images/user.svg"
                    alt=""
                    height="90%"
                  />

                 
                 

                  <div className="user-ico-dropdown">
                 
                    <Link
                      className="dropdown-link"
                      to={`/account/personal-information`}
                    >
                      Personal Info
                    </Link>
                    {/* <Link className="dropdown-link" to={`/account/billing`}>
                      Billing
                    </Link> */}
                    <Link className="dropdown-link" to={`/account/my-orders`}>
                      My Orders
                    </Link>
                    {/* <Link
                      className="dropdown-link"
                      to={`/account/health-records`}
                    >
                      Health Records
                    </Link> */}
                    <Link
                      className="dropdown-link"
                      to={`/account/appointments`}
                    >
                      Appointments
                    </Link>
                    {/* <Link
                      className="dropdown-link"
                      to={`/account/chat-history`}
                    >
                      Chat History
                    </Link> */}
                    <div
                      onClick={() => logoutUser(dispatch, history)}
                      className="dropdown-link"
                    >
                      Log Out
                    </div>
                  </div>
                </span>
              </>
            ) : (
              <Link to="/login" className="user-ico">
                <img
                  src={`${baseUrl}/assets/images/user.svg`}
                  alt=""
                  height="90%"
                />
              </Link>
            )}
          </div>
        </div>
      </header>
      <div className="opt-mar-top">{children}</div>

      <Footer />

      <div className={`page-fab ${fabless ? "page-fab-less" : ""}`}>
        <div className="fab-container-wrapper">
          <div className="fab-ask-container" onClick={toggleChatBox}>
            <span>
              <img src={`${baseUrl}/assets/images/ico-chat.svg`} alt="" />
            </span>
            {/* <div className="badge">3</div> */}
            <span>AskNello</span>
          </div>
        </div>
{/* 
        <div className="fab-container-wrapper">
          <div className="fab-browse-container">
            <Link to="/browse">
              <span>
                <img src={`${baseUrl}/assets/images/ico-browse.svg`} alt="" />
              </span>
              <span>Browse/Find Services</span>
            </Link>
          </div>
        </div> */}
      </div>

      {/* Modal Price */}
      <Modal
        show={modalPrice.modalState}
        onHide={() => modalPrice.closeModal()}
        animation={false}
        size="xl"
        className="modal-pricing"
        keyboard={false}
        backdrop="static"
      >
        <span
          className="close cursor-pointer"
          onClick={() => modalPrice.closeModal()}
        >
          <i className="fal fa-times"></i>
        </span>

        <div className="container-width-sm text-center text-white">
          <h2 className="font-weight-bold text-white">
            Browse Various Medical/Health Services
          </h2>
          <p className="font-size-md mb-5">
            Select the Best Price that suits you
          </p>
        </div>

        <div className="package-cont">
          {/* <Packages packages={packages} /> */}
          {!packages?.isLoading &&
            !packages?.isError &&
            packages?.data &&
            packages?.data?.length > 0 &&
            packages?.data.map((row, index) => {
              const benefits = row?.benefits;
              return (
                <div key={index} class="ccard-3">
                  <h5>
                    <Currency value={row?.price} /> <span>/month</span>
                  </h5>
                  <h4>{row?.name}</h4>
                  <p>{row?.description}</p>
                  <hr />
                  <ul>
                    {benefits &&
                      benefits?.length > 0 &&
                      benefits.map((rowBenefit, indexBenefit) => (
                        <li key={indexBenefit}>{rowBenefit?.name}</li>
                      ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => initSubscribe(index)}
                    class="btn btn-secondary btn-inverse btn-lg btn-block mt-4"
                  >
                    SELECT PLAN
                  </button>
                </div>
              );
            })}
        </div>
      </Modal>

      {/* Modal cart */}
      <Modal
        show={mdCartState}
        onHide={() => history.push(pathname)}
        animation={false}
        className="right fade modal-cart"
        keyboard={false}
        backdrop="static"
      >
        <Modal.Body>
          <Cart
            pathname={pathname}
            cartItems={cartItemsData}
            cartTotal={cartTotal}
            initCartDelete={initCartDelete}
            initCartUpdate={initCartUpdate}
            cartBackdrop={cartBackdrop}
            isLoadingCart={isLoadingCart}
            isErrorCart={isErrorCart}
            errorCart={errorCart}
            refetchCart={refetchCart}
            isFetchingCart={isFetchingCart}
            initCheckout={initCheckout}
            cartItemsCount={cartItemsCount}
            gotoCheckout={gotoCheckout}
            queryClient={queryClient}
          />
        </Modal.Body>
      </Modal>

      {/* Modal checkout */}
      <Modal
        show={mdCheckoutState}
        onHide={() => history.push(pathname)}
        animation={false}
        className="right fade modal-cart"
        keyboard={false}
        backdrop="static"
      >
        <Modal.Body>
          <CheckOut
            pathname={pathname}
            cartBackdrop={cartBackdrop}
            setCartBackdrop={setCartBackdrop}
            initCheckout={initCheckout}
            hash={hash}
            setCartItemsData={setCartItemsData}
            setCartTotal={setCartTotal}
            setCartItemsCount={setCartItemsCount}
            queryClient={queryClient}
          />
        </Modal.Body>
      </Modal>

      {/* Modal Signup */}
      <Modal
        show={mdSignUpState}
        onHide={mdSignUpClose}
        animation={false}
        keyboard={false}
        size="lg"
        className="modal-signup"
        backdrop="static"
      >
        <button type="button" class="close" onClick={mdSignUpClose}>
          <img src="./assets/images/modal-close.svg" alt="close" />
        </button>

        <Modal.Body>
          <div class="ma-side">
            <div class="ma-side-content">
              <img src="./assets/images/img-ldy.svg" alt="" />
              <img src="./assets/images/logo-w-isp.svg" alt="" />

              <p>
                You need to Sign Up to enjoy the full Services of Ask Nello so
                your tasks can be made easier.
              </p>
            </div>
          </div>

          <div class="ma-main">
            <h5>CREATE AN ACCOUNT</h5>
            <hr />

            <div class="form-group">
              <label>First Name</label>
              <input
                type="text"
                class="form-control"
                name="firstname"
                value={accountInfo.firstname}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>

            <div class="form-group">
              <label>Last Name</label>
              <input
                type="text"
                class="form-control"
                name="lastname"
                value={accountInfo.lastname}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>

            <div class="form-group">
              <label>Email Address</label>
              <input
                type="text"
                class="form-control"
                name="email"
                value={accountInfo.email}
                onChange={handleChange}
                placeholder="Email Address"
              />
            </div>

            <div class="form-group">
              <label>Phone</label>
              <input
                type="text"
                class="form-control"
                name="phone"
                value={accountInfo.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>

            <div class="form-group">
              <label>Birth Date</label>
              <DatePicker
                className="form-control"
                selected={dob}
                onChange={(date) => setDob(date)}
                maxDate={new Date()}
              />
            </div>

            <div class="form-group">
              <label>Gender</label>
              <select
                type="text"
                class="form-control"
                name="gender"
                value={accountInfo.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div class="form-group">
              <label>Weight </label>
              <input
                type="text"
                class="form-control"
                name="weight"
                value={accountInfo.weight}
                onChange={handleChange}
                placeholder="weight"
              />
            </div>

            <div class="form-group">
              <label>Height </label>
              <input
                type="text"
                class="form-control"
                name="height"
                value={accountInfo.height}
                onChange={handleChange}
                placeholder="Height"
              />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                name="password"
                value={accountInfo.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>

            <div class="form-group">
              <label>Confirm Password </label>
              <input
                type="password"
                class="form-control"
                name="password_confirmation"
                value={accountInfo.password_confirmation}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>

            {/* <div class="form-group">
              <label class="form-label display-block">Birth Date</label>
              <div class="row">
                <div class="col-4">
                  <select class="form-control" name="">
                    <option>- Day -</option>
                  </select>
                </div>

                <div class="col-4">
                  <select class="form-control" name="">
                    <option>- Month -</option>
                  </select>
                </div>

                <div class="col-4">
                  <select class="form-control" name="">
                    <option>- Year -</option>
                  </select>
                </div>
              </div>
            </div> */}

            <hr />

            <div class="form-check mb-1">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  name=""
                  id=""
                  value="checkedValue"
                  checked
                />
                I agree to the <u>Terms and Conditions</u>
              </label>
            </div>

            <div class="form-check mb-3">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  name=""
                  value="checkedValue"
                />
                <u>I want health news and updates from Nello</u>
              </label>
            </div>

            <button
              class="btn btn-primary btn-block btn-lg mb-3"
              onClick={handleSubmit}
            >
              Proceed
            </button>

            <div class="text-center">
              <a onClick={initLogin} class="action-link cursor-pointer">
                I already have an account? <span>LOG IN</span>
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <ChatBox
        closeChatBox={closeChatBox}
        setCloseChatBox={setCloseChatBox}
        toggleChatBox={toggleChatBox}
        mdSignUpClose={mdSignUpClose}
        mdSignUpShow={mdSignUpShow}
        AccountOpenSuc={AccountOpenSuc}
        initCartAdd={initCartAdd}
        gotoCheckout={gotoCheckout}
        setUserData={setUserData}
        dispatch={dispatch}
        botPaymentSuc={botPaymentSuc}
        userData={userData}
      />
    </MasterContext.Provider>
  );
};
export default withRouter(Master);
