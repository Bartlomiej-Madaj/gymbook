import uuid from 'react-native-uuid';

export class Training {
    constructor(training, id){
        this.id = id,
        this.date = training.date
        this.trainingTitle = training.trainingTitle,
        this.trainingUnit = training.trainingUnit,
        this.exercises = []
    }
}