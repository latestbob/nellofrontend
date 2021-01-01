import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PlaceholderStatus, Paginate } from './../../components';
import AppContext from '../../context';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { appointments } from './../../Services';
import useRouter from './../../hooks/useRouter';
import ListBlockSvg from './../../svg/list-block-svg'
import moment from 'moment';
import { jsPDF } from "jspdf";
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Appointments() {
  const { dispatch, setQueryString, useQueryString, currentPath, momentAgo, capitalize,
    errorResponse, formatDate, checkArray } = React.useContext(AppContext);
  let history = useHistory();
  const queryClient = useQueryClient();
  const [queryName] = React.useState('appointments');
  const router = useRouter();
  const [query, setQuery] = React.useState(router.query);
  const [meta, setMeta] = React.useState({});

  const [token , setToken]=useState("");
  const [firstname , setFirstName]=useState("");
  const [lastname , setLastName]=useState("");

  /* Page data */
  const { isLoading, isFetching, isError, data, refetch } = useQuery([queryName, query],
    () => appointments(setQueryString(query)), {
    keepPreviousData: true,
    staleTime: 5000,
    onError: (error) => errorResponse({ error, history, dispatch }),
  });

  /* Requery on data, query change */
  React.useEffect(() => {
    if (data && data.total > 0) {
      const newMeta = { from: data?.from, to: data?.to, total: data?.total }
      setMeta(newMeta);
    }

    if (data?.next_page_url) {
      let nextPage = { ...query, page: query?.page ? (Number(query.page) + 1) : 2 };
      queryClient.prefetchQuery([queryName, nextPage],
        () => appointments(setQueryString(nextPage)))
    }
  }, [data, query, queryClient])

  React.useEffect(() => {
    //get user Information using token here

    setToken(localStorage.getItem("token"))


    axios.get(`${process.env.REACT_APP_API_URL}auth/user`, {
        'headers': {
            Authorization: 'Bearer' + token,
        }

        }).then(response => {
       // console.log(response)

        if (response.data) {

            //SET USER APPOINTMENT STATES HERE
           // console.log(`${process.env.REACT_APP_BASE_URL}api/auth/user`);


            
            setFirstName(response.data.user.firstname);

            setLastName(response.data.user.lastname);
           

        }


    }).catch(error => {
        console.log(error)
    })





})


  /* handle paginate data */
  const handlePageClick = ({ selected }) => {
    const page = selected + 1;
    let nQ = { ...query, page };
    setQuery(nQ);
    history.push(`${currentPath}${setQueryString(nQ)}`);
  }
  


  const generatePDF = (row) => {
 
    var doc = new jsPDF('p', 'px', 'a4');
    var img = new Image();

    img.src = "data:image/png;base64,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"
    
    doc.addImage(img, 'PNG', 60, 20, 50, 30);
   
    doc.addFont('helvetica', 'bold')
    // doc.text(20, 60, 'This is the second title.')
    // doc.text(20, 100, 'This is the thrid title.')      

   //doc.text(100, 50, 'Appointment Acknowledgement Slip', null, null, 'center')
   doc.text("Appointment Acknowledgement Slip", 120, 100,);


   //date

   doc.setFontSize(11);
   doc.text('Appointment Date', 100, 130, null, null, 'right')
   doc.text(moment(row?.date, 'YYYY-MM-DD').format('dddd, MMMM DD, YYYY'), 270, 130, null, null, 'right')
   //doc.text('Date - Todays Date', 700, 110);


   //TIME
   doc.setFontSize(11);
   doc.text('Appointment Time', 100, 170, null, null, 'right')
   doc.text(moment(row?.time, 'h:mm a').format('h:mm a'), 270, 170, null, null, 'right')

   //Patient Name
   doc.setFontSize(11);
   doc.text('Patient Name', 84, 200, null, null, 'right')
   doc.text(firstname + "  " + lastname, 270, 200, null, null, 'right')
 
  
   //center name

   doc.setFontSize(11);
   doc.text('Center Name', 84, 230, null, null, 'right')
   doc.text(row.center_name, 270, 230, null, null, 'right')


   // Center Address
   doc.setFontSize(11);
   doc.text('Center Address', 90, 260, null, null, 'right')
   doc.text(row.location, 270, 260, null, null, 'right')


    // Reference No
    doc.setFontSize(11);
    doc.text('Payment Ref', 84, 290, null, null, 'right')
    doc.text(row.ref_no, 270, 290, null, null, 'right')


    // Reference No
    doc.setFontSize(10);
    doc.text('Kindly take this Acknowledgement slip with you when visiting the medical center', 300, 350, null, null, 'right')
  


    doc.setFontSize(10);
    doc.text('Thanks for Choosing Nello', 125, 370, null, null, 'right')
    doc.save('appointment.pdf')
  }  



  return (<>
    <div className="page-title">Appointments</div>

    {isLoading ? <ListBlockSvg /> : <>

      {isError && (<PlaceholderStatus onClick={refetch} />)}

      {data && (<>
        <div class="mb-3">
          <div class="input-group input-group-c5">
            <input type="text" name="name" id="name" class="form-control" placeholder="Search" />
            <select class="form-control" name="">
              <option selected>Sort By</option>
              <option>Date</option>
              <option>Status</option>
            </select>
          </div>
        </div>

        {data?.data?.length === 0 && (<PlaceholderStatus
          text="You do not have any booked appointment at the moment!"
          retryText='Book Appointment'
          onClick={() => history.push('/appointment')}
        />)}

        {checkArray(data?.data) && data?.data?.map(row => {
          return <div class="ccard-5" key={row.id}>
            <div class="c5-avatar">
              <img src="./../assets/images/avatar.svg" alt="" />
            </div>
            <div class="c5-content-box">


              <div>
                {/* {row?.center ? <>
                  <h4>{row?.center?.name}</h4>
                  <div class="c5c-1">{capitalize(row?.center?.center_type)}</div>
                </> : <>
                  <h4>Dr. Omerenyo Obaze</h4>
                  <div class="c5c-1">General Practitioner</div>
                </>} */}

                {row.type == "doctor_appointment" ? <>
                  <h4>Dr. {row.doctor_name}</h4>
                  <div class="c5c-1">{row.doctor_aos}</div>

                  <div class="text-dark font-size-13">at {moment(row?.date, 'YYYY-MM-DD').format('dddd, MMMM DD, YYYY')} {moment(row?.time, 'h:mm a').format('h:mm a')}</div>

                  {row?.status === 'completed' ? <div class="c5c-2">Completed</div> :
                    row?.status === 'cancelled' ? <div class="c5c-2 danger">Cancelled</div>
                      : <a href={row.link} className="btn btn-primary btn-sm btn-main">Appointment Link</a>

                  }
                </>
                  :
                  <>

                    <h4>{row.center_name}</h4>
                    <div class="c5c-1">{row.location}</div>

                    <div class="text-dark font-size-13">at {moment(row?.date, 'YYYY-MM-DD').format('dddd, MMMM DD, YYYY')} {moment(row?.time, 'h:mm a').format('h:mm a')}</div>

                    {row?.status === 'completed' ? <div class="c5c-2">Completed</div> :
                      row?.status === 'cancelled' ? <div class="c5c-2 danger">Cancelled</div>
                        : <a onClick={function(e){
                          //generatePDF
                          e.preventDefault();
                          generatePDF(row);
                        }} href="" style={{
                          color:"white",
                        }} className="btn btn-info btn-sm btn-main">Download Appointment Slip</a>

                    }
                  </>
                }



              </div>


              <div class="c5-datetime">{momentAgo(row?.created_at)}</div>
            </div>
          </div>
        })}

        {checkArray(data?.data) && (<div class="text-right">
          <Paginate data={data} onPageChange={handlePageClick} />
        </div>)}

      </>)}

    </>}



  </>);
}