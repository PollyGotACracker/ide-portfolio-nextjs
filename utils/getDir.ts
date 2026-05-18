import path from 'path';
import CONFIG from '@/constants/config';
import { DATA_DIR_DEV, DATA_DIR_PROD } from '@/constants/dir';

export default function getDir(...paths: string[]) {
  const dataDir = CONFIG.IS_PROD ? DATA_DIR_PROD : DATA_DIR_DEV;
  const resultPath = path.join(process.cwd(), ...dataDir, ...paths);
  return resultPath;
}
