import { CHANGE_FILE_STATUSES } from "./actions";
import { ADD_FILE, REMOVE_FILE } from "../files/actions";
import { FileStatuses } from "../../types";

export type FileStatusesState = FileStatuses;

const initialState: FileStatusesState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILE:
      return {
        ...state,
        [action.payload.name]: {
          ...action.payload.statuses,
          isVisible: true
        }
      };

    case REMOVE_FILE:
      const nextState = { ...state };
      delete nextState[action.payload.name];
      return nextState;

    case CHANGE_FILE_STATUSES:
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          ...action.payload.status
        }
      };

    default:
      return state;
  }
};
