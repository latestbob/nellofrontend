import * as React from 'react';
import { useHistory, Link, useLocation } from "react-router-dom";
import AppContext from '../../context';
import MasterContext from '../../layout/context';
import { subscribeDoctor, user as getUser } from '../../Services';
import { useForm } from "react-hook-form";
import { ErrorMsg, PlaceholderStatus } from '../../components';
import { Checkbox, Radio } from 'pretty-checkbox-react';
import useFormState from '../../hooks/useFormState';
import { useQuery } from 'react-query';

import FormBlockSvg from '../../svg/form-block-svg';
import InfoSvg from '../../svg/info-svg';

export default function DoctorSubscription() {
    const { dispatch, randomString, errorResponse, currentPath, updateUserData, setSubData } = React.useContext(AppContext);
    const { modalPrice } = React.useContext(MasterContext);

    const { register, handleSubmit, getValues, formState: { errors }, setValue } = useForm();
    let history = useHistory();
    let location = useLocation();
    let { appointment, service } = location.state || { appointment: null, service: null };
    const { toggleFormState } = useFormState('form-doctor-service-signup');
    const [user, setUser] = React.useState(null);
    const [requestId] = React.useState(randomString());
    //const [appointment] = React.useState(slAppointment);

    const { isLoading, isError, isFetching, refetch } = useQuery(['doctor-signup-user', requestId], getUser, {
        //retry: 1,
        //manual: true,
        //enabled: !Boolean(service),
        onSuccess: ({ user }) => {
            setUser(user);
            if (user.hasSub && user.subscription?.doctor) {
                if (appointment) {
                    if (service === 'doctor')
                        history.replace({ pathname: `/doctor/${appointment}/appointment` });
                    else
                        history.replace({ pathname: `/appointment` });
                } else {
                    history.replace({ pathname: `/doctors` });
                }
            }
        },
        onError: (error) => errorResponse({
            dispatch, error, history,
            state: { from: currentPath }, exclude: [0, 500, 400, 404, 405]
        }),
    });

    React.useEffect(() => {
        if (user && user?.fitness_subscription) {
            setValue('height_in_feet', user?.fitness_subscription?.height_in_feet);
            setValue('weight_in_kgs', user?.fitness_subscription?.weight_in_kgs);
        }
    }, [user]);

    React.useEffect(() => {
        setSubData(dispatch, null, null);
        toggleFormState(false)
        return () => {
            toggleFormState(false);
            setUser(null);
        }
    }, []);

    React.useEffect(() => {
        console.log({ appointment, service }, 'service....');
    }, [appointment, service]);

    const onSubmit = (data) => {
        toggleFormState(true, 'saving data...');
        data = {
            ...data,
            height_in_inches: 1,
            weight_in_lbs: 1,
            diagnosis: { status: data?.diagnosis_option, detail: data?.diagnosis_details },
            allergies: { status: data?.allergies_option, detail: data?.allergies_details },
            medication: { status: data?.medication_option, detail: data?.medication_details }
        }

        subscribeDoctor(data).then(() => {
            toggleFormState(false);
            let subscription = user?.subscription;
            subscription = { ...subscription, doctor: true }
            const newUser = { ...user, subscription };
            setUser(newUser);
            updateUserData(dispatch, newUser);

            if (user.hasSub && appointment) {
                if (service === 'doctor')
                    history.replace({ pathname: `/doctor/${appointment}/appointment` });
                else
                    history.replace({ pathname: `/appointment` });
            }
        }).catch(error => {
            toggleFormState(false);
            errorResponse({ dispatch, error, history, state: { appointment, service } })
        })
        //.then(() => toggleFormState(false));
    }

    const initSelectPlan = () => {
        setSubData(dispatch, appointment, service);
        modalPrice.showModal();
    }

    const PageLoading = () =>
        <div className="container mt-5 font-size-15">
            <div className="row">
                <div className="mb-5 col-md-8">
                    <InfoSvg />
                </div>
            </div>
            <div className="row row-3">
                <div className="col-md-6">
                    <div className="mb-3">
                        <FormBlockSvg />
                    </div>
                    <div className="mb-3">
                        <FormBlockSvg />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <FormBlockSvg />
                    </div>
                    <div className="mb-3">
                        <FormBlockSvg />
                    </div>
                </div>
            </div>
        </div>

    return (<>

        <div className="account-badge-container">
            <h2>Consult any doctor at your<br />Convenience</h2>
            <p>No queues. live access to real doctors on any device in minutes.</p>
        </div>

        {(isLoading || isFetching) ? <PageLoading /> : (<>

            {isError && (<div className="p-5">
                <PlaceholderStatus onClick={refetch} />
            </div>)}

            {user && user?.subscription?.doctor && !user?.hasSub && (<div className="content-body container">

                <div className="subscription-container ccard-3">
                    <div className="flex-1">
                        <h5 className="mb-2">You Are A Step Away</h5>

                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                        <hr /> */}
                    </div>

                    <span onClick={initSelectPlan}
                        class="btn btn-secondary btn-block btn-lg" role="button">Select A Plan</span>
                </div>

            </div>)}

            {user && !user?.subscription?.doctor && (<>
                <div className="container-max container-max-padded">
                    <ul className="step-health clearfix">
                        <li>
                            <span>1.</span>
                            <p>Verify your<br />Account</p>
                        </li>
                        <li className="active">
                            <span>2.</span>
                            <p>Your Health<br />Information</p>
                        </li>
                        <li>
                            <span>3.</span>
                            <p>Speak to a<br />Doctor</p>
                        </li>
                    </ul>
                </div>

                <div className="container mb-5 font-size-15">
                    <div className="wrapper-border-bottom-dashed">
                        <div className="row mb-4">
                            <div className="col-md-9">
                                <h3>Your Health Information</h3>
                                <p>The information provided is handled with the utmost confidentiality and is made avaialble to a qualified
                                    and registered medical practitioner. The questions listed are to provide the Doctor with an appropriate
                                    level of information to make an informed decision during diagnosis.</p>
                            </div>
                        </div>
                        <form id="form-doctor-service-signup" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row row-3">
                                <div className="col-md-6">

                                    <div className="q-container">
                                        <div className="q-container-left">
                                            Have you been diagnosed with any medical conditions?
                                        </div>
                                        <div className="q-container-right">
                                            <Radio color="primary-o" {...register('diagnosis_option')} value="yes" bigger>Yes</Radio>
                                            <Radio color="primary-o" {...register('diagnosis_option')} value="no" checked bigger>No</Radio>
                                        </div>
                                    </div>

                                    <div className="wrapper-border-bottom mb-3">
                                        <label className="font-size-14">Please provide more information, including diagnosis, symptoms and
                                            treatment.</label>
                                        <textarea {...register('diagnosis_details', {
                                            validate: {
                                                required: value => {
                                                    if (getValues('diagnosis_option') === 'yes' && !value) return 'Please provide more information';
                                                    return true;
                                                },
                                            }
                                        })} className="form-control" cols="30" rows="5"></textarea>
                                        <ErrorMsg errors={errors} name="diagnosis_details" />
                                    </div>

                                    <div>
                                        <div className="q-container">
                                            <div className="q-container-left">
                                                Do you currently suffer from any allergies or symptoms?
                                            </div>
                                            <div className="q-container-right">
                                                <Radio color="primary-o" {...register('allergies_option')} value="yes" bigger>Yes</Radio>
                                                <Radio color="primary-o" {...register('allergies_option')} value="no" checked bigger>No</Radio>
                                            </div>
                                        </div>

                                        <div className="wrapper-border-bottom mb-3">
                                            <label className="font-size-14">Please provide more information, including diagnosis, symptoms and
                                                treatment.</label>
                                            <textarea {...register('allergies_details', {
                                                validate: {
                                                    required: value => {
                                                        if (getValues('allergies_option') === 'yes' && !value) return 'Please provide more information';
                                                        return true;
                                                    },
                                                }
                                            })} className="form-control" cols="30" rows="5"></textarea>
                                            <ErrorMsg errors={errors} name="allergies_details" />
                                        </div>
                                    </div>


                                </div>
                                <div className="col-md-6">
                                    <div>
                                        <div className="q-container">
                                            <div className="q-container-left">
                                                Are you currently taking any medication?
                                            </div>
                                            <div className="q-container-right">
                                                <Radio color="primary-o" {...register('medication_option')} value="yes" bigger>Yes</Radio>
                                                <Radio color="primary-o" {...register('medication_option')} value="no" checked bigger>No</Radio>
                                            </div>
                                        </div>

                                        <div className="wrapper-border-bottom mb-3">
                                            <label className="font-size-14">Please provide more information, including diagnosis, symptoms and
                                                treatment.</label>
                                            <textarea {...register('medication_details', {
                                                validate: {
                                                    required: value => {
                                                        if (getValues('medication_option') === 'yes' && !value) return 'Please provide more information';
                                                        return true;
                                                    },
                                                }
                                            })} className="form-control" cols="30" rows="5"></textarea>
                                            <ErrorMsg errors={errors} name="medication_details" />
                                        </div>
                                    </div>


                                    <div className="q-container q-container-no-flex">
                                        <div className="flex-space-middle">
                                            <div className="q-container-left">What is your height?</div>
                                            <div className="q-container-right widthed">
                                                <div className="form-group mb-0">
                                                    <label>Feet</label>
                                                    <input type="text" className="form-control" {...register('height_in_feet', {
                                                        required: 'Height in feet is required'
                                                    })} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <ErrorMsg errors={errors} name="height_in_feet" />
                                        </div>
                                    </div>


                                    <div className="mb-5">
                                        <div className="q-container">
                                            <div className="q-container-left">What is your weight?</div>
                                            <div className="q-container-right widthed">
                                                <div className="form-group mb-0">
                                                    <label>kg</label>
                                                    <input type="text" className="form-control"  {...register('weight_in_kgs', {
                                                        required: 'Weight in kg is required'
                                                    })} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <ErrorMsg errors={errors} name="weight_in_kgs" />
                                        </div>
                                        <div className="text-sky text-right font-weight-medium font-size-14">Your Body Mass Index (kg/m2) = 49.7</div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 my-4">
                                    <button type="submit"
                                        className="btn btn-primary btn-lg btn-block btn-main">Continue</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>


            </>)}

        </>)}



    </>);
}