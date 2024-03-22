import React from "react";
import { Stack } from "@mui/material";
import { ExampleProps } from "./main";
import { Person } from "./makeData";

/**
 * "Best Possible" Example
 *
 * Best possible is used loosely here -- this could be optimized
 * further, but just illustrates what's possible with a custom
 * aggregator and no grid overhead.
 */

type Aggregation<R extends object, K extends keyof R> = Map<
  R[K],
  [number, R[]]
>;

function groupByAndSum<
  GroupKey extends string,
  AggregateKey extends string,
  R extends { [g in GroupKey]: any } & { [a in AggregateKey]: number }
>(groupBy: GroupKey, aggregateOn: AggregateKey) {
  return function (records: R[]): Aggregation<R, GroupKey> {
    let sums = new Map<R[GroupKey], [number, R[]]>();
    const recordsCount = records.length;
    for (let i = 0; i < recordsCount; i++) {
      const record = records[i];
      const value: number = record[aggregateOn];
      const group: any = record[groupBy];
      const recordsInThisGroup = sums.get(group)?.[1] || [];
      recordsInThisGroup.push(record);
      sums.set(group, [
        (sums.get(group)?.[0] || 0) + value,
        recordsInThisGroup,
      ]);
    }
    return sums;
  };
}

function Example({ records }: ExampleProps) {
  const sumsByState = groupByAndSum("state", "salary")(records);

  //////////////////////////////////////////////////////////////////////
  // tiny bit faster, but less reusable
  // const recordsCount = records?.length || 0;
  // let sumsByState: { [k: Person["state"]]: [number, number] } = {};
  // for (let i = 0; i < recordsCount; i++) {
  //   const record = records[i];
  //   sumsByState[record.state] = [
  //     (sumsByState[record.state]?.[0] || 0) + 1,
  //     (sumsByState[record.state]?.[1] || 0) + record.salary,
  //   ];
  // }
  //////////////////////////////////////////////////////////////////////

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
          {[...sumsByState.entries()].map(([state, [salary, records]]) => (
            <tr>
              <td>
                {state} ({records.length})
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

export default Example;
