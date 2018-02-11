import React, { Component } from "react";
import ColumnRow, { VerticalContentAlignment, HorizontalContentAlignment } from "./column-row";

export interface ColumnProps {
  style?: any;
  width?: string | number;
  verticalContentAlignment?: VerticalContentAlignment;
  horizontalContentAlignment?: HorizontalContentAlignment;
}

export default class Column extends Component<ColumnProps> {
  static defaultProps = {
    width: "1*"
  };

  render() {
    return (
      <ColumnRow
        type="column"
        style={this.props.style}
        width={this.props.width}
        verticalContentAlignment={this.props.verticalContentAlignment}
        horizontalContentAlignment={this.props.horizontalContentAlignment}
      />
    );
  }
}
