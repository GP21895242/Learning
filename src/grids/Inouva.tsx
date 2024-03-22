import React from "react";
import { Box, Stack } from "@mui/material";

import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import "@inovua/reactdatagrid-enterprise/index.css";

import { ExampleProps } from "./main";
import { Person } from "./makeData";

const sumReducer = {
  initialValue: 0,
  reducer: (a: number, b: number) => a + b,
};

const countReducer = {
  initialValue: 0,
  reducer: (v: number) => v + 1,
};

const columns = [
  { name: "firstName", defaultFlex: 1, header: "First Name" },
  { name: "lastName", defaultFlex: 1, header: "Last Name" },
  {
    name: "state",
    header: "State",
    defaultWidth: 100,
  },
  {
    name: "salary",
    header: "Salary",
    defaultWidth: 80,
    groupSummaryReducer: sumReducer,
    render: ({ value }: { value: number }) => (
      <span style={{ color: value < 30000 ? "lightgreen" : "inherit" }}>
        ${value}
      </span>
    ),
  },
];

const gridStyle = { minHeight: 550 };

function Example({ records }: ExampleProps) {
  // Grid columns may also provide icon, overlayIcon, menu, style, and theme overrides
  console.log("Records", records);
  return (
    <Stack gap={2}>
      <ReactDataGrid
        idProperty="id"
        columns={columns}
        style={gridStyle}
        defaultCollapsedGroups={true}
        groupColumn={true}
        defaultGroupBy={["state"]}
        dataSource={records}
      />
    </Stack>
  );
}

export default Example;
