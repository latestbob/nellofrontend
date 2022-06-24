import * as React from "react";
import { Link } from "react-router-dom";
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
  useMutation,
} from "react-query";
import { drugs, drugCategories } from "../../Services";
import {
  CheckboxCategories,
  CheckboxRatings,
  RadioPrescription,
} from "./../../components/drugs-components";
import { Paginate, PlaceholderStatus } from "./../../components";

import AppContext from "../../context";
import MasterContext from "./../../layout/context";
import useRouter from "./../../hooks/useRouter";
import MultiRangeSlider from "./../../components/MultiRangeSlider";
import { useForm } from "react-hook-form";
import useModal from "../../hooks/useModal";
import { Modal } from "react-bootstrap";

import Item from "./item";
import SearchBar from "./../../svg/search-bar-svg";
import SidebarSvg from "./../../svg/sidebar-svg";
import DrugItemSvg from "./../../svg/drug-item-svg";
import DataTab from "./../../svg/data-tab-svg";
import { ascendingSort } from "../../utils/dataSort";

export default function Store({ history }) {
  const {
    dispatch,
    setQueryString,
    useQueryString,
    currentPath,
    notify, momentAgo, capitalize,
    errorResponse, formatDate, checkArray 
  } = React.useContext(AppContext);
  const { initCartAdd } = React.useContext(MasterContext);
  const [queryName] = React.useState("drugs");
  const queryClient = useQueryClient();
  const router = useRouter();
  const [sortType, setSortType] = React.useState("none");

  const [query, setQuery] = React.useState(router.query);
  const {
    categories: slCategories,
    prescription: slPrescription,
    ratings: slRatings,
    search,
    price_min,
    price_max,
    page,
  } = router.query;

  const [categories, setCategories] = React.useState([]);
  const [selectedCategories, setSelectedCategories] = React.useState(
    (slCategories &&
      slCategories.length > 0 &&
      slCategories.split(",").map((d) => parseInt(d))) ||
      null
  );
  const [selectedRatings, setSelectedRatings] = React.useState(
    (slRatings &&
      slRatings.length > 0 &&
      slRatings.split(",").map((d) => parseInt(d))) ||
      null
  );
  const [selectedPriceRange, setSelectedPriceRange] = React.useState(null);
  const [searchRange, setSearchRange] = React.useState(false);
  const [selectedPrescription, setSelectedPrescription] = React.useState(
    slPrescription || null
  );

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { search },
  });
  const {
    modalState: mdSearchState,
    closeModal: mdSearchClose,
    showModal: mdSearchShow,
  } = useModal();

  /* Page data */
  const { isLoading, refetch, data, isError } = useQuery(
    [queryName, query],
    () => drugs(setQueryString(query)),
    {
      keepPreviousData: true,
      staleTime: 5000,
      onError: (error) =>
        errorResponse({ error, history, dispatch, exclude: [999] }),
    }
  );

  useQuery("drug-categories", drugCategories, {
    onError: (error) => setCategories([]),
    onSuccess: (data) => setCategories(data),
  });

  const updatePriceRange = React.useCallback((min, max) => {
    setSelectedPriceRange(`${min}---${max}`);
    setSearchRange(true);
  }, []);

   /* handle paginate data */
   const handlePageClick = ({ selected }) => {
    const page = selected + 1;
    let nQ = { ...query, page };
    setQuery(nQ);
    history.push(`${currentPath}${setQueryString(nQ)}`);
  }

  React.useEffect(() => {
    if (sortType === "lowest price") {
      history.push(
        `${currentPath}${setQueryString({
          ...query,
          sort_by: "price_min",
        })}`
      );
    }
    if (sortType === "highest price") {
      history.push(
        `${currentPath}${setQueryString({
          ...query,
          sort_by: "price_max",
        })}`
      );
    }
    if (sortType === "most popular") {
      history.push(
        `${currentPath}${setQueryString({
          ...query,
          sort_by: "rating",
        })}`
      );
    }
  }, [sortType]);

  React.useEffect(() => {
    if (selectedPriceRange) {
      let getRange = selectedPriceRange.split("---");
      const min = parseInt(getRange[0]);
      const max = parseInt(getRange[1]);

      history.push(
        `${currentPath}${setQueryString({
          ...query,
          price_min: min,
          price_max: max,
        })}`
      );

      if (searchRange && min === 100 && max === 100000) {
        setSearchRange(false);
        const { price_min, price_max, ...restRange } = query;
        history.push(`${currentPath}${setQueryString(restRange)}`);
      }
    }
  }, [selectedPriceRange]);

  React.useEffect(() => {
    setQuery(router.query);
    /* Clean up */
    return () => setQuery({});
  }, [router.query]);

  const initSearch = ({ search }) => {
    history.push(`${currentPath}${setQueryString({ ...query, search })}`);
  };

  const clearSearch = () => {
    const { search, ...restQ } = query;
    setValue("search", "");
    history.push(`${currentPath}${setQueryString(restQ)}`);
  };

  const resetPrescription = () => {
    const { prescription, ...restPresc } = query;
    history.push(`${currentPath}${setQueryString(restPresc)}`);
  };

  const initSearchModalClose = () => {
    const getRange = selectedPriceRange.split("---");
    const min = parseInt(getRange[0]);
    const max = parseInt(getRange[1]);
    mdSearchClose();

    /* setTimeout(() => {
            //console.log(min, max, 'initSearchModalClose... ');
            updatePriceRange(min, max);
        }, 5000); */
  };

  React.useEffect(() => {
    if (selectedCategories && selectedCategories.length > 0) {
      history.push(
        `${currentPath}${setQueryString({
          ...query,
          categories: selectedCategories,
        })}`
      );
    }

    if (selectedCategories && selectedCategories.length === 0) {
      const { categories, ...restCategories } = query;
      setSelectedCategories(null);
      history.push(`${currentPath}${setQueryString(restCategories)}`);
    }
  }, [selectedCategories]);

  React.useEffect(() => {
    if (selectedRatings && selectedRatings.length > 0) {
      history.push(
        `${currentPath}${setQueryString({
          ...query,
          rating: selectedRatings,
        })}`
      );
    }

    if (selectedRatings && selectedRatings.length === 0) {
      const { ratings, ...restRatings } = query;
      setSelectedRatings(null);
      history.push(`${currentPath}${setQueryString(restRatings)}`);
    }
  }, [selectedRatings]);

  React.useEffect(() => {
    if (selectedPrescription) {
      history.push(
        `${currentPath}${setQueryString({
          ...query,
          prescription: selectedPrescription,
        })}`
      );
    }
  }, [selectedPrescription]);

  const PageLoading = () => (
    <>
      <div className="mb-4">
        <SearchBar />
      </div>

      <div className="store-container">
        <div
          className="store-side-wrapper"
          style={{ border: "none", padding: 0 }}
        >
          <SidebarSvg />
        </div>
        <div className="store-main">
          <div className="mb-3">
            <DataTab />
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <DrugItemSvg />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <DrugItemSvg />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <DrugItemSvg />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // console.log("dat>XX>>", ascendingSort(data?.data, "rating"));

  return (
    <div className="content-body container container-layout">
      {isLoading ? (
        <PageLoading />
      ) : (
        <>
          {isError && (
            <div className="p-5">
              <PlaceholderStatus onClick={refetch} />
            </div>
          )}

          {!isError && data?.data && (
            <>
              <div className="header-container store">
                <div className="hc-title">
                  Order Medication
                  <br />
                  We have the Best Price for You.
                </div>
                <div className="input-container">
                  <form
                    id="form-search-drugs"
                    onSubmit={handleSubmit(initSearch)}
                  >
                    <input
                      type="text"
                      {...register("search")}
                      className="form-control"
                      placeholder="Enter Name of Medication"
                    />
                    {search ? (
                      <span onClick={clearSearch}>
                        <i className="fal fa-times"></i>
                      </span>
                    ) : (
                      <button type="submit"></button>
                    )}
                  </form>
                </div>
              </div>

              <div className="store-container">
                <div className="store-side-wrapper">
                  <div className="store-side">
                    <section>
                      <h5 className="flex-space">Categories</h5>
                      <CheckboxCategories
                        categories={categories}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                      />
                    </section>

                    <section className="mb-5">
                      <h5 className="flex-space mb-4">Price</h5>
                      <MultiRangeSlider
                        min={100}
                        max={100000}
                        onChange={({ min, max }) => updatePriceRange(min, max)}
                      />
                    </section>

                    <section>
                      <h5 className="flex-space">
                        <span>Ratings</span>
                        <Link className="dropdown-link text-reset" to="#">
                          reset
                        </Link>
                      </h5>

                      <CheckboxRatings
                        selectedRatings={selectedRatings}
                        setSelectedRatings={setSelectedRatings}
                      />
                    </section>

                    <section>
                      <h5 className="flex-space">
                        <span>Prescription</span>
                        <span
                          onClick={resetPrescription}
                          className="text-reset"
                        >
                          reset
                        </span>
                      </h5>

                      <RadioPrescription
                        selectedPrescription={selectedPrescription}
                        setSelectedPrescription={setSelectedPrescription}
                      />
                    </section>
                  </div>
                </div>

                <div className="store-main">
                  <div className="flex-space mb-4">
                    <div className="store-filter-container">
                      <span className="sfc-box" onClick={mdSearchShow}>
                        <i className="fas fa-filter"></i>
                      </span>
                      {data?.data && <span>{data?.total} Items Found</span>}
                    </div>
                    <div className="store-drop-container">
                      Sort By: <label>{sortType}</label>
                      <i className="fas fa-chevron-down"></i>
                      <div className="sdc-dropdown">
                        <Link
                          onClick={() => {
                            setSortType("none");
                          }}
                          className="dropdown-link"
                          to="#"
                        >
                          None
                        </Link>
                        <span
                          onClick={() => {
                            setSortType("most popular");
                          }}
                          className="dropdown-link"
                        >
                          Most Popular
                        </span>
                        <span
                          onClick={() => {
                            setSortType("lowest price");
                          }}
                          className="dropdown-link"
                        >
                          Lowest Price
                        </span>
                        <span
                          onClick={() => {
                            setSortType("highest price");
                          }}
                          className="dropdown-link"
                        >
                          highest Price
                        </span>
                      </div>
                    </div>
                  </div>

                  {data?.data && data?.data?.length === 0 && (
                    <div className="p-5">
                      <PlaceholderStatus text="No result found!" />
                    </div>
                  )}

                  {data?.data?.length > 0 && (
                    <div className="row">
                      {data?.data?.map((row) => (
                        <Item data={row} initCartAdd={initCartAdd} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {checkArray(data?.data) && (<div class="text-right">
          <Paginate data={data} onPageChange={handlePageClick} />
        </div>)}
            </>
          )}
          
        </>
      )}

      <Modal
        show={mdSearchState}
        onHide={initSearchModalClose}
        animation={false}
        size="lg"
        className="modal-store-filter"
      >
        <Modal.Body>
          <h5 className="h-bordered text-sky ico-left">
            <i
              onClick={initSearchModalClose}
              className="fas fa-arrow-left cursor-pointer"
              aria-label="Close"
            ></i>{" "}
            Filter
          </h5>

          <div className="msf-container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <section>
                  <h5 className="flex-space">Categories</h5>
                  <CheckboxCategories
                    categories={categories}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                  />
                </section>
              </div>
              <div className="col-lg-3 col-md-6">
                <section>
                  <h5 className="flex-space">Price</h5>
                  <MultiRangeSlider
                    min={500}
                    max={100000}
                    onChange={({ min, max }) => updatePriceRange(min, max)}
                  />
                </section>
              </div>
              <div className="col-lg-3 col-md-6">
                <section>
                  <h5 className="flex-space mt-3">Ratings</h5>
                  <CheckboxRatings
                    selectedRatings={selectedRatings}
                    setSelectedRatings={setSelectedRatings}
                  />
                </section>
              </div>
              <div className="col-lg-3 col-md-6">
                <section className="section-presc">
                  <h5 className="flex-space">Prescription</h5>
                  <RadioPrescription
                    selectedPrescription={selectedPrescription}
                    setSelectedPrescription={setSelectedPrescription}
                  />
                </section>
              </div>
            </div>
          </div>

          <div className="msf-btn-container">
            <button
              type="button"
              onClick={initSearchModalClose}
              className="btn btn-primary btn-sm mr-2"
            >
              Search
            </button>
            <button
              type="button"
              onClick={initSearchModalClose}
              className="btn btn-primary btn-inverse btn-sm"
            >
              Close
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
