import { createAction } from "redux-actions";
import { GraphData } from "../../types";

export const ADD_GRAPH_DATA = "ADD_GRAPH_DATA";
export const REMOVE_GRAPH_DATA = "REMOVE_GRAPH_DATA";

export const addGraphData = createAction(
  ADD_GRAPH_DATA,
  (fileName: string, graphData: GraphData) => {
    return { fileName, graphData };
  }
);

export const removeGraphData = createAction(
  REMOVE_GRAPH_DATA,
  (fileName: string) => {
    return { fileName };
  }
);
