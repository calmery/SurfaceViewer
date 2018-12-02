import * as React from "react";
import "echarts-gl";
import ReactEcharts from "echarts-for-react";
import { Csv } from "../../types";

interface GraphProps {
  title?: string;
  width?: number;
  height?: number;
  csv: { [key: string]: Csv };
}

export default class Graph extends React.Component<GraphProps> {
  render() {
    const { width, height, title, csv: _csv } = this.props;

    const csv = Object.keys(_csv).map(filename => {
      return _csv[filename];
    });

    if (csv.length === 0) {
      return null;
    }

    const sizes = csv.map(c => ({
      x: c[0] ? c[0].length : 0,
      y: c.length
    }));

    const baseSizeX = sizes.reduce((xs, ys) => (xs.x < ys.x ? xs : ys)).x;
    const baseSizeY = sizes.reduce((xs, ys) => (xs.y < ys.y ? xs : ys)).y;

    const series = csv.map(target => {
      const sizeX = target[0] ? target[0].length : 0;
      const sizeY = target.length;

      return {
        type: "surface",
        equation: {
          x: {
            min: 0,
            max: baseSizeX - 1,
            step: baseSizeX / sizeX
          },
          y: {
            min: 0,
            max: baseSizeY - 1,
            step: baseSizeY / sizeY
          },
          z: (x, y) => {
            const _x = Math.round((x * sizeX) / baseSizeX);
            const _y = Math.round((y * sizeY) / baseSizeY);

            return target[_y][_x];
          }
        }
      };
    });

    return (
      <ReactEcharts
        style={{
          width,
          height
        }}
        key={series.length} // オブジェクトが再利用されてしまうため長さを key として利用する
        option={{
          title: {
            text: title
          },
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
          series
        }}
      />
    );
  }
}
