import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import { SIZES, FONTS, COLORS } from "../../constants/index";

const ExerciseDetails = ({ exercise, unit }) => {
  const { title, stats } = exercise;
  return (
    <View style={[styles.rootContainer]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        <Text style={styles.stats}> Set</Text>
        <Text style={styles.stats}> Rep </Text>
        <Text style={styles.stats}> Weight [{unit}]</Text>
      </View>
      {stats.map((stat) => (
        <View style={styles.container}>
          <Text style={styles.stats}> {stat.set} </Text>
          <Text style={styles.stats}> {stat.repetition} </Text>
          <Text style={styles.stats}> {stat.weight}</Text>
        </View>
      ))}
    </View>
  );
};

export default ExerciseDetails;

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    // borderColor: "grey",
    // borderWidth: 2,
    marginVertical: 16,
    
  },
  container: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 4 ,
    borderBottomWidth: 2,
    borderColor: COLORS.secondary,
  },
  title: {
    textTransform: "capitalize",
    fontFamily: FONTS.medium,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: 8,
    marginLeft: 8,
  },
  stats: {
    width: "30%",
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
    paddingRight: 8,
    textAlign: "center",
  },
});
