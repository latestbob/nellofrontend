import * as React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context';
import { Checkbox, Radio } from 'pretty-checkbox-react';
import { useForm } from "react-hook-form";
import { Currency, ItemQtyUpdate, StepsIndicator, ErrorMsg } from './../../components';

export default function Shipping({ tsDelivery, currentIndex, locations, checkoutRequest, initCheckoutPage,
    initCheckoutShipping, hash,summary,userData }) {
    const { register, setValue,handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

    React.useEffect(() => {
        console.log("register>>",userData);
        tsDelivery(false);
    }, [tsDelivery]);

    React.useEffect(() => {
        if (userData) {
            for (const [key, value] of Object.entries(userData)) {
                setValue(key, value, {
                    shouldValidate: true,
                    shouldDirty: true
                })
            }
        }
    }, [userData]);

    return (<>

        {currentIndex === 3 && (<>
            <div class="cart-header">
                <span class="link-ico link-ico-left cursor-pointer" onClick={() => initCheckoutPage('#checkout')}>
                    <i class="fas fa-chevron-left"></i> Back to Delivery Method
                </span>
            </div>

            <div class="cart-container">
                <form id="form-delivery" onSubmit={handleSubmit(initCheckoutShipping)}>
                    <div class="checkout-content-container">

                        <StepsIndicator currentIndex={currentIndex} />

                        
                        <div class="form-group">
                            {/* <label>First Name</label>  Send the firstname to hidden*/}
                            <input type="text"
                                {...register('firstname', {
                                    required: 'First name is required'
                                })}
                                class="form-control" placeholder="First Name"  />
                            <ErrorMsg errors={errors} name="firstname" />
                        </div>
                                {/* Set the customer last name to hidden  */}
                        <div class="form-group">
                            {/* <label>Last Name</label> */}
                            <input type="text"
                                {...register('lastname', {
                                    required: 'Last name is required'
                                })} class="form-control" placeholder="Last Name"   />
                            <ErrorMsg errors={errors} name="lastname" />
                        </div>

                        <div class="form-group">
                            <label>Shipping Address</label>
                            <input type="text"
                                {...register('shipping_address', {
                                    required: 'Shipping address is required'
                                })}
                                value={userData.address}
                                class="form-control" placeholder="Shipping Address" />
                            <ErrorMsg errors={errors} name="shipping_address" />
                        </div>

                        <div class="form-group">
                            <label>State</label>
                            {/* <input type="text"
                                {...register('shipping_address', {
                                    required: 'Shipping address is required'
                                })}
                                class="form-control" placeholder="Shipping Address" /> */}

                                <select  class="form-control">
                                    <option value="Lagos">Lagos</option>

                                </select>
                            
                        </div>


                        <div class="form-group">
                            <label>Delivery Location</label>
                            <select class="form-control"
                                {...register('location_id', {
                                    required: 'Delivery location is required'
                                })}>
                                <option value="">- Select City-</option>
                                {locations && locations.length > 0 && locations.map((row, index) => {
                                    return (<option key={index} value={row.id}>{row.name}</option>)
                                })}
                            </select>
                            <ErrorMsg errors={errors} name="location_id" />
                        </div>

                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="text"
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    minLength: {
                                        value: 11,
                                        message: "The phone must be between 11 and 16 digits"
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: "The phone must be between 11 and 16 digits"
                                    }
                                })}
                                class="form-control" placeholder="Phone Number" />
                            <ErrorMsg errors={errors} name="phone" />
                        </div>


                    </div>

                    <div class="cart-footer checkout">
                        <div class="checkout-summary">
                            <span>Order Total</span>
                            <div><Currency value={summary?.sub_total} /></div>
                        </div>
                        <div class="checkout-action">
                            <button type="submit"
                                class="btn btn-secondary btn-block btn-lg btn-main">Proceed to Payment</button>
                        </div>
                    </div>
                </form>
            </div>
        </>)}

    </>);
}