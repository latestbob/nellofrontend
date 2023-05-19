import React from 'react';
import { useLocation , Link } from 'react-router-dom';
import { PlaceholderStatus } from '../components';
import axios from 'axios';
import { useState, useEffect } from 'react';



function SearchPage(){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const services = queryParams.get('services');
    const locationValue = queryParams.get('location');

    const[searchedValue , setSearchedValue] = useState([]);


    React.useEffect(()=>{
        
     
       
        axios.get(`https://admin.asknello.com/api/getdoctorcenter?service=${services}&locationvalue=${locationValue}`, {
            

        }).then(response => {
           console.log(response)

           setSearchedValue(response.data)

        


        }).catch(error => {
            console.log(error)
        })

         
         
     },[]);


    


    return (
        <>
            {/* <h1>this is the search page</h1>

            <h4>Services : {services}</h4>
            <h4>Location : {locationValue}</h4> */}

        {
            searchedValue.length > 0 ? <div className='row'>

            {searchedValue.map((item, index) => (
                 
                 item.type == "center" ?   <div class="col-lg-4 col-md-4 col-6">
                 <div class="card-doc">
               <span class="img-container">
                   {/* <Link to={`/doctor/${data?.uuid}`}> */}
                       {/* <img src={data?.picture} alt={data.name} /> */}
                       <img src={item.logo} alt="" />
                   {/* </Link> */}
               </span>
     
                 <h5>{item.name}</h5>
         
                 <div class="cdl1">{item.city}</div>
                 <div class="cdl2">{item.center_type}</div>
                 <div class="cdl3">
                     <i class="la la-star"></i>
                     <i class="la la-star"></i>
                     <i class="la la-star"></i>
                     <i class="la la-star"></i>
                     <i class="la la-star"></i>
                 </div>
                 <Link to={{ pathname: '/appointment', state: {
                     "name": item.name,
                     "city": item.city,
                     "uuid": item.uuid,
                     "logo": item.logo
                 } }} className="btn btn-secondary btn-inverse btn-sm">
                     Schedule <span>&nbsp;Appointment</span>
                 </Link>
               </div>
             </div> :     <div class="col-lg-4 col-md-4 col-6">
        <div class="card-doc">
            <span class="img-container">
                <Link to=''>
                    {/* <img src={data?.picture} alt={data.name} /> */}
                    <img src={item?.picture}  alt="" />
                </Link>
            </span>

            
            
            {item?.aos == "Nurse" ? <h5>{item?.firstname} {item?.lastname}</h5> : <h5>{item?.title}. {item?.firstname} {item?.lastname}</h5> }
            
            <div class="cdl1">{item.aos}</div>
            <div class="cdl2">{item?.hospital}</div>
            <div class="cdl3">
                <i class="la la-star"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
                <i class="la la-star"></i>
            </div>
            <Link to={`/doctor/${item?.uuid}`} class="btn btn-secondary btn-inverse btn-sm">
                Book <span>&nbsp;Consultation</span>
            </Link>
        </div>
    </div>


             ))}
            
       



            
    

            </div> : <div><PlaceholderStatus text='No result found!' /></div>
        }
            
        </>
    );
}

export default SearchPage;