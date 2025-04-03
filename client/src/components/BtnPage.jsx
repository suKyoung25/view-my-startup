import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { black_100, brand_orange } from "../styles/colors";

// 아래 props는 text=1/2/3/4/5 size=big/small isActive=true/false
function BtnPage({ text, size, isActive }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  useEffect(() => {
    setIsClicked(false);
  }, []);

  return (
    <Button
      $size={size}
      $isClicked={isClicked}
      $isActive={isActive}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
}

const Button = styled.div`
  background-color: ${({ $isActive, $isClicked }) =>
    $isActive || $isClicked ? brand_orange : black_100};

  color: ${({ $isActive, $isClicked }) =>
    $isActive || $isClicked ? "#FFFFFF" : "#747474"};

  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ $size }) => ($size === "small" ? "16px" : "18px")};
  width: ${({ $size }) => ($size === "small" ? "32px" : "48px")};
  height: ${({ $size }) => ($size === "small" ? "32px" : "48px")};

  transition: background-color 0.2s, color 0.2s;
`;

export default BtnPage;
