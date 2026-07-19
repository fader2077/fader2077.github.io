import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parse } from 'yaml';

export interface NavigationItem { label: string; href: string; enabled: boolean; order: number; external: boolean; }

export const validateNavigation = (items: NavigationItem[]) => [...items].sort((a, b) => a.order - b.order).map((item) => {
  if (item.href === '#') throw new Error(`Navigation placeholder is forbidden: ${item.label}`);
  if (item.external) {
    let url: URL;
    try { url = new URL(item.href); } catch { throw new Error(`External navigation requires HTTPS: ${item.label}`); }
    if (url.protocol !== 'https:') throw new Error(`External navigation requires HTTPS: ${item.label}`);
  } else if (!item.href.startsWith('/') || item.href.startsWith('//')) {
    throw new Error(`Internal navigation requires a root-relative path: ${item.label}`);
  }
  return item;
});

export const loadDataFile = async <T>(name: string): Promise<T> => {
  const source = await readFile(resolve(process.cwd(), 'src', 'data', `${name}.yml`), 'utf8');
  return parse(source) as T;
};
