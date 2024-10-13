import React from "react";
import { useRouteError } from "react-router-dom";
import { Button, Typography } from "antd";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error); // Log the error for debugging

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <Typography.Title>Oops! Something went wrong.</Typography.Title>
      <Typography.Paragraph>
        {error.statusText || error.message || "404 Not Found"}
      </Typography.Paragraph>
      <Button type="primary" href="/">
        Go Back to Home
      </Button>
    </div>
  );
};

export default ErrorPage;
