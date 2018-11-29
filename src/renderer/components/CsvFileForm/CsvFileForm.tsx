import * as React from "react";
import * as csvParse from "csv-parse";
import * as mimeTypes from "mime-types";
import { GraphData, GraphFileData } from "../../types";
import FileForm from "../FileForm/FileForm";

import * as styles from "./CsvFileForm.scss";

interface CsvFileFormProps {
  onLoad: (results: GraphFileData[]) => void;
  onError: () => void;
  multiple?: boolean;
}

interface CsvFileFormState {
  accepted: boolean;
  rejected: boolean;
}

class CsvFileForm extends React.Component<CsvFileFormProps, CsvFileFormState> {
  constructor(props) {
    super(props);

    this.state = {
      accepted: false,
      rejected: false
    };
  }

  public render() {
    const { multiple } = this.props;
    const { accepted, rejected } = this.state;

    return (
      <FileForm
        multiple={multiple}
        onLoad={this._onDropAccepted.bind(this)}
        onError={this._onDropRejected.bind(this)}
        accept={[mimeTypes.types.csv]}
      >
        <div className={styles.fileForm}>
          <div>
            <div>
              Choose File
              {multiple === undefined || multiple === true ? "s" : ""}
            </div>
            <div>{accepted ? "OK" : rejected ? "Rejected" : ""}</div>
          </div>
        </div>
      </FileForm>
    );
  }

  // Events

  private async _onDropAccepted(files: File[]) {
    const { onLoad } = this.props;

    try {
      const result = await Promise.all(
        files.map(async (file: File) => {
          const blob = await this.readBlob(file);
          const csv = await this.parseCSV(blob);

          return {
            name: file.name,
            data: this.parseData(csv)
          };
        })
      );

      this.setState({
        accepted: true,
        rejected: false
      });

      onLoad(result);
    } catch (error) {
      this._onDropRejected();
    }
  }

  private _onDropRejected() {
    const { onError } = this.props;

    this.setState({
      accepted: false,
      rejected: true
    });

    onError();
  }

  // Helpers

  private parseData(csv: any[][]): GraphData {
    const x = csv.map(row => row[0]);
    const y = csv.map(row => row[1]);
    const z = csv.map(row => row[2]);

    return {
      x,
      y,
      z
    };
  }

  private readBlob(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        resolve((event.target as any).result);
      };

      reader.onerror = (error: ProgressEvent) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  }

  private parseCSV(blob: string): Promise<string[][]> {
    return new Promise((resolve, reject) => {
      csvParse(blob, (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }
}

export default CsvFileForm;
