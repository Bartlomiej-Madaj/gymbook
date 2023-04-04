export function searchExerciseByName(exercises, searchName) {
  const exercise = exercises.find(
    (exercise) =>
      exercise.title.toLocaleLowerCase() === searchName.toLocaleLowerCase()
  );
  return exercise;
}

export function compareItemsById(firstItemId, secondItemId) {
  return firstItemId === secondItemId;
}

export function checkFormIsValid(...params) {
  return !params.includes('');
}
