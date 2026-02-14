const DEFAULT_ERROR_MSG = "An error occurred while fetching data.";

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `/api${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      /* formData header 수동 설정 시 경계값(boundary) 생성 이슈 발생 */
      ...(!(options?.body instanceof FormData) && {
        "Content-Type": "application/json",
      }),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || DEFAULT_ERROR_MSG);
  }

  return res.json();
}

export const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_SERVER_URL = "https://api.github.com";
const GITHUB_HEADERS = {
  'X-GitHub-Api-Version': '2022-11-28',
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
};

export async function githubFetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${GITHUB_SERVER_URL}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...GITHUB_HEADERS,
      ...(!(options?.body instanceof FormData) && {
        "Content-Type": "application/json",
      }),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || DEFAULT_ERROR_MSG);
  }

  return res.json();
}