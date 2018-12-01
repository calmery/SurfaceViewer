import * as React from "react";
import * as Plot from "react-plotly.js";
import { Csv } from "../../types";

interface GraphProps {
  title?: string;
  width?: number;
  height?: number;
  csv: Csv;
}

export default class Graph extends React.Component<GraphProps> {
  render() {
    const { title, width, height, csv } = this.props;

    return (
      <Plot
        data={[
          {
            z: csv,
            type: "surface",
            opacity: 0.9
          }
        ]}
        layout={{
          width,
          height,
          title
        }}
      />
    );
  }
}
