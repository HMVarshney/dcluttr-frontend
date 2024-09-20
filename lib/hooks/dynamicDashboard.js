import { useEffect, useMemo, useRef } from "react";
import { GridStack } from "gridstack";
import {
  addCardToGrid,
  getGridstackMaxRowFromCards,
  getPageDashboards,
  removeCardFromGrid
} from "../utils/dynamicDashboard.utils";
import { useDynamicDashboardContext } from "../context/DynamicDashboard/DynamicDashboardContext";
import { dynamicDashboardActions } from "../context/DynamicDashboard/DynamicDashboardActions";

function registerEventListeners(gridstackInstace) {
  gridstackInstace.on("dragstop", function () {
    gridstackInstace.compact();
  });
}

export const useDynamicDashboard = (pageId, brandId, domNodeRef) => {
  const { state, dispatch } = useDynamicDashboardContext();

  const { activeSection, dashboard, gridItems } = state;

  const gridstackInstanceRef = useRef(null);

  const activateCard = (cardId, activate) => {
    if (!activate) {
      removeCardFromGrid(gridstackInstanceRef.current, cardId);
    } else {
      const card = activeSection?.section?.cards.find((c) => c.id === cardId);
      if (card) {
        const cardAdded = addCardToGrid(
          gridstackInstanceRef.current,
          { ...card, active: true },
          { ignoreCardGridstackCoords: true }
        );
        dynamicDashboardActions.addGridItem(dispatch)(cardAdded);
      }
    }
    dynamicDashboardActions.updateCardProps(dispatch)(cardId, { active: activate });

    // gridstackInstanceRef.current.opts.maxRow = gridstackInstanceRef.current.engine.maxRow = maxRow;
    // gridstackInstanceRef.current.compact();
  };

  useEffect(() => {
    dynamicDashboardActions.fetchDashboard(dispatch)(brandId);
  }, [brandId, dispatch]);

  const pageDashboards = useMemo(() => {
    if (!dashboard.length) return [];

    const thisPageDashboards = getPageDashboards(dashboard, pageId);
    dynamicDashboardActions.setActiveSection(dispatch)(thisPageDashboards[0].id);
    return thisPageDashboards;
  }, [dashboard, dispatch, pageId]);

  useEffect(() => {
    if (!domNodeRef.current) return;

    if (!activeSection.section) return;

    let isNewInstanceInit = false;
    const maxRow = getGridstackMaxRowFromCards(activeSection.section.cards);
    if (!gridstackInstanceRef.current) {
      gridstackInstanceRef.current = GridStack.init(
        {
          disableResize: true,
          cellHeight: 140,
          column: 12,
          animate: true,
          maxRow,
          draggable: {
            cancel: "div.not-draggable"
          }
        },
        domNodeRef.current
      );
      registerEventListeners(gridstackInstanceRef.current);

      dynamicDashboardActions.setGridstackInstance(dispatch)(gridstackInstanceRef.current);

      isNewInstanceInit = true;
    } else {
      if (gridstackInstanceRef.current.opts.maxRow === maxRow) {
        // If new maxRow == prev maxRow then grid relayout should not be done
        // Making it true prevents relayout - written at the end of useEffect
        isNewInstanceInit = true;
      } else {
        // Workaround - maxRow can not be changed ideally.
        // Changing it in the gridstack options and then triggering relayout, is done to achieve maxRow change
        gridstackInstanceRef.current.opts.maxRow = gridstackInstanceRef.current.engine.maxRow = maxRow;
      }
    }

    const _cardCustomizableProps = {};
    let _gridItems = [];

    gridstackInstanceRef.current.removeAll();

    // addWidget is wrapped under batchUpdate to avoid multiple re-renders
    gridstackInstanceRef.current.batchUpdate();
    activeSection?.section?.cards.forEach((card) => {
      if (card.active) {
        const addedCard = addCardToGrid(gridstackInstanceRef.current, card);
        _gridItems.push(addedCard);
      }
      _cardCustomizableProps[card.id] = card;
    });
    gridstackInstanceRef.current.batchUpdate(false);

    dynamicDashboardActions.setCardCustomizableProps(dispatch)(_cardCustomizableProps);
    dynamicDashboardActions.addGridItems(dispatch)(_gridItems);

    // Triggers maxRow change
    if (!isNewInstanceInit) {
      gridstackInstanceRef.current.compact();
    }
  }, [activeSection.section, dispatch, domNodeRef]);

  return {
    gridstackInstance: gridstackInstanceRef,
    pageDashboards,
    gridItems,
    activateCard
  };
};
