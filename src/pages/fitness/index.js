import * as React from 'react';
import { useHistory, Link, useLocation } from "react-router-dom";
import AppContext from '../../context';
import { subscriptions } from '../../Services';
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import useFormState from './../../hooks/useFormState';
import Slider from "react-slick";
import { PlaceholderStatus, ErrorMsg } from './../../components';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SearchBarSvg from './../../svg/search-bar-svg';
import SquareRadiusSvg from './../../svg/square-radius-svg';
import TimeSvg from './../../svg/time-svg';

export default function DoctorSubscription() {
    const { dispatch, currentPath, errorResponse } = React.useContext(AppContext);
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const { toggleFormState } = useFormState('form-login');
    const [service, setService] = React.useState(null);
    const [sliderSettings, setSliderSettings] = React.useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    })

    React.useEffect(() => {
        toggleFormState(false)
        return () => {
            toggleFormState(false)
        }
    }, []);

    const { isLoading, isFetching, refetch, isError } = useQuery('subscriptions', subscriptions, {
        onSuccess: ({ fitness }) => {
            setService(fitness);
            if (!fitness) {
                history.push({ pathname: '/fitness-signup', state: { service: 'fitness' } });
            }
        },
        onError: (error) => errorResponse({
            dispatch, error, history,
            state: { from: currentPath }, exclude: [0, 500, 400, 404, 405]
        }),
    });

    const PageLoading = () =>
        <div className="p-5">
            <div className="mb-4">
                <SearchBarSvg />
            </div>

            <div className="appointment-box">
                <div className="row">
                    <div class="col-md-6">
                        <SquareRadiusSvg />
                    </div>
                    <div class="col-md-6">
                        <TimeSvg />
                    </div>
                </div>
            </div>
        </div>


    return (<>

        <div className="account-badge-container">
            <h1 className="mb-0">Health & Fitness</h1>
        </div>

        {isLoading ? <PageLoading /> : (<>
            {isError && (<div className="p-5">
                <PlaceholderStatus onClick={refetch} />
            </div>)}

            {!isError && service && (<>

                <div className="container container-fitness container-layout">
                    <div className="row">
                        <div className="col-md-6 side-borded">
                            <div className="mb-4">
                                <h6 className="text-sky">My Activities</h6>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="fitness-card mb-4">
                                            <div className="ft-activity-block">
                                                <div className="fta-icon">
                                                    <img src="./assets/images/ico-run.svg" alt="ico-run" />
                                                </div>
                                                <div className="fta-content">
                                                    <h6>Workout</h6>
                                                    3/7 Days
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-6">
                                        <div className="fitness-card mb-4">
                                            <div className="ft-activity-block">
                                                <div className="fta-icon">
                                                    <img src="./assets/images/ico-fork.svg" alt="ico-run" />
                                                </div>
                                                <div className="fta-content">
                                                    <h6>Diet</h6>
                                                    3x/Days
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="fitness-card mb-4">
                                            <div className="ft-activity-block">
                                                <div className="fta-icon fta-icon-3">
                                                    <img src="./assets/images/ico-bed.svg" alt="ico-run" />
                                                </div>
                                                <div className="fta-content">
                                                    <h6>Sleep</h6>
                                                    6h 30
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="fitness-card mb-4">
                                            <div className="ft-activity-block">
                                                <div className="fta-icon fta-icon-4">
                                                    <img src="./assets/images/ico-feet.svg" alt="ico-run" />
                                                </div>
                                                <div className="fta-content">
                                                    <h6>Steps</h6>
                                                    3/7 Days
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div>
                                <h6 className="text-sky">My Interest
                                    <span className="h-inline-action">
                                        <span>Edit</span>
                                        <i class="fal fa-pen"></i>
                                    </span></h6>

                                <ul className="list-inline-group">
                                    <li>Work Out</li>
                                    <li>Diet & Nutrition</li>
                                    <li>Calories</li>
                                    <li>Sleep</li>
                                    <li>Steps</li>
                                    <li>Diet & Nutrition</li>
                                </ul>
                            </div>


                        </div>

                        <div className="col-md-6">
                            <h6>My Weekly Feeds</h6>
                            <div className="fitness-slider-container fitness-card">
                                <Slider {...sliderSettings}>
                                    <div className="fitness-slider">
                                        <img src="./assets/images/products/fitness-1.png" alt="" />
                                        <div className="fs-content-container">
                                            <div className="fs-content-container-inner">
                                                <div className="ftc-category">FITNESS</div>
                                                <h5>Fitness training: Elements of a well-rounded routine</h5>
                                                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim vel mauris id sagittis. </p> */}
                                            </div>
                                            <Link className="fs-link" to="/fitness">Continue reading</Link>
                                        </div>
                                    </div>

                                    <div className="fitness-slider">
                                        <img src="./assets/images/products/fitness-1.png" alt="" />
                                        <div className="fs-content-container">
                                            <div className="fs-content-container-inner">
                                                <div className="ftc-category">FITNESS</div>
                                                <h5>Fitness training: Elements of a well-rounded routine</h5>
                                                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim vel mauris id sagittis. </p> */}
                                            </div>
                                            <Link className="fs-link" to="/fitness">Continue reading</Link>
                                        </div>
                                    </div>

                                    <div className="fitness-slider">
                                        <img src="./assets/images/products/fitness-1.png" alt="" />
                                        <div className="fs-content-container">
                                            <div className="fs-content-container-inner">
                                                <div className="ftc-category">FITNESS</div>
                                                <h5>Fitness training: Elements of a well-rounded routine</h5>
                                                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim vel mauris id sagittis. </p> */}
                                            </div>
                                            <Link className="fs-link" to="/fitness">Continue reading</Link>
                                        </div>
                                    </div>
                                </Slider>
                            </div>

                            <h6 className="text-sky">My Goals
                                <span className="h-inline-action">
                                    <span>Edit</span>
                                    <i class="fal fa-pen"></i>
                                </span></h6>

                            <div className="fitness-card">
                                <div className="ft-goals clearfix">

                                    <ul className="ft-goals-list">
                                        <li>
                                            <img src="./assets/images/ico-cal.svg" alt="cal" />
                                            <span>Cal</span>
                                        </li>
                                        <li>
                                            <img src="./assets/images/ico-weight.svg" alt="weight" />
                                            <span>Weight</span>
                                        </li>
                                        <li>
                                            <img src="./assets/images/ico-fruits.svg" alt="fruits" />
                                            <span>Fruits & Vegs</span>
                                        </li>
                                        <li>
                                            <img src="./assets/images/ico-no-sugar.svg" alt="no-sugar" />
                                            <span>Sugar</span>
                                        </li>
                                    </ul>

                                    <div className="flex-center-center">
                                        <div className="row">
                                            <div className="col-sm-3 col-6 flex-center-center">
                                                <div class="c100 p67 small success">
                                                    <div className="cs-content">
                                                        <img src="./assets/images/ico-cal-success.svg" alt="cal" />
                                                        <div>67%</div>
                                                    </div>
                                                    <div class="slice">
                                                        <div class="bar"></div>
                                                        <div class="fill"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-3 col-6 flex-center-center">
                                                <div class="c100 p65 small success">
                                                    <div className="cs-content">
                                                        <img src="./assets/images/ico-weight-success.svg" alt="cal" />
                                                        <div>65%</div>
                                                    </div>
                                                    <div class="slice">
                                                        <div class="bar"></div>
                                                        <div class="fill"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-3 col-6 flex-center-center">
                                                <div class="c100 p45 small warning">
                                                    <div className="cs-content">
                                                        <img src="./assets/images/ico-fruits-warning.svg" alt="cal" />
                                                        <div>45%</div>
                                                    </div>
                                                    <div class="slice">
                                                        <div class="bar"></div>
                                                        <div class="fill"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-3 col-6 flex-center-center">
                                                <div class="c100 p15 small danger">
                                                    <div className="cs-content">
                                                        <img src="./assets/images/ico-no-sugar-danger.svg" alt="cal" />
                                                        <div>15%</div>
                                                    </div>
                                                    <div class="slice">
                                                        <div class="bar"></div>
                                                        <div class="fill"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </>)}

        </>)}

    </>);
}