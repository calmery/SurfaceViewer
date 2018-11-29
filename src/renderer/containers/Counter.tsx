import * as React from "react";
import { connect } from "react-redux";
import { State } from "../modules";
import { Dispatch } from "redux";
import { Link } from 'react-router-dom';

import Count from "../components/Count";
import { increment, decrement } from "../modules/counter/actions";

type Props = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

class Counter extends React.Component<Props> {
  public render() {
    const { count } = this.props;

    return (
      <>
        <Count count={count} />
        <button onClick={this.increment.bind(this)}>Increment</button>
        <button onClick={this.decrement.bind(this)}>Decrement</button>
        <Link to='/'>Top</Link>
      </>
    );
  }

  private increment() {
    this.props.increment();
  }

  private decrement() {
    this.props.decrement();
  }
}

const mapStateToProps = (state: State) => {
  const {
    counter: { count }
  } = state;
  return { count };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    increment() {
      dispatch(increment());
    },
    decrement() {
      dispatch(decrement());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
