import { useCallback, useEffect, useRef } from "react";
import { GridStack } from "gridstack";
import { useSelector, useDispatch } from "react-redux";
import {
  addCardToGrid,
  getActiveDashboardSection,
  removeCardFromGrid,
  renderGridstackElement
} from "../utils/dynamicDashboard.utils";
import { dynamicDashboardActions, fetchDashboard } from "../store/features/dynamicDashboard";

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
      removeCardFromGrid(gridstackInstanceRef.current, cardId);
    } else {
      const card = activeSection?.section?.cards.find((c) => c.id === cardId);
      if (card) {
        addCardToGrid(gridstackInstanceRef.current, card, placeholderValues);
      }
    }

    dispatch(dynamicDashboardActions.updateCardProps({ cardId, partialUpdates: { active: activate } }));
  };

  useEffect(() => {
    dispatch(fetchDashboard(brandId));
  }, [brandId, dispatch]);

  useEffect(() => {
    dispatch(dynamicDashboardActions.setGridstackInstance(gridstackInstanceRef.current));
  }, [gridstackInstanceRef.current]);

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

      _cardCustomizableProps[card.id] = card;
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
