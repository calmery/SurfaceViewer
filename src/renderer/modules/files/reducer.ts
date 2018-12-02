import { ADD_FILE, REMOVE_FILE } from "./actions";
import { Files } from "../../types";

export type FilesState = Files;

const initialState: FilesState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILE:
      return {
        ...state,
        [action.payload.name]: action.payload.contents
      };

    case REMOVE_FILE:
      const nextState = { ...state };
      delete nextState[action.payload.name];
      return nextState;

    default:
      return state;
  }
};
