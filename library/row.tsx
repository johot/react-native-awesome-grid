import React, { Component } from "react";
import { View } from "react-native";
import ColumnRow from "./column-row";

export interface RowProps {
  style?: any;
  height?: string;
  verticalContentAlignment?: string;
  horizontalContentAlignment?: string;
}

export default class Row extends Component<RowProps> {
  render() {
    return <ColumnRow type="row" {...this.props} />;
  }
}

Row.defaultProps = {
  height: "1*"
};
