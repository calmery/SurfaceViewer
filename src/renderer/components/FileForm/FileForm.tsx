import * as React from "react";
import Dropzone from "react-dropzone";
import * as styles from "./FileForm.scss";

interface FileFormProps {
  accept: string[];
  multiple: boolean;
  onLoad: (files: File[]) => void;
  onError: () => void;
  children?: React.ReactNode;
}

class FileForm extends React.Component<FileFormProps> {
  public render() {
    const { accept, multiple, children } = this.props;

    return (
      <Dropzone
        className={styles.fileForm}
        multiple={multiple}
        onDropAccepted={this._onLoad.bind(this)}
        onDropRejected={this._onError.bind(this)}
        accept={accept.join(",")}
      >
        {children}
      </Dropzone>
    );
  }

  private _onLoad(files: File[]) {
    const { onLoad } = this.props;

    onLoad(files);
  }

  private _onError() {
    const { onError } = this.props;

    onError();
  }
}

export default FileForm;
