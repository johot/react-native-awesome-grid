import React, { Component } from "react";
import ColumnRow from "./column-row";

export interface ColumnProps {
  style?: any;
  width?: string;
  verticalContentAlignment?: string;
  horizontalContentAlignment?: string;
}

export default class Column extends Component<ColumnProps> {
  static defaultProps = {
    width: "1*"
  };

  render() {
    return <ColumnRow type="column" {...this.props} />;
  }
}
