import { NextResponse } from "next/server";

function createDashboardCards(metrics, cube) {
  let cards = [];

  const timeField = cube.dimensions.find((d) => d.type === "time");
  if (timeField) {
    cards = metrics.map((metric) => {
      const compareDateRangeQuery = "${compare_date_range_query}";
      const timeDimensionGranularity = "${time_dimension_granularity}";
      const card = {
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
      return card;
    });
  }

  return cards;
}

export async function POST(req) {
  const { sectionName, selectedMetrics, metricCube, sectionId, brandId } = await req.json();

  const metricsArray = metricCube.measures.reduce((prev, cur) => {
    if (selectedMetrics[cur.name]) {
      prev.push(cur);
    }
    return prev;
  }, []);
  const section = {
    id: sectionId,
    name: sectionName,
    brandId,
    logo: "/icons/google.svg",
    description: "Dashboard description",
    default: false,
    cards: createDashboardCards(metricsArray, metricCube)
  };

  return NextResponse.json({ section }, { status: 201 });
}
