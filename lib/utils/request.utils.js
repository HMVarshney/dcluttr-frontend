export function createQueryString(searchParams, values) {
  const params = new URLSearchParams(searchParams.toString());
  Object.entries(values).forEach(([key, value]) => {
    params.set(key, value);
  });
  return params.toString();
}

export function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
