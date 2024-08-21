const { Suspense } = require("react");

function withSuspense(Component) {
  function WithSuspenseWrapped() {
    return (
      <Suspense>
        <Component />
      </Suspense>
    );
  }
  return WithSuspenseWrapped;
}

export default withSuspense;
