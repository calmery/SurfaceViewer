import * as React from "react";
import "echarts-gl";
import ReactEcharts from "echarts-for-react";
import { Csv } from "../../types";
import { GRAPH_RANGE_COLORS } from "../../constants";
import { getMinValue, getMaxValue } from "../../helper";

interface GraphProps {
  title?: string;
  width?: number;
  height?: number;
  data: {
    [key: string]: {
      max: number;
      min: number;
      csv: Csv;
    };
  };
}

export default class Graph extends React.Component<GraphProps> {
  render() {
    const { width, height, title, data: _data } = this.props;

    const data = Object.keys(_data).map(filename => {
      return _data[filename].csv;
    });

    if (data.length === 0) {
      return null;
    }

    const sizes = data.map(c => ({
      x: c[0] ? c[0].length : 0,
      y: c.length
    }));

    const baseSizeX = sizes.reduce((xs, ys) => (xs.x < ys.x ? xs : ys)).x;
    const baseSizeY = sizes.reduce((xs, ys) => (xs.y < ys.y ? xs : ys)).y;

    const min = getMinValue(
      Object.keys(_data).map(fileName => _data[fileName].min)
    );
    const max = getMaxValue(
      Object.keys(_data).map(fileName => _data[fileName].max)
    );

    const series = data.map(target => {
      const sizeX = target[0] ? target[0].length : 0;
      const sizeY = target.length;

      return {
        type: "surface",
        // itemStyle: { normal: { color: GRAPH_COLORS[index] } },
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
          width: width || "100%",
          height: height || "100%"
        }}
        key={series.length} // オブジェクトが再利用されてしまうため長さを key として利用する
        option={{
          visualMap: {
            min,
            max,
            inRange: {
              color: GRAPH_RANGE_COLORS
            }
          },
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
