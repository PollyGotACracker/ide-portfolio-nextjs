export function getFirstPath(pathname: string) {
  return pathname.match(/^\/[^/]*/)?.[0] ?? "";
}
