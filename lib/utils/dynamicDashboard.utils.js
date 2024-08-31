import { createRoot } from "react-dom/client";

export function renderComponentToHtml(component) {
  const container = document.createElement("div");
  createRoot(container).render(component);
  return container;
}

export function replacePlaceholders(obj, replacements) {
  function constructVariableNameFromPlaceholder(placeholder) {
    return "${" + placeholder + "}";
  }
  function stripPlaceholderName(placeholder) {
    return placeholder.slice(2, -1);
  }

  if (typeof obj === "string") {
    const placeholder = stripPlaceholderName(obj);
    if (obj.startsWith("$") && replacements[placeholder]) {
      let place = replacements[placeholder];
      const isObject = Array.isArray(place) || typeof place === "object";

      obj = obj.replace(constructVariableNameFromPlaceholder(placeholder), isObject ? JSON.stringify(place) : place);
      if (isObject) {
        obj = JSON.parse(obj);
      }
    }
  } else if (Array.isArray(obj)) {
    obj = obj.map((item) => replacePlaceholders(item, replacements));
  } else if (typeof obj === "object" && obj !== null) {
    let newObj = {};
    for (let key in obj) {
      let newKey = key;
      for (let placeholder in replacements) {
        newKey = newKey.replace(constructVariableNameFromPlaceholder(placeholder), replacements[placeholder]);
      }
      newObj[newKey] = replacePlaceholders(obj[key], replacements);
    }
    obj = newObj;
  }
  return obj;
}
