import CONFIG from "@/constants/config";
import { API_ERRORS } from "@/constants/error";

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `/api`;
  return _baseFetcher(url, endpoint, options);
}

const GITHUB_SERVER_URL = "https://api.github.com";
const GITHUB_HEADERS = {
  "X-GitHub-Api-Version": "2022-11-28",
  Authorization: `Bearer ${CONFIG.GITHUB_TOKEN}`,
};
export async function githubFetcher<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  return _baseFetcher(GITHUB_SERVER_URL, endpoint, {
    ...options,
    headers: {
      ...GITHUB_HEADERS,
      ...options?.headers,
    },
  });
}

async function _baseFetcher<T>(
  url: string,
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  /* formData header 수동 설정 시 경계값(boundary) 생성 이슈 발생 */
  const isFormData = options?.body instanceof FormData;

  const res = await fetch(`${url}${endpoint}`, {
    ...options,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || API_ERRORS.UNKNOWN);
  }

  return res.json();
}
