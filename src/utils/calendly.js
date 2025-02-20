export const storeCalendlyToken = (tokenData) => {
  const expiryTime = Date.now() + tokenData.expires_in * 1000; // Convert seconds to milliseconds
  localStorage.setItem(
    "calendly_token",
    JSON.stringify({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expiryTime,
    })
  );
};
export const getToken = async () => {
  const tokenData = JSON.parse(localStorage.getItem("calendly_token"));
  if (!tokenData) return null;

  if (Date.now() > tokenData.expiryTime) {
    return await refreshToken(tokenData.refresh_token);
  }
  return tokenData.access_token;
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await fetch("https://auth.calendly.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "refresh_token",
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      storeCalendlyToken(data); // Save new token
      return data.access_token;
    } else {
      console.error("Refresh token failed. Please re-login.");
      localStorage.removeItem("calendly_token");
      return null;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

export const getEventTypeUri = async (accessToken, userUri) => {
  try {
    const response = await fetch(
      `https://api.calendly.com/event_types?user=${userUri}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("Full Event Type API Response:", data);
    if (data.collection && data.collection.length > 0) {
      return data.collection[0].uri; // Return the first available event type
    }
    return null;
  } catch (error) {
    console.error("Error fetching event type URI:", error);
    return null;
  }
};

export const scheduleEvent = async (
  accessToken,
  eventTypeUri,
  inviteeEmail,
  startTime
) => {
  try {
    const response = await fetch("https://api.calendly.com/scheduled_events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_type: eventTypeUri,
        invitee: {
          email: inviteeEmail,
        },
        start_time: startTime, // Example: "2025-02-21T15:00:00.000Z"
      }),
    });

    const data = await response.json();
    console.log("Scheduled Event Response:", data);
    return data.resource.uri; // Return the scheduled event link
  } catch (error) {
    console.error("Error scheduling event:", error);
    return null;
  }
};

export const handleScheduleMeeting = async (
  mentorUserUri,
  inviteeEmail,
  startTime
) => {
  const accessToken = await getToken();
  if (!accessToken) {
    console.error("Access token is missing or expired.");
    return;
  }

  const eventTypeUri = await getEventTypeUri(accessToken, mentorUserUri);
  if (!eventTypeUri) {
    console.error("No event type found for this user.");
    return;
  }

  const eventUri = await scheduleEvent(
    accessToken,
    eventTypeUri,
    inviteeEmail,
    startTime
  );
  if (eventUri) {
    console.log("Event Scheduled Successfully! Event Link:", eventUri);
  } else {
    console.error("Failed to schedule event.");
  }
};
export const getUserUri = async (accessToken) => {
  try {
    const response = await fetch("https://api.calendly.com/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.resource.uri; // User URI from Calendly API
  } catch (error) {
    console.error("Error fetching user URI:", error);
    return null;
  }
};

export const createEventType = async (accessToken, userUri) => {
  try {
    const response = await fetch("https://api.calendly.com/event_types", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Mentorship Session", // Name of event
        duration: 30, // Event duration in minutes
        slug: "mentorship-session", // Custom URL slug
        active: true, // Event type is active
        scheduling_url: "https://calendly.com/your-custom-url",
        kind: "solo", // Type of event (solo or group)
        description: "A 30-minute mentorship session.",
        owner: userUri, // Your Calendly user URI
      }),
    });

    const data = await response.json();
    console.log("🆕 New Event Type Created:", data);

    if (data.resource) {
      return data.resource.uri; // Return the event type URI
    } else {
      console.error("⚠️ Failed to create event type:", data);
      return null;
    }
  } catch (error) {
    console.error("❌ Error creating event type:", error);
    return null;
  }
};
