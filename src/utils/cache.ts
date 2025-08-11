export type CacheKey = string;

type Entry<T> = { t: number; v: T }; // timestamp + value
const PREFIX = "wx:";
const DEFAULT_TTL = 5 * 60 * 1000; // 5 min

export function setCache<T>(key: CacheKey, value: T): void {
  const wrapped: Entry<T> = { t: Date.now(), v: value };
  localStorage.setItem(PREFIX + key, JSON.stringify(wrapped));
}

export function getCache<T>(key: CacheKey): Entry<T> | null {
  const raw = localStorage.getItem(PREFIX + key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Entry<T>;
  } catch {
    return null;
  }
}

export function isFresh(entry: { t: number }, ttl = DEFAULT_TTL): boolean {
  return Date.now() - entry.t < ttl;
}

export function delCache(key: CacheKey): void {
  localStorage.removeItem(PREFIX + key);
}
