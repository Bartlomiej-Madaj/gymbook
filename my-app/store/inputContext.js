import { createContext, useCallback, useEffect, useState } from "react";

export const InputContext = createContext({
    enteredValues: {
        enteredSet: '',
        enteredRep: '',
        enteredWeight: '',
    },
    adjustEnteredValue: (inputValues) => {},
    clearEnteredValue: () => {}
})

export function InputProvider({children}){
    const [enteredValues, setEnteredValues] = useState(null)

    function adjustEnteredValue(inputValues) {
            setEnteredValues(inputValues)
    }
    // console.log(enteredValues)

    function clearEnteredValue(){
        setEnteredValues(null)
    }

    // console.log(enteredValues)

    const value ={
        enteredValue: enteredValues,
        adjustEnteredValue: adjustEnteredValue,
        clearEnteredValue: clearEnteredValue
    }

    return <InputContext.Provider value={value} >{children}</InputContext.Provider>
}