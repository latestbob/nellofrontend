import * as React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context';
import { Checkbox, Radio } from 'pretty-checkbox-react';
import { useForm } from "react-hook-form";
import { Currency, ItemQtyUpdate, StepsIndicator, ErrorMsg } from './../../components';
import { DeliveryPriceContext } from '../../context/DeliveryPrice';
import { useState , useEffect } from 'react';

import moment from 'moment';


export default function Delivery({ pathname, currentIndex, checkoutRequest,
    pickupLocations, initCheckoutMethod, hash, summary }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        criteriaMode: "all",
        defaultValues: {
            delivery_method: checkoutRequest.delivery_method,
            delivery_type: checkoutRequest.delivery_type,
        }
    });

    const {deliverprice} = React.useContext(DeliveryPriceContext);
    const delivery_method = watch('delivery_method');

    React.useEffect(() => {
        //console.log(checkoutRequest, 'Delivery__checkoutRequest...')
    }, [checkoutRequest]);


    //Get Time in moment 
    const [datetime , setDateTime] = useState(new Date());
    const [todaytime , setTodayTime] = useState("");

    const[showToday , setTodayDelivery] = useState(true);


    // React.useEffect(() => {
       
    //     setTodayTime(datetime.getHours());

    //     console.log(todaytime);
        

    //   });


    useEffect(()=>{
        setTodayTime(datetime.getHours());
        console.log(todaytime);

        if(todaytime > 20){
            setTodayDelivery(false);
            console.log(showToday);
        }

        else{
            setTodayDelivery(true);
            console.log(showToday);
        }
    })
     

    
    


    return (<>

        {currentIndex === 2 && (<>
            <div class="cart-header">
                <Link class="link-ico link-ico-left" to={`${pathname}#cart`}>
                    <i class="fas fa-chevron-left"></i> Back to Cart
                </Link>
            </div>

            <div class="cart-container">
                <form id="form-delivery" onSubmit={handleSubmit(initCheckoutMethod)}>
                    <div class="checkout-content-container">

                        <StepsIndicator currentIndex={currentIndex} />

                        <div class="delivery-options">
                            <div className="mb-2">
                                <Radio color="primary-o" name="delivery_method" value="shipping"
                                    {...register('delivery_method')}
                                    bigger>
                                    <span className="font-weight-bold text-sky">Door Delivery</span>
                                </Radio>
                            </div>

                            {delivery_method === 'shipping' && (<>
                                <div class="font-weight-normal font-size-12 text-secondary mb-2">
                                    Same day and next day delivery only available in Lagos
                                </div>

                                <div class="btn-group btn-group-toggle delivery-door-options mb-2" data-toggle="buttons">
                                   
                                  {showToday && 
                                       <label class={`btn btn-default ${checkoutRequest.delivery_type === 'same_day' ? 'active' : ''}`}>
                                       <input type="radio" {...register('delivery_type')}
                                           value="same_day" checked={checkoutRequest.delivery_type === 'same_day'} /> Same day
                                   </label>
                                  
                                  }
                                    <label class={`btn btn-default ${checkoutRequest.delivery_type === 'next_day' ? 'active' : ''}`}>
                                        <input type="radio" {...register('delivery_type')}
                                            value="next_day" checked={checkoutRequest.delivery_type === 'next_day'} /> Next day
                                    </label>
                                    {/* <label class={`btn btn-default ${checkoutRequest.delivery_type === 'standard' ? 'active' : ''}`}>
                                        <input type="radio" {...register('delivery_type')}
                                            value="standard" checked={checkoutRequest.delivery_type === 'standard'} /> Standard shipping(3-5 Days)
                                    </label> */}
                                </div>
                                {
                                    showToday && <div className="font-size-14">
                                    Delivery in <b class="text-secondary">2hrs 56m 37s</b> 
                                </div>
                                }
                            </>)}
                        </div>

                        <div class="delivery-options">
                            <div className="mb-3">
                                <Radio
                                    {...register('delivery_method')}
                                    color="primary-o" name="delivery_method" value="pickup" bigger>
                                    <span className="font-weight-bold text-sky">Pickup Center (Free)</span>
                                </Radio>
                            </div>

                            {delivery_method === 'pickup' && (<div class="form-group">
                                <select class="form-control"
                                    {...register('pickup_location_id', {
                                        required: 'Pickup location is required'
                                    })}>
                                    <option value="">- Select Pickup Center -</option>
                                    {pickupLocations && pickupLocations.length > 0 && pickupLocations.map((row, index) => {
                                        return (<option key={index} value={row.id}>{row?.name}, {row?.location?.name}</option>)
                                    })}
                                </select>
                                <ErrorMsg errors={errors} name="pickup_location_id" />
                            </div>)}
                        </div>

                    </div>

                    <div class="cart-footer checkout">
                        <div class="checkout-summary">
                            <span>Order Total</span>
                            <div><Currency value={summary?.sub_total} /></div>
                        </div>
                        <div class="checkout-action">
                            <button type="submit" class="btn btn-secondary btn-block btn-lg btn-main">Proceed</button>
                        </div>
                    </div>
                </form>
            </div>
        </>)}

    </>);
}