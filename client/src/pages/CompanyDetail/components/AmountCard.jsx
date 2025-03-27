import React from "react";
import styled from "styled-components";
import { black_200, gray_100 } from "../../../styles/colors";

function AmountCard({ char, type, number }) {
  const unit = type === "price" ? "억 원" : type === "people" ? "명" : "";

  return (
    <Container>
      <Char>{char}</Char>
      <Number>
        {number}
        {unit}
      </Number>
    </Container>
  );
}

export default AmountCard;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${gray_100};
  background-color: ${black_200};
  width: 384px;
  height: 92px;
  padding: 0 20px;
  border-radius: 10px;
  font-size: 16px;
`;

const Char = styled.span`
  font-weight: 300;
`;

const Number = styled.span`
  font-weight: 500;
`;
