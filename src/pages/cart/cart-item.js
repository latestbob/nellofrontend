import * as React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { drugs, cartAdd } from '../../Services';
import AppContext from '../../context';
import useRouter from './../../hooks/useRouter';
import { Currency } from './../../components';



export default function CartItem({ data }) {
    const { dispatch, baseUrl } = React.useContext(AppContext);
    let { id, drug_id, price, quantity, drug } = data;

    return (<div class="cart-item">
        <div className="cart-item-img-box">
            {/* <img src={drug?.image} alt={drug?.name} /> */}
        </div>
        <div class="cart-item-content">
           

            <div class="cic-1">{drug?.name}</div>
            
            <div class="cic-2">Total: <Currency value={price} /></div>
            <div class="cart-item-action-box">
                <div class="cart-item-vol">
                    <i class="dripicons-minus"></i>
                    <div>{quantity}</div>
                    <i class="dripicons-plus"></i>
                </div>
                <div class="cart-item-del">
                    <img src="./assets/images/ico-trash-empty.svg" alt="trash-empty" />
                </div>
            </div>
        </div>
    </div>);
}