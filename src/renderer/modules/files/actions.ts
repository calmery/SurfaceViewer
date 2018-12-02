import { createAction } from "redux-actions";
import { Contents } from "../../types";

export const ADD_FILE = "ADD_FILE";
export const REMOVE_FILE = "REMOVE_FILE";

interface AddFilePayload {
  name: string;
  contents: Contents;
}

interface RemoveFilePayload {
  name: string;
}

export const addFile = createAction(
  ADD_FILE,
  (name: string, contents: Contents): AddFilePayload => ({ name, contents })
);

export const removeFile = createAction(
  REMOVE_FILE,
  (name: string): RemoveFilePayload => ({ name })
);
