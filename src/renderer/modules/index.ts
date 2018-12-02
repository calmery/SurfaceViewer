import { createStore, combineReducers, applyMiddleware } from "redux";
import createBrowserHistory from "history/createBrowserHistory";
import {
  routerMiddleware,
  connectRouter,
  RouterState
} from "connected-react-router";

import files, { FilesState } from "./files/reducer";
import fileStatuses, { FileStatusesState } from "./fileStatuses/reducer";

export const history = createBrowserHistory();
const middleware = routerMiddleware(history);

export interface State {
  files: FilesState;
  fileStatuses: FileStatusesState;
  router: RouterState;
}

export const store = createStore(
  combineReducers({
    files,
    fileStatuses,
    router: connectRouter(history)
  }),
  applyMiddleware(middleware)
);
