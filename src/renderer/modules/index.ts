import { createStore, combineReducers, applyMiddleware } from "redux";
import createBrowserHistory from "history/createBrowserHistory";
import {
  routerMiddleware,
  connectRouter,
  RouterState
} from "connected-react-router";

import graphData, { GraphDataState } from "./graphData/reducer";

export const history = createBrowserHistory();
const middleware = routerMiddleware(history);

export interface State {
  graphData: GraphDataState;
  router: RouterState;
}

export const store = createStore(
  combineReducers({
    graphData,
    router: connectRouter(history)
  }),
  applyMiddleware(middleware)
);
