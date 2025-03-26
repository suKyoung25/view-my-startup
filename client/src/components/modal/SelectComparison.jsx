import React, { useState } from "react";
import styled from "styled-components";
import Search from "../Search";

// 아래 props는 size=big/small
function SelectComparison({ size, state }) {
  const [search, setSearch] = useState("");

  return (
    <Container $size={size}>
      <Title>
        <div>비교할 기업 선택하기</div>
        <div>X</div>
      </Title>
      <div>
        <div>검색 결과 (3)</div>
        <div>검색 결과가 없습니다.</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  background-color: #212121;
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  font-size: 20px;
  width: ${(props) => {
    if (props.$size === "big") return "496px";
    if (props.$size === "small") return "343px";
  }};
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default SelectComparison;
