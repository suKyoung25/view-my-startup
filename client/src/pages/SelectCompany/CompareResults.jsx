// CompareResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { media } from "../../styles/mixin";
import CompareBtn from "./CompareBtn";
import styles from "./CompareResult.module.css";
import SortDropdown from "../../components/Dropdown";
import BtnLarge from "../../components/BtnLarge";
import TableHeader from "../../components/TableHeader";
import InvestmentModal from "../../components/modal/InvestmentModal";
import InputField from "../../components/InputField";
import PopupOneButton from "../../components/modal/PopupOneButton";

function CompareResults() {
  const location = useLocation();
  const { selectedCompany, compareCompanies } = location.state || {};

  const [mediaSize, setMediaSize] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupModalOpen, setIsPopupModalAble] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closePopupModal = () => setIsPopupModalAble(false);
  const openPopupModal = () => setIsPopupModalAble(true);

  function updateMediaSize() {
    const { innerWidth: width } = window;
    if (width >= 1200) setMediaSize("big");
    else if (width > 744) setMediaSize("medium");
    else setMediaSize("small");
  }

  useEffect(() => {
    updateMediaSize();
    window.addEventListener("resize", updateMediaSize);
    return () => window.removeEventListener("resize", updateMediaSize);
  }, []);

  const sortOptions = [
    "누적 투자금액 높은순",
    "누적 투자금액 낮은순",
    "매출액 높은순",
    "매출액 낮은순",
    "고용 인원 많은순",
    "고용 인원 적은순",
  ];

  const columns = [
    { label: "기업명", name: "name", flex: 1.5 },
    { label: "기업 소개", name: "description", flex: 4 },
    { label: "카테고리", name: "category", flex: 2 },
    { label: "누적 투자 금액", name: "investmentAmount", flex: 1 },
    { label: "매출액", name: "revenue", flex: 2 },
    { label: "고용 인원", name: "employees", flex: 1.5 },
  ];

  const companyList = [selectedCompany, ...(compareCompanies || [])];

  return (
    <>
      <Wrap>
        <div className={styles.contents}>
          <div className={styles.content1}>
            내가 선택한 기업
            <CompareBtn />
            {selectedCompany && (
              <SelectedCompanyBox>
                <img src={selectedCompany.imageUrl} alt="로고" />
                <div>
                  <div>{selectedCompany.name}</div>
                  <div>{selectedCompany.category}</div>
                </div>
              </SelectedCompanyBox>
            )}
          </div>

          <div className={styles.content2}>
            비교 결과 확인하기
            <SortDropdown size={mediaSize} options={sortOptions} />
          </div>

          <StyledTable className={styles.table1}>
            <thead>
              <TableHeader columns={columns} />
            </thead>
            <tbody>
              {companyList.map((company) => (
                <tr key={company.id}>
                  <TD>{company.name}</TD>
                  <TD>{company.description}</TD>
                  <TD>{company.category}</TD>
                  <TD>{company.investmentAmount}</TD>
                  <TD>{company.revenue}</TD>
                  <TD>{company.employees}</TD>
                </tr>
              ))}
            </tbody>
          </StyledTable>

          <SpacerSmall />
          <SpacerSmall />
          <div className={styles.content3}>
            기업 순위 확인하기
            <SortDropdown size={mediaSize} options={sortOptions} />
          </div>

          <StyledTable className={styles.table2}>
            <thead>
              <TableHeader columns={columns} />
            </thead>
            <tbody>
              {[...companyList]
                .sort((a, b) => b.revenue - a.revenue)
                .map((company, idx) => (
                  <tr key={company.id}>
                    <TD>{idx + 1}위</TD>
                    <TD>{company.name}</TD>
                    <TD>{company.description}</TD>
                    <TD>{company.category}</TD>
                    <TD>{company.investmentAmount}</TD>
                    <TD>{company.revenue}</TD>
                    <TD>{company.employees}</TD>
                  </tr>
                ))}
            </tbody>
          </StyledTable>

          <Spacer />
          <BtnLarge
            type={"orange"}
            size={mediaSize}
            label={"나의 기업에 투자하기"}
            onClick={openModal}
          />

          {isModalOpen && (
            <InvestmentModal
              onClose={closeModal}
              size={mediaSize}
              openPopupModal={openPopupModal}
            />
          )}
        </div>

        {isPopupModalOpen && (
          <PopupOneButton
            onClose={closePopupModal}
            size={mediaSize}
            type={"success"}
          />
        )}
      </Wrap>
    </>
  );
}

export default CompareResults;

const Wrap = styled.div`
  background-color: #131313;
  color: #ffffff;
`;

const SelectedCompanyBox = styled.div`
  background: #1e1e1e;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  gap: 16px;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;

  thead tr {
    border-bottom: 16px solid #131313;
  }
`;

const TD = styled.td`
  padding: 20px 16px;
  border-bottom: 1px solid #333;
  font-size: 14px;
  background-color: #212121;
  color: #d8d8d8;
  text-align: center;
`;

const Spacer = styled.div`
  margin-top: 32px;
`;

const SpacerSmall = styled.div`
  margin-top: 40px;
`;
