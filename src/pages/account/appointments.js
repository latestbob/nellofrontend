import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PlaceholderStatus, Paginate } from './../../components';
import AppContext from '../../context';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { appointments } from './../../Services';
import useRouter from './../../hooks/useRouter';
import ListBlockSvg from './../../svg/list-block-svg'
import moment from 'moment';

export default function Appointments() {
  const { dispatch, setQueryString, useQueryString, currentPath, momentAgo, capitalize,
    errorResponse, formatDate, checkArray } = React.useContext(AppContext);
  let history = useHistory();
  const queryClient = useQueryClient();
  const [queryName] = React.useState('appointments');
  const router = useRouter();
  const [query, setQuery] = React.useState(router.query);
  const [meta, setMeta] = React.useState({});

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

  /* handle paginate data */
  const handlePageClick = ({ selected }) => {
    const page = selected + 1;
    let nQ = { ...query, page };
    setQuery(nQ);
    history.push(`${currentPath}${setQueryString(nQ)}`);
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
                        : <a href="" style={{
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