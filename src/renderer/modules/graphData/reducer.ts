import { ADD_GRAPH_DATA, REMOVE_GRAPH_DATA } from "./actions";
import { GraphData } from "../../types";

export type GraphDataState = {
  [key: string]: GraphData;
};

const initialState: GraphDataState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_GRAPH_DATA:
      return {
        ...state,
        [action.payload.fileName]: action.payload.graphData
      };
    case REMOVE_GRAPH_DATA:
      const nextState = { ...state };
      delete nextState[action.payload.fileName];
      return nextState;
    default:
      return state;
  }
};
