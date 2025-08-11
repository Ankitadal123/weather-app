const KEY = 'wx:lastCity';

export const saveLastCity = (city: string) => {
  try { localStorage.setItem(KEY, city); } catch {}
};

export const loadLastCity = (): string | null => {
  try { return localStorage.getItem(KEY); } catch { return null; }
};
