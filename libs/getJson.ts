import fs from 'fs/promises';
import getDir from './getDir';

export default async function getJson<T>(...paths: string[]): Promise<T> {
  const jsonPath = getDir(...paths);
  const data = await fs.readFile(jsonPath, 'utf-8');
  return JSON.parse(data);
}