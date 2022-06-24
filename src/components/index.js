import * as React from "react";
import { ErrorMessage } from "@hookform/error-message";
import AppContext from "../context";
import MasterContext from "../layout/context";
import ReactPaginate from "react-paginate";
import NumberFormat from "react-number-format";

export const ErrorMsg = ({ errors, name }) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <p className="text-danger font-size-12 mb-0">{message}</p>
      )}
    />
  );
};

export function Currency({ value }) {
  return (
    <NumberFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      decimalScale={2}
      fixedDecimalScale={true}
      renderText={(value) => <>&#8358;{value}</>}
    />
  );
}

export function NumFormat({ value }) {
  return (
    <NumberFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      //decimalScale={2}
      //fixedDecimalScale={true}
      //renderText={value => <>&#8358;{value}</>}
    />
  );
}

export const Paginate = ({ data, onPageChange, pageRangeDisplayed = 2 }) => {
  return (
    <ReactPaginate
      pageCount={data?.last_page}
      //initialPage={data?.current_page - 1}
      //forcePage={data?.current_page - 1}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={2}
      containerClassName="pagination justify-content-end mb-0 mt-1"
      previousLabel="Previous"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextLabel="Next"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      activeClassName="active"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      disabledClassName="disabled"
      onPageChange={onPageChange}
      disableInitialCallback={true}
    />
  );
};

export const disableForms = (id, status) => {
  var form = document.getElementById(id);
  var allElements = form.elements;
  for (var i = 0, l = allElements.length; i < l; ++i) {
    // allElements[i].readOnly = true;
    if (status) allElements[i].disabled = true;
    else allElements[i].disabled = false;
  }
};

export function randomString(length = 10) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function StepsIndicator({ currentIndex }) {
  const data = [
    { index: 1, label: "Account", title: "Account" },
    { index: 2, label: "Method", title: "Delivery Method" },
    { index: 3, label: "Shipping", title: "Shipping Address" },
    { index: 4, label: "Payment", title: "Payment" },
  ];
  return (
    <>
      <ul className="steps-block clearfix">
        {data.map((dt, index) => {
          const current = currentIndex === dt.index ? "current" : "";
          const active = dt.index <= currentIndex ? "active" : "";
          return (
            <li key={index} className={`${active} ${current}`}>
              <span></span>
              <p>{dt.label}</p>
            </li>
          );
        })}
      </ul>

      <h4 class="h-bordered">{data[currentIndex - 1]?.title}</h4>
    </>
  );
}

export function SelectDays() {
  return [...Array(31)].map((_, i) => {
    const val = String(i + 1).padStart(2, "0");
    return (
      <option key={i} value={val}>
        {val}
      </option>
    );
  });
}

export function SelectMonths() {
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "Febuary" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  return months.map(({ value, label }, index) => (
    <option key={index} value={String(value).padStart(2, "0")}>
      {label}
    </option>
  ));
}

export function SelectYears({ range = 70 }) {
  const now = new Date().getUTCFullYear();
  const years = Array(now - (now - range))
    .fill("")
    .map((v, idx) => now - idx);
  return years.map((year, index) => (
    <option key={index} value={String(year)}>
      {year}
    </option>
  ));
}

export function ItemQtyUpdate({ quantity, drug_id }) {
  const { initCartUpdate } = React.useContext(MasterContext);
  return (
    <>
      <i
        onClick={() => initCartUpdate(quantity - 1, drug_id)}
        class="dripicons-minus"
      ></i>
      <div>{quantity}</div>
      <i
        onClick={() => initCartUpdate(quantity + 1, drug_id)}
        class="dripicons-plus"
      ></i>
    </>
  );
}

export function Backdrop({
  show = false,
  text,
  opacity = 0.37,
  loader = true,
}) {
  return show ? (
    <div
      className="cart-backdrop"
      style={{ backgroundColor: `rgba(225, 225, 225, ${opacity})` }}
    >
      <div>
        {loader && (
          <div className="loader">
            <svg className="circular-loader" viewBox="25 25 50 50">
              <circle
                className="loader-path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="#1997CF"
                strokeWidth="2"
              />
            </svg>
          </div>
        )}
        {text && <div className="mt-3">loading, please wait...</div>}
      </div>
    </div>
  ) : (
    ""
  );
}

export function PlaceholderStatus({ text, onClick, retryText = "Try Again" }) {
  return (
    <div className="empty-error-container">
      <i class="fal fa-frown"></i>
      <p>{text ? text : "There seems to be an error, please retry!!"}</p>
      {onClick && (
        <button
          type="button"
          onClick={onClick}
          class="btn btn-secondary btn-sm btn-inverse"
        >
          {retryText}
        </button>
      )}
    </div>
  );
}
