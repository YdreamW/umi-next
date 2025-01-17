import { winPath } from '@umijs/utils';
import { extname } from 'path';

export function createRouteId(file: string) {
  return winPath(stripFileExtension(file));
}

export function stripFileExtension(file: string) {
  return file.replace(/\.[a-z0-9]+$/i, '');
}

export function byLongestFirst(a: string, b: string): number {
  return b.length - a.length;
}

export function findParentRouteId(
  routeIds: string[],
  childRouteId: string,
): string | undefined {
  return routeIds.find((id) => childRouteId.startsWith(`${id}/`));
}

const routeModuleExts = ['.js', '.jsx', '.ts', '.tsx', '.md', '.mdx'];
export function isRouteModuleFile(opts: { file: string }) {
  return routeModuleExts.includes(extname(opts.file));
}
