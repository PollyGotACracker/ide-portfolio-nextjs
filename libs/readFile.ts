import fs from 'fs/promises';
import getDir from './getDir';

export async function readJson<T>(...paths: string[]): Promise<T> {
  const jsonPath = getDir(...paths);
  const data = await fs.readFile(jsonPath, 'utf-8');
  return JSON.parse(data);
}

export async function readMd(...paths: string[]): Promise<string> {
  const jsonPath = getDir(...paths);
  const data = await fs.readFile(jsonPath, 'utf-8');
  return data;
}

