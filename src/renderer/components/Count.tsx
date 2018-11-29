import * as React from "react";
import * as styles from "./Count.scss";

type Props = {
  count: number;
};

export default class Count extends React.Component<Props> {
  public render() {
    const { count } = this.props;

    return (
      <>
        <div className={styles.count}>{count}</div>
      </>
    );
  }
}
