import * as React from "react";
import "echarts-gl";
import ReactEcharts from "echarts-for-react";
import { Csv } from "../../types";

interface GraphProps {
  title?: string;
  width?: number;
  height?: number;
  csv: Csv;
}

export default class Graph extends React.Component<GraphProps> {
  render() {
    const { csv } = this.props;

    return (
      <ReactEcharts
        option={{
          xAxis3D: {
            type: "value"
          },
          yAxis3D: {
            type: "value"
          },
          zAxis3D: {
            type: "value"
          },
          grid3D: {},
          series: [
            {
              type: "surface",
              equation: {
                x: {
                  min: 0,
                  max: csv[0] ? csv[0].length - 1 : 0,
                  step: 1
                },
                y: {
                  min: 0,
                  max: csv.length - 1,
                  step: 1 // 0.05
                },
                z: (x, y) => csv[y][x]
              }
            }
          ]
        }}
      />
    );
  }
}
