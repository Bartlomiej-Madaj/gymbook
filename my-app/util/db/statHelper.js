import { executeSql } from "./dbHelper";

const initStatsQuery = `
CREATE TABLE IF NOT EXISTS stats (
        id INTEGER PRIMARY KEY NOT NULL,
        series INTEGER NOT NULL,
        rep INTEGER NOT NULL,
        weight INTEGER NOT NULL,
        exercise_id INTEGER,
        FOREIGN KEY(exercise_id) REFERENCES exercise(id)
  )`;
const insertStatsQuery = ` INSERT INTO stats(series, rep, weight, exercise_id) VALUES (?, ?, ?, ?)`;
const selectAllStatsQuery = ` SELECT * FROM stats WHERE exercise_id = ?`;
const updateStatQuery = ` UPDATE stats SET series = ?, rep = ?, weight = ? WHERE id = ? `;
const deleteStatQuery = ` DELETE FROM stats WHERE id = ? `;

export function initStats() {
  return executeSql(initStatsQuery);
}

export function insertStats(stats, exerciseId) {
  const args = [stats.set, stats.rep, stats.weight, exerciseId]
  return executeSql(insertStatsQuery, args);
}

export function selectAllStats(exerciseId) {
  return executeSql(selectAllStatsQuery, [exerciseId]);
}

export function updateStat(newStat, statId) {
  const args = [newStat.set, newStat.rep, newStat.weight, statId];
  return executeSql(updateStatQuery, args);
}

export function deleteStat(statId) {
  return executeSql(deleteStatQuery, [statId]);
}
