import * as React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { store, history } from "./modules";
import Top from "./containers/Top";

export default class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Top} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
