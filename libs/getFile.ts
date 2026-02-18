import CONFIG from '@/constants/config';
import { DATA_DIR_DEV, DATA_DIR_PROD } from '@/constants/dir';

export async function getJsonFile<T>(...paths: string[]) {
  const fileDir = CONFIG.IS_PROD ? DATA_DIR_PROD[1] : DATA_DIR_DEV[1];
  const fullPath = paths.join("/");

  // [Issue]
  // md 파일을 읽지 않도록 명시적으로 작성
  const pathWithoutExt = fullPath.replace(".json", "");
  // /data 경로 명시적으로 작성
  const { default: data } = await import(`@/data/${fileDir}/${pathWithoutExt}.json`);

  return data as T;
}