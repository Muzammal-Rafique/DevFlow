import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeStamp(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  let counter: number;

  if (seconds < intervals.minute) {
    return "Just now";
  } else if (seconds < intervals.hour) {
    counter = Math.floor(seconds / intervals.minute);
    return `${counter} ${counter === 1 ? "minute" : "minutes"} ago`;
  } else if (seconds < intervals.day) {
    counter = Math.floor(seconds / intervals.hour);
    return `${counter} ${counter === 1 ? "hour" : "hours"} ago`;
  } else if (seconds < intervals.week) {
    counter = Math.floor(seconds / intervals.day);
    return `${counter} ${counter === 1 ? "day" : "days"} ago`;
  } else if (seconds < intervals.month) {
    counter = Math.floor(seconds / intervals.week);
    return `${counter} ${counter === 1 ? "week" : "weeks"} ago`;
  } else if (seconds < intervals.year) {
    counter = Math.floor(seconds / intervals.month);
    return `${counter} ${counter === 1 ? "month" : "months"} ago`;
  } else {
    counter = Math.floor(seconds / intervals.year);
    return `${counter} ${counter === 1 ? "year" : "years"} ago`;
  }
}

export function formatLargeNumber(number: number): string {
  const absNumber = Math.abs(number);

  if (absNumber >= 1e6) {
    return (absNumber / 1e6).toFixed(1) + "M";
  } else if (absNumber >= 1e3) {
    return (absNumber / 1e3).toFixed(1) + "K";
  } else {
    return number.toString();
  }
}
