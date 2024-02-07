function getLocalTime() {
  const now = new Date();
  const offsetMilliseconds = now.getTimezoneOffset() * 60 * 1000;
  const localTime = new Date(now.getTime() - offsetMilliseconds);
  const formattedTime = localTime.toISOString().slice(0, -5) + "+03:30";
  return formattedTime;
}

export { getLocalTime };
