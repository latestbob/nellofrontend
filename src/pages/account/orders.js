import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PlaceholderStatus, Paginate } from './../../components';
import AppContext from '../../context';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { orders } from './../../Services';
import useRouter from './../../hooks/useRouter';
import ListBlockSvg from './../../svg/list-block-svg'
import moment from 'moment';

export default function Orders({path}) {
  const { dispatch, setQueryString, useQueryString, currentPath, momentAgo, capitalize,
    errorResponse, formatDate, checkArray } = React.useContext(AppContext);
  let history = useHistory();
  const queryClient = useQueryClient();
  const [queryName] = React.useState('orders');
  const router = useRouter();
  const [query, setQuery] = React.useState(router.query);
  const [meta, setMeta] = React.useState({});

  /* Page data */
  const { isLoading, isFetching, isError, data, refetch } = useQuery([queryName, query],
    () => orders(setQueryString(query)), {
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
        () => orders(setQueryString(nextPage)))
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
    <div className="page-title">My Orders</div>

    {isLoading ? <ListBlockSvg /> : <>

      {isError && (<PlaceholderStatus onClick={refetch} />)}

      {data && (<>
        {/* <div class="mb-3">
          <div class="input-group input-group-c5">
            <input type="text" name="name" id="name" class="form-control" placeholder="Search" />
            <select class="form-control" name="">
              <option selected>Sort By</option>
              <option>Date</option>
              <option>Status</option>
            </select>
          </div>
        </div> */}

        {data?.data?.length === 0 && (<PlaceholderStatus
          text="You do not have any medication order at the moment!"
          retryText='Order Medication'
          onClick={() => history.push('/drugs')}
        />)}

        {checkArray(data?.data) && (<table className="table table-c5">
          <tbody>
            <tr>
              {/* <th scope="row" width="35%">Items</th> */}
              <th scope="row" width="35%">Order ID</th>
              <th width="15%">Status</th>
              <th width="10%">Date</th>
              <th width="20%" className="text-right">Amount</th>
              <th width="10%"></th>
            </tr>
            {console.log("???>>>>data",data.data[0].amount)}
            {data?.data?.map(row => {
              // console.log(data)
              return (<tr key={row.id}>
                <td>
                  {/* <div className="flex-left-center tc5-item">
                    <div className="img-center">
                      <img src="./../assets/images/products/Image-1.png" alt="" />
                    </div>
                    <div> {row?.order_ref}</div>
                  </div> */}
                  {row?.order_ref}
                </td>
                {  row.delivery_status == 0?
                <td className="font-weight-bold text-warning font-size-12">Pending</td>:
                <td className="font-weight-bold text-success font-size-12">Delivered</td>
              
                }
                <td>{moment(row.created_at).format("DD/MM/YYYY")}</td>
                <td className="text-right">₦{row?.amount}</td>
                <td className="text-right">
                  <button style={{    whiteSpace: "nowrap"}} className="btn btn-secondary btn-inverse btn-sm" onClick={()=>{
                    history.push(`my-order/view/${row.id}`)
                  }}>View order items</button>
                </td>
              </tr>)
            })}
          </tbody>
        </table>)}

        {checkArray(data?.data) && (<div class="text-right">
          <Paginate data={data} onPageChange={handlePageClick} />
        </div>)}

      </>)}

    </>}



  </>);
}