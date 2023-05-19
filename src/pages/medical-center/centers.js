import React from 'react';
import './centers.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PlaceholderStatus } from '../../components';





function Centers(){

    const[medical_center, setMedicalCenterss] = useState([]);
    const[location, setLocation] = useState("");

    const[name, setName] = useState("");

    const locationdata = useLocation();
    const data = locationdata.state;

    const[fetchedLocation , setFetcheLocation] = useState([]);

    React.useEffect(()=>{
        
        axios.get(`https://admin.asknello.com/api/facilitylocation`, {
            
        }).then(response => {
           console.log(response)

           setFetcheLocation(response.data)

        }).catch(error => {
            console.log(error)
        })
  
     },[]);


     const [searchTerm, setSearchTerm] = useState("");

  const filteredData = fetchedLocation.filter((item) =>
   searchTerm != item &&  item.toLowerCase().includes(searchTerm.toLowerCase())
  );



    
  
    
    React.useEffect(()=>{
        
      if(data){
        axios.get(`https://admin.asknello.com/api/nellomedcentername?specialization=${data.care_type}`, {
            

        }).then(response => {
           console.log(response)

           setMedicalCenterss(response.data)

            


        }).catch(error => {
            console.log(error)
        })
    
      }

      else{

     
       
        axios.get(`https://admin.asknello.com/api/nellogetmedcenters?location=${searchTerm}&name=${name}`, {
            

        }).then(response => {
           console.log(response)

           setMedicalCenterss(response.data)

            


        }).catch(error => {
            console.log(error)
        })
    
      }
         
         
     },[name,searchTerm]);

     


    
     function handleSubmit(e){
         e.preventDefault();
         

         axios.get(`https://admin.asknello.com/api/nellogetmedcenters?location=${searchTerm}&name=${name}`, {
                
    
        }).then(response => {
           console.log(response)

           setMedicalCenterss(response.data)

            


        }).catch(error => {
            console.log(error)
        })
        

     }

    

    return (
        <>
            <div className="searchboxcenter m-auto px-5 py-5 container">
             
        <form onSubmit={handleSubmit}>
  <div class="form-row align-items-center">
  <div class="col-sm-5 my-2">
  
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text nellocolorcenter"><i className="fa fa-search"></i></div>
        </div>
        <input onChange={function(e){
            setName(e.target.value)
        }}  value={name} type="text" class="form-control" id="inlineFormInputGroupUsername"style={{
          background:"white",
        }} placeholder="Healthcare Center Name" />
      </div>
    </div>

    
    {/* <div class="col-sm-5 my-2">
      
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text nellocolorcenter"><i className="fa fa-map"></i></div>
        </div>
        <input 
        // onChange={function(e){
            
        //     setLocation(e.target.value)
        // }} 
        
        // value={location} 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}

        
        type="text" class="form-control" id="inlineFormInputGroupUsername"style={{
          background:"white",
        }} placeholder="Choose A Location" />
      </div>
    </div> */}


    <div class="col-sm-5 my-2">
      
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text nellocolorcenter"><i className="fa fa-map"></i></div>
        </div>
        <input 
      
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}

        
        type="text" class="form-control" id="inlineFormInputGroupUsername"style={{
          background:"white",
        }} placeholder="Choose A Location" />
        
      </div>
      {searchTerm && filteredData.length > 0 && 
                <ul className='searchedList my-3 rounded'>
                    {filteredData.map((item, index) => (
                    <li onClick={function(e){

                        
                        setSearchTerm(item);
                    }} className='searchItem font-weight-bold' key={index}>{item}</li>
                    ))}
                </ul>

                    }
    </div>

    

    
    {/* <div class="col-auto my-1">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="autoSizingCheck2">
        <label class="form-check-label" for="autoSizingCheck2">
          Remember me
        </label>
      </div>
    </div> */}
    <div class="col-auto my-1">
      <button type="submit" class="btn btn-primary py-3 px-5">SEARCH</button>
    </div>


  

    {/* {
      searchTerm && filteredData.length > 0 && <div className='col-md-4 m-auto bg-light rounded py-2 px-2 filterdivs'>
      {filteredData.map((item,index) => (
      <div onClick={function(){
        //setLocation(item)
        setSearchTerm(item)
      }} className="my-2 filterlocation" key={index}>{item} </div> 
    ))}

  </div>
    }
         */}
   

  </div>
</form>


    




        </div>


 {medical_center.length > 0 ? <div className='row'>

{medical_center.map(function(e){
    return (
        <div class="col-lg-4 col-md-4 col-6">
<div class="card-doc">
    <span class="img-container">
        {/* <Link to={`/doctor/${data?.uuid}`}> */}
            {/* <img src={data?.picture} alt={data.name} /> */}
            <img src={e.logo} alt="" />
        {/* </Link> */}
    </span>

    <h5>{e.name}</h5>
    
    <div class="cdl1">{e.city}</div>
    <div class="cdl2">{e.center_type}</div>
    <div class="cdl3">
        <i class="la la-star"></i>
        <i class="la la-star"></i>
        <i class="la la-star"></i>
        <i class="la la-star"></i>
        <i class="la la-star"></i>
    </div>
    <Link to={{ pathname: '/appointment', state: {
        "name": e.name,
        "city": e.city,
        "uuid": e.uuid,
        "logo": e.logo
    } }} className="btn btn-secondary btn-inverse btn-sm">
        Schedule <span>&nbsp;Appointment</span>
    </Link>
</div>
</div>
    );
})}


</div>:<div><PlaceholderStatus text='No result found!' /></div>}
   
        </>
    );
}

export default Centers;