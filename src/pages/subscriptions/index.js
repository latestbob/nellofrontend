import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { subscribe } from '../../Services';
import { CheckboxCategories, CheckboxRatings, RadioPrescription } from './../../components/drugs-components';
import AppContext from '../../context';
import MasterContext from './../../layout/context';
import useRouter from './../../hooks/useRouter';
import { PaystackButton } from 'react-paystack';
import { Currency } from './../../components';
import PaymentSvg from '../../svg/payment-svg';


export default function Subscriptions({ history }) {
    const { dispatch, userData, randomString, currentPath, SubService, SubAppointment,
        errorResponse } = React.useContext(AppContext);
    const { packages, modalPrice } = React.useContext(MasterContext);
    let { isLoading, isFetching, data: allPackages, refetch, isError } = packages;
    let location = useLocation();
    let locationState = location.state;
    //let { appointment, service } = location.state || { appointment: null, service: null };
    const [appointment] = React.useState(SubAppointment);
    const [service] = React.useState(SubService);

    const router = useRouter();
    const [paymentConfig, setPaymentConfig] = React.useState(null);
    const [selectedPackage, setSelectedPackage] = React.useState(null);

    const { mutate: submitPayment } = useMutation(values => subscribe(values), {
        onSuccess: (data) => {
            history.push({ pathname: '/subscription-done', state: { appointment, service, data } });
            /* setUserData(dispatch, { ...userData, hasSub: true });
            if (appointment) {
                history.replace({ pathname: `/doctor/${appointment}/appointment` });
            } else {
                history.push({ pathname: '/browse' });
            } */
        },
        onError: (error) => {
            errorResponse({ dispatch, error, history, state: { from: currentPath } })
        },
        onSettled: async () => {
            initPaymentConfig();
        },
    });

    React.useEffect(() => {
        //console.log( appointment, service, 'sub service....');
    }, [ appointment, service]);


    const initPaymentConfig = () => {
        setPaymentConfig({
            ...paymentConfig,
            email: userData?.email,
            publicKey: process.env.REACT_APP_PAYSTACK_PK,
            text: 'Proceed to Payment',
            amount: parseInt((selectedPackage?.price + 120) * 100),
            onSuccess: (reference) => onPaymentSuccess(reference),
            onClose: onPaymentClose,
            reference: randomString(16),
        });
    }

    const onPaymentSuccess = (reference) => {
        const postData = {
            package_id: selectedPackage?.id,
            payment_reference: reference?.reference
        }
        //console.log(postData, 'postData...')
        submitPayment(postData);
    };

    const onPaymentClose = () => {
        initPaymentConfig();
    }

    React.useEffect(() => {
        if (selectedPackage) {
            initPaymentConfig();
        }
    }, [selectedPackage]);


    React.useEffect(() => {
        if (allPackages) {
            const getPackage = allPackages.length > 0 && locationState?.package_id
                ? allPackages[locationState?.package_id] : allPackages[0];
            setSelectedPackage(getPackage);
        }
    }, [allPackages, locationState])

    /* React.useEffect(() => {
        console.log(appointment, 'appointment...')
    }, [appointment]); */

    return (<>

        <div className="content-body container">

            <div className="subscription-container ccard-3">
                {(isLoading || isFetching) && (<div className="flex-center">
                    <PaymentSvg />
                </div>)}
                {(isError && !isFetching) && (<div onClick={refetch}>Retry</div>)}
                {(!isLoading && !isFetching) && selectedPackage && (<div>
                    <div className="text-right font-size-12 text-muted clearfix mb-3">
                        <div onClick={() => modalPrice.showModal()} className="float-right cursor-pointer">Change Plan</div>
                    </div>
                    <h5><Currency value={selectedPackage?.price} /> <span>/month</span></h5>
                    <h4>Single Plan</h4>

                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p> */}
                    <hr />

                    <div class="summary-inline-2">
                        <div>Plan Amount</div>
                        <div><Currency value={selectedPackage?.price} /></div>
                    </div>
                    <div class="summary-inline-2">
                        <div>Transaction Charge</div>
                        <div><Currency value={120} /></div>
                    </div>

                    <div class="summary-inline-2 mb-5">
                        <div>Total Payment</div>
                        <div className="font-size-18 font-weight-bold text-sky"><Currency value={(selectedPackage?.price + 120)} /></div>
                    </div>

                    <PaystackButton
                        className="btn btn-secondary btn-block btn-lg btn-main"
                        {...paymentConfig}
                    />
                </div>)}
            </div>

        </div>
    </>);
}