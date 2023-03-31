import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';

import { TraningContext } from '../store/traningContext';

import { SIZES, FONTS, COLORS } from '../constants/index.js';
import NewButton from '../components/UI/NewButton';
import Input from '../components/UI/Input';
import { Exercise, ExerciseStat } from '../models/exerciseModel';
import NewExercise from '../components/Exercises/NewExercise';
import { searchExerciseByName } from '../helpers/support-function';
import AddSetsPanel from '../components/Exercises/AddSetsPanel';
import Headline from '../components/Text/Headline';
import List from '../components/Exercises/List';

const ExerciseForm = () => {
  const headerHeight = useHeaderHeight();
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [statsIsVisible, setStatsIsVisible] = useState(false);
  const exercisesCtx = useContext(TraningContext);

  function addExerciseHandler() {
    if (!exerciseName || searchExerciseByName(exercises, exerciseName)) return;
    setExercises((currenyExercises) => [
      new Exercise(exerciseName),
      ...currenyExercises,
    ]);
    setStatsIsVisible(true);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
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
              <NewButton
                title="Add Exercise"
                onPress={addExerciseHandler}
                rootContainerStyle={{ marginVertical: 8, width: '50%' }}
              />
            </View>
          ) : (
            <Headline>
              {exerciseName}
            </Headline>
          )}
          {statsIsVisible && ( <AddSetsPanel exercises={exercises} exerciseName={exerciseName} updateStats={setExercises} clearExerciseName={setExerciseName} showExercisesPanel={setStatsIsVisible} />
          )}
        </View>
        { statsIsVisible ? <List title='Your Exercise' /> : <List title='Your Exercises' />  }
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ExerciseForm;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  container: {
    // flex: 1,
    // minHeight: '50%',
    // borderWidth: 3,
    // borderColor: 'white'
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
  }

});
