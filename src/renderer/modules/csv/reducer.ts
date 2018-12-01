import { ADD_CSV, REMOVE_CSV } from "./actions";
import { Csv } from "../../types";

export type CsvState = {
  [key: string]: Csv;
};

const initialState: CsvState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CSV:
      return {
        ...state,
        [action.payload.name]: action.payload.csv
      };

    case REMOVE_CSV:
      const nextState = { ...state };
      delete nextState[action.payload.name];
      return nextState;

    default:
      return state;
  }
};
