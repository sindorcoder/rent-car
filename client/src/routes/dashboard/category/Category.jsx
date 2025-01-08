import { Button, message } from "antd"
import { DashboardTitle } from "../../../utils"
import { useEffect, useState } from "react";
import TableComponent from "../../../components/table/Table";
import { useGetCategoriesQuery, useDeleteCategoriesMutation } from "../../../redux/api/categories-api";
import CategoryModal from "../../../components/category-modal/CategoryModal";
const Category = () => {
  const {data, isLoading} = useGetCategoriesQuery()
  const [deleteCategories, {data: deleteData, isSuccess}] = useDeleteCategoriesMutation()
  const [current, setCurrent] = useState(1);
  const [open, setOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([])
  const handleUserDelete = (id) => {
    deleteCategories(id);
  }


  const handleCategoryUpdate = (category) => {
    setCategoryData(category)
    setOpen(true);
  }
  useEffect(() => {
    if(isSuccess) {
      message.success(deleteData.message)
    }
  }, [deleteData, isSuccess])
  const columns = [


    {
      count: 1,
      title: "No",
      key: "id",
      render: (text, _, index) => (current - 1) * 5 + index + 1,
      width: "20%"
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      width: "20%"
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      width: "20%"
    },
    
    {
      key: "createdAt",
      title: "createdAt",
      dataIndex: "createdAt",
      render: (data) => new Date(data).toLocaleDateString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
      width: "20%"
    },
    {
      key: "image",
      title: "image",
      dataIndex: "image",
      render: (image) => <img className="w-[100px]" src={image} />,
    },
    {
      key: "action",
      title: "Action",
      render: (product) => (
        <div className="flex items-center gap-2">
          <Button
          className="bg-yellow-400 text-white"
            onClick={() => handleCategoryUpdate(product)}
          >
            Update
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => handleUserDelete(product._id)}
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
      <DashboardTitle>Category</DashboardTitle>
      <Button onClick={() => setOpen(true)} type="primary">Create Category</Button>
        </div>


        <TableComponent
    columns={columns}
    isLoading={isLoading}
    url={data?.payload}
    pagination={{ pageSize: 5, onChange: (page) => setCurrent(page), }}
  />

    <CategoryModal forceRender={true} categoryData={categoryData}  open={open} setOpen={setOpen} />
    </div>
  )
}

export default Category