import uuid from 'react-native-uuid';

export class Training {
    constructor(title, unite){
        this.id = uuid.v4(),
        this.date = Date.now()
        this.trainingTitle = title,
        this.trainingUnite = unite,
        this.exercises = []
    }

    updateExercise(exercise){
        this.exercises = exercise
    }
}