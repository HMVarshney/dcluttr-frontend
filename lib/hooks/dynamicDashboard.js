import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GridStack } from "gridstack";
import DashboardChart from "@/components/shared/DynamicDashboard/DashboardChart";
import DashboardTable from "@/components/shared/DynamicDashboard/DashboardTable";
import { getActiveDashboardSection, renderComponentToHtml, replacePlaceholders } from "../utils/dynamicDashboard.utils";
import { visualizationTypes } from "../constants/dynamicDashboard";
import axiosInterceptorInstance from "../axiosInterceptorInstance";

function renderGridstackElement(gridstackInstance, element, placeholderValues) {
  const { id, title, description, logo, gridStackProperties, visualizationType, columnOrder, childDatasets } = element;
  const query = JSON.parse(element.query);
  const gridStackOptions = {
    id,
    w: gridStackProperties.w,
    h: gridStackProperties.h,
    x: gridStackProperties.x,
    y: gridStackProperties.y,
    noMove: gridStackProperties.noMove,
    noResize: gridStackProperties.noResize,
    locked: gridStackProperties.locked
  };

  if (visualizationType === visualizationTypes.TABLE) {
    gridstackInstance.addWidget(
      renderComponentToHtml(
        <DashboardTable
          title={title}
          description={description}
          query={replacePlaceholders(query, placeholderValues)}
          columnOrder={columnOrder}
          drilldownQueries={childDatasets}
        />
      ),
      gridStackOptions
    );
  } else if (
    visualizationType === "type1" ||
    visualizationType === visualizationTypes.GAUGE ||
    visualizationType === visualizationTypes.PIECHART
  ) {
    gridstackInstance.addWidget(
      renderComponentToHtml(
        <DashboardChart
          title={title}
          description={description}
          icon={logo}
          query={replacePlaceholders(query, placeholderValues)}
          chartType={visualizationType}
        />
      ),
      gridStackOptions
    );
  }
}

export const useDynamicDashboard = (brandId, domNodeRef, placeholderValues) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dashboard, setDashboard] = useState([]);

  const [activeSectionId, setActiveSectionId] = useState(null);
  const [cardCustomizableProps, setCardCustomizableProps] = useState({});

  const gridstackInstanceRef = useRef(null);

  const activeSection = useMemo(
    () => getActiveDashboardSection(dashboard, activeSectionId).section,
    [activeSectionId, dashboard]
  );

  const updateSection = useCallback(
    (sectionId, partialUpdates) => {
      const dashboardCopy = [...dashboard];
      const { section, activeSectionIndex } = getActiveDashboardSection(dashboard, sectionId);
      dashboardCopy[activeSectionIndex] = { ...section, ...partialUpdates };
      setDashboard(dashboardCopy);
    },
    [dashboard]
  );

  const updateCardProps = (cardId, partialUpdates) => {
    setCardCustomizableProps((cur) => ({ ...cur, [cardId]: { ...cur[cardId], ...partialUpdates } }));
  };

  const activateCard = (cardId, activate, placeholderValues) => {
    if (!activate) {
      const element = document.querySelector(`[gs-id="${cardId}"]`);
      gridstackInstanceRef.current.removeWidget(element);
    } else {
      const card = activeSection.cards.find((c) => c.id === cardId);
      if (card) {
        renderGridstackElement(gridstackInstanceRef.current, card, placeholderValues);
      }
    }

    updateCardProps(cardId, { active: activate });
  };

  useEffect(() => {
    setLoading(true);
    axiosInterceptorInstance
      .get(`/brand/${brandId}/dashboards`)
      .then((res) => {
        setDashboard(res.data.data);
      })
      .catch((err) => {
        setError(err.response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [brandId]);

  useEffect(() => {
    if (!domNodeRef.current) return;

    if (!activeSection) return;

    if (!gridstackInstanceRef.current) gridstackInstanceRef.current = GridStack.init({}, domNodeRef.current);

    const gridstackInstance = gridstackInstanceRef.current;

    // Remove all the existing widgets and create a new batch
    gridstackInstance.removeAll();
    gridstackInstance.batchUpdate(true);

    const _cardCustomizableProps = {};

    // This is where magic happens
    activeSection.cards.map((card) => {
      if (card.active) {
        renderGridstackElement(gridstackInstance, card, placeholderValues);
      }

      _cardCustomizableProps[card.id] = {
        active: true,
        columnOrder: card.columnOrder
      };
    });

    gridstackInstance.batchUpdate(false);
    setCardCustomizableProps(_cardCustomizableProps);

    // console.log("gridstackInstance", gridstackInstance.getGridItems()?.[0]?.gridstackNode);
  }, [domNodeRef, activeSection, placeholderValues]);

  return {
    loading,
    error,
    dashboard,
    setDashboard,
    updateSection,
    activeSection,
    activeSectionId,
    setActiveSectionId,
    gridstackIntance: gridstackInstanceRef.current,
    cardProps: cardCustomizableProps,
    updateCardProps,
    activateCard
  };
};
