import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import CompareBtn from "./CompareBtn";
import styles from "./CompareResult.module.css";
import SortDropdown from "../../components/Dropdown";
import BtnLarge from "../../components/BtnLarge";
import TableHeader from "../../components/TableHeader";
import InvestmentModal from "../../components/modal/InvestmentModal";
import InputField from "../../components/InputField";
import PopupOneButton from "../../components/modal/PopupOneButton";
import { fetchComparedCompanies } from "../../api/myCompany";

function CompareResults() {
  const location = useLocation();
  const { selectedCompanyId, compareCompanyIds } = location.state || {};

  const [mediaSize, setMediaSize] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupModalOpen, setIsPopupModalAble] = useState(false);
  const [sortTop, setSortTop] = useState("누적 투자금액 높은순");
  const [sortBottom, setSortBottom] = useState("누적 투자금액 높은순");
  const [companies, setCompanies] = useState([]);

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

  useEffect(() => {
    if (!selectedCompanyId) return;
    const loadData = async () => {
      try {
        const data = await fetchComparedCompanies({
          selectedCompanyId,
          compareCompanyIds,
        });
        setCompanies(data);
      } catch (err) {
        console.error("기업 비교 데이터 불러오기 실패:", err);
      }
    };
    loadData();
  }, [selectedCompanyId, compareCompanyIds]);

  const sortOptions = [
    "누적 투자금액 높은순",
    "누적 투자금액 낮은순",
    "매출액 높은순",
    "매출액 낮은순",
    "고용 인원 많은순",
    "고용 인원 적은순",
  ];

  const sortCompanies = (list, criteria) => {
    const [field, order] = (() => {
      switch (criteria) {
        case "누적 투자금액 높은순":
          return ["investmentAmount", "desc"];
        case "누적 투자금액 낮은순":
          return ["investmentAmount", "asc"];
        case "매출액 높은순":
          return ["revenue", "desc"];
        case "매출액 낮은순":
          return ["revenue", "asc"];
        case "고용 인원 많은순":
          return ["employees", "desc"];
        case "고용 인원 적은순":
          return ["employees", "asc"];
        default:
          return ["investmentAmount", "desc"];
      }
    })();

    return [...list].sort((a, b) => {
      const aVal = a[field] ?? 0;
      const bVal = b[field] ?? 0;
      return order === "asc" ? aVal - bVal : bVal - aVal;
    });
  };

  const columns = [
    { label: "기업명", name: "name", flex: 1.5 },
    { label: "기업 소개", name: "description", flex: 4 },
    { label: "카테고리", name: "category", flex: 2 },
    { label: "누적 투자 금액", name: "realInvestmentAmount", flex: 1 },
    { label: "매출액", name: "revenue", flex: 2 },
    { label: "고용 인원", name: "employees", flex: 1.5 },
  ];

  const rankColumns = [{ label: "순위", name: "ranking", flex: 1 }, ...columns];

  return (
    <>
      <Wrap>
        <div className={styles.contents}>
          <div className={styles.content1}>
            내가 선택한 기업
            <CompareBtn />
          </div>

          <InputField>
            {companies.length > 0 && (
              <SelectedCompanyBox>
                <img src={companies[0].imageUrl} alt="로고" />
                <div>
                  <div>{companies[0].name}</div>
                  <div>{companies[0].category}</div>
                </div>
              </SelectedCompanyBox>
            )}
          </InputField>

          <SpacerSmall />

          <div className={styles.content2}>
            비교 결과 확인하기
            <SortDropdown
              size={mediaSize}
              options={sortOptions}
              value={sortTop}
              onChange={setSortTop}
            />
          </div>

          <StyledTable className={styles.table1}>
            <thead>
              <TableHeader columns={columns} />
            </thead>
            <tbody>
              {sortCompanies(companies, sortTop).map((company) => (
                <tr key={company.id}>
                  <Link to={`/company-detail/${company.id}`}>
                    <CompanyCell>
                      <img
                        src={company.imageUrl}
                        alt={`${company.name} 로고`}
                      />
                      <span>{company.name}</span>
                    </CompanyCell>
                  </Link>
                  <LeftAlignTD>{company.description}</LeftAlignTD>
                  <TD>{company.category}</TD>
                  <TD>
                    {typeof company.investmentAmount === "number"
                      ? `${company.investmentAmount.toLocaleString()}억 원`
                      : "-"}
                  </TD>
                  <TD>{company.revenue}억 원</TD>
                  <TD>{company.employees}명</TD>
                </tr>
              ))}
            </tbody>
          </StyledTable>

          <SpacerSmall />

          <div className={styles.content3}>
            기업 순위 확인하기
            <SortDropdown
              size={mediaSize}
              options={sortOptions}
              value={sortBottom}
              onChange={setSortBottom}
            />
          </div>

          <StyledTable className={styles.table2}>
            <thead>
              <TableHeader columns={rankColumns} />
            </thead>
            <tbody>
              {sortCompanies(companies, sortBottom).map((company, idx) => (
                <tr key={company.id}>
                  <TD>{idx + 1}위</TD>
                  <Link to={`/company-detail/${company.id}`}>
                    <CompanyCell>
                      <img
                        src={company.imageUrl}
                        alt={`${company.name} 로고`}
                      />
                      <span>{company.name}</span>
                    </CompanyCell>
                  </Link>
                  <LeftAlignTD>{company.description}</LeftAlignTD>
                  <TD>{company.category}</TD>
                  <TD>
                    {typeof company.investmentAmount === "number"
                      ? `${company.investmentAmount.toLocaleString()}억원`
                      : "-"}
                  </TD>
                  <TD>{company.revenue}억원</TD>
                  <TD>{company.employees}명</TD>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
  }

  div {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
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

const LeftAlignTD = styled.td`
  padding: 20px 16px;
  border-bottom: 1px solid #333;
  font-size: 14px;
  background-color: #212121;
  color: #d8d8d8;
  text-align: left;
  vertical-align: middle;
`;

const Spacer = styled.div`
  margin-top: 32px;
`;

const SpacerSmall = styled.div`
  margin-top: 50px;
`;

const CompanyCell = styled.td`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 16px;
  border-bottom: 1px solid #333;
  background-color: #212121;
  color: #d8d8d8;
  font-size: 14px;

  img {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 50%;
  }

  span {
    white-space: nowrap;
  }
`;
