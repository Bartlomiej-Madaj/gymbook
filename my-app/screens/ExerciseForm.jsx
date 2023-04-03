import {
  View,
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
import { Exercise } from '../models/exerciseModel';
import { compareItemsById } from '../helpers/support-function';
import List from '../components/Exercises/List';
import { useNavigation, useRoute } from '@react-navigation/native';

const ExerciseForm = () => {
  const headerHeight = useHeaderHeight();
  const [exerciseName, setExerciseName] = useState('');
  const navigate = useNavigation();
  const route = useRoute();
  const trainingCtx = useContext(TraningContext);

  const { trainingId } = route.params;
  const exercises = trainingCtx.exercises;

  const newTraining = trainingCtx.training.find((item) =>
    compareItemsById(item.id, trainingId)
  );

  useEffect(() => {
    navigate.setOptions({
      title: newTraining.trainingTitle.toUpperCase(),
    });
  },[])
 

  function addExerciseHandler() {
    if (!exerciseName) return;
    const newExercise = new Exercise(exerciseName);
    trainingCtx.addExercise(newExercise);
    showStatsForm(newExercise.id);
  }

  function showStatsForm(id) {
    setExerciseName('');
    navigate.navigate('StatsForm', { exerciseId: id, trainingId: trainingId });
  }

  function finishTrainingHandler() {
    trainingCtx.updateTraining(trainingId);
    trainingCtx.clearExercises();
    navigate.navigate('AllTrainings');
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled={false}>
      <ImageBackground
        source={require('../assets/images/background.jpg')}
        resizeMode="cover"
        style={styles.imageContainer}
        imageStyle={{ opacity: 0.65 }}
      >
        <View style={{ marginTop: headerHeight }}>
          <View>
            <Input
              setEnteredValueHandler={setExerciseName}
              value={exerciseName}
              containerInputStyle={styles.inputBox}
              labelTextStyle={styles.labelText}
              label="Exercise name"
              placeholder="Put some name"
              config={{ maxLength: 30 }}
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
        </View>
        <List
          title="Your Exercises"
          data={exercises}
          unit={newTraining.trainingUnit}
        />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ExerciseForm;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: '#606060',
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
