import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS, SIZES, FONTS } from "../constants/index/";
// import { FONTS } from '../constants'

function Trening({ title, date, id, onPress }) {

  return (
    <View style={styles.rootContainer}>
      <Pressable onPress={onPress} style={styles.container} android_ripple={{ color: "#a6c6f5" }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </Pressable>
    </View>
  );
}

export default Trening;

const styles = StyleSheet.create({
  rootContainer: {
    width: 150,
    height: 150,
    margin: 8,
    borderRadius: 16,
    elevation: 6,
    backgroundColor: COLORS.grey,
    opacity: 0.6,
    overflow: "hidden",
    shadowColor: '#a6a6a6',
    shadowOpacity: 0.6,
    shadowRadius: 16,
  },
  container: {
    flex: 1,
    // width: "100%",
    // height: '100%',
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontFamily: FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  date: {
    textAlign: "center",
    fontFamily: FONTS.regular,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
});
