import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  MRT,
  MUI,
  Tanstack,
  AG,
  Adazzle,
  Devx,
  Inouva,
  Metal,
  Alasql,
} from "./grids";
import {
  FormControl,
  Stack,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { data as persons, type Person } from "./makeData";
import { inflate, randomSalary } from "./util";

const Views = {
  MRT: [MRT, "MRT"],
  MUI: [MUI, "MUI"],
  Tanstack: [Tanstack, "Tanstack"],
  AG: [AG, "AG"],
  Devx: [Devx, "DevExtreme"],
  Inouva: [Inouva, "Inouva"],
  Adazzle: [Adazzle, "Adazzle"],
  Metal: [Metal, "Best Possible (Custom)"],
  Alasql: [Alasql, "Best Possible (Alasql)"],
};

export interface ExampleProps {
  records: Person[];
}

function Main() {
  const [view, setView] = React.useState<keyof typeof Views>("MRT");
  const [count, setCount] = React.useState(10000);

  const [records, setRecords] = useState<Person[]>([]);

  function load() {
    setRecords(() =>
      inflate(persons, count, (p) => ({
        ...p,
        salary: randomSalary(),
        id: Math.random(),
      }))
    );
  }

  useEffect(load, []);

  const handleChange = (event: any) => {
    setView(event.target.value);
  };

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <FormControl>
          <Select value={view} onChange={handleChange} size="small">
            {Object.entries(Views).map(([value, [_component, label]]) => (
              <MenuItem value={value}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(e) => setCount(Number(e.target.value))}
          value={count}
          size="small"
        />
        <Button onClick={load}>Reload</Button>
      </Stack>
      {React.createElement(Views[view][0], { records })}
    </Stack>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Main />
);
