import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

const SunGradient: React.FC = () => {
  return (
    <View>
      {/* Sun Gradient */}
      <Svg height={height/1.5} width={width}>
        <Defs>
          <RadialGradient id="grad" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#fb9856" stopOpacity="1" />
            <Stop offset="100%" stopColor="rgba(255, 140, 0, 0.3)" stopOpacity="0.5" />
          </RadialGradient>
        </Defs>
        <Circle cx={width/2} cy={height/4} r="130" fill="url(#grad)" />
      </Svg>

      {/* Frosted Blur Effect on Bottom Half */}
      <BlurView intensity={100} tint="light" style={styles.blurOverlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  blurOverlay: {
    position: "absolute",
    top: height / 4,
    width: width,
    height: height,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

export default SunGradient;
