import * as React from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import AppContext from "../../context";
import MasterContext from "../../layout/context";
import { subscribeFitness, user as getUser } from "../../Services";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { ErrorMsg, PlaceholderStatus, randomString } from "../../components";
import { Checkbox, Radio } from "pretty-checkbox-react";
import useFormState from "../../hooks/useFormState";
import { useQuery } from "react-query";
import FormBlockSvg from "../../svg/form-block-svg";
import InfoSvg from "../../svg/info-svg";
import bmiImg1 from "../../images/bmi1.jpg";
import bmiImg2 from "../../images/bmi2.jpg";
import bmiImg3 from "../../images/bmi3.jpg";
import bmiImg4 from "../../images/bmi4.jpg";
import bmiImg5 from "../../images/bmi5.jpg";
import "./index.css";
export default function FitnessSubscription() {
  const {
    dispatch,
    currentPath,
    errorResponse,
    healthInterests,
    updateUserData,
    setSubData,
  } = React.useContext(AppContext);
  const { modalPrice } = React.useContext(MasterContext);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      health_interests: [],
    },
  });
  let history = useHistory();
  let location = useLocation();
  const [user, setUser] = React.useState(null);
  const [rand] = React.useState(randomString());
  const [selectedBMI, setSelectedBMI] = React.useState("");
  const health_interests = watch("health_interests");
  const { toggleFormState } = useFormState("form-fitness-service-signup");

  const { isLoading, isError, isFetching, refetch } = useQuery(
    ["fitness-signup-user", rand],
    getUser,
    {
      onSuccess: ({ user }) => {
        setUser(user);
        if (user.hasSub && user.subscription?.fitness) {
          history.replace({ pathname: `/fitness` });
        }
        //console.log(user, 'user....')
      },
      onError: (error) =>
        errorResponse({
          dispatch,
          error,
          history,
          state: { from: currentPath },
          exclude: [0, 500, 400, 404, 405],
        }),
    }
  );

  React.useEffect(() => {
    if (user && user?.doctor_subscription) {
      setValue("height_in_feet", user?.doctor_subscription?.height_in_feet);
      setValue("weight_in_kgs", user?.doctor_subscription?.weight_in_kgs);
    }
  }, [user]);

  const onSubmit = ({ workouts_per_week, minutes_per_workout, ...data }) => {
    toggleFormState(true, "saving data...");
    data = {
      ...data,
      height_in_inches: 1,
      weight_in_lbs: 1,
      weekly_exercise_plan: {
        workouts_per_week,
        minutes_per_workout,
      },
    };

    subscribeFitness(data)
      .then(() => {
        //toggleFormState(false);
        let subscription = user?.subscription;
        subscription = { ...subscription, fitness: true };
        const newUser = { ...user, subscription };
        setUser(newUser);
        updateUserData(dispatch, newUser);

        if (user.hasSub) {
          history.replace({ pathname: `/fitness` });
        }
      })
      .catch((error) => {
        //toggleFormState(false);
        errorResponse({
          dispatch,
          error,
          history,
          state: { from: currentPath },
        });
      })
      .then(() => toggleFormState(false));
  };

  const initSelectPlan = () => {
    setSubData(dispatch, null, "fitness");
    modalPrice.showModal();
  };

  const validateHealthInterests = () =>
    getValues("health_interests").length
      ? true
      : "Select at least one health interest";

  const PageLoading = () => (
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
  );

  return (
    <>
      <div className="account-badge-container">
        <h1>Health & Fitness</h1>
        <p>No queues. Live access to real doctors on any device in minutes.</p>
      </div>

      {isLoading || isFetching ? (
        <PageLoading />
      ) : (
        <>
          {isError && (
            <div className="p-5">
              <PlaceholderStatus onClick={refetch} />
            </div>
          )}

          {user && user?.subscription?.fitness && (
            <div className="content-body container">
              <div className="subscription-container ccard-3">
                <div className="flex-1">
                  <h5 className="mb-2">You Are A Step Away</h5>

                  {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p> */}
                  <hr />
                </div>

                <span
                  onClick={initSelectPlan}
                  className="btn btn-secondary btn-block btn-lg"
                  role="button"
                >
                  Select A Plan
                </span>
              </div>
            </div>
          )}
        </>
      )}

      {user && !user?.subscription?.fitness && (
        <>
          <div className="container-max container-max-padded">
            <ul className="step-health clearfix">
              <li>
                <span>1.</span>
                <p>
                  Verify your
                  <br />
                  Account
                </p>
              </li>
              <li className="active">
                <span>2.</span>
                <p>
                  Your Health & Fitness
                  <br />
                  Information
                </p>
              </li>
              <li>
                <span>3.</span>
                <p>
                  My Health
                  <br />
                  Profile
                </p>
              </li>
            </ul>
          </div>

          <div className="container mb-5">
            <form
              id="form-fitness-service-signup"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="wrapper-border-bottom-dashed">
                <div className="row mb-4">
                  <div className="col-md-8">
                    <h3>Tell Us About Yourself</h3>
                    <p>
                      The information you provide is important as it would help
                      us to create a personalized Health and Fitness profile
                      that works best for you.
                    </p>
                  </div>
                </div>
                <div className="row row-3">
                  <div className="col-md-6">
                    <div className="wrapper-border-bottom flex-space-middle mb-3">
                      <div className="font-weight-medium text-secondary font-size-14">
                        What is your height?
                      </div>
                      <div className="width-180">
                        <div className="form-group mb-0">
                          <label>Feet</label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("height_in_feet", {
                              required: "Height in feet is required",
                            })}
                          />
                        </div>
                        <div className="text-right">
                          <ErrorMsg errors={errors} name="height_in_feet" />
                        </div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="flex-space-middle">
                        <div className="font-weight-medium text-secondary font-size-14">
                          What is your weight?
                        </div>
                        <div className="width-180">
                          <div className="form-group mb-0">
                            <label>kg</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register("weight_in_kgs", {
                                required: "Weight in kg is required",
                              })}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <ErrorMsg errors={errors} name="weight_in_kgs" />
                      </div>
                      <div className="text-sky text-right font-weight-medium font-size-14">
                        Your Body Mass Index (kg/m2) = 49.7
                      </div>
                    </div>

                    <div className="form-group mb-4">
                      <label>What is your weight goal?</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="E.g 2 pounds per week"
                        {...register("weight_goal", {
                          required: "Weight goal is required",
                        })}
                      />
                      <ErrorMsg errors={errors} name="weight_goal" />
                    </div>

                    <div className="form-group mb-4">
                      <label>Please select your weight</label>
                      <div className="bmi-images-wrap">
                        <div
                          style={
                            selectedBMI == "Under Weight"
                              ? {
                                  border: "1px solid rgba(14, 86, 118, 0.85)",
                                  padding: "5px",
                                  borderRadius: "4px",
                                }
                              : {}
                          }
                          className="bmiImg"
                          onClick={() => setSelectedBMI("Under Weight")}
                        >
                          <img src={bmiImg1} alt="" />
                          <span>Under Weight </span>
                          <span>{`( < 18,5  )`}</span>
                        </div>

                        <div
                          style={
                            selectedBMI == "Normal"
                              ? {
                                  border: "1px solid rgba(14, 86, 118, 0.85)",
                                  padding: "5px",
                                  borderRadius: "4px",
                                }
                              : {}
                          }
                          className="bmiImg"
                          onClick={() => setSelectedBMI("Normal")}
                        >
                          <img src={bmiImg2} alt="" />
                          <span>Normal </span>
                          <span>( 18,5-24,9 )</span>
                        </div>

                        <div
                          style={
                            selectedBMI == "Over Weight"
                              ? {
                                  border: "1px solid rgba(14, 86, 118, 0.85)",
                                  padding: "5px",
                                  borderRadius: "4px",
                                }
                              : {}
                          }
                          className="bmiImg"
                          onClick={() => setSelectedBMI("Over Weight")}
                        >
                          <img src={bmiImg3} alt="" />
                          <span>Over Weight </span>
                          <span>( 25-29,9 )</span>
                        </div>

                        <div
                          style={
                            selectedBMI == "Obese"
                              ? {
                                  border: "1px solid rgba(14, 86, 118, 0.85)",
                                  padding: "5px",
                                  borderRadius: "4px",
                                }
                              : {}
                          }
                          className="bmiImg"
                          onClick={() => setSelectedBMI("Obese")}
                        >
                          <img src={bmiImg4} alt="" />
                          <span>Obese </span>
                          <span>( 30-34,9 )</span>
                        </div>

                        <div
                          style={
                            selectedBMI == "Extremly Obese"
                              ? {
                                  border: "1px solid rgba(14, 86, 118, 0.85)",
                                  padding: "5px",
                                  borderRadius: "4px",
                                }
                              : {}
                          }
                          className="bmiImg"
                          onClick={() => setSelectedBMI("Extremly Obese")}
                        >
                          <img src={bmiImg5} alt="" />
                          <span> Extremly Obese</span>
                          <span>{`( 35 < )`}</span>
                        </div>
                      </div>

                      <p
                        style={{
                          marginTop: "7px",
                          fontSize: "14px",
                          color: "var(--sky)",
                        }}
                      >
                        Weight selected: {selectedBMI}
                      </p>
                    </div>

                    <div className="form-group mb-4">
                      <label>What is your sleep goal?</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="E.g 3 hours"
                        {...register("sleep_goal", {
                          required: "Sleep goal is required",
                        })}
                      />
                      <ErrorMsg errors={errors} name="sleep_goal" />
                    </div>

                    <div className="wrapper-border-bottom mb-3 text-secondary font-weight-medium font-size-14">
                      How many times a week do you plan on exercising?
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>Workouts / Week</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Workouts / Week"
                            {...register("workouts_per_week", {
                              required: "Workouts per week is required",
                            })}
                          />
                          <ErrorMsg errors={errors} name="workouts_per_week" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label>Minute / workout</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Minute / workout"
                            {...register("minutes_per_workout", {
                              required: "Workouts per week is required",
                            })}
                          />
                          <ErrorMsg
                            errors={errors}
                            name="minutes_per_workout"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-5">
                      <div className="wrapper-border-bottom mb-3 text-secondary font-weight-medium font-size-14">
                        How do you want to track your unit of energy?
                      </div>

                      <div className="q-container-left">
                        <Radio
                          color="primary-o"
                          {...register("energy_unit", {
                            required: "Energy unit type is required",
                          })}
                          value="calories"
                          bigger
                        >
                          Calories
                        </Radio>
                        <Radio
                          color="primary-o"
                          {...register("energy_unit", {
                            required: "Energy unit type is required",
                          })}
                          value="kilojoules"
                          bigger
                        >
                          Kilojoules
                        </Radio>

                        <ErrorMsg errors={errors} name="energy_unit" />
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="wrapper-border-bottom mb-3 text-secondary font-weight-medium font-size-14">
                        How would you best describe your normal daily
                        activities?
                      </div>

                      <div className="q-container-left">
                        <div className="custom-control custom-radio mb-3">
                          <input
                            type="radio"
                            value="sendentary"
                            id="opt-1"
                            className="custom-control-input"
                            {...register("normal_daily_activity", {
                              required:
                                "Please describe your normal daily activity",
                            })}
                          />
                          <label
                            className="custom-control-label font-weight-normal"
                            htmlFor="opt-1"
                          >
                            Sedentary: Spend most of the day sitting (e.g. bank
                            teller, desk job)
                          </label>
                        </div>

                        <div className="custom-control custom-radio mb-3">
                          <input
                            type="radio"
                            value="lightly_active"
                            id="opt-2"
                            className="custom-control-input"
                            {...register("normal_daily_activity", {
                              required:
                                "Please describe your normal daily activity",
                            })}
                          />
                          <label
                            className="custom-control-label font-weight-normal"
                            htmlFor="opt-2"
                          >
                            Lightly Active: Spend a good part of the day on your
                            feet (e.g. teacher, salesperson)
                          </label>
                        </div>

                        <div className="custom-control custom-radio mb-3">
                          <input
                            type="radio"
                            value="active"
                            id="opt-3"
                            className="custom-control-input"
                            {...register("normal_daily_activity", {
                              required:
                                "Please describe your normal daily activity",
                            })}
                          />
                          <label
                            className="custom-control-label font-weight-normal"
                            htmlFor="opt-3"
                          >
                            Active: Spend a good part of the day doing some
                            physical activity (e.g. food server, postal carrier)
                          </label>
                        </div>

                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            value="hyper_active"
                            id="opt-4"
                            className="custom-control-input"
                            {...register("normal_daily_activity", {
                              required:
                                "Please describe your normal daily activity",
                            })}
                          />
                          <label
                            className="custom-control-label font-weight-normal"
                            htmlFor="opt-4"
                          >
                            Hyper Active: Spend most of the day doing heavy
                            physical activity (e.g. bike messenger, carpenter)
                          </label>
                        </div>
                        <ErrorMsg
                          errors={errors}
                          name="normal_daily_activity"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="wrapper-border-bottom mb-3 text-secondary font-weight-medium font-size-14">
                        What are your Health Interest
                      </div>

                      <div className="font-size-13">
                        You can add up to 10 interests to help us serve you
                        better
                      </div>
                      <div className="container-bg-radius btn-select-group">
                        <div
                          className="btn-group btn-group-toggle"
                          data-toggle="buttons"
                        >
                          {healthInterests &&
                            healthInterests.length > 0 &&
                            healthInterests.map((row, index) => {
                              return (
                                <label
                                  key={row}
                                  className="btn btn-select btn-inverse"
                                >
                                  <input
                                    type="checkbox"
                                    value={row}
                                    name="options"
                                    autoComplete="off"
                                    {...register("health_interests", {
                                      validate: validateHealthInterests,
                                    })}
                                  />
                                  {row}
                                </label>
                              );
                            })}
                        </div>
                      </div>
                      <ErrorMsg errors={errors} name="health_interests" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 my-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block btn-main"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
