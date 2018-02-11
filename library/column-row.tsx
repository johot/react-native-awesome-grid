import React, { Component } from "react";
import { View } from "react-native";
import Column from "./column";
import Row from "./row";

export type VerticalContentAlignment = "center" | "top" | "bottom" | "flex-start" | "flex-end" | "space-around" | "space-between";
export type HorizontalContentAlignment = "center" | "left" | "right" | "flex-start" | "flex-end" | "space-around" | "space-between";
export type ColumnRowType = "row" | "column";

export interface ColumnRowProps {
  type: ColumnRowType;
  style?: any;
  width?: string | number;
  height?: string | number;
  verticalContentAlignment?: VerticalContentAlignment;
  horizontalContentAlignment?: HorizontalContentAlignment;
}

export default class ColumnRow extends Component<ColumnRowProps> {
  private generateContentAlignmentStyle(): any {
    let generatedStyle = {};

    if (this.props.verticalContentAlignment) {
      let contentAlignmentValue = "";

      switch (this.props.verticalContentAlignment) {
        case "center":
          contentAlignmentValue = "center";
          break;
        case "top":
          contentAlignmentValue = "flex-start";
          break;
        case "bottom":
          contentAlignmentValue = "flex-end";
          break;
        default:
          contentAlignmentValue = this.props.verticalContentAlignment;
      }

      if (this.props.type === "column") {
        generatedStyle = { ...generatedStyle, justifyContent: contentAlignmentValue };
      } else {
        generatedStyle = { ...generatedStyle, alignItems: contentAlignmentValue };
      }
    }

    if (this.props.horizontalContentAlignment) {
      let contentAlignmentValue = "";

      switch (this.props.horizontalContentAlignment) {
        case "center":
          contentAlignmentValue = "center";
          break;
        case "left":
          contentAlignmentValue = "flex-start";
          break;
        case "right":
          contentAlignmentValue = "flex-end";
          break;
        default:
          contentAlignmentValue = this.props.horizontalContentAlignment;
      }

      if (this.props.type === "column") {
        generatedStyle = { ...generatedStyle, alignItems: contentAlignmentValue };
      } else {
        generatedStyle = { ...generatedStyle, justifyContent: contentAlignmentValue };
      }
    }

    return generatedStyle;
  }

  private generateRowColumnSizeStyle(widthOrHeight: string | number) {
    let number = parseInt(widthOrHeight.toString(), 10);
    let itemStyle;

    // If the value is "*" we treat it as "1*"
    if (isNaN(number)) {
      number = 1;
    }

    if (widthOrHeight.toString().endsWith("*")) {
      // Star (%)
      itemStyle = {
        flexGrow: number,
        flexBasis: 0,
        overflow: "hidden"
      };
    } else if (widthOrHeight === "auto") {
      // Auto
      itemStyle = {
        flexBasis: "auto",
        overflow: "hidden"
      };
    } else {
      // Pixel
      itemStyle = {
        flexBasis: number,
        overflow: "hidden"
      };
    }

    return itemStyle;
  }

  private generateStyle(): any {
    let direction = this.props.type;

    React.Children.forEach(this.props.children, component => {
      if (component && (component as any).type === Column) {
        direction = "row";
      } else if (component && (component as any).type === Row) {
        direction = "column";
      }
    });

    // Default values
    let generatedStyle = {
      display: "flex",
      flexDirection: direction,
      ...this.props.style
    };

    // Setup style based on width property
    if (this.props.type === "column") {
      if (this.props.width) {
        const rowColSizeStyle = this.generateRowColumnSizeStyle(this.props.width);
        // Append
        generatedStyle = { ...generatedStyle, ...rowColSizeStyle };
      }

      // Add any content alignment styles
      const contentAlignmentStyle = this.generateContentAlignmentStyle();
      generatedStyle = { ...generatedStyle, ...contentAlignmentStyle };
    } else {
      if (this.props.height) {
        const rowColSizeStyle = this.generateRowColumnSizeStyle(this.props.height);
        // Append
        generatedStyle = { ...generatedStyle, ...rowColSizeStyle };
      }

      // Handle content align
      // Add any content alignment styles
      const contentAlignmentStyle = this.generateContentAlignmentStyle();
      generatedStyle = { ...generatedStyle, ...contentAlignmentStyle };
    }

    return generatedStyle;
  }

  render() {
    const generatedStyle = this.generateStyle();

    return <View style={generatedStyle}>{this.props.children}</View>;
  }
}

// Column.defaultProps = {
//     width: '1*'
// };
