import * as React from "react";

import * as styles from "./FileList.scss";
import * as eye from "../../assets/eye.svg";
import * as remove from "../../assets/remove.svg";

interface FileListProps {
  files: string[];
}

class FileList extends React.Component<FileListProps> {
  public render() {
    const { files } = this.props;

    return (
      <div className={styles.fileList}>
        {files.map(file => {
          return (
            <div key={file} className={styles.file}>
              <div className={styles.before}>
                <img className={styles.eye} src={eye} />
              </div>
              <div className={styles.name}>{file}</div>
              <div className={styles.after}>
                <img className={styles.remove} src={remove} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default FileList;
