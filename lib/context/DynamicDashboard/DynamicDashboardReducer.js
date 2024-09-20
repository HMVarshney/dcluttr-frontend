import { getActiveElementInArray } from "@/lib/utils";

export const initialState = {
  isLoading: false,
  error: null,
  dashboard: [],
  activeSection: {
    id: null,
    section: null
  },
  cardCustomizableProps: {},
  gridstackInstance: null,
  gridItems: [],
  selected: {
    cardId: null,
    query: null,
    filterableId: null,
    ids: {}
  }
};

export const actionTypes = {
  START_LOADING: "START_LOADING",
  STOP_LOADING: "STOP_LOADING",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_DASHBOARD: "SET_DASHBOARD",
  SET_ACTIVE_SECTION: "SET_ACTIVE_SECTION",
  SET_CARD_CUSTOMIZABLE_PROPS: "SET_CARD_CUSTOMIZABLE_PROPS",
  ADD_CARD: "ADD_CARD",
  REMOVE_CARD: "REMOVE_CARD",
  UPDATE_CARD_PROPS: "UPDATE_CARD_PROPS",
  SET_GRIDSTACK_INSTANCE: "SET_GRIDSTACK_INSTANCE",
  RESET_STATE: "RESET_STATE",
  ADD_GRID_ITEMS: "ADD_GRID_ITEMS",
  ADD_GRID_ITEM: "ADD_GRID_ITEM",
  REMOVE_GRID_ITEM: "REMOVE_GRID_ITEM",
  ADD_TO_SELECTED: "ADD_TO_SELECTED",
  REMOVE_FROM_SELECTED: "REMOVE_FROM_SELECTED",
  SET_SELECTED: "SET_SELECTED"
};

export function dynamicDashboardReducer(state, action) {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return { ...state, isLoading: true };
    case actionTypes.STOP_LOADING:
      return { ...state, isLoading: false };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    case actionTypes.SET_DASHBOARD:
      return { ...state, dashboard: action.payload };
    case actionTypes.SET_ACTIVE_SECTION: {
      const activeElement = getActiveElementInArray(state.dashboard, action.payload.id).element;
      return {
        ...state,
        activeSection: { id: action.payload.id, section: activeElement }
      };
    }
    case actionTypes.SET_CARD_CUSTOMIZABLE_PROPS:
      return {
        ...state,
        cardCustomizableProps: action.payload
      };
    case actionTypes.ADD_CARD: {
      const { cardId, properties } = action.payload;
      return {
        ...state,
        cardCustomizableProps: { ...state.cardCustomizableProps, [cardId]: properties }
      };
    }
    case actionTypes.REMOVE_CARD: {
      const cardCustomizablePropsCopy = { ...state.cardCustomizableProps };
      delete cardCustomizablePropsCopy[action.payload.cardId];
      return { ...state, cardCustomizableProps: cardCustomizablePropsCopy };
    }
    case actionTypes.UPDATE_CARD_PROPS: {
      const { cardId, partialUpdates } = action.payload;
      return {
        ...state,
        cardCustomizableProps: {
          ...state.cardCustomizableProps,
          [cardId]: { ...state.cardCustomizableProps[cardId], ...partialUpdates }
        }
      };
    }
    case actionTypes.SET_GRIDSTACK_INSTANCE:
      return { ...state, gridstackInstance: action.payload };
    case actionTypes.RESET_STATE:
      return initialState;
    case actionTypes.ADD_GRID_ITEMS:
      return { ...state, gridItems: [...state.gridItems, ...action.payload] };
    case actionTypes.ADD_GRID_ITEM:
      return { ...state, gridItems: [...state.gridItems, action.payload] };
    case actionTypes.REMOVE_GRID_ITEM:
      return { ...state, gridItems: state.gridItems.filter(([, card]) => card.id !== action.payload) };
    case actionTypes.ADD_TO_SELECTED:
      return { ...state, selected: { ...state.selected, ids: { ...state.selected.ids, ...action.payload } } };
    case actionTypes.REMOVE_FROM_SELECTED: {
      const selectedIds = { ...state.selected.ids };
      delete selectedIds[action.payload];
      return { ...state, selected: { ...state.selected, ids: selectedIds } };
    }
    case actionTypes.SET_SELECTED:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
}
