import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import React from "react";

import { DUMMY_TRAININGS } from "../constants/index.js";
import Trening from "../components/Trening";

const AllTrainings = () => {
  console.log(DUMMY_TRAININGS);
  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      resizeMethod="scale"
      style={styles.container}
    >
      <FlatList
        data={DUMMY_TRAININGS}
        renderItem={({ item }) => <Trening title={item.treningName} date={item.date} />
        }
        keyExtractor={(item) => item.id} numColumns={2} showsVerticalScrollIndicator={false}
      />
      {/* {DUMMY_TRAININGS.map(item => <Trening key={item.id} title={item.treningName} date={item.date}  />  )} */}
    </ImageBackground>
  );
};

export default AllTrainings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 2,
    alignItems: 'center'
  },
});
