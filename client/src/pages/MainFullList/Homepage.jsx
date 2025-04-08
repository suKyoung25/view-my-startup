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

  let columns = [
    { label: "순위", name: "ranking", width: "5%" },
    { label: "기업명", name: "name", width: "18%" },
    { label: "기업 소개", name: "description", width: "27%" },
    { label: "카테고리", name: "category", width: "12%" },
    { label: "누적 투자 금액", name: "investmentAmount", width: "12%" },
    { label: "매출액", name: "revenue", width: "12%" },
    { label: "고용 인원", name: "employees", width: "12%" },
  ];

  if (mediaSize === "medium" || mediaSize === "small") {
    columns = [
      { label: "기업명", name: "name", width: "16%" },
      { label: "기업 소개", name: "description", width: "32%" },
      { label: "카테고리", name: "category", width: "12%" },
      { label: "누적 투자 금액", name: "investmentAmount", width: "14%" },
      { label: "매출액", name: "revenue", width: "12%" },
      { label: "고용 인원", name: "employees", width: "14%" },
    ];
  }

  const sortOptions = [
    "누적 투자금액 높은순",
    "누적 투자금액 낮은순",
    "매출액 높은순",
    "매출액 낮은순",
    "고용 인원 많은순",
    "고용 인원 적은순",
  ];

  useEffect(() => {
    function updateMediaSize() {
      const { innerWidth: width } = window;
      if (width >= 1200) setMediaSize("big");
      else if (width > 730) setMediaSize("medium");
      else setMediaSize("small");
    }
    updateMediaSize();
    window.addEventListener("resize", updateMediaSize);
    return () => window.removeEventListener("resize", updateMediaSize);
  }, []);

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
        return b.realInvestmentAmount - a.realInvestmentAmount;
      case "누적 투자금액 낮은순":
        return a.realInvestmentAmount - b.realInvestmentAmount;
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
                mediaSize={mediaSize}
                state={"searching"}
                value={searchKeyword}
                onChange={handleSearchChange}
                onClear={handleSearchClear}
                onSearch={(tokens) => setSearchTokens(tokens)}
              />
              <SortDropdown
                mediaSize={mediaSize}
                options={sortOptions}
                value={selectedSort}
                onChange={handleSortChange}
              />
            </div>
          </div>

          <StyledTableWrapper>
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
                  paginatedData.map((item, rowIndex) => (
                    <tr key={item.id || rowIndex}>
                      {columns.map((column) => {
                        switch (column.name) {
                          case "ranking":
                            return (
                              <TD key={`ranking-${item.id}`}>
                                {startIndex + rowIndex + 1}위
                              </TD>
                            );
                          case "name":
                            return (
                              <TD key={`name-${item.id}`}>
                                <CompanyCell $mediaSize={mediaSize}>
                                  <Logo
                                    src={item.imageUrl}
                                    alt={`${item.name} 로고`}
                                  />
                                  <Link to={`/company-detail/${item.id}`}>
                                    {item.name}
                                  </Link>
                                </CompanyCell>
                              </TD>
                            );
                          case "description":
                            return (
                              <Td key={`desc-${item.id}`}>
                                <Link to={`/company-detail/${item.id}`}>
                                  <Text>{item.description}</Text>
                                </Link>
                              </Td>
                            );
                          case "category":
                            return (
                              <TD key={`category-${item.id}`}>
                                {item.category}
                              </TD>
                            );
                          case "investmentAmount":
                            return (
                              <TD key={`investment-${item.id}`}>
                                {item.realInvestmentAmount?.toLocaleString()}억
                                원
                              </TD>
                            );
                          case "revenue":
                            return (
                              <TD key={`revenue-${item.id}`}>
                                {item.revenue?.toLocaleString()}억 원
                              </TD>
                            );
                          case "employees":
                            return (
                              <TD key={`employees-${item.id}`}>
                                {item.numberOfEmployees?.toLocaleString()}명
                              </TD>
                            );
                          default:
                            return null;
                        }
                      })}
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
          </StyledTableWrapper>

          <PaginationWrap>
            <BtnPagination
              mediaSize={mediaSize}
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

const Wrap = styled.div`
  background-color: #131313;
  min-height: 100vh;
  width: 100%;
`;

const StyledTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
  }

  scrollbar-color: #999 transparent;
  scrollbar-width: thin;
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 696px;
  border-collapse: collapse;
`;

const HeaderRow = styled.tr`
  border-bottom: 16px solid #131313;
  width: 696px;
  font-size: 14px;
`;

const Th = styled.th`
  padding: 0;
  padding-top: 11px;
  padding-bottom: 11px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: #2e2e2e;
  white-space: nowrap;
  text-align: center;
`;

const TD = styled.td`
  /* padding: 20px 16px; */
  font-size: 14px;
  text-align: center;
  border-bottom: 1px solid #333;
  background-color: #212121;
  color: #d8d8d8;
  font-family: "Pretendard", sans-serif;
  word-break: keep-all;
  width: 696px;
`;

const Td = styled.td`
  /* padding: 20px 16px; */
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #333;
  background-color: #212121;
  color: #d8d8d8;
  font-family: "Pretendard", sans-serif;
  word-break: break-word;
  line-height: 1.2em;
  min-height: calc(1.2em * 2); /* 두 줄 높이 확보 */
`;

const Text = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: start;
`;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
`;

const CompanyCell = styled.div`
  display: flex;
  justify-content: baseline;
  padding-left: ${(props) =>
    props.mediaSize === "big"
      ? "24px"
      : props.mediaSize === "medium" || props.mediaSize === "small"
      ? "16px"
      : null};
  align-items: center;
  gap: 8px;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;
