import * as React from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { drugDetails, reviewAdd, reviews } from "../../Services";
import AppContext from "../../context";
import MasterContext from "./../../layout/context";
import { Currency, PlaceholderStatus, ErrorMsg } from "./../../components";
import { useForm } from "react-hook-form";
import useFormState from "./../../hooks/useFormState";
import moment from "moment";

import SquareSvg from "./../../svg/square-svg";
import DetailsSvg from "./../../svg/details-svg";
import CodeSvg from "./../../svg/code-svg";

export default function StoreDetails() {
  const queryClient = useQueryClient();
  const { dispatch, notify, errorResponse, checkArray, userData } =
    React.useContext(AppContext);
  const { initCartAdd } = React.useContext(MasterContext);
  const { uuid } = useParams();
  const [quantity, setQuantity] = React.useState(1);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: `${userData?.firstname} ${userData?.lastname}`,
  });
  const { toggleFormState } = useFormState("form-review");
  const toggleReviewRef = React.useRef();

  const updateQty = (qty) => {
    if (qty < 1) return;
    setQuantity(qty);
  };

  const { isLoading, isFetching, refetch, isError, data } = useQuery(
    ["drug-details", uuid],
    () => drugDetails(uuid),
    {
      onError: (error) => errorResponse({ dispatch, error, exclude: [999] }),
    }
  );

  const {
    isLoading: reviewIsLoading,
    isFetching: reviewIsFetching,
    refetch: reviewRefetch,
    isError: reviewIsError,
    data: reviewData,
  } = useQuery(["reviews", uuid], () => reviews(uuid));

  React.useEffect(() => {
    return () => {
      setQuantity(1);
    };
  }, []);

  const { mutate: onSubmitReview } = useMutation(
    (values) => reviewAdd(values),
    {
      onSuccess: () => {
        notify("success", "Review Submitted", "Thank you for your review!");
      },
      onError: (error) => errorResponse({ error, dispatch }),
      onSettled: async () => {
        toggleFormState(false);
        reset();
        toggleReviewRef.current.checked = false;
        await queryClient.refetchQueries(["reviews", uuid]);
      },
    }
  );

  const onSubmit = (data) => {
    toggleFormState(true, "submitting...");
    onSubmitReview({ ...data, drug_uuid: uuid });
  };

  const PageLoading = () => (
    <>
      <div className="container-max clearfix sd-main-top">
        <div className="sd-img-box" style={{ padding: "30px 0 30px 30px" }}>
          <SquareSvg />
        </div>
        <div className="sd-content">
          <DetailsSvg />
        </div>
      </div>
    </>
  );

  return (
    <div className="store-details-container">
      {isLoading ? (
        <PageLoading />
      ) : (
        <>
          {isError && (
            <div className="p-5">
              <PlaceholderStatus onClick={refetch} />
            </div>
          )}

          {!isError && data === null && <Redirect to="/doctors" />}

          {!isError && data && (
            <>
              <div className="row container-max clearfix sd-main-top">
                <div className="col-md-6 sd-img-box">
                  <img
                  
                  
                    src={
                      data?.image ||
                      `https://www.gimplearn.net/funimage.php?q=${data?.name
                        ?.split(" ")
                        .join("_")}`
                    }
                    alt={data?.name}
                  />
                </div>


                <div className="col-md-6 sd-content">
                  <div className="sd-1">{data?.name} </div>
                  <div className="sd-2">
                    <Currency value={data?.price} />
                  </div>

                  {/* {data?.description && (<div className="sd-3" dangerouslySetInnerHTML={{__html: (data?.description)}}></div>)} */}
                  <div className="text-justify">Description: {data?.description}</div>
                  <br />
                  <div className="sd-action-box-container">
                    <h6>Quantity</h6>
                    <div className="sd-action-box">
                      <div className="sd cart-item-vol">
                        <i
                          onClick={() => updateQty(quantity - 1)}
                          className="dripicons-minus"
                        ></i>
                        <div>{quantity}</div>
                        <i
                          onClick={() => updateQty(quantity + 1)}
                          className="dripicons-plus"
                        ></i>
                      </div>
                      <button
                        onClick={() =>
                          initCartAdd({ drug_id: data.id, quantity })
                        }
                        type="button"
                        className="btn btn-secondary btn-lg"
                      >
                        {" "}
                        Add to Cart
                        <i className="fal fa-shopping-cart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container sd-container">
                <div id="accordion" className="accordion-container">
                  <div className="card">
                    <div className="card-header" id="headingOne">
                      <span
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-controls="collapseOne"
                        aria-expanded="false"
                        className="collapsed"
                      >
                        PRODUCT DESCRIPTION
                      </span>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <ul className="list-styled">
                          <li>Brand: {data?.brand}</li>
                          <li>Category: {data?.category?.name}</li>
                          <li>Dosage Type: {data?.dosage_type}</li>
                          <li>
                            Price: <Currency value={data?.price} />
                          </li>
                          <li>Availability: Available</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <div className="card">
                    <div className="card-header" id="headingTwo">
                      <span
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-controls="collapseTwo"
                        aria-expanded="true"
                      >
                        PRODUCT REVIEW
                      </span>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse show"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        {reviewIsLoading ? (
                          <CodeSvg />
                        ) : (
                          <div className="container-width-md container-review">
                            {reviewIsError && (
                              <PlaceholderStatus onClick={refetch} />
                            )}

                            {reviewData && (
                              <>
                                <div className="text-center">
                                  <input
                                    type="checkbox"
                                    name="toggle-review"
                                    id="toggle-review"
                                    ref={toggleReviewRef}
                                  />
                                  <label
                                    htmlFor="toggle-review"
                                    className="btn btn-toggle-review btn-inverse btn-sm btn-secondary"
                                  ></label>

                                  <div className="container-width-sm review-form">
                                    <form
                                      id="form-review"
                                      onSubmit={handleSubmit(onSubmit)}
                                    >
                                      <div className="form-group form-group-sm">
                                        <label>Name</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          {...register("name", {
                                            required: "Name is required!",
                                          })}
                                          placeholder="Name"
                                        />
                                        <ErrorMsg errors={errors} name="name" />
                                      </div>

                                      <div className="form-group">
                                        <label>Write your review here:</label>
                                        <textarea
                                          {...register("review", {
                                            required: "Review is required!",
                                          })}
                                          placeholder="Enter Message"
                                          className="form-control"
                                          cols="30"
                                          rows="5"
                                        ></textarea>
                                        <ErrorMsg
                                          errors={errors}
                                          name="review"
                                        />
                                      </div>

                                      <div className="row">
                                        <div className="col-md-6 flex-left-center rating-select">
                                          <fieldset className="rating">
                                            {[...Array(5)].map((_, i) => {
                                              const index = 5 - i;
                                              return (
                                                <>
                                                  <input
                                                    type="radio"
                                                    id={`star${index}`}
                                                    value={index}
                                                    {...register("rating", {
                                                      required:
                                                        "Rating is required!",
                                                    })}
                                                  />
                                                  <label
                                                    className="full"
                                                    htmlFor={`star${index}`}
                                                  ></label>
                                                </>
                                              );
                                            })}
                                          </fieldset>
                                        </div>
                                        <div className="col-md-6">
                                          <button
                                            type="submit"
                                            className="btn btn-primary btn-lg btn-block btn-main"
                                          >
                                            Submit Review
                                          </button>
                                        </div>
                                      </div>
                                      <ErrorMsg errors={errors} name="rating" />
                                    </form>
                                  </div>
                                </div>

                                {reviewData?.data?.length === 0 && (
                                  <PlaceholderStatus text="No review for the medication yet!" />
                                )}

                                {checkArray(reviewData?.data) &&
                                  reviewData?.data.map((row) => {
                                    return (
                                      <div key={row.id} className="card-review">
                                        <div className="review-title">
                                          <span>
                                            <i className="la la-star"></i>
                                            <i className="la la-star"></i>
                                            <i className="la la-star"></i>
                                            <i className="la la-star"></i>
                                            <i className="la la-star text-muted"></i>
                                          </span>
                                        </div>

                                        <div className="mb-3">
                                          {row?.review}
                                        </div>

                                        <div className="review-source">
                                          <div className="rs-content">
                                            <div className="rs-name">
                                              {row?.name}
                                            </div>
                                            <div className="rs-state">
                                              <span>
                                                {moment(
                                                  row?.created_at
                                                ).fromNow()}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
