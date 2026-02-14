import { DATA_DIR_DEV, DATA_DIR_PROD } from '@/constants/dir';

export default async function getJsonFile<T>(...paths: string[]) {
  const fileDir = process.env.NODE_ENV === 'production' ? DATA_DIR_PROD : DATA_DIR_DEV;
  // [Issue] @/...  문자열 필수 (변수X)
  const { default: data } = await import(`@/data/${fileDir[1]}/${paths.join("/")}`);
  return data as T;
}