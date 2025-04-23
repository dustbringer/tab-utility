export const toDay = (date) => new Date(date.setHours(0, 0, 0, 0));

export const now = () => new Date();
export const today = () => new Date(toDay(new Date()));

export const nowISO = () => new Date().toISOString();
export const todayISO = () => new Date(toDay(new Date())).toISOString();

export const millisecInOneDay = 24 * 60 * 60 * 1000;
export const diffDays = (d1, d2) => {
  const diff = Math.abs(d1 - d2);
  return diff / millisecInOneDay;
};

// https://devhints.io/wip/intl-datetime
export const formatDate = (datetime) =>
  new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Australia/Sydney",
  }).format(datetime);

export const formatTime = (datetime) =>
  new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Australia/Sydney",
  }).format(datetime);
