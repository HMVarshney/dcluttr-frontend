import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function setCookie(cname, cvalue, exdays = 1) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function replaceDotWithUnderscore(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  // If the object is an array, process each element of the array.
  if (Array.isArray(obj)) {
    return obj.map((item) => replaceDotWithUnderscore(item));
  }
  // Otherwise, process each key in the object.
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.replace(/\./g, "_"); // Replace all dots in the key
    newObj[newKey] = replaceDotWithUnderscore(obj[key]); // Recursively apply to the value
  });
  return newObj;
}

export function splitKeyAndUseLastPart(key) {
  return key.split(".").pop();
}

export function shortenKeyNames(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => shortenKeyNames(item));
  }

  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[splitKeyAndUseLastPart(key)] = shortenKeyNames(obj[key]); // Recursively apply to the value
  });
  return newObj;
}

export function addDelay(milliseconds) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve();
    }, milliseconds);
  });
}

export function getCommonPinningStyles(data) {
  const { column } = data;
  const isPinned = column.getIsPinned();
  return {
    boxShadow: column.id === "name" ? "-1px 0 1px -1px gray inset" : undefined,
    left: isPinned === "left" ? column.getStart("left") : undefined,
    opacity: isPinned ? 1 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
    background: isPinned === "left" ? "#ffffff" : undefined
  };
}

export const GROUP_BY = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" }
];

const COLORS = ["#B1BA88", "#C3D8CC", "#E87C67", "#EDA2A2", "#EF9B5B", "#BA698C", "#8066CC", "#420533"];

export function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export function getConstructorTextColor(hexColor) {
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  return r + g + b > 384 ? "black" : "white";
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function formatTableNumber(string) {
  if (string === null || string === undefined || string === "") {
    return "-";
  } else {
    return parseFloat(string ?? "0").toFixed(2);
  }
}
export function getActiveElementInArray(arr, elementId) {
  const activeIndex = arr.findIndex((a) => a.id === elementId);
  if (activeIndex === -1) return { activeIndex, element: null };
  return { activeIndex, element: arr[activeIndex] };
}
