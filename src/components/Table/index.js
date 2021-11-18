import Input from "../inputForm/Input";
import { Dropdown, Loader, Pagination } from "rsuite";
import { useForm } from "react-hook-form";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export const ActionButton = ({ actions }) => {
  return (
    <Dropdown
      renderToggle={(props, ref) => (
        <div {...props} {...ref}>
          <BsThreeDotsVertical />
        </div>
      )}
    >
      {actions?.map((action, iAction) => (
        <Dropdown.Item key={iAction} onSelect={() => action.onSelect()}>
          {action.label}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

const TH = ({ className = "", children, ...props }) => {
  return (
    <th className={`p-3 px-3 text-left font-semibold ${className}`} {...props}>
      {children}
    </th>
  );
};

const TD = ({ className = "", children, ...props }) => {
  return (
    <td className={`p-3 px-3 text-xs ${className}`} {...props}>
      {children}
    </td>
  );
};

const Table = ({
  columns,
  data,
  loading = false,
  page = 1,
  totalPage = 1,
  totalData = 0,
  onSearch = () => "",
  onSort = () => "",
  onSwitchPage = () => "",
  onSetLimit = () => "",
  renderTopRight = "",
}) => {
  const form = useForm();

  // Handle Search
  const [searchTimeout, setSearchTimeout] = useState();
  const handleSearch = (value) => {
    clearTimeout(searchTimeout);
    const newSearchTimeout = setTimeout(() => {
      onSearch(value);
    }, 500);
    setSearchTimeout(newSearchTimeout);
  };

  // Handle Sort
  const [sortBy, setSortBy] = useState();
  const [isAscending, setAscending] = useState(false);
  const handleSort = (column) => {
    setAscending(sortBy === column ? !isAscending : true);
    setSortBy(column);
  };
  useEffect(() => sortBy && onSort(sortBy, isAscending ? "ASC" : "DESC"), [sortBy, isAscending]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <Input
            className="py-2"
            form={form}
            name="search"
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div>{renderTopRight}</div>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((column, iColumn) => (
              <TH
                key={iColumn}
                className={`${column?.sortable && "cursor-pointer"} ${!column.render && "w-1"}`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-x-2">
                  {column.render}
                  {column?.key === sortBy ? isAscending ? <FaSortUp /> : <FaSortDown /> : column.sortable && <FaSort />}
                </div>
              </TH>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr style={{ borderBottom: "1px solid #ffffff10" }}>
              <TD colSpan={columns.length} className="text-center">
                <Loader content="Loading" />
              </TD>
            </tr>
          ) : !data.length ? (
            <tr style={{ borderBottom: "1px solid #ffffff10" }}>
              <TD colSpan={columns.length} className="text-center">
                No Data
              </TD>
            </tr>
          ) : (
            data.map((item, iItem) => {
              return (
                <tr key={iItem} style={{ borderBottom: "1px solid #ffffff10" }}>
                  {columns.map((column, iColumn) => (
                    <TD key={iColumn}>{item[column.key]}</TD>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <div>
          Show
          <select
            className="bg-white bg-opacity-10 p-2 py-1 mx-2 rounded-md"
            onChange={(e) => onSetLimit(e.target.value)}
          >
            <option className="bg-gray-700">10</option>
            <option className="bg-gray-700">25</option>
            <option className="bg-gray-700">50</option>
          </select>
          of {totalData} Data
        </div>
        <Pagination
          prev
          next
          boundaryLinks
          ellipsis
          maxButtons={3}
          pages={totalPage}
          activePage={page}
          onChangePage={onSwitchPage}
        />
      </div>
    </>
  );
};

export default Table;
