export function isCurrentVersionHigher(server, current) {
  const [major1, minor1, patch1] = server.replace(/[^0-9.]/g, '').split(".").map(Number);
  const [major2, minor2, patch2] = current.replace(/[^0-9.]/g, '').split(".").map(Number);

  if (major1 !== major2) return major2 > major1;
  if (minor1 !== minor2) return minor2 > minor1;
  return patch2 > patch1;
}
