export const millisecInOneDay = 24 * 60 * 60 * 1000;
export const now = () => new Date().toISOString();
export const today = () =>
  new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
export const diffDays = (d1, d2) => {
  const diff = Math.abs(d1 - d2);
  return diff / millisecInOneDay;
};
