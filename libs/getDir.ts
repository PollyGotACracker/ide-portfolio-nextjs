import { DATA_DIR_DEV, DATA_DIR_PROD } from '@/constants/dir';
import path from 'path';

export default function getDir(...paths: string[]) {
  const dataDir = process.env.NODE_ENV === "production" ? DATA_DIR_PROD : DATA_DIR_DEV;
  const resultPath = path.join(process.cwd(), ...dataDir, ...paths);
  return resultPath;
}
