import { useCallback, useEffect, useRef } from "react";
import { GridStack } from "gridstack";
import { useSelector, useDispatch } from "react-redux";
import DashboardChart from "@/components/shared/DynamicDashboard/DashboardChart";
import DashboardTable from "@/components/shared/DynamicDashboard/DashboardTable";
import { getActiveDashboardSection, renderComponentToHtml, replacePlaceholders } from "../utils/dynamicDashboard.utils";
import { visualizationTypes } from "../constants/dynamicDashboard";
import { dynamicDashboardActions, fetchDashboard } from "../store/features/dynamicDashboard";
import ReduxProvider from "../store/ReduxProvider";

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
      gridStackOptions
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
      gridStackOptions
    );
  }
}

export const useDynamicDashboard = (brandId, domNodeRef, placeholderValues) => {
  const dispatch = useDispatch();

  const { loading, error, dashboard, activeSection, cardCustomizableProps } = useSelector((state) => state.dynamicDashboard);

  const gridstackInstanceRef = useRef(null);

  const updateSection = useCallback(
    (sectionId, partialUpdates) => {
      const dashboardCopy = [...dashboard];
      const { section, activeSectionIndex } = getActiveDashboardSection(dashboard, sectionId);
      dashboardCopy[activeSectionIndex] = { ...section, ...partialUpdates };
      dispatch(dynamicDashboardActions.setDashboard(dashboardCopy));
    },
    [dashboard, dispatch]
  );

  const activateCard = (cardId, activate, placeholderValues) => {
    if (!activate) {
      const element = gridstackInstanceRef.current.getGridItems().find((gsNode) => gsNode.gridstackNode.id === cardId);
      gridstackInstanceRef.current.removeWidget(element, true);
    } else {
      const card = activeSection?.section?.cards.find((c) => c.id === cardId);
      if (card) {
        renderGridstackElement(gridstackInstanceRef.current, card, placeholderValues);
      }
    }

    dispatch(dynamicDashboardActions.updateCardProps({ cardId, partialUpdates: { active: activate } }));
  };

  useEffect(() => {
    dispatch(fetchDashboard(brandId));
  }, [brandId, dispatch]);

  useEffect(() => {
    if (!domNodeRef.current) return;

    if (!activeSection.section) return;

    if (!gridstackInstanceRef.current) gridstackInstanceRef.current = GridStack.init({}, domNodeRef.current);

    const gridstackInstance = gridstackInstanceRef.current;

    // Remove all the existing widgets and create a new batch
    gridstackInstance.removeAll();
    gridstackInstance.batchUpdate(true);

    const _cardCustomizableProps = {};

    // This is where magic happens
    activeSection?.section?.cards.map((card) => {
      if (card.active) {
        renderGridstackElement(gridstackInstance, card, placeholderValues);
      }

      _cardCustomizableProps[card.id] = {
        active: card.active,
        columnOrder: card.columnOrder
      };
    });

    gridstackInstance.batchUpdate(false);
    dispatch(dynamicDashboardActions.setCardCustomizableProps(_cardCustomizableProps));
  }, [domNodeRef, activeSection.section, placeholderValues, dispatch]);

  return {
    loading,
    error,
    dashboard,
    updateSection,
    activeSection: activeSection.section,
    activeSectionId: activeSection.id,
    gridstackIntance: gridstackInstanceRef.current,
    cardProps: cardCustomizableProps,
    activateCard
  };
};
