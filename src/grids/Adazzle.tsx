import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import { groupBy as rowGrouper } from "lodash";

import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { ExampleProps } from "./main";
import { Person } from "./makeData";

function rowKeyGetter(row: Row) {
  console.log("Getter", row.id);
  return row.id;
}

const columns: readonly Column<Row>[] = [
  {
    key: "firstName",
    name: "First Name",
  },
  {
    key: "lastName",
    name: "Last Name",
  },
  {
    key: "state",
    name: "State",
  },
  {
    key: "salary",
    name: "Salary",
    formatter({ row }) {
      return <>${row.salary}</>;
    },
    groupFormatter({ childRows }) {
      return <>${childRows.reduce((prev, { salary }) => prev + salary, 0)}</>;
    },
  },
];

function Example({ records }: ExampleProps) {
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(
    () => new Set()
  );

  const [expandedGroupIds, setExpandedGroupIds] = useState<
    ReadonlySet<unknown>
  >(() => new Set<unknown>([]));

  // Grid columns may also provide icon, overlayIcon, menu, style, and theme overrides
  return (
    <Stack gap={2}>
      <DataGrid
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={records}
        rowGrouper={rowGrouper}
        groupBy={["state"]}
        expandedGroupIds={expandedGroupIds}
        onExpandedGroupIdsChange={setExpandedGroupIds}
      />
    </Stack>
  );
}

export default Example;
