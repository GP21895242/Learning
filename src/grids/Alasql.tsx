import React from "react";
import { Stack } from "@mui/material";
import { ExampleProps } from "./main";
import alasql from "alasql";
/**
 * This is hardcoded, obviously. A real solution would have to build
 * SQL to cover some common use cases. Here's a simple example
 * from AG grid illustrating that:
 * https://www.ag-grid.com/react-data-grid/server-side-model-grouping/#example-row-grouping
 * Note that parameterizing this so the columns aren't hardcoded
 * has a negligible impact on performance (since the actual executed SQL
 * doesn't change).
 */
const SELECT_AND_SUM = `
    SELECT state, sum(salary) as salary, count(salary) as num_rows 
    FROM ? 
    GROUP BY state
    HAVING count(*) > 0
`;

export default function Example({ records }: ExampleProps) {
  const sumsByState = alasql(SELECT_AND_SUM, [records]);

  return (
    <Stack gap={2}>
      <table>
        <thead>
          <tr>
            <td>State</td>
            <td>Sum of Salary</td>
          </tr>
        </thead>
        <tbody>
          {sumsByState.map(({ state, num_rows: count, salary }) => (
            <tr>
              <td>
                {state} ({count})
              </td>
              <td>
                {salary?.toLocaleString?.("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Stack>
  );
}
