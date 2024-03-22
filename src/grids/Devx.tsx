import React, { useState } from "react";
import { Box, Stack } from "@mui/material";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

import DataGrid, {
  Column,
  GroupItem,
  Grouping,
  GroupPanel,
  Paging,
  SearchPanel,
  Sorting,
  Scrolling,
  Summary,
} from "devextreme-react/data-grid";

import { ExampleProps } from "./main";
import { Person } from "./makeData";

function Example({ records }: ExampleProps) {
  // Grid columns may also provide icon, overlayIcon, menu, style, and theme overrides
  return (
    <Stack gap={2}>
      <DataGrid
        dataSource={records}
        keyExpr="id"
        allowColumnReordering={true}
        showBorders={true}
      >
        <GroupPanel visible={true} />
        <SearchPanel visible={true} />
        <Grouping autoExpandAll={false} />
        <Sorting mode="none" />
        <Scrolling mode="virtual" />
        {/* <Paging defaultPageSize={10} /> */}

        <Column dataField="firstName" dataType="string" />
        <Column dataField="lastName" dataType="string" />
        <Column dataField="state" dataType="string" groupIndex={0} />
        <Column dataField="salary" dataType="string" />
        <Summary>
          <GroupItem
            column="salary"
            summaryType="sum"
            displayFormat="${0}"
            alignByColumn={true}
          />
        </Summary>
      </DataGrid>
    </Stack>
  );
}

export default Example;
