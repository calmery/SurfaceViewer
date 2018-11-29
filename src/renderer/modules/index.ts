import { createStore, combineReducers, applyMiddleware } from "redux";
import createBrowserHistory from "history/createBrowserHistory";
import {
  routerMiddleware,
  connectRouter,
  RouterState
} from "connected-react-router";

import counter, { CounterState } from "./counter/reducer";

export const history = createBrowserHistory();
const middleware = routerMiddleware(history);

export interface State {
  counter: CounterState;
  router: RouterState;
}

export const store = createStore(
  combineReducers({
    counter,
    router: connectRouter(history)
  }),
  applyMiddleware(middleware)
);
