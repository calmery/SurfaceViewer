import * as React from "react";
import * as csvParse from "csv-parse";
import * as mimeTypes from "mime-types";
import { CsvFile } from "../../types";
import FileForm from "../FileForm/FileForm";

interface CsvFileFormProps {
  onLoad: (results: CsvFile[]) => void;
  onError: () => void;
  multiple?: boolean;
  disableClick?: boolean;
  children?: React.ReactNode;
}

class CsvFileForm extends React.Component<CsvFileFormProps> {
  public render() {
    const { multiple, children, disableClick } = this.props;

    return (
      <FileForm
        multiple={multiple}
        disableClick={disableClick}
        onLoad={this._onLoad.bind(this)}
        onError={this._onError.bind(this)}
        accept={[
          mimeTypes.types.csv,
          `.${mimeTypes.extensions[mimeTypes.types.csv]}`
        ]}
      >
        {children}
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

      onLoad(results);
    } catch (error) {
      this._onError();
    }
  }

  private _onError() {
    const { onError } = this.props;

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
