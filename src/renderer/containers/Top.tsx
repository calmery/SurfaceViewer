import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../modules";
import { Csv, CsvFile } from "../types";
import * as actions from "../modules/csv/actions";
import { CsvState } from "../modules/csv/reducer";
import Graph from "../components/Graph/Graph";
import CsvFileForm from "../components/CsvFileForm/CsvFileForm";
import FileList from "../components/FileList/FileList";

interface TopProps {
  csv: CsvState;
  addCsv: (name: string, csv: Csv) => void;
  removeCsv: (name: string) => void;
}

class Top extends React.Component<TopProps> {
  public render() {
    const { csv } = this.props;

    return (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <div
          style={{
            width: "300px",
            height: "100%"
          }}
        >
          <FileList files={Object.keys(csv).sort()} />
        </div>
        <div>
          {Object.keys(csv).map(name => (
            <div key={name}>
              <Graph
                width={800}
                height={window.innerHeight}
                title={name}
                csv={csv[name]}
              />
            </div>
          ))}
          <div style={{ width: 300, height: 300 }}>
            <CsvFileForm
              onLoad={this._onLoad.bind(this)}
              onError={this._onError.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }

  private _onLoad(results: CsvFile[]) {
    const { addCsv } = this.props;
    results.forEach(({ name, csv }) => addCsv(name, csv));
  }

  private _onError() {
    // Pass
  }
}

const mapStateToProps = (state: State) => {
  const { csv } = state;

  return { csv };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addCsv(name: string, csv: Csv) {
      dispatch(actions.addCsv(name, csv));
    },
    removeCsv(name: string) {
      dispatch(actions.removeCsv(name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Top);
