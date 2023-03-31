export function searchExerciseByName(exercises, searchName) {
  const exercise = exercises.find(
    (exercise) =>
      exercise.title.toLocaleLowerCase() === searchName.toLocaleLowerCase()
  );
  return exercise;
}

export function compareItemsById(firstItemId, secondItemoId) {
  return firstItemId.id === secondItemoId.id;
}
