import React, { useMemo, useState } from "react";
import { Box, Stack, Button } from "@mui/material";
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { data as persons, type Person } from "./makeData";
import { ExampleProps } from "./main";

function Example({ records }: ExampleProps) {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        header: "First Name",
        accessorKey: "firstName",
        enableGrouping: false, //do not let this column be grouped
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        header: "State",
        accessorKey: "state",
      },
      {
        header: "Salary",
        accessorKey: "salary",
        aggregationFn: "sum",
        //required to render an aggregated cell, show the average salary in the group
        AggregatedCell: ({ cell }) => (
          <>
            {cell.getValue<number>()?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: records, //10,000 rows
    defaultDisplayColumn: { enableResizing: true },
    enableBottomToolbar: false,
    enableColumnResizing: true,
    enableColumnVirtualization: true,
    enableGlobalFilterModes: true,
    enablePagination: false,
    enableColumnPinning: true,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    initialState:{
      density: "compact",
      grouping: ["state"], //an array of columns to group by by default (can be multiple)
      // pagination: { pageIndex: 0, pageSize: 100 }, //sort by state by default
    },
    muiTableContainerProps: { sx: { maxHeight: '700px' } },
    rowVirtualizerOptions: { overscan: 5 }, //optionally customize the row virtualizer
    columnVirtualizerOptions: { overscan: 2 }, //optionally customize the column virtualizer
  });

  return (
    <Stack gap={2}>
      <MaterialReactTable
        table={table}
   
      />
    </Stack>
  );
}

export default Example;
