import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { ExerciseContext } from '../store/exerciseContext';

const useManageInput = (exerciseId, statsId, changeModalVisibility) => {
    const [enteredValues, setEnteredValues] = useState();
    const [isClean, setIsClean] = useState(false);
    const exerciseCtx = useContext(ExerciseContext);
  
    function editStatsHandler() {
      exerciseCtx.updateStats(exerciseId, statsId, enteredValues);
      changeModalVisibility();
      setIsClean(true);
    }
  
    function closeHandler() {
      changeModalVisibility();
      setIsClean(true);
    }
  
    function adjustEnteredValue(enteredValues) {
      setEnteredValues(enteredValues);
    }

    return [isClean, setIsClean, editStatsHandler, closeHandler, adjustEnteredValue ]
}

export default useManageInput