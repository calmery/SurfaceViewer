import { CHANGE_FILE_STATUSES } from "./actions";
import { ADD_FILE, REMOVE_FILE } from "../files/actions";
import { FileStatuses } from "../../types";
import { getMaxValue, getMinValue, flatten } from "../../helper";

export type FileStatusesState = FileStatuses;

const initialState: FileStatusesState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILE:
      const contents = action.payload.contents;
      const array = flatten(contents).map(string => parseFloat(string));
      const max = getMaxValue(array);
      const min = getMinValue(array);

      return {
        ...state,
        [action.payload.name]: {
          isVisible: true,
          max,
          min
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
