import React from "react";
import styled from "styled-components";
import { media } from "../../styles/mixin";
import { black_400, gray_100, gray_200 } from "../../styles/colors";
import company from "../../assets/images/company/sample.png";
import AmountCard from "./componenets/AmountCard";
import BtnLarge from "../../components/BtnLarge";

function CompanyDetail({
  size = "big",
  src = company,
  companyName = "코드잇",
  discription = "에듀테크",
}) {
  return (
    <Wrap>
      <CompanyDetailWrap>
        <CompanyContainer $size={size}>
          <Img $size={size} src={src} alt="Company" />
          <TitleWrap>
            <Title $size={size}>{companyName}</Title>
            <Discription $size={size}>{discription}</Discription>
          </TitleWrap>
        </CompanyContainer>
        <AmountCardContainer>
          <AmountCard char="누적 투자 금액" type="price" number={100} />
          <AmountCard char="매출액" type="price" number={100} />
          <AmountCard char="고용 인원" type="people" number={100} />
        </AmountCardContainer>
        <IntroContainer>
          <IntroTitle>기업 소개</IntroTitle>
          <IntroContent>~~~</IntroContent>
        </IntroContainer>
        <InvestContainer>
          <InvestTitle>View My Startup에서 받은 투자</InvestTitle>
          <BtnLarge type={"orange"} size={"big"} />
        </InvestContainer>
        <TableWrap></TableWrap>
      </CompanyDetailWrap>
    </Wrap>
  );
}

export default CompanyDetail;

const Wrap = styled.div`
  background-color: ${black_400};
  color: ${gray_100};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const CompanyDetailWrap = styled.div`
  width: 1200px;
`;

const CompanyContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  border: solid 1px gray;
  height: 112px;
`;

const TitleWrap = styled.div`
  flex-direction: column;
`;

const Img = styled.img`
  width: ${(props) => (props.$size === "big" ? "48px" : "40px")};
  height: ${(props) => (props.$size === "big" ? "48px" : "40px")};
  border-radius: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  font-size: ${(props) => (props.$size === "big" ? "16px" : "14px")};
  color: white;
  width: auto;
  white-space: nowrap;
  margin: 0;
`;

const Discription = styled.p`
  font-size: ${(props) => (props.$size === "big" ? "14px" : "12px")};
  color: ${gray_200};
  margin: 0;
`;

const AmountCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IntroContainer = styled.div``;

const IntroTitle = styled.div``;

const IntroContent = styled.div``;

const InvestContainer = styled.div``;

const InvestTitle = styled.div``;

const TableWrap = styled.div``;
