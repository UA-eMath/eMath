export function escapeString(str) {
  // new line; tab; space;
  return encodeURI(str);
}
