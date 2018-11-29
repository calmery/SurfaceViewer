import * as React from "react";
import * as Plot from "react-plotly.js";
import { GraphData } from "../../types";

interface GraphProps {
  title?: string;
  width?: number;
  height?: number;
  data: GraphData;
}

export default class Graph extends React.Component<GraphProps> {
  render() {
    const { title, width, height, data } = this.props;

    return (
      <Plot
        data={[
          {
            ...data,
            type: "mesh3d",
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
