import uuid from 'react-native-uuid';

export class Exercise {
  constructor(title, id) {
    (this.title = title), (this.stats = []), this.id = id ;
  }
  addStats(stats){
    this.stats = [...this.stats, stats]
  }
}

export class ExerciseStat {
  constructor(set, rep, weight, id) {
    (this.set = set), (this.rep = rep), (this.weight = weight), this.id = id;
  }
}
