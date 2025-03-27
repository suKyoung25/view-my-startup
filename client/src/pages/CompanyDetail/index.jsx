import React from "react";
import styled from "styled-components";
import { black_400, black_200, gray_100, gray_200 } from "../../styles/colors";
import company from "../../assets/images/company/sample.png";
import BtnLarge from "../../components/BtnLarge";
import BtnPagination from "../../components/BtnPagination";
import AmountCard from "./components/AmountCard";
import UserTable from "./components/UserTable";

function CompanyDetail({
  size = "big",
  src = company,
  companyName = "코드잇",
  discription = "에듀테크",
  introduce = "~~~~~",
  totalAmount = 140,
  salesRevenue = 44.3,
  numOfEmployees = 95,
  acc = 200,
  investors = [], // 투자자 데이터 추가
}) {
  return (
    <Wrap>
      <CompanyDetailWrap>
        {/* 회사 정보 */}
        <CompanyContainer $size={size}>
          <Img $size={size} src={src} alt="Company" />
          <TitleWrap>
            <Title $size={size}>{companyName}</Title>
            <Discription $size={size}>{discription}</Discription>
          </TitleWrap>
        </CompanyContainer>

        {/* 주요 지표 */}
        <AmountCardContainer>
          <AmountCard char="누적 투자 금액" type="price" number={totalAmount} />
          <AmountCard char="매출액" type="price" number={salesRevenue} />
          <AmountCard char="고용 인원" type="people" number={numOfEmployees} />
        </AmountCardContainer>

        {/* 기업 소개 */}
        <IntroContainer>
          <IntroTitle>기업 소개</IntroTitle>
          <IntroText>{introduce}</IntroText>
        </IntroContainer>

        {/* 투자 정보 및 버튼 */}
        <InvestContainer>
          <InvestTitle>View My Startup에서 받은 투자</InvestTitle>
          <BtnLarge type={"orange"} size={"big"} label="기업 투자하기" />
        </InvestContainer>

        <Hr />

        {/* 투자자 목록 */}
        <TableWrap>
          <TotalAmount>총 {acc}억 원</TotalAmount>
          <UserTable data={investors} /> {/* UserTable에 투자자 데이터 전달 */}
        </TableWrap>

        {/* 페이지네이션 */}
        <PaginationWrap>
          <BtnPagination size={"big"} />
        </PaginationWrap>
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
  width: ${(props) => (props.$size === "small" ? "49px" : "80px")};
  height: ${(props) => (props.$size === "small" ? "49px" : "80px")};
  border-radius: 100%;
  object-fit: cover;
  padding-right: 20px;
`;

const Title = styled.h1`
  font-size: ${(props) => (props.$size === "small" ? "20px" : "24px")};
  font-weight: 700;
  color: white;
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
  margin: 20px 0;
`;

const IntroTitle = styled.div`
  font-size: 16px;
`;

const IntroText = styled.div`
  font-size: 14px;
`;

const Hr = styled.hr`
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

const TableWrap = styled.div`
  margin-top: 20px;
`;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
`;

const TotalAmount = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
`;
