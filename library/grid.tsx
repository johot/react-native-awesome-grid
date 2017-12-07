import React, { Component } from "react";
import Column from "./column";
import { View } from "react-native";
import { Button } from "react-native";

export interface GridProps {
  style?: any;
}

export default class Grid extends Component<GridProps> {
  _root: any;

  setNativeProps = (nativeProps: any) => {
    this._root.setNativeProps(nativeProps);
  };

  generateStyle(): any {
    let generatedStyle;
    let direction = "column";

    React.Children.forEach(this.props.children, component => {
      if (component && (component as any).type === Column) {
        direction = "row";
      }
    });

    generatedStyle = { display: "flex", flexDirection: direction, flex: 1 };

    generatedStyle = {
      ...generatedStyle,
      ...this.props.style
    };

    return generatedStyle;
  }
  render() {
    const generatedStyle = this.generateStyle();

    return (
      <View ref={component => (this._root = component)} style={generatedStyle}>
        {this.props.children}
      </View>
    );
  }
}
