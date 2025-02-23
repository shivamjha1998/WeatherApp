import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";

const SunGradient: React.FC = () => {
  return (
    <View style={styles.container}>
      <Svg height="600" width="400">
        <Defs>
          <RadialGradient id="grad" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#fb9856" stopOpacity="1" />
            <Stop offset="100%" stopColor="rgba(255, 140, 0, 0.3)" stopOpacity="0.5" />
          </RadialGradient>
        </Defs>
        <Circle cx="200" cy="200" r="130" fill="url(#grad)" />
      </Svg>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1000,
  },
});

export default SunGradient;
