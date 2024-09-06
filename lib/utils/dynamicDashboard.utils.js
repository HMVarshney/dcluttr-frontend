import { createRoot } from "react-dom/client";
import { visualizationTypes } from "../constants/dynamicDashboard";
import ReduxProvider from "../store/ReduxProvider";
import DashboardTable from "@/components/shared/DynamicDashboard/DashboardTable";
import DashboardChart from "@/components/shared/DynamicDashboard/DashboardChart";

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

export function renderGridstackElement(gridstackInstance, element, placeholderValues) {
  const { id, title, description, logo, gridStackProperties, visualizationType, columnOrder, childDatasets } = element;
  const query = JSON.parse(element.query);
  const gridstackOptions = { id, ...gridStackProperties };

  if (visualizationType === visualizationTypes.TABLE) {
    gridstackInstance.addWidget(
      renderComponentToHtml(
        <ReduxProvider>
          <DashboardTable
            id={id}
            title={title}
            description={description}
            query={replacePlaceholders(query, placeholderValues)}
            columnOrder={columnOrder}
            drilldownQueries={childDatasets}
          />
        </ReduxProvider>
      ),
      gridstackOptions
    );
  } else if (
    visualizationType === visualizationTypes.LINECHART ||
    visualizationType === visualizationTypes.GAUGE ||
    visualizationType === visualizationTypes.PIECHART
  ) {
    gridstackInstance.addWidget(
      renderComponentToHtml(
        <ReduxProvider>
          <DashboardChart
            id={id}
            title={title}
            description={description}
            icon={logo}
            query={replacePlaceholders(query, placeholderValues)}
            chartType={visualizationType}
          />
        </ReduxProvider>
      ),
      gridstackOptions
    );
  }
}

export function createCardObject(metricId, cube) {
  const metric = cube.measures.find((m) => m.name === metricId);
  const timeField = cube.dimensions.find((d) => d.type === "time");
  if (!timeField || !metric) {
    return null;
  }

  const compareDateRangeQuery = "${compare_date_range_query}";
  const timeDimensionGranularity = "${time_dimension_granularity}";
  return {
    visualizationType: "linechart",
    title: metric.title,
    id: metric.name,
    logo: "/icons/meta.svg",
    description: "New metric",
    gridStackProperties: {
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      locked: false,
      noResize: false,
      noMove: false
    },
    query: `[{"measures":["${metric.name}"],"timeDimensions":[{"dimension":"${timeField.name}","compareDateRange":"${compareDateRangeQuery}"}]},{"measures":["${metric.name}"],"timeDimensions":[{"dimension":"${timeField.name}","granularity":"${timeDimensionGranularity}","compareDateRange":"${compareDateRangeQuery}"}],"order":[["${timeField.name}","asc"]]}]`,
    columnOrder: [],
    selectedMetric: [],
    childDatasets: [],
    active: true
  };
}

export function addCardToGrid(gridstackInstance, card, placeholderValues) {
  renderGridstackElement(gridstackInstance, card, placeholderValues);
}

export function removeCardFromGrid(gridstackInstance, cardId) {
  const element = gridstackInstance.getGridItems().find((gsNode) => gsNode.gridstackNode.id === cardId);
  gridstackInstance.removeWidget(element, true);
}
