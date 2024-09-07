import { DynamicDashboardProvider } from "../context/DynamicDashboard/DynamicDashboardContext";

function withDynamicDashboardContext(Component) {
  function WithWrapped() {
    return (
      <DynamicDashboardProvider>
        <Component />
      </DynamicDashboardProvider>
    );
  }
  return WithWrapped;
}

export default withDynamicDashboardContext;
