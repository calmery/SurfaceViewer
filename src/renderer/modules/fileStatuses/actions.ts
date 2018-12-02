import { createAction } from "redux-actions";
import { FileStatus } from "../../types";

export const CHANGE_FILE_STATUSES = "CHANGE_FILE_STATUSES";

interface ChangeFileStatusPayload {
  name: string;
  status: FileStatus;
}

export const changeFileStatus = createAction(
  CHANGE_FILE_STATUSES,
  (name: string, status: FileStatus): ChangeFileStatusPayload => ({
    name,
    status
  })
);
