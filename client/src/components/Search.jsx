import React from "react";
import styled from "styled-components";
import searchImg from "../assets/images/search/lenz.png";
import xImg from "../assets/images/search/x.png";
import { black_300, gray_200, gray_100 } from "../styles/colors";

function Search({ size = "big", state = "none" }) {
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
          <Input placeholder={innerText} />
        </>
      )}
    </Container>
  );
}

export default Search;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: ${gray_100};
  background-color: ${black_300};
  border: 1px solid ${gray_200};
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

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  background-color: ${black_300};
  color: ${gray_100};
  padding: 5px;

  &::placeholder {
    color:${gray_100}
    font-family: "Pretendard";
    font-weight: 300;
    font-size: ${(props) =>
      props.$size === "big"
        ? "14px"
        : props.$size === "medium"
        ? "13px"
        : props.$size === "small"
        ? "13px"
        : null};
  }
`;
