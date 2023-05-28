import React,{ useState } from 'react';
import './onboard.css';

import { useHistory, Link } from 'react-router-dom';
import businessType from './businesstype';
import Interest from './interest';
import axios from 'axios';
import Swal from 'sweetalert2';




function Pharmacist(){
    const history = useHistory();
    // form values
    const[type , setType] = useState("");

    const[business_name , setBusinessName] = useState("");

    const[fullname, setFullName] = useState("");

    const[email , setEmail] = useState("");

    const[phone , setPhone] = useState("");

    const[interestList , setInterestList] = useState([]);

    const[others , setOthers] = useState("");




    // end of form values

    const[interestInput , setInterestInput] = useState("");
    const[showInterest , setShowInterest] = useState(false);
    const[showBtn , setShowBtn] = useState(true);


    

    const filteredType = businessType.filter((business) =>
     type != business && business.toLowerCase().includes(type.toLowerCase())
    );

    


    const filteredInterest = Interest.filter((ints) =>
     ints.toLowerCase().includes(interestInput.toLowerCase())
   );

   function handleSubmit(e){
        e.preventDefault();

        if(type && business_name && fullname && email && phone && interestList && others ){
            axios.post('https://admin.asknello.com/api/join', {
    
               
                type : type,
                business_name : business_name,
                fullname : fullname,
                email : email,
                phone : phone,
               interestList : interestList,
                others : others
                
    
            }).then(response => {
               console.log(response)
    
               if(response.data.status == "success"){
                   setShowBtn(false);
                   Swal.fire(
                    'Request Sent!',
                    `${response.data.message}`,
                    'success'
                  )
      
      
                  history.replace('/');
      
               }
    
            
    
    
            }).catch(error => {
                alert("Some Required Values are empty");
                setShowBtn(true);
            })
           }
    
           else{
               alert("Some Required Values are empty");
           }
        

        

   }

    return (
        <>
           
           <section className='onboarding row'>
               <div className='formdiv col-md-8 px-2'>

                   <div className='card rounded formdivcard'>
                       <p className='cardpara text-center'>Thank you for your interest in joining Nello. Once you provide the necessary information, a member of our team will reach out to you soon.</p>

                    
                       <form onSubmit={handleSubmit} className='py-3'>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                    <label for="inputEmail4">Type of Business <span className='text-danger font-weight-bold'>*</span></label>
                                    <input value={type} onChange={function(e){
                                        setType(e.target.value);
                                    }} type="text" class="form-control" />
                                      

     
                                          
                                    </div>
                                  
                                    <div class="form-group col-md-6">
                                    <label for="inputPassword4">Business Name <span className='text-danger font-weight-bold'>*</span></label>
                                    <input onChange={function(e){
                                        setBusinessName(e.target.value);
                                    }} value={business_name} type="text" class="form-control" placeholder='Enter the name of your business'/>
                                    </div>
                                </div>

                                {type && filteredType.length > 0 && 
                                            <ul className='searchedList'>
                                                {filteredType.map((item, index) => (
                                                <li onClick={function(e){

                                                    
                                                    setType(item);
                                                }} className='font-weight-bold searchItem' key={index}>{item}</li>
                                                ))}
                                            </ul>

                                                }


                                {/* email and full name */}

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                    <label for="inputEmail4">Full Name<span className='text-danger font-weight-bold'>*</span></label>
                                    <input onChange={function(e){
                                        setFullName(e.target.value)
                                    }} value={fullname} type="text" class="form-control"  placeholder='Enter your full name'/>
                                    </div>
                                    <div class="form-group col-md-6">
                                    <label for="inputPassword4">Email Address <span className='text-danger font-weight-bold'>*</span></label>
                                    <input onChange={function(e){
                                        setEmail(e.target.value)

                                    }} value={email}  type="email" class="form-control"  placeholder='Enter your email address'required/>
                                    </div>
                                </div>

                               


                                {/* phone number and inters */}

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                    <label for="inputEmail4">Phone Number<span className='text-danger font-weight-bold'>*</span></label>
                                    <input onChange={function(e){
                                        setPhone(e.target.value);
                                    }}  value={phone} type="text" class="form-control"  placeholder='Enter a phone number we can reach you on'/>
                                    </div>
                                    
                                </div>

                                <div className='form-row'>
                                <div class="form-group col-12">
                                    <label for="inputPassword4">Interest <span className='text-danger font-weight-bold'>*</span></label>
                                    <input onClick={
                                        function(e){
                                            setShowInterest(true);
                                        }
                                    } type="text" class="form-control" />
                                    </div>
                                </div>


                                {showInterest == true && filteredInterest.length > 0 && 
                                            <ul className='searchedList'>
                                                {filteredInterest.map((item, index) => (
                                                <li onClick={function(e){

                                                    
                                                    setInterestList([...interestList , item]);
                                                    setShowInterest(false);
                                                }} className='font-weight-bold searchItem' key={index}>{item}</li>
                                                ))}
                                            </ul>

                                 }


                    {interestList.map((list, index) => (
                        <p className='badge badge-info mx-1 my-1'key={index}>{list} <a onClick={function(e){
                            e.preventDefault();
                            const updatedInterest = [...interestList];
                            updatedInterest.splice(index, 1);
                            setInterestList(updatedInterest);
                        }} href='' className='symptomscancel text-light px-2 font-weight-bold'>x</a></p>
                    ))}



                                <div className='form-row'>
                                <div class="form-group col-12">
                                    <label for="inputPassword4">Additional information </label>
                                        <textarea onChange={function(e){
                                            setOthers(e.target.value);
                                        }} className='form-control'></textarea>
                                    </div>
                                </div>

                                <br/>
                                <br/>
                                

                                {
                          
                                 
                                    type && business_name && fullname && email && phone && interestList && others &&  <div className='text-center'>
                                   
                                   {showBtn &&  <button className='btn btn-success text-center font-weight-bold'>CLICK TO SUBMIT</button> }

                               </div>
                               

                                }
                               
                                
                                
                                </form>
                                                </div>

               </div>

               <div className='infodiv col-md-4'>

                   <img className='infoimage' src="https://asknello.com/assets/images/banner-img.svg" />


                    <div className='textdiv py-3'>
                        <h2 className='textdivheading'>For Support & Enquiry</h2>
                        <p className='textdivpara'>For any issues, enquiry or support, please fill in the <span className='font-weight-bold'style={{
                            color:"#1997cf",
                        }}><Link style={{
                            color:"#1997cf",
                        }} to={'/contact'}>contact form</Link></span></p>
                        <p>support@asknello.com,  +234 90700 41292</p>

                    </div>
               </div>

               

           </section>
        </>
    );
}

export default Pharmacist;