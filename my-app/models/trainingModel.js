import uuid from 'react-native-uuid';

export class Training {
    constructor(title, unit){
        this.id = uuid.v4(),
        this.date = Date.now()
        this.trainingTitle = title,
        this.trainingUnit = unit,
        this.exercises = []
    }
}