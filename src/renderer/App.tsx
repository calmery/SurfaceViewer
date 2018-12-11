import * as React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { store, history } from "./modules";
import Top from "./containers/Top";

interface AppState {
  timestamp: number;
}

export default class App extends React.Component<{}, AppState> {
  private onResize: () => void;

  constructor(props) {
    super(props);

    this.onResize = this._onResize.bind(this);
    this.state = {
      timestamp: this.getTimestamp()
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

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

  private _onResize() {
    this.setState({ timestamp: this.getTimestamp() });
  }

  private getTimestamp() {
    return new Date().getTime();
  }
}
