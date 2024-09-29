import { jwtDecode } from "jwt-decode";

export function getDaysAgo(createdAt) {
  const createdDate = new Date(createdAt);
  const today = new Date();

  const timeDifference = today - createdDate;

  // Calculate the differences
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );
  const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Format the output based on days, hours, minutes, and seconds
  if (daysDifference > 0) {
    if (daysDifference === 1) {
      return `Active 1 day ago`;
    } else {
      return `Active ${daysDifference} days ago`;
    }
  } else if (hoursDifference > 0) {
    if (hoursDifference === 1) {
      return `Active 1 hour ago`;
    } else {
      return `Active ${hoursDifference} hours ago`;
    }
  } else if (minutesDifference > 0) {
    if (minutesDifference === 1) {
      return `Active 1 minute ago`;
    } else {
      return `Active ${minutesDifference} minutes ago`;
    }
  } else if (secondsDifference > 0) {
    if (secondsDifference === 1) {
      return `Active 1 second ago`;
    } else {
      return `Active ${secondsDifference} seconds ago`;
    }
  } else {
    return `Active just now`;
  }
}

export const isTokenValid = (token) => {
  if (!token) return false;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

export const buildQueryParams = (params) => {
  const { jobTitle, location, jobType, pay, dateRange } = params;
  const query = new URLSearchParams();

  if (jobTitle) query.append("jobTitle", jobTitle);
  if (location) query.append("location", location);
  if (jobType) query.append("jobType", jobType);
  if (pay) query.append("pay", pay);
  if (dateRange) query.append("dateRange", dateRange);

  return query.toString();
};
