import * as React from "react";
import { connect } from "react-redux";
import { State } from "../modules";
import { GraphData, GraphFileData } from "../types";
import * as actions from "../modules/graphData/actions";
import { GraphDataState } from "../modules/graphData/reducer";
import Graph from "../components/Graph/Graph";
import CsvFileForm from "../components/CsvFileForm/CsvFileForm";

interface TopProps {
  graphData: GraphDataState;
  addGraphData: (fileName: string, graphData: GraphData) => void;
  removeGraphData: (fileName: string) => void;
}

interface TopState {
  data: GraphData | null;
}

class Top extends React.Component<TopProps, TopState> {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  public render() {
    const { graphData } = this.props;

    return (
      <>
        {Object.keys(graphData).map(name => {
          return (
            <div key={name}>
              <div onClick={() => this._onClickRemove(name)}>Remove</div>
              <Graph
                width={800}
                height={600}
                title={name}
                data={graphData[name]}
              />
            </div>
          );
        })}
        <div style={{ width: 300, height: 300 }}>
          <CsvFileForm
            onLoad={this._onLoadGraphFileData.bind(this)}
            onError={this._onErrorGraphFileData.bind(this)}
          />
        </div>
      </>
    );
  }

  // Events

  private _onClickRemove(fileName: string) {
    const { removeGraphData } = this.props;
    removeGraphData(fileName);
  }

  private _onLoadGraphFileData(results: GraphFileData[]) {
    const { addGraphData } = this.props;
    results.forEach(({ name, data }) => addGraphData(name, data));
  }

  private _onErrorGraphFileData() {
    // Pass
  }
}

const mapStateToProps = (state: State) => {
  const { graphData } = state;

  return { graphData };
};

const mapDispatchToProps = dispatch => {
  return {
    addGraphData(fileName: string, graphData: GraphData) {
      dispatch(actions.addGraphData(fileName, graphData));
    },
    removeGraphData(fileName: string) {
      dispatch(actions.removeGraphData(fileName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Top);
