import uuid from 'react-native-uuid';

export class Training {
    constructor(title, unite){
        this.id = uuid.v4(),
        this.title = title,
        this.unite = unite
    }
}