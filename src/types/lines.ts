export interface Station {
  id: string;
  checked?: boolean;
  manualChecked?: boolean;
}

export interface Line {
  lineNumber: string;
  selected: boolean;
  stations: string[];
}

export interface Metric {
  name: string;
  value: string;
  negative?: boolean;
  positive?: boolean;
}

export interface Alert {
  type: string;
  status: string;
  route: string;
}
