import { View, StyleSheet, Text, FlatList } from 'react-native';

import { SIZES, FONTS, COLORS } from '../../constants/index.js';

import Headline from '../Text/Headline';
import { searchExerciseByName } from '../../helpers/support-function.js';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import ExerciseDetails from './ExerciseDetails.jsx';
import { ExerciseContext } from '../../store/exerciseContext.js';
import { selectAllExercises } from '../../util/database.js';

const List = ({
  title,
  exerciseName,
  unit,
  exerciseIcon,
  statsIcon,
  trainingId,
  exerciseId,
  showUpdateModal,
  toRenderList
}) => {
  const exerciseCtx = useContext(ExerciseContext);
  const [foundExercise, setFoundExercise] = useState([]);
  const [exercises, setExercises] = useState([]);

  // let data = [];
  // data = exerciseCtx.exercises;

  useLayoutEffect(()=>{
    async function getExercises() {
      const exercises = await selectAllExercises(trainingId);
      setExercises(exercises)
      // const trainings = await selectAllTrainings();
      // const currentTraining = trainings.find(item => item.id === trainingId)
      const currentExercise = exercises.find(item => item.id === exerciseId)
      // console.log(currentTraining)
      // setCurrentTraining(currentTraining)
      setFoundExercise([currentExercise])
    }
    getExercises()

    //toRenderList is for test
  }, [trainingId, exerciseId, toRenderList])

  // console.log(exercises)
  // console.log(exercises);

  // useEffect(() => {
  //   if (exerciseName) {
  //     const exercise = searchExerciseByName(data, exerciseName);
  //     setFoundExercise([exercise]);
  //   }
  // }, [exerciseName, data]);

  function showEditExerciseModal(exerciseId) {
    showUpdateModal(exerciseId);
  }

  if (!exercises.at(0)) {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.noteText}>You do not have exercise!</Text>
      </View>
    );
  }
  return (
    <View style={styles.listContainer}>
      <Headline>{title}</Headline>
      <FlatList
        data={exerciseId ? foundExercise : exercises}
        renderItem={({ item }) => (
          <ExerciseDetails
            exerciseIcon={exerciseIcon}
            statsIcon={statsIcon}
            exerciseId = {exerciseId}
            exercise={item}
            unit={unit}
            onPress={showEditExerciseModal.bind(this, item.id)}
          />
        )}
        keyExtractor={() => Math.random().toFixed(6)}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    borderTopColor: COLORS.secondary,
    borderTopWidth: 4,
  },
  noteText: {
    flex: 1,
    marginTop: 16,
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    textAlign: 'center',
    color: COLORS.text,
  },
});
