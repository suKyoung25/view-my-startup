import styles from "./Homepage.module.css";
import Search from "../../components/Search";
import BtnPagination from "../../components/BtnPagination";
import React, { useEffect, useMemo, useState } from "react";
import SortDropdown from "../../components/Dropdown";
import styled from "styled-components";
import companyAPI from "../../api/company.api";
import { Link } from "react-router-dom";
import Hangul from "hangul-js";

function HomePage() {
  const [mediaSize, setMediaSize] = useState("");
  const [selectedSort, setSelectedSort] = useState("누적 투자금액 높은순");
  const [companyData, setCompanyData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTokens, setSearchTokens] = useState({
    raw: "",
    disassembled: "",
    cho: "",
  });

  //table row 항목
  const columns = [
    { label: "순위", name: "ranking", width: "6%" },
    { label: "기업명", name: "name", width: "12%" },
    { label: "기업 소개", name: "description", width: "30%" },
    { label: "카테고리", name: "category", width: "12%" },
    { label: "누적 투자 금액", name: "investmentAmount", width: "20%" },
    { label: "매출액", name: "revenue", width: "10%" },
    { label: "고용 인원", name: "employees", width: "10%" },
  ];

  //dropdown 항목
  const sortOptions = [
    "누적 투자금액 높은순",
    "누적 투자금액 낮은순",
    "매출액 높은순",
    "매출액 낮은순",
    "고용 인원 많은순",
    "고용 인원 적은순",
  ];

  //반응형 디자인
  useEffect(() => {
    const updateMediaSize = () => {
      const { innerWidth: width } = window;
      setMediaSize(width > 744 ? "medium" : "small");
    };
    updateMediaSize();
    window.addEventListener("resize", updateMediaSize);
    return () => window.removeEventListener("resize", updateMediaSize);
  }, []);

  //초기 렌더링될 데이터 가져오기
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await companyAPI.getAllCompanies();
        setCompanyData(data);
      } catch (error) {
        console.error("기업 데이터 불러오기 실패:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleSortChange = (option) => {
    setSelectedSort(option);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchClear = () => {
    setSearchKeyword("");
    setSearchTokens({ raw: "", disassembled: "", cho: "" });
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    const input = searchTokens.raw;
    if (!input) return companyData;

    return companyData.filter((company) => {
      const name = company.name.toLowerCase();
      const description = company.description.toLowerCase();

      if (Hangul.isConsonant(input[0])) {
        const firstChar = name[0];
        const firstCho = Hangul.disassemble(firstChar)[0];
        return firstCho === input[0];
      } else {
        return name.startsWith(input) || description.includes(input);
      }
    });
  }, [searchTokens, companyData]);

  const sortedData = [...filteredData].sort((a, b) => {
    switch (selectedSort) {
      case "누적 투자금액 높은순":
        return b.totalVirtualInvestmentAmount - a.totalVirtualInvestmentAmount;
      case "누적 투자금액 낮은순":
        return a.totalVirtualInvestmentAmount - b.totalVirtualInvestmentAmount;
      case "매출액 높은순":
        return b.revenue - a.revenue;
      case "매출액 낮은순":
        return a.revenue - b.revenue;
      case "고용 인원 많은순":
        return b.numberOfEmployees - a.numberOfEmployees;
      case "고용 인원 적은순":
        return a.numberOfEmployees - b.numberOfEmployees;
      default:
        return 0;
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <Wrap>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.head}>
            <div className={styles.title}>전체 스타트업 목록</div>

            <div className={styles.controls}>
              <Search
                size={mediaSize}
                state={"searching"}
                value={searchKeyword}
                onChange={handleSearchChange}
                onClear={handleSearchClear}
                onSearch={(tokens) => setSearchTokens(tokens)}
              />
              <SortDropdown
                size={mediaSize}
                options={sortOptions}
                value={selectedSort}
                onChange={handleSortChange}
              />
            </div>
          </div>

          <StyledTable>
            <thead>
              <HeaderRow>
                {columns.map(({ label, name, width }, i) => (
                  <Th key={name || i} style={{ width }}>
                    {label}
                  </Th>
                ))}
              </HeaderRow>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={item.id || index}>
                    <TD>{startIndex + index + 1}위</TD>
                    <TD>
                      <CompanyCell>
                        <Logo src={item.imageUrl} alt={`${item.name} 로고`} />
                        <Link to={`/company-detail/${item.id}`}>
                          {item.name}
                        </Link>
                      </CompanyCell>
                    </TD>
                    <TD>
                      <Link to={`/company-detail/${item.id}`}>
                        {item.description}
                      </Link>
                    </TD>
                    <TD>{item.category}</TD>
                    <TD>
                      {item.totalVirtualInvestmentAmount?.toLocaleString()}억 원
                    </TD>
                    <TD>{item.revenue?.toLocaleString()}억 원</TD>
                    <TD>{item.numberOfEmployees?.toLocaleString()}명</TD>
                  </tr>
                ))
              ) : (
                <tr>
                  <TD
                    colSpan={columns.length}
                    style={{
                      textAlign: "center",
                      padding: "40px 0",
                      color: "#888",
                    }}
                  >
                    표시할 스타트업 데이터가 없습니다.
                  </TD>
                </tr>
              )}
            </tbody>
          </StyledTable>

          <PaginationWrap>
            <BtnPagination
              size={"big"}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={sortedData.length}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </PaginationWrap>
        </div>
      </div>
    </Wrap>
  );
}

export default HomePage;

// styled-components
const Wrap = styled.div`
  background-color: #131313;
  min-height: 100vh;
  width: 100%;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HeaderRow = styled.tr`
  border-bottom: 16px solid #131313;
`;

const Th = styled.th`
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: #2e2e2e;
  white-space: nowrap;
  text-align: center;
`;

const TD = styled.td`
  padding: 20px 16px;
  font-size: 14px;
  text-align: center;
  border-bottom: 1px solid #333;
  background-color: #212121;
  color: #d8d8d8;
  font-family: "Pretendard", sans-serif;
`;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
`;

const CompanyCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;
