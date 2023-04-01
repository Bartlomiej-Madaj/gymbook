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
      setNewExercise(exercise)
   }
   
   const value = {
      trening: newTraining,
      exercises: newExercise,
      addTrening: addNewTraining,
      addExercise: addNewExercice,
   }

   return <TraningContext.Provider value={value} >{children}</TraningContext.Provider>

 }

 export default TrainingProvider