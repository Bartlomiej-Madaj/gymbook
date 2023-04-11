import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import * as SplashScreen from 'expo-splash-screen';

import { DUMMY_TRAININGS, SIZES, FONTS, COLORS } from '../constants/index.js';
import Training from '../components/Training/Training.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { TraningContext } from '../store/traningContext.js';
import { useContext, useEffect, useState } from 'react';
import { selectAllExercises, selectAllStats, selectAllTrainings } from '../util/database.js';

SplashScreen.preventAutoHideAsync();

const AllTrainings = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const trainingCtx = useContext(TraningContext);
  const [isLoaded, setIsLoaded] = useState(false);

  const trainings = trainingCtx.trainings[0]
    ? [...trainingCtx.trainings, ...DUMMY_TRAININGS]
    : DUMMY_TRAININGS;

  function showTrainingDetailsHandler(id) {
    navigation.navigate('TrainingDetails', { trainingId: id });
  }

  useEffect(()=>{
    async function getAllTrainings(){
      const trainings = await selectAllTrainings()
      const exercises =  await selectAllExercises()
      // trainings.map( async (training) => {
      //   const exercises =  await selectAllExercises(training.id)

      // })
      // console.log(exercises)
      // const stats = await selectAllStats()
      setIsLoaded(true)
      // console.log(trainings)
    }

    getAllTrainings()
  }, [])

  useEffect(() => {
    const hideLoading = async () => {
      if (isLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideLoading();
  }, [isLoaded]);

  if (!isLoaded){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      resizeMode="cover"
      style={styles.imageContainer}
      imageStyle={{ opacity: 0.65 }}
    >
      <StatusBar translucent={true} style="light" />
      <SafeAreaView style={[{ marginTop: headerHeight }]}>
        <FlatList
          data={trainings}
          renderItem={({ item }) => (
            <Training
              title={item.trainingTitle}
              date={item.date}
              id={item.id}
              onPress={showTrainingDetailsHandler.bind(this, item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AllTrainings;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#606060',
  },
  header: {
    maxHeight: '10%',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginVertical: 8,
    textTransform: 'uppercase',
  },
});
