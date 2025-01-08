/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from 'antd';

const TableComponent = ({columns, pagination, isLoading, url }) => {

  return (
    <Table
    columns={columns}
    rowKey={(product) => product._id}
      dataSource={url?.map((product) => ({key: product._id, ...product}))}
      pagination={pagination}
      loading={isLoading}

      url={url}
    />
  );
};
export default TableComponent; 