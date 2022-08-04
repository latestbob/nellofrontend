import * as React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context';
import { Checkbox, Radio } from 'pretty-checkbox-react';
import { useForm } from "react-hook-form";
import { Currency, ItemQtyUpdate, StepsIndicator, ErrorMsg } from './../../components';
import { PaystackButton } from 'react-paystack';
import { PrescriptionContext } from "../../context/Prescription";


export default function Shipping({ currentIndex, checkoutRequest, summary, initCoupon, paymentConfig, initCheckoutPage, tsDelivery }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const {prePrice, setPriPrice} = React.useContext(PrescriptionContext);
    React.useEffect(() => {
        //console.log(summary, 'summary...')
        console.log('checkoutrequest', checkoutRequest?.delivery_type);
        console.log(summary?.myvalue);
    }, [summary])

    return (<>

        {currentIndex === 4 && (<>
            <div class="cart-header">
                <span class="link-ico link-ico-left cursor-pointer"
                    onClick={() => checkoutRequest?.delivery_method === 'pickup'
                        ? initCheckoutPage('#checkout') : initCheckoutPage('#checkout-shipping')}>
                    <i class="fas fa-chevron-left"></i>
                    {checkoutRequest?.delivery_method === 'pickup' ? 'Back to Delivery Method' : 'Back to Shipping Address'}
                </span>
            </div>

            <div class="cart-container">
                <div class="checkout-content-container">

                    <StepsIndicator currentIndex={currentIndex} />

                    <div class="summary mb-4">
                        {checkoutRequest?.delivery_method === 'shipping' && (<>
                            <div>{checkoutRequest?.firstname} {checkoutRequest?.lastname}</div>
                            <div>{checkoutRequest?.shipping_address}</div>
                        </>)}

                    </div>

                    <div class="form-group-coupon pb-4 mb-4 border-bottom">
                        <form id="form-apply-coupon" onSubmit={handleSubmit(initCoupon)}>
                            <span>Enter Coupon Code</span>
                            <div class="row row-mini">
                                <div class="col-8">
                                    <input type="text" class="form-control"
                                        {...register('coupon_code', {
                                            required: 'Coupon code is required'
                                        })} placeholder="Coupon Code" />
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-primary btn-block btn-lg btn-main">Apply</button>
                                </div>
                            </div>
                            <ErrorMsg errors={errors} name="coupon_code" />
                        </form>
                    </div>

                    <h4 class="h-bordered">Summary</h4>

                    <div>
                        <div class="summary-inline-2">
                            <div>Subtotal</div><div><Currency value={summary?.sub_total} /></div>
                        </div>
                        {summary?.delivery &&
                            (<div class="summary-inline-2">
                                <div>Delivery</div><div><Currency value={summary?.delivery} /></div>
                            </div>)}

                        {prePrice > 0 ? 
                    <div class="summary-inline-2">
                    <div>Prescription Charge</div><div><Currency value={prePrice} /></div>
                </div> : <div> </div>    
                    }
                        {summary?.discount &&
                            (<div class="summary-inline-2">
                                <div>Discount</div><div>- <Currency value={summary?.discount} /></div>
                            </div>)}
                        <div class="summary-inline-2">
                            <div>Transaction Charge</div><div><Currency value={summary?.transaction_charge} /></div>
                        </div>
                        <div class="summary-inline-2">
                            <div>Order Total</div>
                            <div class="font-size-18 font-weight-bold text-sky">
                                <Currency value={(summary?.total) + prePrice} />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="cart-footer checkout">
                    <PaystackButton
                        className="btn btn-secondary btn-block btn-lg"
                        {...paymentConfig}
                    />
                </div>
            </div>
        </>)}

    </>);
}