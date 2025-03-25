import React from "react";
import BtnPage from "./BtnPage";
import BtnLeft from "./BtnLeft";
import BtnRight from "./BtnRight";
import styled from "styled-components";

function BtnPagination({ size }) {
  return (
    <Container>
      <BtnLeft size={size} />
      <BtnPage text={1} size={size} />
      <BtnPage text={2} size={size} />
      <BtnPage text={3} size={size} />
      <BtnPage text={4} size={size} />
      <BtnPage text={5} size={size} />
      <BtnRight size={size} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export default BtnPagination;
