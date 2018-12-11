import * as React from "react";
import * as classnames from "classnames";
import { FileStatuses, FileStatus } from "../../types";

import * as eye from "../../assets/eye.svg";
import * as remove from "../../assets/remove.svg";
import * as styles from "./FileList.scss";

interface FileListProps {
  fileStatuses: FileStatuses;
  children?: React.ReactNode;
  onChange: (name: string, status: FileStatus) => void;
  onRemove: (name: string) => void;
}

class FileList extends React.Component<FileListProps> {
  public render() {
    const { fileStatuses: files, children } = this.props;

    return (
      <div className={styles.fileList}>
        {Object.keys(files).map(name => {
          const { isVisible } = files[name];

          return (
            <div key={name} className={styles.file}>
              <div className={styles.before}>
                <img
                  onClick={() => this._onChangeIsVisible(name, !isVisible)}
                  className={classnames(styles.eye, {
                    [styles.hide]: !isVisible
                  })}
                  src={eye}
                />
              </div>
              <div className={styles.name}>{name}</div>
              <div
                className={styles.after}
                onClick={() => this._onClickRemoveFile(name)}
              >
                <img className={styles.remove} src={remove} />
              </div>
            </div>
          );
        })}
        {children}
      </div>
    );
  }

  private _onChangeIsVisible(name: string, isVisible: boolean) {
    const { onChange, fileStatuses } = this.props;

    onChange(name, {
      ...fileStatuses[name],
      isVisible
    });
  }

  private _onClickRemoveFile(name: string) {
    const { onRemove } = this.props;

    onRemove(name);
  }
}

export default FileList;
