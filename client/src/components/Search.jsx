import React from "react";
import styled from "styled-components";
import searchImg from "../assets/images/search/lenz.png";
import xImg from "../assets/images/search/x.png";

function Search({ size = "medium", state = "none" }) {
  const innerText =
    state === "searching"
      ? "입력하는 중입니다..|"
      : size === "small"
      ? "검색"
      : "검색어를 입력해주세요";

  return (
    <Container $size={size}>
      {state === "searching" ? (
        <>
          <Input placeholder={innerText} />
          <Img src={xImg} alt="Clear" />
          <Img src={searchImg} alt="Search" />
        </>
      ) : (
        <>
          <Img src={searchImg} alt="Search" />
          <Text $size={size}>{innerText}</Text>
        </>
      )}
    </Container>
  );
}

export default Search;

const Container = styled.div`
  display: flex;
  align-items: center;
  color: #d8d8d8;
  background-color: #212121;
  border: 1px solid #747474;
  border-radius: 10px;
  padding: 5px;
  width: ${(props) =>
    props.$size === "big"
      ? "448px"
      : props.$size === "medium"
      ? "448px"
      : props.$size === "small"
      ? "83px"
      : null};
  height: ${(props) =>
    props.$size === "big"
      ? "48px"
      : props.$size === "medium"
      ? "40px"
      : props.$size === "small"
      ? "40px"
      : null};
`;

const Img = styled.img`
  padding: 0 8px;
  width: 15px;
  height: 15px;
`;

const Text = styled.div`
  font-size: ${(props) =>
    props.$size === "big"
      ? "14px"
      : props.$size === "medium"
      ? "13px"
      : props.$size === "small"
      ? "13px"
      : null};
  font-family: "Pretendard";
  font-weight: 400;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
  background: transparent;
  padding: 5px;
`;
