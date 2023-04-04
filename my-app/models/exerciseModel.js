import uuid from 'react-native-uuid';

export class Exercise {
  constructor(title) {
    (this.title = title), (this.stats = []), this.id = uuid.v4() ;
  }
}

export class ExerciseStat {
  constructor(set, rep, weight) {
    (this.set = set), (this.rep = rep), (this.weight = weight), this.id = uuid.v4();
  }
}
