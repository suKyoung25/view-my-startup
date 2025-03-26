import React from "react";
import { useNavigation } from "../../hooks/navigation";
import styled from "styled-components";
import { brand_orange } from "../../styles/colors";
import { media } from "../../styles/mixin";
import PopupTwoButton from "../../components/modal/PopupTwoButton";

function MainFullList() {
  const { goToCompanyDetail } = useNavigation();

  return (
    <>
      <Wrap>
        <Title>ex. hello!</Title>
        <StartButton onClick={goToCompanyDetail}>시작하기</StartButton>
      </Wrap>
    </>
  );
}

export default MainFullList;

const Wrap = styled.div`
  color: ${brand_orange};
  width: 100%;

  ${media.ipad`
    height: px;
  `}

  ${media.mobile`
      // height: px;
      // margin-top: px;
  `};
`;

const Title = styled.h1`
  font-family: "Pretendard";
  font-weight: 500;
`;

const StartButton = styled.button``;
