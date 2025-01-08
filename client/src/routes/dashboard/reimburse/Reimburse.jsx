import { DashboardTitle } from "../../../utils/index"
import { useDeleteOrdersMutation, useGetOrdersQuery } from "../../../redux/api/orders"
import { Button, message } from "antd"
import TableComponent from "../../../components/table/Table"
import { useEffect, useState } from "react"
const Reimburse = () => {
  const [current, setCurrent] = useState(1);
  const {data, isLoading} = useGetOrdersQuery();
  const [deleteOrders, {data: deleteData, isSuccess}] = useDeleteOrdersMutation()


  const handleOrdersDelete = (id) => {
    deleteOrders(id)
  }

  useEffect(() => {
    if(isSuccess) {
      message.success(deleteData?.message)
    }
  }, [deleteData, isSuccess])
  
  const columns = [
    {
      title: "No",
      key: "id",
      render: (text, _, index) => (current - 1) * 5 + index + 1,
    },
    
    {
      key: "user-id",
      title: "User ID",
      dataIndex: ["user_id", "first_name"],
    },
    {
      key: "name",
      title: "Name",
      dataIndex: ["car_id", "name"],
    },
    {
      key: "model",
      title: "Model",
      dataIndex: ["car_id", "model"],
    },
    {
      key: "price",
      title: "Price",
      dataIndex: ["total_price"],
      render: (price) => `$${price}`,
    },
    {
      key: "quantity",
      title: "Quantity",
      dataIndex: ["quantity"],
      render: (quantity) => `${quantity}`,
    },
    {
      key: "pay_method",
      title: "Pay_method",
      dataIndex: ["payment_method"],
    },
    
    {
      key: "pay_status",
      title: "Pay_status",
      dataIndex: ["payment_status"],
    },
    {
      key: "fromDate",
      title: "From Date",
      dataIndex: ["fromDate"],
    },
    {
      key: "toDate",
      title: "To Date",
      dataIndex: ["toDate"],
    },
    {
      key: "thumbnail",
      title: "Images",
      dataIndex: ["car_id","thumbnail"],
      render: (thumbnail) => (
        <img src={thumbnail} width={50} alt="Car thumbnail" />
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (product) => (
        <div className="flex items-center gap-2">
          <Button
          className="bg-yellow-400 text-white"
            // onClick={() => handleOrdersUpdate(product._id)}
          >
            Update
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => handleOrdersDelete(product._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DashboardTitle>Reimburse</DashboardTitle>

    
      <TableComponent
        columns={columns}
        isLoading={isLoading}
        url={data?.payload}
        pagination={{ pageSize: 5, onChange: (page) => setCurrent(page) }}
      />
    </div>
  )
}

export default Reimburse