export function getFirstPath(pathname: string) {
  return pathname.match(/^\/[^/]*/)?.[0] ?? "";
}

export function getLastPathId(pathname: string) {
  const segments = pathname.split("/");
  return segments.slice(2).join("/");
}
