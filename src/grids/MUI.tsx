import React, { useMemo, useState } from 'react';
import {Box} from '@mui/material'
import { DataGridPremium, GridColDef } from '@mui/x-data-grid-premium';
import { data as persons, type Person } from './makeData';
import { ExampleProps } from './main';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function Example({records}: ExampleProps) {

  const columns = useMemo<GridColDef<Person>[]>(
    () => [
      {
        field: 'firstName',
        headerName: 'First Name',
      },
      {
        headerName: 'Last Name',
        field: 'lastName',
      },
      {
        headerName: 'State',
        field: 'state',
      },
      {
        headerName: 'Salary',
        field: 'salary',
        type: 'number',
        valueFormatter: ({ value }) => {
          if (!value) {
            return value;
          }
          return currencyFormatter.format(value);
        },
      },
    ],
    [],
  );

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGridPremium
        columns={columns}
        rows={records}
        initialState={{
          rowGrouping: {
              model: ['state']
          },
          aggregation:{
            model: {
              salary: 'sum'
            }
          }
      }}
      />
    </div>
  );
};

export default Example;
