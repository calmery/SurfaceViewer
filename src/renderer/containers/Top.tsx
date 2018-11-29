import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as logo from "../assets/logo.svg";

class Top extends React.Component {
  public render() {
    return (
      <>
        <div>Top</div>
        <img src={logo} />
        <Link to='/counter'>Counter</Link>
      </>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Top);
