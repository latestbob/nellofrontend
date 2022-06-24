import * as React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AppContext from '../../context';
import MasterAppContext from '../../layout/context';
import { Currency } from './../../components';


export default function Packages({ packages }) {
    const { dispatch, setTempDocUuid, tempDocUuid } = React.useContext(AppContext);
    const { modalPrice } = React.useContext(MasterAppContext);
    let { isLoading, isFetching, data, isError } = packages;
    let history = useHistory();

    React.useEffect(() => {
        //console.log(tempDocUuid, 'tempDocUuid....')
        return () => {
            setTempDocUuid(dispatch, null);
            //console.log('remove tempDocUuid....')
        }
    }, [tempDocUuid]);

    const initSubscribe = (index) => {
        modalPrice.closeModal();
        history.push({ pathname: '/subscriptions', state: { package_id: index, appointment: tempDocUuid } })
    }

    return (<>
        {!isLoading && !isFetching && !isError && data && data.length > 0 && data.map((row, index) => {
            const benefits = row?.benefits;
            return (<div key={index} class="col-lg-3 col-md-4 col-md-3 col-sm-6">
                <div class="ccard-3">
                    <h5><Currency value={row?.price} /> <span>/month</span></h5>
                    <h4>{row?.name}</h4>
                    <p>{row?.description}</p>
                    <hr />
                    <ul>
                        {benefits && benefits?.length > 0 && benefits.map((rowBenefit, indexBenefit) =>
                            <li key={indexBenefit}>{rowBenefit?.name}</li>)}
                    </ul>

                    <button type="button"
                        onClick={() => initSubscribe(index)}
                        class="btn btn-secondary btn-inverse btn-lg btn-block mt-4">SELECT PLAN</button>
                </div>
            </div>);
        })}
    </>);
}