export function getTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

export function getLocaleTime(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleString();
}
