import fs from 'fs/promises';
import path from 'path';

export async function getJson<T>(file: string): Promise<T> {
  const jsonPath = path.join(process.cwd(), 'data', file);
  const data = await fs.readFile(jsonPath, 'utf-8');
  return JSON.parse(data);
}