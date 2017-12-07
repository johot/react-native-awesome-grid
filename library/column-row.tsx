import React, { Component } from "react";
import { View } from "react-native";
import Column from "./column";
import Row from "./row";

export interface ColumnRowProps {
  type: string;
  style?: any;
  width?: string;
  height?: string;
  verticalContentAlignment?: string;
  horizontalContentAlignment?: string;
}

export default class ColumnRow extends Component<ColumnRowProps> {
  generateContentAlignmentStyle(): any {
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

  generateRowColumnSizeStyle(widthOrHeight: string) {
    let number = parseInt(widthOrHeight, 10);
    let itemStyle;

    // If the value is "*" we treat it as "1*"
    if (isNaN(number)) {
      number = 1;
    }

    if (widthOrHeight.endsWith("*")) {
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

  generateStyle(): any {
    let generatedStyle;
    let direction = this.props.type;

    React.Children.forEach(this.props.children, component => {
      if (component && (component as any).type === Column) {
        direction = "row";
      } else if (component && (component as any).type === Row) {
        direction = "column";
      }
    });

    // Default values
    generatedStyle = {
      //flex: 1,
      //display: 'flex',
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

    // // Wrap in Align block?
    // if (this.props.horizontalContentAlignment || this.props.verticalContentAlignment) {
    //   // Experiment! Modify child props directly!
    //   // var childrenWithProps = React.Children.map(this.props.children, child =>
    //   //     React.cloneElement(child, { style: [child.props.style, { alignSelf: 'stretch' }] }));
    //   // return <View style={this.itemStyle}>
    //   // {/* {childrenWithProps} */}
    //   // </View>

    //   return (
    //     <View style={[this.itemStyle, this.props.style]}>
    //       <Align horizontalAlignment={this.props.horizontalContentAlignment || "left"} verticalAlignment={this.props.verticalContentAlignment || "top"}>
    //         {this.props.children}
    //       </Align>
    //     </View>
    //   );
    // } else {
    //   return <View style={this.itemStyle}>{this.props.children}</View>;
    // }
  }
}

// Column.defaultProps = {
//     width: '1*'
// };
