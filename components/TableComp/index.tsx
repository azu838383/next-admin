import React from "react";
import Image from "next/image";
import "regenerator-runtime/runtime";

import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { BiSort, BiSortDown, BiSortUp } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import { RiFileExcel2Fill } from "react-icons/ri";
import { Button, Select, TextInput } from "@mantine/core";
import { MdSearch } from "react-icons/md";
import { useAsyncDebounce, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";

// Define a default UI for filtering
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: any,
onChangePgidx?:any,
manualPagination?:boolean
): JSX.Element => {
  const { t } = useTranslation()
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((newValue: any) => {
    setGlobalFilter(newValue || undefined);
  }, 200);


  return (
    <div className="form-control flex mx-auto w-full">
      <div className="flex justify-end w-full gap-1">
        <TextInput
        value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
            if(manualPagination){
              onChangePgidx()
            }
          }}
        placeholder={`Search on ${count as string} record...`}
        className="w-full"
        />
        <Button
          onClick={() => {
            onChange(value);
          }}
        >
          <MdSearch size={20} />
        </Button>
      </div>
    </div>
  );
};

// This is a custom filter UI for selecting
// a unique option from a list
export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}: any): JSX.Element => {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const uniqueOptions = new Set<any>();
  
    // Manually loop through the array to extract unique values
    for (const row of preFilteredRows) {
      uniqueOptions.add(row.values[id]);
    }
  
    // Convert Set to an array using Array.from()
    const optionsArray = Array.from(uniqueOptions);
  
    return optionsArray;
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <label className="flex gap-x-2 items-baseline">
      <span>{render("Header")}: </span>
      <select
        className=""
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option: any, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export const StatusPill = ({ value }: any): JSX.Element => {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={twMerge(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("active") ? "bg-success text-success-content" : null,
        status.startsWith("活动") ? "bg-success text-success-content" : null,
        status.startsWith("open") ? "bg-success text-success-content" : null,
        status.startsWith("close") ? "bg-error text-error-content" : null,
        status.startsWith("resolved")
          ? "bg-success text-success-content"
          : null,
        status.startsWith("not resolved")
          ? "bg-error text-error-content"
          : null,
        status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null,
        status.startsWith("offline") ? "bg-error" : null,
        status.startsWith("disabled") ? "bg-error text-error-content" : null,
        status.startsWith("daily") ? "bg-blue-200 text-yellow-600" : null,
        status.startsWith("not initiated")
          ? "bg-error text-error-content"
          : null,
        status.startsWith("no permission assigned")
          ? "bg-red-100 text-red-800"
          : null,
        status.startsWith("没有分配权限")
        ? "bg-red-100 text-red-800"
        : null,
        status.startsWith("no role assigned")
          ? "bg-red-100 text-red-800"
          : null,
        status.startsWith("weekly") ? "bg-blue-200 text-yellow-600" : null,
        status.startsWith("monthly") ? "bg-blue-200 text-yellow-600" : null,
        status.startsWith("yearly") ? "bg-blue-200 text-yellow-600" : null,
        status.startsWith("not accepting") ? "bg-red-100 text-red-800" : null,
        status.startsWith("full") ? "bg-green-100 text-green-800" : null,
        status.startsWith("完全") ? "bg-green-100 text-green-800" : null,
        status.startsWith("read only") ? "bg-yellow-100 text-yellow-800" : null,
        status.startsWith("只读") ? "bg-yellow-100 text-yellow-800" : null
      )}
    >
      {status}
    </span>
  );
};

// src={row.original[column.imgAccessor]}
export const ImageCell = ({ value, column, row }: any): JSX.Element => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <Image
          className="h-10 w-10 rounded-full"
          src={value}
          height={100}
          width={100}
          alt=""
        />
      </div>
    </div>
  );
};

export const AvatarCell = ({ value, column, row }: any): JSX.Element => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <Image
          className="h-10 w-10 rounded-full"
          src={row.original[column.imgAccessor]}
          alt=""
        />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm ">{row.original[column.emailAccessor]}</div>
      </div>
    </div>
  );
};

const Table = ({
  columns,
  data,
  loading,
  initialState,
  withPagination,
  withSearch,
  withDownload,
  downloadBtnLabel,
  onDownload,
  onAdd,
  customTableClassName,
  withAddRow,
  fullTable,
  withCustomButton,
  manualPagination,
  pgIdx, 
  setPgIdx,
  classTitleName,
  centered
  
}: any): JSX.Element => {
  // Use the state and functions returned from useTable to build your UI
  const { t } = useTranslation()
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination // new
  );

  // Render the UI for your table
  return (
    <>
      <div className="flex flex-row justify-between mb-4 items-end">
        { withDownload ? (
            <Button
              onClick={onDownload}
              disabled={data.length === 0}
            >
              <RiFileExcel2Fill className="mr-2"/>{downloadBtnLabel ?? 'Export to Excell'}
            </Button>
          ) : null
        }
        {
          withCustomButton && (
            withCustomButton
          ) 
        }
        {withSearch ? (
          <div className="sm:flex sm:gap-x-2 w-[300px]">
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
              onChangePgidx={()=>{
                setPgIdx(0)
              }}
            />
            {headerGroups.map((headerGroup: any) =>
              headerGroup.headers.map((column: any) =>
                column.Filter ? (
                  <div className="sm:mt-0" key={column.id}>
                    {column.render("Filter")}
                  </div>
                ) : null
              )
            )}
          </div>
        ) : null}
      </div>
      {/* table */}
      <div className={`overflow-x-auto w-full ${fullTable?'overflow-x-visible':''}`}>
        <table
          {...getTableProps()}
          className={`table table-zebra w-full ${String(customTableClassName ?? "")} ${centered?'text-center':'text-left'}`}
        >
          <thead className="bg-slate-700/30">
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id} className="border-b-0">
                {headerGroup.headers.map((column: any) => {
                  const isActionColumn = column.Header === "Action";
                  return (
                    <th
                      scope="col"
                      className={`group py-3 text-xs font-bold uppercase tracking-wider bo-table-custom 
                      ${String(column?.headClassName ?? "")}
                      ${classTitleName ? String(classTitleName) : "text-center" }`}
                      style={
                        isActionColumn ? { left: "calc(100% - 5rem)" } : {}
                      }
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.id}
                      // remove function sorting for username column
                      {...column.render("Header") && !column.noSort && 
                      column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div className={`inline-flex flex-row text-white ${String(column?.labelClassName??'')}`}>
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        {!isActionColumn && (
                          <span>
                            {/* remove icon sorting for username column */}
                            {column.Header && !column.noSort && (
                            <>
                              {column.isSorted ? (
                              column.isSortedDesc ? (
                                <BiSortDown className="w-4 h-4" />
                              ) : (
                                <BiSortUp className="w-4 h-4" />
                              )
                              ) : (
                              <BiSort className="w-4 h-4 opacity-1 group-hover:opacity-100" />
                              )}
                            </>
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y  ">
            {loading && (
              <tr className="border-b-0">
                <td colSpan={columns.length} className="text-center px-4 py-8">
                    Your data is loading...
                </td>
              </tr>
            )}
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()} className="border-none even:bg-slate-700/30 hover:bg-slate-700/50">
                  {row.cells.map((cell: any) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`bo-table-custom ${classTitleName ? String(classTitleName) : "" }`}
                        role="cell"
                        key={cell.id}
                      >
                        {cell.column.Cell.name === "defaultRenderer" ? (
                          <div className="">{cell.render("Cell")}</div>
                        ) : (
                          cell.render("Cell")
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
            {
              withAddRow && 
              <div
              onClick={onAdd}
              className="flex flex-row cursor-pointer justify-center items-center w-full border-dashed border-[1px] h-10 border-slate-400">
                  Add
              </div>
            }
      </div>
      {/* Pagination */}
      {withPagination ? (
        <div className="flex flex-row justify-between mt-4">
          <div className="flex gap-2">
            <Button
            onClick={() => {
              if(manualPagination)
              {
                setPgIdx((e:number)=>e-1)
                previousPage();
              }
              else{
                previousPage();
              }
            }}
            disabled={!canPreviousPage}
            variant="outline">
              Previous
            </Button>
            <Button
            onClick={() => {
              if(manualPagination)
              {
                setPgIdx((e:number)=>e+1)
                nextPage();
              }
              else{
                nextPage();
              }
            }}
            disabled={!canNextPage}
            variant="outline">
              Next
            </Button>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <div className="flex items-baseline">
              <span>
              Page <span className="font-medium">{manualPagination ? Number(pgIdx) + 1 :  state.pageIndex + 1}</span>{" "}
                of <span className="font-medium">{pageOptions.length}</span>
              </span>
              <label>
                <span className="sr-only">Item per page</span>
                <Select
                placeholder='Show'
                value={String(state.pageSize)}
                className="w-28 mx-4"
                data={[
                  {
                    value: '10',
                    label: 'Show 10',
                  },
                  {
                    value: '20',
                    label: 'Show 20',
                  },
                  {
                    value: '30',
                    label: 'Show 30',
                  },
                ]}
                onChange={(e) => {
                  setPageSize(Number(e));
                }}
                />
              </label>
              <div className="flex flex-row gap-2">
                <span>Total Data:</span>
                <span className="font-bold">{preGlobalFilteredRows.length}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <nav className="flex flex-row items-center gap-2" aria-label="Pagination">
                <div
                  className={`rounded-l-md cursor-pointer ${!canPreviousPage?'text-gray-400 cursor-default':''}`}
                  onClick={() => {
                    if(manualPagination)
                    {
                      setPgIdx(0)
                      gotoPage(0)
                    }
                    else{
                      gotoPage(0)
                    }
                  }}
                >
                  <span className="sr-only">First</span>
                  <HiOutlineChevronDoubleLeft
                    className="h-5 w-5 "
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={`rounded-l-md cursor-pointer ${!canPreviousPage?'text-gray-400 cursor-default':''}`}
                  onClick={() => {
                    if(manualPagination && canPreviousPage)
                    {
                      setPgIdx((e:number)=>e-1)
                      gotoPage(Number(pgIdx)-1)
                    }
                    else{
                      previousPage()
                    }
                  }}
                >
                  <span className="sr-only">Previous</span>
                  <HiOutlineChevronLeft
                    className="h-5 w-5 "
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={`rounded-l-md cursor-pointer ${!canNextPage?'text-gray-400 cursor-default':''}`}
                  onClick={() => {
                    if(manualPagination && canNextPage)
                    {
                      setPgIdx((e:number)=>e+1)
                      nextPage()
                    }
                    else{
                      nextPage()
                    }
                  }}
                >
                  <span className="sr-only">Next</span>
                  <HiOutlineChevronRight
                    className="h-5 w-5 "
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={`rounded-l-md cursor-pointer ${!canNextPage?'text-gray-400 cursor-default':''}`}
                  onClick={() => {
                    if(manualPagination && canNextPage)
                    {
                      setPgIdx(pageCount -1)
                      gotoPage(pageCount - 1);
                    }
                    else{
                      gotoPage(pageCount - 1);
                    }
                  }}
                >
                  <span className="sr-only">Last</span>
                  <HiOutlineChevronDoubleRight
                    className="h-5 w-5 "
                    aria-hidden="true"
                  />
                </div>
              </nav>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default React.memo(Table);