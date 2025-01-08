import { Button, message } from "antd";
import { DashboardTitle } from "../../../utils/index";
import { Link, useNavigate } from "react-router-dom";
import TableComponent from "../../../components/table/Table";
import { useEffect, useState } from "react";
import {
  useGetCarsQuery,
  useDeleteCarsMutation,
} from "../../../redux/api/cars-api";

const Cars = () => {
  const { data, isLoading } = useGetCarsQuery();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(1);
  const [deleteCar, { data: deleteCarData, isSuccess }] =
    useDeleteCarsMutation();
  const handleCarDelete = (id) => {
    deleteCar(id);
  };

  const handleCarUpdate = (id) => {
    navigate(`/edit/`, { state: { id } });
  };

  useEffect(() => {
    if (isSuccess) {
      message.success(deleteCarData.message);
    }
  }, [isSuccess, deleteCarData]);

  const columns = [
    {
      title: "No",
      key: "id",
      render: (text, _, index) => (current - 1) * 5 + index + 1,
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "model",
      title: "Model",
      dataIndex: "model",
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      render: (price) => `$${price}`,
    },
    {
      key: "rent_price",
      title: "Rent Price",
      dataIndex: "rent_price",
      render: (rent_price) => `$${rent_price}`,
    },
    {
      key: "seats",
      title: "Seats",
      dataIndex: "seats",
    },
    {
      key: "thumbnail",
      title: "Images",
      dataIndex: "thumbnail",
      render: (thumbnail) => (
        <img src={thumbnail} width={50} alt="Car thumbnail" />
      ),
    },
    {
      key: "transmission",
      title: "Transmission",
      dataIndex: "transmission",
    },
    {
      key: "action",
      title: "Action",
      render: (product) => (
        <div className="flex items-center gap-2">
          <Button
            className="bg-yellow-400 text-white"
            type="attention"
            onClick={() => handleCarUpdate(product._id)}
          >
            Update
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => handleCarDelete(product._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <DashboardTitle>Cars</DashboardTitle>
        <Link to="/create-car">
          <Button type="primary">Create Cars</Button>
        </Link>
      </div>

      <TableComponent
        columns={columns}
        isLoading={isLoading}
        url={data?.payload}
        pagination={{ pageSize: 5, onChange: (page) => setCurrent(page) }}
      />
    </div>
  );
};

export default Cars;
