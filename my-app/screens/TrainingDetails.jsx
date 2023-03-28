import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import { DUMMY_TRAININGS, SIZES, FONTS, COLORS } from "../constants/index.js";
import ExerciseDetails from "../components/Exercises/ExerciseDetails.jsx";

const TrainingDetails = ({ route, navigation }) => {
  const headerHeight = useHeaderHeight();

  const trainingId = route.params.trainingId;
  const trainingDay = DUMMY_TRAININGS.find((item) => item.id === trainingId);
  const { exercises } = trainingDay;

  navigation.setOptions({
    headerTitle: trainingDay.treningName.toUpperCase()
  })

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      resizeMode="cover"
      style={styles.container}
      imageStyle={{ opacity: 0.65 }}
    >
      <View style={[styles.titleContainer, {marginTop: headerHeight}]}>
        {/* <Text style={styles.titleText}>{trainingDay.treningName}</Text> */}
      </View>
      <ScrollView style={styles.scrollContainer}>
        {exercises.map((exercise) => (
          <ExerciseDetails exercise={exercise} unit={trainingDay.unit} />
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default TrainingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: "gray",
    // borderWidth: 2,
    alignItems: "center",
    backgroundColor: "#606060",
  },
  titleContainer: {
    width: "100%",
    // alignItems: "center",
    // borderColor: 'grey',
    // borderWidth: 2,
  },
  titleText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginVertical: 8,
    textTransform: "uppercase",
    textAlign: "center",
  },
  scrollContainer: {
    width: "100%",
  },
});
