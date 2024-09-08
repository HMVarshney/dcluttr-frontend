import { Suspense } from "react";

function withSuspense(Component) {
  function WithWrapped() {
    return (
      <Suspense>
        <Component />
      </Suspense>
    );
  }
  return WithWrapped;
}

export default withSuspense;
