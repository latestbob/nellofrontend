import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../../context';
import MasterContext from '../../layout/context';
import { Currency, Backdrop } from './../../components';
import {
    checkout, checkoutSummary,
    locations as selectLocation, pickupLocations as selecPickupLocations
} from '../../Services';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useForm } from "react-hook-form";
import useFormState from './../../hooks/useFormState';

import Delivery from './delivery';
import Shipping from './shipping';
import Payment from './payment';
import { PrescriptionContext } from "../../context/Prescription";
import { NotificationManager } from "react-notifications";

export default function Checkout({ pathname, cartBackdrop, setCartBackdrop, hash,
    setCartItemsData, setCartItemsCount, setCartTotal, queryClient }) {
    let history = useHistory();
    const { dispatch, getCartSessionId, errorResponse, userData, randomString, notify, prescriptionRequested } = React.useContext(AppContext);
    const { currentCheckoutIndex, setCurrentCheckoutIndex,botPaymentSuc,setBotPaymentSuc } = React.useContext(MasterContext);
    const [locations, SetLocations] = React.useState([]);
    const [pickupLocations, setPickupLocations] = React.useState([]);
    const [checkoutRequest, setCheckoutRequest] = React.useState({
        delivery_method: 'shipping',
        delivery_type: 'same_day',
    });
    const [summary, setSummary] = React.useState({});
    const [summaryError, setSummaryError] = React.useState(false);
    const [checkoutError, setCheckoutError] = React.useState(false);
    const [paymentRef, setPaymentRef] = React.useState({});

    const {prePrice, setPriPrice} = React.useContext(PrescriptionContext);
    // const [paymentConfig, setPaymentConfig] = React.useState({
    //     publicKey: "pk_test_02ce7d4340336726886f879f63b3b5fd13988f34"
    // });

    const [paymentConfig, setPaymentConfig] = React.useState([]);

    const { toggleFormState: tsDelivery } = useFormState('form-delivery');
    const { toggleFormState: tsCoupon } = useFormState('form-apply-coupon');

    /* Locations */
    useQuery('select-locations', selectLocation, {
        onError: (error) => SetLocations([]),
        onSuccess: (data) => SetLocations(data),
    });

    /* Pickup locations */
    useQuery('select-pickup-locations', selecPickupLocations, {
        onError: (error) => setPickupLocations([]),
        onSuccess: (data) => setPickupLocations(data),
    });

    const { mutate: submitCheckout } = useMutation(values => checkout({ ...values, ...checkoutRequest }), {
        onSuccess: ({ order }) => {
            // alert(5)
            setBotPaymentSuc(true)
           
             history.push({ pathname: '/checkout-completed', state: { order } });
        },
        onError: (error) => {
            //errorResponse({ error, dispatch });
            setBotPaymentSuc(false)
            setCheckoutError(true);
        },
        onSettled: async () => {
            setCartBackdrop(false);
            resetCheckout();
            localStorage.removeItem(process.env.REACT_APP_CART_SESSION_ID);
            localStorage.removeItem(process.env.REACT_APP_USER_PRESC);
            /* setCartItemsData({});
            setCartTotal(0);
            setCartItemsCount(0); */
            await queryClient.refetchQueries('cart-items');
        },
    });

    const resetCheckout = () => {
        setSummary({});
        setCheckoutRequest({});
        setSummaryError(false);
        initPaymentConfig();
    }

    /* get checkout summary */
    const { mutate: submitCheckoutSummary } = useMutation(values => checkoutSummary(values), {
        onSuccess: (data) => {
            setSummaryError(false);
            setSummary(data)
            initCheckoutPage('#checkout');
        },
        onError: (error) => {
            const getError = errorResponse({ error, dispatch, exclude: [422] });
            if (getError)
                history.push(`${pathname}#cart`);
            else
                setSummaryError(true);
        },
        onSettled: async () => setCartBackdrop(false),
    });

    /* request payment */
    const { mutate: submitPaymentSummary } = useMutation(values => checkoutSummary(values), {
        onSuccess: (data) => {
            setSummary(data);
            setPaymentConfig({
                ...paymentConfig,
                amount: parseInt((data?.total + prePrice) * 100)
            })

            setTimeout(() => initCheckoutPage('#checkout-payment'), 1000);
            setTimeout(() => tsDelivery(false), 2000);
        },
        onError: (error) => {
            tsDelivery(false);
            const getError = errorResponse({ error, dispatch, exclude: [422] });
            if (getError)
                history.push(`${pathname}#cart`)
        },
        onSettled: async () => setCartBackdrop(false),
    });

    /* apply coupon */
    const { mutate: applyCoupon } = useMutation(values => checkoutSummary(values), {
        onSuccess: (data) => {
            notify('success', 'Coupon Update!', 'Coupon code successfully applied!');
            setSummary(data);
            setPaymentConfig({
                ...paymentConfig,
                amount: parseInt((data?.total + prePrice) * 100)
            })
        },
        onError: (error) => {
            const getError = errorResponse({ error, dispatch, exclude: [422] });
            if (getError)
                // history.push(`${pathname}#cart`)
                return NotificationManager.error("Invalid or expired Coupon code");
        },
        onSettled: async () => {
            tsCoupon(false);
            setCartBackdrop(false)
        },
    });

    const initCheckout = () => {
        setSummaryError(false);
        setCartBackdrop(true);
        const cart_uuid = getCartSessionId(dispatch);
        let post = { cart_uuid };
        if (prescriptionRequested) post = { ...post, add_prescription_charge: "yes" }
        submitCheckoutSummary(post);
    }

    const handleCheckoutSubmit = (values) => {
        setCartBackdrop(true);
        const cart_uuid = getCartSessionId(dispatch);

        let post = { ...checkoutRequest,
            ...values,
            cart_uuid,
            checkout_type: 'register',
            payment_method: 'card' };
        if (prescriptionRequested) post = { ...post, add_prescription_charge: "yes" }

        setCheckoutRequest(post);
        submitCheckout(values);
    }

    const initCheckoutMethod = (values) => {
        tsDelivery(true, 'please wait..');
        setCheckoutRequest({ ...checkoutRequest, ...values });
        if (values.delivery_method === 'shipping') {
            initCheckoutPage('#checkout-shipping');
        } else {
            //initCheckoutPage('#checkout-payment');
            const cart_uuid = getCartSessionId(dispatch);

            let post = { cart_uuid };
            if (prescriptionRequested) post = { ...post, add_prescription_charge: "yes" }
            submitPaymentSummary(post);
        }
    }
    const initCheckoutShipping = (values) => {
        tsDelivery(true, 'please wait..');
        setCheckoutRequest({ ...checkoutRequest, ...values });

        const cart_uuid = getCartSessionId(dispatch);
        const { location_id } = values;
        
        let post = { cart_uuid, location_id,
            delivery_method: checkoutRequest?.delivery_method, delivery_type: checkoutRequest?.delivery_type };
        if (prescriptionRequested) post = { ...post, add_prescription_charge: "yes" }
        submitPaymentSummary(post);
    }

    const initCoupon = (values) => {
        tsCoupon(true, 'wait..');
        const { coupon_code } = values;
        const { delivery_method, delivery_type, location_id, pickup_location_id } = checkoutRequest;
        setCheckoutRequest({ ...checkoutRequest, coupon_code });
        const cart_uuid = getCartSessionId(dispatch);

        let post = { cart_uuid, coupon_code, delivery_method, }
        if (delivery_method === 'shipping') {
            post = { ...post, delivery_type, location_id }
        } else {
            post = { ...post, pickup_location_id }
        }

        if (prescriptionRequested) post = { ...post, add_prescription_charge: "yes" }
        applyCoupon(post);
    }

    const onPaymentSuccess = (reference) => {
        setCartBackdrop(true);
        setPaymentRef(reference)
        const cart_uuid = getCartSessionId(dispatch);
        let values = {
            ...checkoutRequest,
            cart_uuid,
            checkout_type: 'register',
            payment_method: 'card',
            payment_reference: reference?.reference
        };

        if (prescriptionRequested) values = { ...values, add_prescription_charge: "yes" }
        
        submitCheckout(values);
    };
React.useEffect(() => {
  console.log("userData>>",userData);
}, [])


    const onPaymentClose = () => {
        /* setPaymentConfig({
            ...paymentConfig,
            reference: randomString(16),
            amount: parseInt(summary?.total * 100)
        }); */
    }

    const initCheckoutPage = (hash) => {
        switch (hash) {
            case '#checkout':
                history.push(`${pathname}#checkout`);
                setCurrentCheckoutIndex(2);
                break;
            case '#checkout-shipping':
                history.push(`${pathname}#checkout-shipping`);
                setCurrentCheckoutIndex(3);
                break;
            case '#checkout-payment':
                //initPayment();
                history.push(`${pathname}#checkout-payment`);
                setCurrentCheckoutIndex(4);
                break;
            default:
                history.push(`${pathname}#checkout`);
                setCurrentCheckoutIndex(2);
                break;
        }
    }

    React.useEffect(() => {
        initCheckout();
        initPaymentConfig();
        return () => {
            setCurrentCheckoutIndex(null);
            resetCheckout();
            setPaymentRef({});
            setCheckoutError(false)
        }
    }, []);

    const initPaymentConfig = () => {
        setPaymentConfig({
            ...paymentConfig,
            email: userData?.email,
            publicKey: "pk_test_02ce7d4340336726886f879f63b3b5fd13988f34",
            text: 'Proceed to Payment',
            onSuccess: (reference) => onPaymentSuccess(reference),
            onClose: onPaymentClose,
            reference: randomString(16),
        });
    }

    React.useEffect(() => {
        console.log(paymentConfig, 'paymentConfig...')
    }, [paymentConfig])
    

    return (<>

        <Backdrop show={cartBackdrop} opacity={1} />

        {summaryError && (
            <div className="cart-backdrop">
                <div className="cart-backdrop-inner-empty">
                    <i class="fal fa-frown"></i>
                    <p>There seems to be an error, please retry!!</p>
                    <button type="button" onClick={initCheckout}
                        class="btn btn-secondary btn-sm btn-inverse mr-2">Try Again</button>
                </div>
            </div>)}

        {checkoutError && (
            <div className="cart-backdrop">
                <div className="cart-backdrop-inner-empty">
                    <i class="fal fa-frown"></i>
                    <p className="text-dark font-size-14"><strong>There seems to be an error completing your order!!</strong></p>
                    <p>If your card has been debited, please note your payment reference number ({paymentRef?.reference}) and call support.</p>
                    <button type="button" onClick={() => history.push(pathname)}
                        class="btn btn-secondary btn-sm btn-inverse mr-2">Close</button>

                </div>
            </div>)}

        {!checkoutError && (<>
            <Delivery
                hash={hash}
                currentIndex={currentCheckoutIndex}
                pathname={pathname}
                pickupLocations={pickupLocations}
                initCheckoutMethod={initCheckoutMethod}
                checkoutRequest={checkoutRequest}
                initCheckoutPage={initCheckoutPage}
                summary={summary}
                setCheckoutRequest={setCheckoutRequest}
            />

            <Shipping
                hash={hash}
                currentIndex={currentCheckoutIndex}
                pathname={pathname}
                locations={locations}
                initCheckoutShipping={initCheckoutShipping}
                checkoutRequest={checkoutRequest}
                initCheckoutPage={initCheckoutPage}
                summary={summary}
                tsDelivery={tsDelivery}
                userData={userData}
            />

            <Payment
                hash={hash}
                currentIndex={currentCheckoutIndex}
                pathname={pathname}
                handleCheckoutSubmit={handleCheckoutSubmit}
                checkoutRequest={checkoutRequest}
                initCheckoutPage={initCheckoutPage}
                summary={summary}
                paymentConfig={paymentConfig}
                tsDelivery={tsDelivery}
                initCoupon={initCoupon}
            />
        </>)}



    </>);
}