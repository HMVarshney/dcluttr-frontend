import { useCallback, useEffect, useRef, useState } from "react";
import { GridStack } from "gridstack";
import DashboardChart from "@/components/shared/DynamicDashboard/DashboardChart";
import DashboardTable from "@/components/shared/DynamicDashboard/DashboardTable";
import { getActiveDashboardSection, renderComponentToHtml, replacePlaceholders } from "../utils/dynamicDashboard.utils";
import { visualizationTypes } from "../constants/dynamicDashboard";
import axiosInterceptorInstance from "../axiosInterceptorInstance";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchBrandById } from "../store/features/brandSlice";

export const useDynamicDashboard = (domNodeRef, dashboardSection, placeholderValues, renderEngineOptions = {}) => {
  const gridstackInstanceRef = useRef(null);

  useEffect(() => {
    if (!domNodeRef.current) return;

    if (!dashboardSection) return;

    if (!gridstackInstanceRef.current) gridstackInstanceRef.current = GridStack.init(renderEngineOptions, domNodeRef.current);

    const gridstackInstance = gridstackInstanceRef.current;

    // Remove all the existing widgets and create a new batch
    gridstackInstance.removeAll();
    gridstackInstance.batchUpdate(true);

    // This is where...
    dashboardSection.cards.map((card) => {
      if (card.active) {
        const { title, description, logo, gridStackProperties, visualizationType, columnOrder } = card;
        const query = JSON.parse(card.query);
        const gridStackOptions = {
          w: gridStackProperties.w,
          h: gridStackProperties.h,
          x: gridStackProperties.x,
          y: gridStackProperties.y,
          noMove: gridStackProperties.noMove,
          noResize: gridStackProperties.noResize,
          locked: gridStackProperties.locked
        };

        // ...magic happens
        if (visualizationType === visualizationTypes.TABLE) {
          gridstackInstance.addWidget(
            renderComponentToHtml(
              <DashboardTable
                title={title}
                description={description}
                query={replacePlaceholders(query, placeholderValues)}
                columnOrder={columnOrder}
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
    });

    gridstackInstance.batchUpdate(false);
  }, [domNodeRef, dashboardSection, placeholderValues, renderEngineOptions]);

  return gridstackInstanceRef.current;
};

export const useFetchDashboard = (brandId) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dashboard, setDashboard] = useState([]);

  const {
    brandDetails: { brandDetails }
  } = useSelector((state) => state.brand);

  const updateSection = useCallback(
    (sectionId, partialUpdates) => {
      const dashboardCopy = [...dashboard];

      const { section: activeSection, activeSectionIndex } = getActiveDashboardSection(dashboard, sectionId);
      dashboardCopy[activeSectionIndex] = { ...activeSection, ...partialUpdates };

      const orgId = brandDetails[brandId].organizationId;
      setDashboard(dashboardCopy);
      // axiosInterceptorInstance
      //   .put(`/brand/${orgId}/dashboards`, dashboardCopy[activeSectionIndex])
      //   .then(() => {
      //     setDashboard(dashboardCopy);
      //   })
      //   .catch((err) => {
      //     console.error("Error in updating dashboard", err);
      //   });
    },
    [brandDetails, brandId, dashboard]
  );

  useEffect(() => {
    setLoading(true);
    dispatch(fetchBrandById(brandId));
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
  }, [brandId, dispatch]);

  return { loading, error, dashboard, setDashboard, updateSection };
};
