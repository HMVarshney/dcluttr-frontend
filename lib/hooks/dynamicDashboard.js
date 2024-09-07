import { useEffect, useMemo, useRef, useState } from "react";
import { GridStack } from "gridstack";
import { addCardToGrid, getPageDashboards, removeCardFromGrid } from "../utils/dynamicDashboard.utils";
import { useDynamicDashboardContext } from "../context/DynamicDashboard/DynamicDashboardContext";
import { dynamicDashboardActions } from "../context/DynamicDashboard/DynamicDashboardActions";

export const useDynamicDashboard = (pageId, brandId, domNodeRef, placeholderValues) => {
  const { state, dispatch } = useDynamicDashboardContext();

  const { activeSection, dashboard, gridItems } = state;

  const gridstackInstanceRef = useRef(null);

  const activateCard = (cardId, activate, placeholderValues) => {
    if (!activate) {
      removeCardFromGrid(gridstackInstanceRef.current, cardId);
    } else {
      const card = activeSection?.section?.cards.find((c) => c.id === cardId);
      if (card) {
        addCardToGrid(gridstackInstanceRef.current, card, placeholderValues);
      }
    }
    dynamicDashboardActions.updateCardProps(dispatch)(cardId, { active: activate });
  };

  useEffect(() => {
    dynamicDashboardActions.fetchDashboard(dispatch)(brandId);
  }, [brandId, dispatch]);

  useEffect(() => {
    if (!domNodeRef.current) return;

    if (!gridstackInstanceRef.current) {
      gridstackInstanceRef.current = GridStack.init({}, domNodeRef.current);
      dynamicDashboardActions.setGridstackInstance(dispatch)(gridstackInstanceRef.current);
    }

    return () => gridstackInstanceRef.current.destroy();
  }, [dispatch, domNodeRef]);

  const pageDashboards = useMemo(() => {
    if (!dashboard.length) return [];

    const thisPageDashboards = getPageDashboards(dashboard, pageId);
    dynamicDashboardActions.setActiveSection(dispatch)(thisPageDashboards[0].id);
    return thisPageDashboards;
  }, [dashboard, dispatch, pageId]);

  useEffect(() => {
    if (!gridstackInstanceRef.current) return;

    if (!activeSection.section) return;

    const _cardCustomizableProps = {};
    let _gridItems = [];

    activeSection?.section?.cards.forEach((card) => {
      const gridstackOptions = {
        id: card.id,
        ...card.gridStackProperties,
        x: parseInt(card.gridStackProperties.x),
        y: parseInt(card.gridStackProperties.y),
        w: parseInt(card.gridStackProperties.w),
        h: parseInt(card.gridStackProperties.h)
      };

      const gridItem = gridstackInstanceRef.current.addWidget(`<div key="${card.id}"></div>`, gridstackOptions);
      _gridItems.push([gridItem, card]);
      _cardCustomizableProps[card.id] = card;
    }, {});
    dynamicDashboardActions.setCardCustomizableProps(dispatch)(_cardCustomizableProps);
    dynamicDashboardActions.addGridItems(dispatch)(_gridItems);
  }, [activeSection.section, dispatch, placeholderValues]);

  return {
    gridstackInstance: gridstackInstanceRef,
    pageDashboards,

    gridItems,
    activateCard
  };
};
