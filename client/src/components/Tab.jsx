import React from "react";
import styled from "styled-components";

//  아래 props는 color=white/gray  size=big/small
function Tab({ color, size }) {
  return (
    <Text $color={color} $size={size}>
      나의 기업 비교
    </Text>
  );
}

const Text = styled.div`
  background-color: black;
  font-size: ${(props) => {
    if (props.$size === "big") return "15px";
    if (props.$size === "small") return "12px";
  }};
  color: ${(props) => {
    if (props.$color === "white") return "#FFFFFF";
    if (props.$color === "gray") return "#747474";
  }};

  width: ${(props) => {
    if (props.$size === "big") return "119px";
    if (props.$size === "small") return "84px";
  }};

  height: ${(props) => {
    if (props.$size === "big") return "60px";
    if (props.$size === "small") return "56px";
  }};
`;

export default Tab;
