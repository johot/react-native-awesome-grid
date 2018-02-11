import React, { Component } from "react";
import { View } from "react-native";
import ColumnRow, { VerticalContentAlignment, HorizontalContentAlignment } from "./column-row";

export interface RowProps {
  style?: any;
  height?: string | number;
  verticalContentAlignment?: VerticalContentAlignment;
  horizontalContentAlignment?: HorizontalContentAlignment;
}

export default class Row extends Component<RowProps> {
  static defaultProps = {
    height: "1*"
  };

  render() {
    return (
      <ColumnRow
        type="row"
        style={this.props.style}
        height={this.props.height}
        verticalContentAlignment={this.props.verticalContentAlignment}
        horizontalContentAlignment={this.props.horizontalContentAlignment}
      />
    );
  }
}
