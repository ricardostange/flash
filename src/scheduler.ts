export type Rating = 'again' | 'hard' | 'good' | 'easy';
export type Progress = { due: number; interval: number; reviews: number; lastReview: number };
export type Store = { version: 1; progress: Record<string, Progress>; activity: Record<string, number> };
export const DAY = 86_400_000;
export const emptyStore = (): Store => ({ version: 1, progress: {}, activity: {} });
export function nextProgress(previous: Progress | undefined, rating: Rating, now: number): Progress {
  const old = previous?.interval ?? 0;
  const interval = rating === 'again' ? 1 / 1440 : rating === 'hard' ? Math.max(1, Math.round(old * 1.2)) : rating === 'good' ? Math.max(1, Math.round(old * 2.5)) : Math.max(4, Math.round(old * 3.5));
  return { due: now + interval * DAY, interval, reviews: (previous?.reviews ?? 0) + 1, lastReview: now };
}
export function localDate(now = new Date()): string { return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`; }
export function validateStore(value: unknown): value is Store {
  if (!value || typeof value !== 'object') return false;
  const s = value as Store;
  return s.version === 1 && !!s.progress && typeof s.progress === 'object' && !Array.isArray(s.progress) && !!s.activity && typeof s.activity === 'object' && !Array.isArray(s.activity) && Object.values(s.progress).every(p => p && ['due', 'interval', 'reviews', 'lastReview'].every(k => typeof p[k as keyof Progress] === 'number' && Number.isFinite(p[k as keyof Progress]) && p[k as keyof Progress] >= 0)) && Object.values(s.activity).every(n => typeof n === 'number' && Number.isFinite(n) && n >= 0);
}
