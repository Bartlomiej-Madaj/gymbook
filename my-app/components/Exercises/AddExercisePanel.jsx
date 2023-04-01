// import { View, Text, StyleSheet } from 'react-native';
// import React, { useState } from 'react';
// import Input from '../UI/Input';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { searchExerciseByName } from '../../helpers/support-function';
// import { Exercise } from '../../models/exerciseModel';

// import { SIZES, FONTS, COLORS } from '../../constants/index.js';
// import NewButton from '../UI/NewButton';

// const AddExercisePanel = ({changeIsVisible, updateExercises}) => {
// //   const [exercises, setExercises] = useState([]);
//   const [exerciseName, setExerciseName] = useState('');
//   const navigate = useNavigation();
//   const route = useRoute();


//   function addExerciseHandler() {
//     if (!exerciseName) return;
//     updateExercises((currenyExercises) => [
//       new Exercise(exerciseName),
//       ...currenyExercises,
//     ]);
//     changeIsVisible(true)
//   }

//   function finishTrainingHandler() {
//     navigate.navigate('AllTrainings');
//   }
//   return (
//     <View>
//       <Input
//         setEnteredValueHandler={setExerciseName}
//         value={exerciseName}
//         containerInputStyle={styles.inputBox}
//         labelTextStyle={styles.labelText}
//         label="Exercise name"
//         placeholder="Put some name"
//       />
//       <View style={styles.containerButton}>
//         <NewButton
//           title="Add Exercise"
//           onPress={addExerciseHandler}
//           rootContainerStyle={{ marginVertical: 8 }}
//         />
//         <NewButton
//           title="Finish Training"
//           onPress={finishTrainingHandler}
//           rootContainerStyle={{ marginVertical: 8 }}
//         />
//       </View>
//     </View>
//   );
// };

// export default AddExercisePanel;

// const styles = StyleSheet.create({
//   containerButton: {
//     flexDirection: 'row-reverse',
//     justifyContent: 'space-evenly',
//   },
// //   inputsContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 16,
// //   },
// //   inputContainer: {
// //     width: '30%',
// //   },
//   inputBox: {
//     backgroundColor: '#ffffff7e',
//     borderColor: COLORS.secondary,
//     borderRadius: 8,
//   },
//   labelText: {
//     color: 'white',
//   },
// });
