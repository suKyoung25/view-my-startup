import { useState } from "react";
import styled from "styled-components";
import { black_100, brand_orange, gray_200 } from "../styles/colors";

// 아래 props는 size=big/small
function BtnLeft({ size }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <Button $size={size} $isClicked={isClicked} onClick={handleClick}>
      <div>&lt;</div>
    </Button>
  );
}

const Button = styled.div`
  background-color: ${(props) => {
    return props.$isClicked ? brand_orange : black_100;
  }};
  color: ${(props) => {
    return props.$isClicked ? "#FFFFFF" : gray_200;
  }};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${(props) => {
    if (props.$size === "big") return "18px";
    if (props.$size === "medium") return "18px";
    if (props.$size === "small") return "16px";
  }};

  width: ${(props) => {
    if (props.$size === "big") return "48px";
    if (props.$size === "medium") return "48px";
    if (props.$size === "small") return "32px";
  }};
  height: ${(props) => {
    if (props.$size === "big") return "48px";
    if (props.$size === "medium") return "48px";
    if (props.$size === "small") return "32px";
  }};
`;

export default BtnLeft;
