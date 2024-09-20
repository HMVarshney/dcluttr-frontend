import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { actionTypes } from "./DynamicDashboardReducer";

const startLoading = (dispatch) => () => dispatch({ type: actionTypes.START_LOADING });
const stopLoading = (dispatch) => () => dispatch({ type: actionTypes.STOP_LOADING });
const setError = (dispatch) => (error) => dispatch({ type: actionTypes.SET_ERROR, payload: error });
const clearError = (dispatch) => () => dispatch({ type: actionTypes.CLEAR_ERROR });
const setDashboard = (dispatch) => (dashboard) => dispatch({ type: actionTypes.SET_DASHBOARD, payload: dashboard });
const setActiveSection = (dispatch) => (sectionId) =>
  dispatch({ type: actionTypes.SET_ACTIVE_SECTION, payload: { id: sectionId } });
const setCardCustomizableProps = (dispatch) => (props) =>
  dispatch({ type: actionTypes.SET_CARD_CUSTOMIZABLE_PROPS, payload: props });
const addCard = (dispatch) => (cardId, properties) => dispatch({ type: actionTypes.ADD_CARD, payload: { cardId, properties } });
const removeCard = (dispatch) => (cardId) => dispatch({ type: actionTypes.REMOVE_CARD, payload: { cardId } });
const updateCardProps = (dispatch) => (cardId, partialUpdates) =>
  dispatch({ type: actionTypes.UPDATE_CARD_PROPS, payload: { cardId, partialUpdates } });
const setGridstackInstance = (dispatch) => (instance) =>
  dispatch({ type: actionTypes.SET_GRIDSTACK_INSTANCE, payload: instance });
const resetState = (dispatch) => () => dispatch({ type: actionTypes.RESET_STATE });
const addGridItems = (dispatch) => (gridItemsArray) => dispatch({ type: actionTypes.ADD_GRID_ITEMS, payload: gridItemsArray });
const addGridItem = (dispatch) => (gridItemArray) => dispatch({ type: actionTypes.ADD_GRID_ITEM, payload: gridItemArray });
const removeGridItem = (dispatch) => (cardId) => dispatch({ type: actionTypes.REMOVE_GRID_ITEM, payload: cardId });
const addToSelected = (dispatch) => (id) => dispatch({ type: actionTypes.ADD_TO_SELECTED, payload: id });
const removeFromSelected = (dispatch) => (id) => dispatch({ type: actionTypes.REMOVE_FROM_SELECTED, payload: id });
const setSelected = (dispatch) => (cardId, query, filterableId, ids) =>
  dispatch({ type: actionTypes.SET_SELECTED, payload: { cardId, query, filterableId, ids } });
const clearSelected = (dispatch) => () =>
  dispatch({ type: actionTypes.SET_SELECTED, payload: { cardId: null, query: null, ids: {} } });

const fetchDashboard = (dispatch) => async (brandId) => {
  startLoading(dispatch)();
  try {
    const response = await axiosInterceptorInstance.get(`/brand/${brandId}/dashboards`);
    setDashboard(dispatch)(response.data.data);
    stopLoading(dispatch)();
    return response.data;
  } catch (error) {
    setError(dispatch)(error.response);
    stopLoading(dispatch)();
    return error.response;
  }
};

const saveDashboardSection = (dispatch) => async (section) => {
  startLoading(dispatch)();
  try {
    const response = await axiosInterceptorInstance.post(`/brand/24/dashboards`, section);
    stopLoading(dispatch)();
    return response.data;
  } catch (error) {
    setError(dispatch)(error.response);
    stopLoading(dispatch)();
    return error.response;
  }
};

export const dynamicDashboardActions = {
  startLoading,
  stopLoading,
  setError,
  clearError,
  setDashboard,
  setActiveSection,
  setCardCustomizableProps,
  addCard,
  removeCard,
  updateCardProps,
  setGridstackInstance,
  resetState,
  addGridItems,
  addGridItem,
  removeGridItem,
  fetchDashboard,
  saveDashboardSection,
  addToSelected,
  removeFromSelected,
  setSelected,
  clearSelected
};
