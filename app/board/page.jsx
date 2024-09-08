"use client";

import { useEffect, useRef, useState } from "react";
import { GridStack } from "gridstack";

import "gridstack/dist/gridstack.min.css";
import { useDynamicDashboardContext } from "@/lib/context/DynamicDashboard/DynamicDashboardContext";
import withDynamicDashboardContext from "@/lib/hoc/withDynamicDasboardContext";
import { dynamicDashboardActions } from "@/lib/context/DynamicDashboard/DynamicDashboardActions";
import { createPortal } from "react-dom";

const placeholderValues = {
  compare_date_range_query: [["2024-07-14", "2024-08-14"]],
  time_dimension_granularity: "day",
  time_dimension_date_range_from: "2024-08-01",
  time_dimension_date_range_to: "2024-08-31"
};

const Mock = () => {
  const { state, dispatch } = useDynamicDashboardContext();

  console.log("mock state", state);

  return <div>Hey</div>;
};

const GridItem = ({ id, children, gridstackOptions }) => {
  const { state, dispatch } = useDynamicDashboardContext();

  console.log("grid state", state);

  const { x, y, w, h } = gridstackOptions;
  return (
    <div className="grid-stack-item" gs-id={id} gs-x={x} gs-y={y} gs-w={w} data-gs-h={h}>
      <div className="grid-stack-item-content">{children}</div>
    </div>
  );
};

function TestBoard() {
  const { state, dispatch } = useDynamicDashboardContext();

  console.log("board state", state);

  const gridRef = useRef(null);
  const gridstackInstanceRef = useRef(null);

  const [gridItems, setGridItems] = useState([]);

  useEffect(() => {
    // Initialize Gridstack when the component is mounted
    const grid = GridStack.init({}, gridRef.current);

    // Create a container element for the React component
    const widgetContainer = document.createElement("div");
    widgetContainer.classList.add("grid-stack-item-content");

    // Add the widget to Gridstack
    const gridItem1 = grid.addWidget(`
      <div>
        
      </div>
    `);
    const gridItem2 = grid.addWidget(`
      <div>
        
      </div>
    `);
    setGridItems([gridItem1, gridItem2]);

    // // Append the container element to the widget
    // gridItem.appendChild(widgetContainer);
    // // gridItem.querySelector(".grid-stack-item-content").appendChild(widgetContainer);

    // // Render the React component inside the widget using a portal
    // createPortal(<div>Hey</div>, widgetContainer);

    return () => {
      // Cleanup gridstack instance when component is unmounted
      grid.destroy();
    };
  }, []);

  const portals = gridItems.length ? gridItems.map((el) => createPortal(<Mock />, el)) : null;
  console.log("portals", portals);
  // useEffect(() => {
  //   if (gridItem) createPortal(<Mock />, gridItem);
  // }, [gridItem]);
  return (
    <div>
      <button onClick={() => dynamicDashboardActions.startLoading(dispatch)()}>Change state</button>
      <div ref={gridRef} className="grid-stack" style={{ width: "100%", height: "100%" }}>
        {portals}
      </div>
    </div>
  );
}

export default withDynamicDashboardContext(TestBoard);
