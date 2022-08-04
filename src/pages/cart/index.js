import * as React from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context";
import { Backdrop, Currency, ItemQtyUpdate } from "./../../components";
import { Radio } from "pretty-checkbox-react";
import { cartUploadPresc } from "../../Services";
import { PrescriptionContext } from "../../context/Prescription";

export default function Cart({
  history,
  pathname,
  refetchCart,
  isFetchingCart,
  cartItemsCount,
  gotoCheckout,
  queryClient,
  cartItems,
  cartTotal,
  initCartDelete,
  cartBackdrop,
  isLoadingCart,
  isErrorCart,
  errorCart,
}) {
  const {
    dispatch,
    linkBaseUrl,
    shortStr,
    getCartSessionId,
    errorResponse,
    notify,
    itsArray,
    setRequestPresription,
    prescriptionRequested,
  } = React.useContext(AppContext);
  const {prePrice, setPriPrice} = React.useContext(PrescriptionContext);
  const [uploading, setUploading] = React.useState({
    state: false,
    drug_id: null,
  });
  const [uploaded, setUploaded] = React.useState(false);
  const [allowCheckout, setAllowCheckout] = React.useState(false);
  const [status, setStatus] = React.useState({});
  const [newStatus, setNewStatus] = React.useState(null);
  const [count, setcount] = React.useState(0);
  const [presCharges, setPresCharges] = React.useState(true);

  const [cartslength, setCartslengths] = React.useState(0);
  // const [prePrice , setPriPrice] = React.useState(0);


  React.useEffect(() => {
    console.log('itemscart', cartItems);

    if(cartItems){
      let isPrescription = cartItems.find( (item)=>{

        //if drug prescription is 1
        if ( item?.drug.require_prescription ) { 
          console.log('Needed')
          //setPriPrice(1000);
  
          if(item?.prescription==""){
            setPriPrice(1000)
          }
          


          // else if(item?.prescription != ""){
          //   setPriPrice(0)
          // }
          //   return true;
      }
  
      else {
        console.log('not neeed')
        setPriPrice(0)
        return 0;
      }
  
  
  }
  )
    }

//console.log(isPrescription);

    //END
  }, [cartItems]);


  React.useEffect(() => {
    console.log(status, "status....");
  }, [status]);

  React.useEffect(() => {
    //console.log(prescriptionRequested, 'prescriptionRequested....');
  }, [prescriptionRequested]);

  React.useEffect(() => {
    if (cartItems && itsArray(cartItems) && cartItems.length > 0) {
      const checkPrisc = prescriptionRequested
        ? false
        : cartItems.some(
            (dt) =>
              dt?.drug?.require_prescription === 1 && dt.prescription === ""
          );
      setAllowCheckout(checkPrisc);
      setStatus(
        cartItems
          .filter((dt) => dt?.drug.require_prescription)
          .reduce(
            (o, key) => ({
              ...o,
              [key.drug_id]: {
                id: key.drug_id,
                state: key.prescription ? true : false,
                checked: key.prescription ? true : false,
              },
            }),
            {}
          )
      );
    }
  }, [cartItems, itsArray, prescriptionRequested]);

  const updateStatus = (id, key, value) => {
    let getState = { ...status[id], [key]: value };
    let ns = { ...status, [id]: getState };
    setStatus(ns);
  };

  const setOptions = (e, id) => {
    /* const { value } = e.target;
        updateStatus(id, 'checked', (value === 'true' ? true : value === 'false' ? false : false));
        console.log(id, (value === 'true' ? true : value === 'false' ? false : false), 'setOptions check....'); */
    updateStatus(id, "checked", e);
    console.log(id, e, "setOptions check....");
  };

  const initRequestPrescription = () => {
    setRequestPresription(dispatch, true);
  };

  const processImage = async (event, drug_id) => {
    const file = event.target.files || event.dataTransfer.files;
    const { name, size } = file[0];

    if (size / 1000 >= 1000) {
      notify("danger", "Upload Error", "Document size too big!");
      event.target.value = null;
      return;
    }

    //setUploaded(false);
    //setUploading({ state: true, drug_id });
    updateStatus(drug_id, "state", "uploading");
    const cart_uuid = getCartSessionId(dispatch);

    let formData = new FormData();
    formData.append("file", file[0]);
    formData.append("drug_id", drug_id);
    formData.append("cart_uuid", cart_uuid);
    //formData.append("updated", randomString());

    cartUploadPresc(formData)
      .then((data) => {
        //setUserData(dispatch, token, user);
        //console.log(data, 'file...');
        //setUploaded(true);
        updateStatus(drug_id, "state", true);
      })
      .catch((error) => {
        notify(
          "danger",
          "Upload Error",
          "Document not uploaded, please try again!"
        );
        //errorResponse({ error, exclude: [401, 422] });
      })
      .then(async () => {
        //setUploading({ state: false, drug_id: null });
        event.target.value = null;
        await queryClient.refetchQueries("cart-items");
        //setUploaded(false);
        updateStatus(drug_id, "state", false);
      });
  };

  return (
    <>
      <Backdrop show={Boolean(cartBackdrop || isLoadingCart)} />

      {!isLoadingCart &&
        !isFetchingCart &&
        cartItems &&
        cartItems.length === 0 && (
          <div className="cart-backdrop">
            <Link className="modal-close" to={pathname}>
              <i className="fal fa-times"></i>
            </Link>
            <div className="cart-backdrop-inner-empty">
              <i className="fal fa-frown"></i>
              <p>Cart Seems empty, Continue shopping!!</p>
              <Link
                to="/drugs"
                className="btn btn-secondary btn-sm btn-inverse"
                role="button"
              >
                Go to Store
              </Link>
            </div>
          </div>
        )}

      {!isLoadingCart && !isFetchingCart && isErrorCart && (
        <div className="cart-backdrop">
          <Link className="modal-close" to={pathname}>
            <i className="fal fa-times"></i>
          </Link>
          <div className="cart-backdrop-inner-empty">
            <i className="fal fa-frown"></i>
            <p>There seems to be an error, please retry!!</p>
            <button
              type="button"
              onClick={refetchCart}
              className="btn btn-secondary btn-sm btn-inverse"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {!isLoadingCart && cartItems && cartItems.length > 0 && (
        <>
          <div className="cart-header">
            <Link className="link-ico link-ico-left" to={pathname}>
              <i className="fas fa-chevron-left"></i> Continue Shopping
            </Link>
            <div className="cart-header-action-box">
              <div className="sc-box">
                <div className="sc-counter bg-danger">{cartItemsCount}</div>
                <i className="fal fa-shopping-cart"></i>
                {/* <img src="./assets/images/shopping-cart.svg" alt="shopping-cart" /> */}
              </div>
              <Link to="/account">
                {/* <img src="./assets/images/ico-box.svg" alt="" /> */}
                <i className="fal fa-cube"></i>
              </Link>
            </div>
          </div>

          <div className="cart-container">
            <div className="cart-items-container">
              {cartItems &&
                cartItems.map((item, index) => {
                  let { id, drug_id, price, quantity, drug } = item;
                  return (
                    <div className="cart-item" key={index}>
                      <div className="cart-item-inner">
                        <div className="cart-item-img-box">
                          <img
                            src={
                              drug?.image ||
                              `https://www.gimplearn.net/funimage.php?q=${drug?.name
                                ?.split(" ")
                                .join("_")}`
                            }
                            alt={drug?.name}
                          />
                        </div>
                        <div className="cart-item-content">
                          <div className="cic-1">{drug?.name}</div>
                          <div className="cic-2">
                            Total: <Currency value={drug?.price} />
                          </div>
                          <div className="cart-item-action-box">
                            <div className="cart-item-vol">
                              <ItemQtyUpdate
                                quantity={quantity}
                                drug_id={drug_id}
                              />
                            </div>
                            <div
                              className="cart-item-del"
                              onClick={() => initCartDelete(drug_id)}
                            >
                              <i className="fal fa-trash"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      {drug?.require_prescription === 1 && (
                        <div className="cart-presc-box">
                          <h6 className="text-danger mb-2">
                            This Medication requires Prescription!
                          </h6>
                          <p className="text-secondary">
                            Do you have a prescription for this medication?
                          </p>
                          <div className="mb-3">
                            <div>
                              <Radio
                                color="primary-o"
                                onClick={(e) => setOptions(true, drug_id)}
                                value={true}
                                defaultChecked={status[drug_id]?.checked}
                                name={`prescription-option-${drug_id}`}
                              >
                                Yes
                              </Radio>

                              <Radio
                                color="primary-o"
                                onClick={(e) => setOptions(false, drug_id)}
                                value={false}
                                defaultChecked={!status[drug_id]?.checked}
                                name={`prescription-option-${drug_id}`}
                              >
                                No
                              </Radio>
                            </div>
                          </div>

                          {!status[drug_id]?.checked && (
                            <div className="mb-3">
                              <div className="btn-wrapper">
                                <button
                                  type="button"
                                  onClick={initRequestPrescription}
                                  className={`btn btn-secondary ${
                                    !prescriptionRequested && `btn-inverse`
                                  }`}
                                >
                                  {prescriptionRequested
                                    ? "Prescription Requested"
                                    : "Request Prescription"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => initCartDelete(drug_id)}
                                  className="btn btn-danger btn-inverse"
                                >
                                  Remove Item
                                </button>
                              </div>

                              <div className="cpb-info">
                                You would be charged a one-time payment of
                                ₦1,000 as Prescription Fee for this medication.
                              </div>

                              {/* {cartItems.length > 1 ? 
                                <div className="badge badge-info py-1"> Scrollable  </div>  :
                                <div></div>
                            } */}
                            </div>
                          )}

                          {status[drug_id]?.checked && (
                            <>
                              <div className="cpb-uploader">
                                {!status[drug_id]?.state && !item.prescription && (
                                  <div className="cpbu-empty">
                                    <i className="fal fa-arrow-from-bottom"></i>{" "}
                                    Click here to upload Prescription, formats - png|jpeg|jpg|pdf
                                  </div>
                                )}
                                {status[drug_id]?.state === "uploading" && (
                                  <div>uploading, please wait...</div>
                                )}
                                {status[drug_id]?.state !== "uploading" &&
                                  (status[drug_id]?.state === true ||
                                    item.prescription) && (
                                    <div className="cpb-placeholder">
                                      <img
                                        src={linkBaseUrl(
                                          "assets/images/file.svg"
                                        )}
                                        alt=""
                                      />
                                      <span>
                                        {shortStr("prescription.jpg")}
                                      </span>
                                      {/* <span>(453KB)</span> */}
                                      <i className="fal fa-trash"></i>
                                    </div>
                                  )}
                                <input
                                  onChange={(e) => processImage(e, drug_id)}
                                  accept="image/jpeg, image/png"
                                  type="file"
                                  tabIndex="-1"
                                  disabled={
                                    uploading?.drug_id === drug_id &&
                                    uploading.state
                                  }
                                />
                              </div>
                              <div className="cpb-info">
                                Kindly note that verifying your prescription
                                might slow down the delivery process.
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            <div className="cart-footer">
                     {cartItems && cartItems.length > 1 ? 
                                <div className="badge badge-info py-1"> Scrollable  </div>  :
                                <div></div>
                            }

                            
              <div className="cart-summary-container">

                
                <div>
                  <h5>Subtotal</h5>
                  <span>Prescription fee, shipping and tax not included yet </span>
                </div>
                <div>
                  <Currency value={cartTotal} />
                </div>
              </div>

              <button
                onClick={gotoCheckout}
                disabled={allowCheckout}
                className="btn btn-secondary btn-block btn-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
