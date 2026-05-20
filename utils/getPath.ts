import type { Headings, Separator } from "@/constants/label";

export function getFirstPath(pathname: string) {
  return pathname.match(/^\/[^/]*/)?.[0] ?? "";
}

export function getLastPathId(pathname: string) {
  const segments = pathname.split("/");
  return segments.slice(2).join("/");
}

export function getPathHref(path: string, separator: Separator, id: string) {
  return `${path}${separator}${id}`;
}

export function getMapItemFromHeading(
  path: string,
  headings: Headings,
): [string, string][] {
  return Object.values(headings).map(
    (v): [string, string] => [v.label, getPathHref(path, v.separator, v.id)],
  );
}
