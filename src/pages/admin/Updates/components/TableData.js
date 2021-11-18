import { useContext } from "react";
import { BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import Table from "../../../../components/Table";
import Button from "../../../../components/inputForm/Button";
import { adminRouteSlug } from "../../../../router/adminRoute";
import ContentHeader from "../../../../components/ContentHeader";
import { Link, useHistory } from "react-router-dom";
import { stringToURL } from "../../../../utils/string.util";
import { Dropdown } from "rsuite";
import { BiPencil } from "react-icons/bi";
import TableController, { TableContext } from "../controllers/TableController";

const TableData = () => {
  const history = useHistory();
  const {
    updates,
    loadingUpdates,
    currentPage,
    totalPage,
    totalData,
    handleFilter,
    handleSort,
    handlePage,
    handleLimit,
  } = useContext(TableContext);

  const data = updates.map((update) => ({
    ...update,
    title: (
      <Link to={`${adminRouteSlug.UPDATE_DETAIL}/${update?.updateCode}/${stringToURL(update?.title)}`}>
        <button className="w-full text-left text-blue-300">{update.title}</button>
      </Link>
    ),
    action: (
      <Dropdown
        renderToggle={(props, ref) => (
          <div className="p-1" ref={ref} {...props}>
            <BsThreeDotsVertical />
          </div>
        )}
        placement="bottomEnd"
      >
        <Dropdown.Item
          onSelect={() =>
            history.push(`${adminRouteSlug.UPDATE_UPDATE}/${update?.updateCode}/${stringToURL(update?.title)}`)
          }
        >
          <div className="flex items-center">
            <BiPencil className="mr-1" />
            Edit
          </div>
        </Dropdown.Item>
      </Dropdown>
    ),
  }));

  const columns = [
    {
      render: "Title",
      key: "title",
      sortable: true,
    },
    {
      render: "Created At",
      key: "createdAt",
      sortable: true,
    },
    {
      render: "",
      key: "action",
      sortable: false,
    },
  ];

  return (
    <>
      <ContentHeader className="mb-6">Updates</ContentHeader>

      <div className="p-4 pb-8 bg-white bg-opacity-10 rounded-xl">
        <Table
          columns={columns}
          data={data}
          loading={loadingUpdates}
          page={currentPage}
          totalPage={totalPage}
          totalData={totalData}
          onSearch={handleFilter}
          onSort={handleSort}
          onSwitchPage={handlePage}
          onSetLimit={handleLimit}
          renderTopRight={
            <Button className="flex items-center pl-2" to={adminRouteSlug.UPDATE_CREATE}>
              <BsPlus className="mr-2 text-xl" />
              New Update
            </Button>
          }
        />
      </div>
    </>
  );
};

export default () => (
  <TableController>
    <TableData />
  </TableController>
);
