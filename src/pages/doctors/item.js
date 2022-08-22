import * as React from 'react';
import { Link } from 'react-router-dom';
import { Currency } from '../../components';


export default function StoreItem({ data }) {
    return (<div class="col-lg-4 col-md-4 col-6">
        <div class="card-doc">
            <span class="img-container">
                <Link to={`/doctor/${data?.uuid}`}>
                    {/* <img src={data?.picture} alt={data.name} /> */}
                    <img src="./assets/images/male-doctor.jpg" alt="" />
                </Link>
            </span>
            <h5>{data?.firstname} {data?.lastname}</h5>
            <div class="cdl1">{data?.vendor?.name}</div>
            <div class="cdl2">{data?.aos}</div>
            <div class="cdl3">
                <i class="la la-star"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
            </div>
            <Link to={`/doctor/${data?.uuid}`} class="btn btn-secondary btn-inverse btn-sm">
                Book <span>&nbsp;Consultation</span>
            </Link>
        </div>
    </div>);
}