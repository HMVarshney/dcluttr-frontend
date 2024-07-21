import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function setCookie(cname, cvalue, exdays = 1) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export function deleteCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function replaceDotWithUnderscore(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  // If the object is an array, process each element of the array.
  if (Array.isArray(obj)) {
    return obj.map(item => replaceDotWithUnderscore(item));
  }
  // Otherwise, process each key in the object.
  const newObj = {};
  Object.keys(obj).forEach(key => {
    const newKey = key.replace(/\./g, '_'); // Replace all dots in the key
    newObj[newKey] = replaceDotWithUnderscore(obj[key]); // Recursively apply to the value
  });
  return newObj;
}

export function shortenKeyNames(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => shortenKeyNames(item));
  }

  const newObj = {};
  Object.keys(obj).forEach(key => {
    const newKey = key.includes('.') ? key.split('.').pop() : key; // Keep only the part after the last dot
    newObj[newKey] = shortenKeyNames(obj[key]); // Recursively apply to the value
  });
  return newObj;
}

export function addDelay(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}