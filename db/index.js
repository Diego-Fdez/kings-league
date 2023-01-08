import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const DB_PATH = path.join(process.cwd(), './db/');

async function readDBFile(dbName) {
  return readFile(`${DB_PATH}/${dbName}.json`, 'utf-8').then(JSON.parse);
}

export const Teams = await readDBFile('teams');
export const Presidents = await readDBFile('presidents');

export function writeDBFile(dbName, data) {
  /* Writing the data to a file. */
  return writeFile(
    `${DB_PATH}/${dbName}.json`,
    JSON.stringify(data, null, 2),
    'utf-8'
  );
}
