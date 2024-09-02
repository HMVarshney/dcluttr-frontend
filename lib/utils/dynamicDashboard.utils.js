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
    // Removing '$', '{' and '}' from the name
    return placeholder.slice(2, -1);
  }

  if (typeof obj === "string") {
    const placeholder = stripPlaceholderName(obj);
    // Hydrate 'value' placeholders
    if (obj.startsWith("$") && replacements[placeholder]) {
      let place = replacements[placeholder];

      const isObject = Array.isArray(place) || typeof place === "object";
      // If placeholder value is a JSON
      // Replace it as a stringified JSON and then parse it later
      // If placeholder value is a string replace it as it is
      obj = obj.replace(constructVariableNameFromPlaceholder(placeholder), isObject ? JSON.stringify(place) : place);
      // Parsing the stringified JSON above, if preset
      if (isObject) {
        obj = JSON.parse(obj);
      }
    }
  } else if (Array.isArray(obj)) {
    obj = obj.map((item) => replacePlaceholders(item, replacements));
  } else if (typeof obj === "object" && obj !== null) {
    let newObj = {};
    // Hydrate 'key placeholders'
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

export function getPageDashboards(dashboards, pageId) {
  return dashboards.filter((d) => d.id.startsWith(pageId));
}

export function getActiveDashboardSection(dashboardJSON, activeSectionId) {
  const activeSectionIndex = dashboardJSON.findIndex((s) => s.id === activeSectionId);
  if (activeSectionIndex === -1) return { activeSectionIndex, section: null };
  return { activeSectionIndex, section: dashboardJSON[activeSectionIndex] };
}
