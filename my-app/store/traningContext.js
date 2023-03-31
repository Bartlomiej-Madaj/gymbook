import { createContext, useState } from "react";


 export const TraningContext =  createContext({
    trening: [],
    exercises: [],
    addTrening: (training) => {},
    addExercise: (exercice) => {},
 })

 function TrainingProvider({children}){
   const [newTraining, setNewTraining] = useState([]);
   const [newExercise, setNewExercise] = useState([]);

   function addNewTraining(training){
      setNewTraining(currentTraining => [...currentTraining, training])
   }

   function addNewExercice(exercise){
      setNewExercise(currentExercises => [exercise, ...currentExercises])
   }
   // function addNewExercice(exercise){
   //    setNewExercise(currenExercises => {
   //       const exerciseItem = currenExercises.find(item => item.title === exercise.title )
   //       if(!exerciseItem) {
   //          return exercise
   //       }else {
   //          return [...exerciseItem, exercise.stats]
   //       }
   //    })
   // }


   const value = {
      trening: newTraining,
      exercises: newExercise,
      addTrening: addNewTraining,
      addExercise: addNewExercice,
   }

   return <TraningContext.Provider value={value} >{children}</TraningContext.Provider>

 }

 export default TrainingProvider