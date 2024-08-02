export function createQueryString(searchParams, values) {
  const params = new URLSearchParams(searchParams.toString());
  Object.entries(values).forEach(([key, value]) => {
    params.set(key, value);
  });
  return params.toString();
}
