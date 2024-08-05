export function extractTitleOfAnnotation(annotation) {
  return annotation.shortTitle || annotation.title;
}

export function extractColumnsFromAnnotation(rawAnnotation) {
  if (!rawAnnotation) return {};
  return {
    ...rawAnnotation.measures,
    ...rawAnnotation.dimensions
  };
}

export function parseRawAnnotation(rawAnnotation) {
  if (!rawAnnotation) return {};
  return {
    ...rawAnnotation.measures,
    ...rawAnnotation.dimensions,
    ...rawAnnotation.timeDimensions
  };
}

export function parseRawLoadResponse(loadResponse) {
  return {
    results: loadResponse.results[0]?.data || [],
    annotation: parseRawAnnotation(loadResponse.results[0]?.annotation || {}),
    columns: extractColumnsFromAnnotation(loadResponse.results[0].annotation || {})
  };
}
