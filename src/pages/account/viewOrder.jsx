import * as React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PlaceholderStatus, Paginate } from "./../../components";
import ListBlockSvg from "./../../svg/list-block-svg";
import moment from "moment";
import { httpGet } from "../../helper/httpMethods";
import drugImg from "../../images/drug.jpg";
export default function Orders() {
  const { id } = useParams();
  const { history } = useHistory();
  const [singleOrder, setSingleOrder] = React.useState([]);
  const [status, setStatus] = React.useState(true);
  React.useEffect(() => {
    filterOrders();
  }, []);
  const filterOrders = async () => {
    setStatus(true);
    const res = await httpGet(`order/${id}/view`);
    setStatus(false);
    setSingleOrder(res.items);
    console.log(res?.items);
    console.log("useParams>>>>", id);
  };

  return (
    <>
      <div className="page-title">Order Details</div>

      {status ? (
        <ListBlockSvg />
      ) : (
        <>
          {singleOrder && (
            <>
              {/* <div class="mb-3">
                <div class="input-group input-group-c5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="form-control"
                    placeholder="Search"
                  />
                  <select class="form-control" name="">
                    <option selected>Sort By</option>
                    <option>Date</option>
                    <option>Status</option>
                  </select>
                </div>
              </div> */}

              {singleOrder.length === 0 && (
                <PlaceholderStatus
                  text="You do not have any medication order at the moment!"
                  retryText="Order Medication"
                  onClick={() => history.push("/drugs")}
                />
              )}

              {
                <table className="table table-c5">
                  <tbody>
                    <tr>
                      <th scope="row" width="35%">
                        Items
                      </th>
                      {/* <th scope="row" width="35%">
                        Order ID
                      </th> */}
                      <th width="15%">Status</th>
                      <th width="10%">Date</th>
                      <th width="20%" className="text-right">
                        Amount
                      </th>
                      <th width="10%"></th>
                    </tr>

                    {singleOrder?.map((row) => {
                      // console.log(data)
                      return (
                        <tr key={row.id}>
                          <td>
                            <div className="flex-left-center tc5-item">
                              <div className="img-center">
                                <img
                                  src={
                                    row?.drug.image == null
                                      ? drugImg
                                      : row?.drug.image
                                  }
                                  alt=""
                                />
                              </div>
                              <div> {row?.drug.name}</div>
                            </div>
                          </td>
                          <td className="font-weight-bold text-success font-size-12">
                            {row?.status}
                          </td>
                          <td>{moment(row.created_at).format("DD/MM/YYYY")}</td>
                          <td className="text-right">₦{row?.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              }
            </>
          )}
        </>
      )}
    </>
  );
}
