import { createStore, combineReducers, applyMiddleware } from "redux";
import createBrowserHistory from "history/createBrowserHistory";
import {
  routerMiddleware,
  connectRouter,
  RouterState
} from "connected-react-router";

import csv, { CsvState } from "./csv/reducer";

export const history = createBrowserHistory();
const middleware = routerMiddleware(history);

export interface State {
  csv: CsvState;
  router: RouterState;
}

export const store = createStore(
  combineReducers({
    csv,
    router: connectRouter(history)
  }),
  applyMiddleware(middleware)
);
