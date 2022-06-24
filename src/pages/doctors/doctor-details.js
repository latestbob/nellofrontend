import * as React from 'react';
import { Link, withRouter, useParams } from 'react-router-dom';
import { doctorDetails } from '../../Services';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import AppContext from '../../context';


export default function DoctorDetails({ history }) {
    const { dispatch, baseUrl, errorResponse, userData } = React.useContext(AppContext);
    const { uuid } = useParams();

    React.useEffect(() => {
        if (!uuid)
            history.push('/doctors');
    }, [uuid]);

    const { isLoading, isFetching, refetch, isError, error, data } = useQuery(['doctor-details', uuid], () => doctorDetails(uuid), {
        //retry: 2,
        //refetchOnWindowFocus: true,
        //refetchAllOnWindowFocus: true,
        onError: (error) => errorResponse({ dispatch, history, error, exclude: [999] }),
    });


    //navigate the user to the appointment screen,,, using the doctors uuid.
    const initAppointment = () => {
        history.push(`/doctor/${uuid}/appointment`);
        /* const from = { pathname: `/doctor/${uuid}/appointment` }
        if (!userData) {
            history.push({ pathname: "/login", state: { from, appointment: uuid } });
        } else {
            if(!userData.subscription?.doctor){
                history.push({ pathname: '/doctor-signup', state: { appointment: uuid} });
            } else {
                history.push(from);
            }
        } */
    }

    return (<>

        <div className="bg-sky-light">
            <div className="container page-header-full container-layout">
                <Link className="ico-back-nav" to="/doctors">
                    <i className="fal fa-long-arrow-left"></i>
                </Link> Doctor’s Profile
            </div>
        </div>

        <div className="container content-body container-layout">
            <div className="docd-main clearfix">
                <div className="docd-img-container">
                    <img src="./../assets/images/male-doctor.jpg" alt="" />
                </div>

                <div className="docd-content-container">
                    <div className="docd-content-container-inner">
                        <h4 className="docd-1">Dr. {data?.firstname} {data?.lastname}</h4>
                        <div className="docd-2">{data?.aos}</div>
                        <div className="docd-3">{data?.vendor?.name}</div>
                        <div className="docd-4">
                            <i className="la la-star"></i>
                            <i className="la la-star"></i>
                            <i className="la la-star"></i>
                            <i className="la la-star"></i>
                            <i className="la la-star"></i>
                        </div>

                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore
                            magna aliqua. Ut enim ad minim veniam.</p> */}
                    </div>

                    <div className="docd-5">
                        {/* <button className="btn btn-secondary btn-inverse btn-sm btn-ico">
                            <i className="bx bx-message-square-dots"></i>Chat
                        </button> */}
                        <button type="button" onClick={initAppointment}
                            className="btn btn-secondary btn-inverse btn-sm btn-ico">
                            <i className="bx bx-calendar-minus"></i> Book Appointment
                        </button>
                    </div>


                </div>

            </div>

            {/* <div>
                <div className="flex-center mb-3">
                    <button className="btn btn-secondary btn-inverse btn-sm btn-ico">
                        <i className="fas fa-pencil-alt font-size-10"></i> Write a Review
                    </button>
                </div>

                <div className="card-review">
                    <div className="review-title">
                        Great Product! Great Price!!
                        <span>
                            <i className="la la-star"></i>
                            <i className="la la-star"></i>
                            <i className="la la-star"></i>
                            <i className="la la-star"></i>
                            <i className="la la-star text-muted"></i>
                        </span>
                    </div>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                    </p>

                    <div className="review-source">
                        <div className="rs-content">
                            <div className="rs-name">John Doe</div>
                            <div className="rs-state">
                                <span>11/7/2021</span>
                            </div>
                        </div>

                    </div>

                </div>



                <div className="card-review">
                    <div className="review-title">
                        Great Product! Great Price!!
                        <span>
                            <i className="la la-star"></i>
                            <i className="la la-star"></i>
                            <i className="la la-star"></i>
                            <i className="la la-star"></i>
                            <i className="la la-star text-muted"></i>
                        </span>
                    </div>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                    </p>

                    <div className="review-source">
                        <div className="rs-content">
                            <div className="rs-name">John Doe</div>
                            <div className="rs-state">
                                <span className="verified">Verified Buyer</span>
                                <span>11/7/2021</span>
                            </div>
                        </div>

                    </div>

                </div>



            </div> */}
        </div>




    </>);
}