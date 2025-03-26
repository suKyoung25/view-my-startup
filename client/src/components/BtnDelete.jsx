import React from "react";
import styled from "styled-components";

// size prop: "pc(big)" (default), "mobile(small)"
export default function BtnDelete({ onClick, size = "big", style }) {
  return (
    <ButtonWrapper onClick={onClick} $size={size} style={style}>
      <ButtonText>삭제하기</ButtonText>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button`
  width: ${(props) => (props.$size === "small" ? "135px" : "194px")};
  height: ${(props) => (props.$size === "small" ? "44px" : "48px")};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eb5230;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;

const ButtonText = styled.span`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
