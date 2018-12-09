import * as React from "react";
import * as csvParse from "csv-parse";
import * as mimeTypes from "mime-types";
import { CsvFile } from "../../types";
import FileForm from "../FileForm/FileForm";

import * as styles from "./CsvFileForm.scss";

interface CsvFileFormProps {
  onLoad: (results: CsvFile[]) => void;
  onError: () => void;
  multiple?: boolean;
  children?: React.ReactNode;
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
    const { multiple, children } = this.props;
    const { accepted, rejected } = this.state;

    return (
      <FileForm
        multiple={multiple}
        onLoad={this._onLoad.bind(this)}
        onError={this._onError.bind(this)}
        accept={[mimeTypes.types.csv]}
      >
        {children ? (
          children
        ) : (
          <div className={styles.csvFileForm}>
            <div>
              <div>
                Choose File
                {multiple === undefined || multiple === true ? "s" : ""}
              </div>
              <div>{accepted ? "OK" : rejected ? "Rejected" : ""}</div>
            </div>
          </div>
        )}
      </FileForm>
    );
  }

  private async _onLoad(files: File[]) {
    const { onLoad } = this.props;

    try {
      const results = await Promise.all(
        files.map(async (file: File) => {
          const blob = await this.readBlob(file);
          const csv = await this.parseCSV(blob);

          return {
            name: file.name,
            contents: csv
          };
        })
      );

      this.setState({
        accepted: true,
        rejected: false
      });

      onLoad(results);
    } catch (error) {
      this._onError();
    }
  }

  private _onError() {
    const { onError } = this.props;

    this.setState({
      accepted: false,
      rejected: true
    });

    onError();
  }

  // Helpers

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
