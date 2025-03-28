import styles from "./Homepage.module.css";
import TableHeader from "../../components/TableHeader";
import Search from "../../components/Search";
import BtnPagination from "../../components/BtnPagination";
import React, { useEffect, useState } from "react";
import SortDropdown from "../../components/Dropdown";
import styled from "styled-components";
import companyAPI from "../../api/company.api";

function HomePage() {
  const columns = [
    { label: "순위", name: "ranking", width: "6%" },
    { label: "기업명", name: "name", width: "12%" },
    { label: "기업 소개", name: "description", width: "30%" },
    { label: "카테고리", name: "category", width: "12%" },
    { label: "누적 투자 금액", name: "investmentAmount", width: "20%" },
    { label: "매출액", name: "revenue", width: "10%" },
    { label: "고용 인원", name: "employees", width: "10%" },
  ];

  const sortOptions = [
    "누적 투자금액 높은순",
    "누적 투자금액 낮은순",
    "매출액 높은순",
    "매출액 낮은순",
    "고용 인원 많은순",
    "고용 인원 적은순",
  ];

  const [mediaSize, setMediaSize] = useState("");
  const [selectedSort, setSelectedSort] = useState("누적 투자금액 높은순");
  const [companyData, setCompanyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const updateMediaSize = () => {
      const { innerWidth: width } = window;
      setMediaSize(width > 744 ? "medium" : "small");
    };
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

  const sortedData = [...companyData].sort((a, b) => {
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
              <Search size={mediaSize} state={"none"} />
              <SortDropdown
                size={"medium"}
                options={sortOptions}
                value={selectedSort}
                onChange={handleSortChange}
              />
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <TableHeader columns={columns} />
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>{startIndex + index + 1}위</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
                    <td>
                      {item.totalVirtualInvestmentAmount?.toLocaleString()}억 원
                    </td>
                    <td>{item.revenue?.toLocaleString()}억 원</td>
                    <td>{item.numberOfEmployees?.toLocaleString()}명</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    style={{
                      textAlign: "center",
                      padding: "40px 0",
                      color: "#888",
                    }}
                  >
                    표시할 스타트업 데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <BtnPagination
              size={"big"}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={sortedData.length}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
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
