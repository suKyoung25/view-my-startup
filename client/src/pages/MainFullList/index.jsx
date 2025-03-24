import React from "react";
import { useNavigation } from "../../hooks/navigation";

import styled from "styled-components";
import { brand_orange } from "../../styles/colors";
import { media } from "../../styles/mixin";
import BtnLarge from "../../components/BtnLarge";
import BtnMedium from "../../components/BtnMedium";
import BtnOutline from "../../components/BtnOutline";

function MainFullList() {
  const { goToCompanyDetail } = useNavigation();

  return (
    <>
      <Wrap>
        <Title>ex. hello!</Title>
        <StartButton onClick={goToCompanyDetail}>시작하기</StartButton>

        {/* 아래 props는 type=black/orange/""  size=big/small*/}
        <BtnLarge type={"black"} size={"big"} />
        <div>---------</div>
        {/* 아래 props는 src=white/gray 추가 */}
        <BtnMedium type={"black"} size={"small"} src={"gray"} />
        <div>---------</div>
        {/* 아래 props는 text=choice/complete/cancel type=black/orange/none size=big/small src=exixtBig/existSmall/"" */}
        <BtnOutline
          text={"choice"}
          type={"black"}
          size={"big"}
          src={"existBig"}
        />
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
