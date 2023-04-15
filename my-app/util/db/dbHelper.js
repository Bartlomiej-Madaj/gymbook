import { bookGymDatabase } from './openDB';

export function executeSql(executeQuery, args = []) {
  if (args && !(args instanceof Array)) return;

  const queries = executeQuery instanceof Array ? executeQuery : [executeQuery] ;

  const promise = new Promise((resolve, reject) => {
        queries.forEach((query) => {
          bookGymDatabase.transaction((tx) => {
            tx.executeSql(
              query,
              [...args],
              (_, result) => {
                const resolveArg = executeQuery.includes('SELECT')
                  ? result.rows._array
                  : result;
                resolve(resolveArg);
              },
              (_, error) => {
                reject(error);
              }
            );
          });
        });
  });

  return promise;
}
