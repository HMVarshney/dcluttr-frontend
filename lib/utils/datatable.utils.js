export function getAccessorFunction(keyName) {
  return function ({ row }) {
    return row[keyName];
  };
}
