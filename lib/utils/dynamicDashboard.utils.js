import { createPortal } from "react-dom";
import { visualizationTypes } from "../constants/dynamicDashboard";
import DashboardTable from "@/components/shared/DynamicDashboard/DashboardTable";
import DashboardChart from "@/components/shared/DynamicDashboard/DashboardChart";

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

export function renderCardsOnGrid(gridItems, placeholderValues) {
  return gridItems?.map(([gridItem, card], index) => {
    const {
      id,
      title,
      description,
      logo,
      visualizationType,
      datatableProperties,
      childDatasets,
      selectable: isSelectable
    } = card;
    const query = JSON.parse(card.query);

    if (card.active) {
      if (visualizationType === visualizationTypes.TABLE) {
        return createPortal(
          <DashboardTable
            id={id}
            title={title}
            description={description}
            query={replacePlaceholders(query, placeholderValues)}
            columnOrder={datatableProperties?.columnOrder ?? []}
            drilldownQueries={childDatasets ?? []}
            isSelectable={isSelectable}
          />,
          gridItem
        );
      } else if (
        visualizationType === visualizationTypes.LINECHART ||
        visualizationType === visualizationTypes.GAUGE ||
        visualizationType === visualizationTypes.PIECHART ||
        visualizationType === visualizationTypes.DATATABLECHART
      ) {
        return createPortal(
          <DashboardChart
            index={index}
            id={id}
            title={title}
            description={description}
            icon={logo}
            query={replacePlaceholders(query, placeholderValues)}
            chartType={visualizationType}
            isSelectable={isSelectable}
          />,
          gridItem
        );
      }
    }

    return null;
  });
}

export function addCardToGrid(gridstackInstance, card, options) {
  const { x, y, w, h, noMove, noResize, locked } = card.gridStackProperties;
  const gridstackOptions = {
    id: card.id,
    noMove,
    noResize,
    locked,
    w: parseInt(w),
    h: parseInt(h),
    ...(!options?.ignoreCardGridstackCoords && {
      x: parseInt(x),
      y: parseInt(y)
    })
  };
  const gridItem = gridstackInstance.addWidget(`<div key="${card.id}"></div>`, gridstackOptions);
  return [gridItem, card];
}

export function removeCardFromGrid(gridstackInstance, cardId) {
  const element = gridstackInstance.getGridItems().find((gsNode) => gsNode.gridstackNode.id === cardId);
  if (element) {
    gridstackInstance.removeWidget(element);
    gridstackInstance.compact();
  }
}

export function getGridstackMaxRowFromCards(cards) {
  return cards.reduce((prev, card) => {
    const newMax = Math.max(prev, card.gridStackProperties.y + card.gridStackProperties.h);
    return newMax;
  }, 0);
}

export function getCardDatatableProperties(card) {
  if (!card) return { columnOrder: [], columnsPinned: [] };

  const { columnOrder = [], columnsPinned = [] } = card.datatableProperties || {};
  return { columnOrder, columnsPinned };
}

export const dynamicDashboardOperations = {
  createCardObject: function (metricId, cube) {
    const metric = cube.measures.find((m) => m.name === metricId);
    const timeField = cube.dimensions.find((d) => d.type === "time");
    if (!timeField || !metric) {
      return null;
    }

    const compareDateRangeQuery = "${compare_date_range_query}";
    const timeDimensionGranularity = "${time_dimension_granularity}";

    return {
      visualizationType: "linechart",
      title: metric.shortTitle || metric.title,
      id: metric.name,
      logo: "/icons/meta.svg",
      description: "New metric",
      gridStackProperties: {
        x: 0,
        y: 0,
        w: 4,
        h: 2,
        locked: false,
        noResize: true,
        noMove: false
      },
      query: `[{"measures":["${metric.name}"],"timeDimensions":[{"dimension":"${timeField.name}","compareDateRange":"${compareDateRangeQuery}"}]},{"measures":["${metric.name}"],"timeDimensions":[{"dimension":"${timeField.name}","granularity":"${timeDimensionGranularity}","compareDateRange":"${compareDateRangeQuery}"}],"order":[["${timeField.name}","asc"]]}]`,
      columnOrder: [],
      selectedMetric: [],
      childDatasets: [],
      active: true
    };
  },
  convertDatatableToTimeSeriesQuery: function (query, { dateRange, granularity }) {
    if (typeof query === "string") query = JSON.parse(query);

    if (!query.timeDimensions) query.timeDimensions = [];

    query.timeDimensions.push({
      dateRange,
      granularity
    });

    return query;
  },
  addFiltersToQuery: function (query, filters) {
    if (typeof query === "string") query = JSON.parse(query);

    if (!query.filters) query.filters = [];

    Object.entries(filters).forEach(([key, value]) => {
      query.filters.push({ [key]: value });
    });

    return query;
  }
};
