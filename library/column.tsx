import React, { Component } from "react";
import ColumnRow from "./column-row";

export interface ColumnProps {
  style?: any;
  width?: string;
  verticalContentAlignment?: string;
  horizontalContentAlignment?: string;
}

export default class Column extends Component<ColumnProps> {
  render() {
    return <ColumnRow type="column" {...this.props} />;
  }
}

Column.defaultProps = {
  width: "1*"
};
