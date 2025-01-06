import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

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

export const formatDateTime = (selectedDateTime) => {
  const [datePart, timePart] = selectedDateTime.split(":").map(Number);

  const date = new Date(datePart);
  const time = new Date(timePart);

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return { formattedDate, formattedTime };
};

// Function to convert full URL to relative path
export const getRelativePath = (fullAvatarUrl, url) => {
  const baseUrl = "http://54.144.76.160:5000";
  const parts = fullAvatarUrl.split(baseUrl);
  // Concatenate with the new base URL
  const updatedUrl = url + parts[1];
  return updatedUrl;
};

export const getDayDate = (targetDay) => {
  const today = dayjs();

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const todayIndex = today.day() === 0 ? 6 : today.day() - 1;
  const targetIndex = daysOfWeek.indexOf(targetDay);

  const dayDifference = targetIndex - todayIndex;

  return today.add(dayDifference, "day").format("D/MM/YYYY");
};

export const getFormattedTitleWithStrong = (title) => {
  const words = title.split(" ");
  const start = words.slice(0, 3).join(" ");
  const end = words.slice(-3).join(" ");
  const middle = words.slice(3, -3).join(" ");

  return (
    <>
      {start}
      {middle && <strong> {middle} </strong>}
      {end}
    </>
  );
};

export const formatTimeAgo = (timestamp) => {
  const now = dayjs();
  const time = dayjs(timestamp);
  const diffInSeconds = now.diff(time, "second");

  if (diffInSeconds < 60) {
    return diffInSeconds === 1 ? "1sec" : `${diffInSeconds} sec`;
  }

  const diffInMinutes = now.diff(time, "minute");
  if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? "1min" : `${diffInMinutes} min`;
  }

  const diffInHours = now.diff(time, "hour");
  if (diffInHours < 24) {
    return diffInHours === 1 ? "1h" : `${diffInHours} h`;
  }

  const diffInDays = now.diff(time, "day");
  if (diffInDays < 30) {
    return diffInDays === 1 ? "1d" : `${diffInDays} d`;
  }

  const diffInMonths = now.diff(time, "month");
  if (diffInMonths < 12) {
    return diffInMonths === 1 ? "1mon" : `${diffInMonths} mon`;
  }

  const diffInYears = now.diff(time, "year");
  return diffInYears === 1 ? "1y" : `${diffInYears} y`; // Optional: handle years if needed
};

export const formatDateToShort = (date) => {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
  return formattedDate;
};

export function calculateReadingTime(htmlString, wordsPerMinute = 200) {
  // Remove HTML tags to get plain text
  const plainText = htmlString.replace(/<[^>]*>/g, "");

  // Count words
  const wordCount = plainText
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // Calculate time in seconds
  const readingTimeSeconds = (wordCount / wordsPerMinute) * 60;

  // Convert to minutes and seconds
  const minutes = Math.floor(readingTimeSeconds / 60);
  const seconds = Math.round(readingTimeSeconds % 60);

  // Return formatted time
  return `${minutes > 0 ? `${minutes} min ` : ""}${seconds} sec`;
}

// export function getDaysAgo(dateString) {
//   const date = new Date(dateString);
//   const now = new Date();
//   const diffTime = Math.abs(now - date); // Difference in milliseconds
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
//   return `${diffDays} days ago`;
// }
