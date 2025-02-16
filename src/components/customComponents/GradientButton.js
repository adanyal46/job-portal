import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  position: relative;
  background: transparent;
  color: #000; // Default text color
  border: 1px solid #ccc; // Default border color
  border-radius: ${({ borderRadius }) => borderRadius || "5px"};
  padding: 1em 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    background: ${({ borderGradient }) =>
      borderGradient}; // Apply gradient on hover
    color: white; // Change text color to white
    border-color: transparent; // Hide border on hover
  }
`;

const Text = styled.span`
  background: ${({ textGradient }) => textGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 16px;
  font-weight: 500;

  ${Button}:hover & {
    background: none;
    -webkit-text-fill-color: white; // Ensure text is white on hover
  }
`;

const GradientButton = ({
  textGradient,
  borderGradient,
  borderRadius,
  iconPath,
  onClick,
  children,
}) => {
  return (
    <Button
      borderGradient={borderGradient}
      borderRadius={borderRadius}
      onClick={onClick}
    >
      <Text textGradient={textGradient}>{children}</Text>
      {iconPath && (
        <img
          src={iconPath}
          alt="icon"
          style={{ marginLeft: "10px", width: "20px", height: "20px" }}
        />
      )}
    </Button>
  );
};

GradientButton.propTypes = {
  textGradient: PropTypes.string.isRequired,
  borderGradient: PropTypes.string.isRequired,
  borderRadius: PropTypes.string,
  iconPath: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default GradientButton;
