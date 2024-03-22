import React from "react";
import { Box, Stack } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ExampleProps } from "./main";

function Example({ records }: ExampleProps) {
  const columnDefs = [
    {
      field: "firstName"
    },
    {
      field: "lastName"
    },
    {
      field: "state",
      rowGroup: true,
      hide: true
    },
    {
      field: "salary",
      aggFunc: "sum",
      valueFormatter: (params) => `$${params.value.toLocaleString()}`
    }
  ];

  return (
    <Stack gap={2}>
      <Box
        style={{ width: "900px", height: "600px" }}
        className="ag-theme-alpine"
      >
        <AgGridReact columnDefs={columnDefs} rowData={records} />
      </Box>
    </Stack>
  );
}

export default Example;
