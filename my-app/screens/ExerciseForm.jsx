import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';

import { TraningContext } from '../store/traningContext';

import { SIZES, FONTS, COLORS } from '../constants/index.js';
import NewButton from '../components/UI/NewButton';
import Input from '../components/UI/Input';
import { Exercise, ExerciseStat } from '../models/exerciseModel';
import { searchExerciseByName } from '../helpers/support-function';
import AddSetsPanel from '../components/Exercises/AddSetsPanel';
import Headline from '../components/Text/Headline';
import List from '../components/Exercises/List';
import { useNavigation, useRoute } from '@react-navigation/native';
// import AddExercisePanel from '../components/Exercises/AddExercisePanel';

const ExerciseForm = () => {
  const headerHeight = useHeaderHeight();
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [statsIsVisible, setStatsIsVisible] = useState(false);
  const navigate = useNavigation();
  const route = useRoute();
  const trainingCtx = useContext(TraningContext);

  const { newTraining } = route.params;

  useEffect(()=> {
    newTraining.updateExercise(exercises)
  }, [exercises])

  trainingCtx.addExercise(exercises)

  function addExerciseHandler() {
    if (!exerciseName || searchExerciseByName(exercises, exerciseName)) return;
    setExercises((currenyExercises) => [
      new Exercise(exerciseName),
      ...currenyExercises,
    ]);
    setStatsIsVisible(true);
  }

  function finishTrainingHandler() {
    trainingCtx.addTrening(newTraining)
    navigate.navigate('AllTrainings');
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled={false}>
      <ImageBackground
        style={styles.imageContainer}
        source={require('../assets/images/background.jpg')}
      >
        <View style={[styles.container, { marginTop: headerHeight }]}>
          {!statsIsVisible ? ( 
            <View>
              <Input
                setEnteredValueHandler={setExerciseName}
                value={exerciseName}
                containerInputStyle={styles.inputBox}
                labelTextStyle={styles.labelText}
                label="Exercise name"
                placeholder="Put some name"
              />
              <View style={styles.containerButton}>
                <NewButton
                  title="Add Exercise"
                  onPress={addExerciseHandler}
                  rootContainerStyle={{ marginVertical: 8 }}
                />
                <NewButton
                  title="Finish Training"
                  onPress={finishTrainingHandler}
                  rootContainerStyle={{ marginVertical: 8 }}
                />
              </View>
            </View>
          ) : (
            <Headline>{exerciseName}</Headline>
          )}
          {statsIsVisible && (
            <AddSetsPanel
              exercises={exercises}
              exerciseName={exerciseName}
              updateStats={setExercises}
              clearExerciseName={setExerciseName}
              showExercisesPanel={setStatsIsVisible}
            />
          )}
        </View>
        {statsIsVisible ? (
          <List
            title="Your Exercise"
            exerciseName={exerciseName}
            data={exercises}
          />
        ) : (
          <List title="Your Exercises" data={exercises} />
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ExerciseForm;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  containerButton: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-evenly',
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputContainer: {
    width: '30%',
  },
  inputBox: {
    backgroundColor: '#ffffff7e',
    borderColor: COLORS.secondary,
    borderRadius: 8,
  },
  labelText: {
    color: 'white',
  },
});
