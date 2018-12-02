// Csv File

export interface CsvFile {
  name: string;
  contents: Csv;
}

export type Csv = string[][];

// File Contents

export interface Files {
  [file: string]: Contents;
}

export type Contents = any;

// File Statuses

export interface FileStatuses {
  [file: string]: FileStatus;
}

export interface FileStatus {
  isVisible: boolean;
}
