import ReactDOM from "react-dom/client";

export function renderComponentToHtml(component) {
  const container = document.createElement("div");
  const root = ReactDOM.createRoot(container);
  root.render(component);
  return container;
}

export function replacePlaceholders(obj, replacements) {
  function constructVariableNameFromPlaceholder(placeholder) {
    return "${" + placeholder + "}";
  }

  if (typeof obj === "string") {
    for (let placeholder in replacements) {
      obj = obj.replace(constructVariableNameFromPlaceholder(placeholder), replacements[placeholder]);
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
