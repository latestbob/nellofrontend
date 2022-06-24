import * as React from "react";
import { Link } from "react-router-dom";
import { Currency } from "./../../components";

export default function StoreItem({ data, initCartAdd }) {
  return (
    <div className="col-lg-4 col-md-4 col-sm-6 store-item-container">
      <div className="store-item">
        <div className="store-item-img">
          <div class="store-item-actions">
            <div class="store-item-actions-content">
              <Link to={`/drug/${data?.uuid}`} class="btn btn-sm btn-inverse">
                View item
              </Link>
              <button
                class="btn btn-sm btn-secondary"
                onClick={() => initCartAdd({ drug_id: data.id, quantity: 1 })}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <Link to={`/drug/${data?.uuid}`}>
            <img
              src={
                data?.image ||
                `https://www.gimplearn.net/funimage.php?q=${data?.name
                  ?.split(" ")
                  .join("_")}`
              }
              alt={data.name}
            />
          </Link>
        </div>
        <div className="store-item-content">
          <div className="si-1">
            <Link to={`/drug/${data?.uuid}`}>{data.name}</Link>
          </div>
          <div className="si-2">{data?.category?.name}</div>
          <div className="si-3">
            <Currency value={data?.price || 0} />
          </div>
          <div className="mt-3">
            {data?.rating === 5 ? (
              <span className="star-group">
                <i class="la la-star rated"></i>
                <i class="la la-star rated"></i>
                <i class="la la-star rated"></i>
                <i class="la la-star rated"></i>
                <i class="la la-star rated"></i>
              </span>
            ) : data?.rating === 4 ? (
              <span className="star-group">
                <i class="la la-star rated"></i>
                <i class="la la-star rated"></i>
                <i class="la la-star rated"></i>
                <i class="la la-star rated"></i>
                <i class="la la-star"></i>
              </span>
            ) : data?.rating === 3 ? (
              <span className="star-group">
                <i class="la la-star rated"></i>
                <i class="la la-star rated"></i>
                <i class="la la-star rated"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
              </span>
            ) : data?.rating === 2 ? (
              <span className="star-group">
                <i class="la la-star rated"></i>
                <i class="la la-star rated"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
              </span>
            ) : data?.rating === 1 ? (
              <span className="star-group">
                <i class="la la-star rated"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
              </span>
            ) : (
              <span className="star-group">
                <i class="la la-star"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
