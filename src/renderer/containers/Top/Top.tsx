import * as React from "react";
import { connect } from "react-redux";
import { State } from "../../modules";
import { Dispatch } from "redux";
import * as filesActions from "../../modules/files/actions";
import * as fileStatusesActions from "../../modules/fileStatuses/actions";
import {
  Contents,
  FileStatuses,
  Files,
  CsvFile,
  FileStatus
} from "../../types";
import CsvFileForm from "../../components/CsvFileForm/CsvFileForm";
import FileList from "../../components/FileList/FileList";
import Graph from "../../components/Graph/Graph";
import * as styles from "./Top.scss";

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

    const data = {};

    Object.keys(fileStatuses).forEach(fileName => {
      const status = fileStatuses[fileName];

      if (status.isVisible) {
        data[fileName] = {
          max: status.max,
          min: status.min,
          csv: files[fileName]
        };
      }
    });

    return (
      <CsvFileForm
        onLoad={this._onLoadCsvFileForm.bind(this)}
        onError={this._onErrorCsvFileForm.bind(this)}
        disableClick={true}
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
            <Graph title={name} data={data} />
          </div>
          <div style={{ width: 300 }}>
            <FileList
              fileStatuses={fileStatuses}
              onChange={this._onChangeFileList.bind(this)}
              onRemove={this._onRemoveFileList.bind(this)}
            >
              <div className={styles.openButtonContainer}>
                <CsvFileForm
                  onLoad={this._onLoadCsvFileForm.bind(this)}
                  onError={this._onErrorCsvFileForm.bind(this)}
                  disableClick={false}
                >
                  <div className={styles.openButton}>Open...</div>
                </CsvFileForm>
              </div>
            </FileList>
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
