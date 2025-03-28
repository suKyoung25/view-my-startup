import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { black_400, black_200, gray_100, gray_200 } from "../../styles/colors";
import companyAPI from "../../api/company.api";
import investmentAPI from "../../api/investment.api";
import BtnLarge from "../../components/BtnLarge";
import BtnPagination from "../../components/BtnPagination";
import AmountCard from "./components/AmountCard";
import InvestmentTable from "./components/InvestmentTable";
import InvestmentModal from "../../components/modal/InvestmentModal";
import { useParams } from "react-router-dom";
import sampleImg from "../../assets/images/company/sample.png";

function CompanyDetail({ size = "big" }) {
  const { companyId } = useParams();
  console.log("companyId:", companyId);
  console.log("Received props:", size);

  const [companyData, setCompanyData] = useState(null);
  const [investors, setInvestors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!companyId) {
      console.error("companyId is undefined");
      return;
    }
    const fetchData = async () => {
      try {
        const company = await companyAPI.getCompanyById(companyId);
        const investments = await investmentAPI.getAllInvestment();
        setCompanyData(company);
        setInvestors(investments.filter((inv) => inv.company.id === companyId));
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchData();
  }, [companyId]);

  if (!companyData) return <p>Loading...</p>;

  return (
    <Wrap>
      <CompanyDetailWrap>
        <CompanyContainer $size={size}>
          <Img
            $size={size}
            src={companyData?.imageUrl || sampleImg} // imageUrl이 없을 경우 기본 이미지 경로 지정
            alt="Company"
          />
          <TitleWrap>
            <Title $size={size}>{companyData.name}</Title>
            <Discription $size={size}>{companyData.category}</Discription>
          </TitleWrap>
        </CompanyContainer>

        <AmountCardContainer>
          <AmountCard
            char="누적 투자 금액"
            type="price"
            number={companyData.totalVirtualInvestmentAmount}
          />
          <AmountCard char="매출액" type="price" number={companyData.revenue} />
          <AmountCard
            char="고용 인원"
            type="people"
            number={companyData.numberOfEmployees}
          />
        </AmountCardContainer>

        <IntroContainer>
          <IntroTitle>기업 소개</IntroTitle>
          <IntroText>{companyData.description}</IntroText>
        </IntroContainer>

        <InvestContainer>
          <InvestTitle>View My Startup에서 받은 투자</InvestTitle>
          <BtnLarge
            type="orange"
            size={size}
            label="기업 투자하기"
            onClick={() => setIsModalOpen(true)}
          />
        </InvestContainer>

        <Hr />

        <TableWrap>
          <TotalAmount>
            총 {companyData.totalVirtualInvestmentAmount}억 원
          </TotalAmount>
          <InvestmentTable data={investors} />
        </TableWrap>

        <PaginationWrap>
          <BtnPagination size="big" />
        </PaginationWrap>
      </CompanyDetailWrap>

      {isModalOpen && (
        <InvestmentModal onClose={() => setIsModalOpen(false)} size={size} />
      )}
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
