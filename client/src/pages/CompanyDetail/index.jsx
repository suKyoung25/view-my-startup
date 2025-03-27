import React from "react";
import styled from "styled-components";
import { media } from "../../styles/mixin";
import {
  black_400,
  black_200,
  black_100,
  gray_100,
  gray_200,
} from "../../styles/colors";
import company from "../../assets/images/company/sample.png";
import AmountCard from "./componenets/AmountCard";
import BtnLarge from "../../components/BtnLarge";

function CompanyDetail({
  size = "big",
  src = company,
  companyName = "코드잇",
  discription = "에듀테크",
  content = "~~~~~",
  totalAmount = 140,
  salesRevenue = 44.3,
  numOfEmployees = 95,
  acc = 200,
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
          <AmountCard char="누적 투자 금액" type="price" number={totalAmount} />
          <AmountCard char="매출액" type="price" number={salesRevenue} />
          <AmountCard char="고용 인원" type="people" number={numOfEmployees} />
        </AmountCardContainer>
        <IntroContainer>
          <IntroTitle>기업 소개</IntroTitle>
          <IntroContent>{content}</IntroContent>
        </IntroContainer>
        <InvestContainer>
          <InvestTitle>View My Startup에서 받은 투자</InvestTitle>
          <BtnLarge type={"orange"} size={"big"} label="기업 투자하기" />
        </InvestContainer>
        <Hr />
        <TableWrap>
          <TotalAmount>총 {acc}억 원</TotalAmount>
          <Table>
            <thead>
              <tr>
                <Th>투자자 이름</Th>
                <Th>순위</Th>
                <Th>투자 금액</Th>
                <Th>투자 코멘트</Th>
                <Th></Th>
              </tr>
            </thead>
          </Table>
        </TableWrap>
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
  width: 100%;
  min-height: 100vh;
`;

const CompanyDetailWrap = styled.div`
  width: 1200px;
`;

const CompanyContainer = styled.div`
  display: flex;
  align-items: center;
  height: 112px;
  padding-bottom: 20px;
`;

const TitleWrap = styled.div`
  flex-direction: column;
`;

const Img = styled.img`
  width: ${(props) => (props.$size === "small" ? "49px" : "80x")};
  height: ${(props) => (props.$size === "small" ? "49px" : "80px")};
  border-radius: 100%;
  object-fit: cover;
  padding-right: 20px;
`;

const Title = styled.h1`
  font-size: ${(props) => (props.$size === "small" ? "20px" : "24px")};
  font-weight: 700;
  color: white;
  width: auto;
  white-space: nowrap;
  margin: 0;
`;

const Discription = styled.p`
  font-size: ${(props) => (props.$size === "small" ? "16px" : "20px")};
  color: ${gray_200};
  font-weight: 500;
  margin: 0;
`;

const AmountCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IntroContainer = styled.div`
  background-color: ${black_200};
  color: white;
  border-radius: 10px;
  padding: 24px;
  gap: 10px;
  margin: 20px 0;
`;

const IntroTitle = styled.div`
  font-size: 16px;
`;

const IntroContent = styled.div`
  font-size: 14px;
`;

const Hr = styled.hr`
  color: ${gray_200};
  border: none;
  border-top: 1px solid ${gray_200};
  margin: 20px 0;
`;

const InvestContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
`;

const InvestTitle = styled.div`
  font-weight: 700;
  color: white;
`;

const TableWrap = styled.div``;

const TotalAmount = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
`;

const Table = styled.table`
  width: 100%;
  color: white;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: center;
  padding: 12px;
  background-color: ${black_100};
  font-size: 14px;
  font-weight: 500;
  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    width: 84px;
  }
  &:nth-child(4) {
    width: 884px; /* Adjust the width of the "투자 코멘트" column */
  }
  &:nth-child(5) {
    width: 64px; /* Adjust the width of the last column */
  }
`;
