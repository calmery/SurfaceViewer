import * as React from "react";
import { connect } from "react-redux";
import { State } from "../modules";
import { Dispatch } from "redux";
import * as filesActions from "../modules/files/actions";
import * as fileStatusesActions from "../modules/fileStatuses/actions";
import { Contents, FileStatuses, Files, CsvFile, FileStatus } from "../types";
import CsvFileForm from "../components/CsvFileForm/CsvFileForm";
import FileList from "../components/FileList/FileList";
import Graph from "../components/Graph/Graph";

interface TopProps {
  files: Files;
  fileStatuses: FileStatuses;
  addFile: (name: string, contents: Contents) => void;
  removeFile: (name: string) => void;
  changeFileStatus: (name: string, status: FileStatus) => void;
}

class Top extends React.Component<TopProps> {
  public render() {
    const { files, fileStatuses } = this.props;

    const csv = {};

    Object.keys(fileStatuses).forEach(fileName => {
      const status = fileStatuses[fileName];

      if (status.isVisible) {
        csv[fileName] = files[fileName];
      }
    });

    return (
      <CsvFileForm
        onLoad={this._onLoadCsvFileForm.bind(this)}
        onError={this._onErrorCsvFileForm.bind(this)}
      >
        <div
          style={{
            width: window.innerWidth,
            height: window.innerHeight,
            display: "flex"
          }}
        >
          <div
            style={{
              width: window.innerWidth - 300,
              height: window.innerHeight
            }}
          >
            <Graph title={name} csv={csv} />
          </div>
          <div style={{ width: 300, height: 100 }}>
            <FileList
              fileStatuses={fileStatuses}
              onChange={this._onChangeFileList.bind(this)}
              onRemove={this._onRemoveFileList.bind(this)}
            />
          </div>
        </div>
      </CsvFileForm>
    );
  }

  private _onLoadCsvFileForm(files: CsvFile[]) {
    const { addFile } = this.props;

    files.forEach(({ name, contents }) => {
      addFile(name, contents);
    });
  }

  private _onErrorCsvFileForm() {
    // Pass
  }

  private _onChangeFileList(name: string, status: FileStatus) {
    const { changeFileStatus } = this.props;

    changeFileStatus(name, status);
  }

  private _onRemoveFileList(name: string) {
    const { removeFile } = this.props;

    removeFile(name);
  }
}

const mapStateToProps = (state: State) => {
  const { files, fileStatuses } = state;

  console.log(state);

  return { files, fileStatuses };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addFile(name: string, contents: Contents) {
      dispatch(filesActions.addFile(name, contents));
    },
    removeFile(name: string) {
      dispatch(filesActions.removeFile(name));
    },
    changeFileStatus(name: string, status: FileStatus) {
      dispatch(fileStatusesActions.changeFileStatus(name, status));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Top);
