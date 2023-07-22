export const getFrequencyInMonths = (freq) => {
  switch (freq) {
    case "D":
      return 1 / 30; // 1 day
    case "W":
      return 7 / 30; // 1 week
    case "M":
      return 1; // 1 month
    case "3M":
      return 3; // 3 months
    case "6M":
      return 6; // 6 months
    default:
      return 0;
  }
};

export const getTimePeriodInMonths = (timePeriod) => {
  switch (timePeriod) {
    case "3-months":
      return 3;
    case "6-months":
      return 6;
    case "1-year":
      return 12;
    default:
      return 0;
  }
};

export const formatDateInEasternTime = (date) => {
  const options = {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
};
