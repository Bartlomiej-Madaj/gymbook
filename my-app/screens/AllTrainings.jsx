import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import { DUMMY_TRAININGS, SIZES, FONTS, COLORS } from "../constants/index.js";
import Trening from "../components/Trening";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const AllTrainings = ({navigation, route}) => {
  const headerHeight = useHeaderHeight();

  // const navigation = useNavigation()

  function showTreningDetailsHandler(id) {
      navigation.navigate('TrainingDetails', {trainingId: id } )
  }

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      resizeMode="cover"
      style={styles.container}
      imageStyle={{opacity: 0.65}}
    >
      <StatusBar translucent={true} style='light' />
     <SafeAreaView style={[{marginTop: headerHeight}]}>
        {/* <View style={styles.header}>
          <Text style={styles.title}>Your Trenings</Text>
        </View> */}
        <FlatList
          data={DUMMY_TRAININGS}
          renderItem={({ item }) => <Trening title={item.treningName} date={item.date} id={item.id} onPress={showTreningDetailsHandler.bind(this, item.id)} />
          }
          keyExtractor={(item) => item.id} numColumns={2} showsVerticalScrollIndicator={false}
        />
     </SafeAreaView>
     </ImageBackground>
  );
};

export default AllTrainings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: "gray",
    // borderWidth: 2,
    alignItems: 'center',
    backgroundColor: '#606060'
  },
  header: {
    maxHeight: '10%',
    alignItems: 'center'
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginVertical: 8,
    textTransform: "uppercase",
  }
});
