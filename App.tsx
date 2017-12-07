import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
//import LimeLabel from "./library/lime-label";
import Row from "./library/row";
import Column from "./library/column";
import Grid from "./library/grid";

export default class App extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Grid>
          <Column horizontalContentAlignment="right" verticalContentAlignment="space-around" style={{ backgroundColor: "red" }}>
            {/* <Row horizontalContentAlignment="left" verticalContentAlignment="bottom" style={{ backgroundColor: "pink" }}>
              <Text style={{ fontSize: 30 }}>Hello!</Text>
              <Text style={{ fontSize: 30 }}>Hello!</Text>

              <Text style={{ fontSize: 30 }}>Hello!</Text>
            </Row> */}
            <Text style={{ fontSize: 30 }}>Hello!</Text>
            {/* <Row verticalContentAlignment="bottom" horizontalContentAlignment="left" style={{ backgroundColor: "limegreen" }}> */}
            <Text style={{ fontSize: 30 }}>A</Text>
            <Text style={{ fontSize: 30 }}>B</Text>
            <Text style={{ fontSize: 30 }}>C</Text>
            {/* </Row> */}
          </Column>
          <Column style={{ backgroundColor: "yellow" }}>
            <Row horizontalContentAlignment="center" verticalContentAlignment="center" style={{ borderWidth: 1 }}>
              <Text>Cool</Text>
            </Row>
            <Row style={{ borderWidth: 1 }}>
              <Text>Cool</Text>
            </Row>
            <Row style={{ borderWidth: 1 }}>
              <Text>Cool</Text>
            </Row>
            <Row style={{ borderWidth: 1 }}>
              <Text>Cool</Text>
            </Row>
          </Column>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    //  alignItems: "center",
    //justifyContent: "center"
  }
});
