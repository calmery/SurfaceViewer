import { createAction } from "redux-actions";
import { Csv } from "../../types";

export const ADD_CSV = "ADD_CSV";
export const REMOVE_CSV = "REMOVE_CSV";

export interface AddCsvPayload {
  name: string;
  csv: Csv;
}

export interface RemoveCsvPayload {
  name: string;
}

export const addCsv = createAction(
  ADD_CSV,
  (name: string, csv: Csv): AddCsvPayload => ({ name, csv })
);

export const removeCsv = createAction(
  REMOVE_CSV,
  (name: string): RemoveCsvPayload => ({ name })
);
