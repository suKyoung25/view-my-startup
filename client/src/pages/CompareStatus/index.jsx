import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { black_400, gray_100 } from "../../styles/colors";
import { media } from "../../styles/mixin";
import BtnPagination from "../../components/BtnPagination";
import Dropdown from "../../components/Dropdown";
import TableHeader from "../../components/TableHeader";
import resultCompareAPI from "../../api/resultCompare.api";
import { Link } from "react-router-dom";

function CompareStatus() {
  const [mediaSize, setMediaSize] = useState("");
  const [selectedSort, setSelectedSort] =
    useState("나의 기업 선택 횟수 높은순");
  const [compareData, setCompareData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const columns = [
    { label: "순위", name: "ranking", width: "6%" },
    { label: "기업명", name: "name", width: "12%" },
    { label: "기업 소개", name: "description", width: "30%" },
    { label: "카테고리", name: "category", width: "12%" },
    {
      label: "나의 기업 선택 횟수",
      name: "pickAsMyStartupCount",
      width: "20%",
    },
    {
      label: "비교 기업 선택 횟수",
      name: "pickAsComparisonCount",
      width: "20%",
    },
  ];

  const sortOptions = [
    "나의 기업 선택 횟수 높은순",
    "나의 기업 선택 횟수 낮은순",
    "비교 기업 선택 횟수 높은순",
    "비교 기업 선택 횟수 낮은순",
  ];

  const sortMap = {
    "나의 기업 선택 횟수 높은순": {
      sortBy: "pickAsMyStartupCount",
      order: "desc",
    },
    "나의 기업 선택 횟수 낮은순": {
      sortBy: "pickAsMyStartupCount",
      order: "asc",
    },
    "비교 기업 선택 횟수 높은순": {
      sortBy: "pickAsComparisonCount",
      order: "desc",
    },
    "비교 기업 선택 횟수 낮은순": {
      sortBy: "pickAsComparisonCount",
      order: "asc",
    },
  };

  const handleSortChange = (option) => {
    setSelectedSort(option);
    setCurrentPage(1);
  };

  const updateMediaSize = () => {
    const { innerWidth: width } = window;
    setMediaSize(width > 744 ? "medium" : "small");
  };

  useEffect(() => {
    updateMediaSize();
    window.addEventListener("resize", updateMediaSize);
    return () => window.removeEventListener("resize", updateMediaSize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { sortBy, order } = sortMap[selectedSort];
        const data = await resultCompareAPI.getCompareStatus({ sortBy, order });
        setCompareData(data);
      } catch (err) {
        console.error("비교 현황 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [selectedSort]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = compareData.slice(startIndex, endIndex);
  console.log(paginatedData);

  return (
    <Wrap>
      <Content>
        <TopBar>
          <Title>비교 현황</Title>

          <Dropdown
            size={mediaSize}
            options={sortOptions}
            value={selectedSort} // 현재 선택된 정렬 기준
            onChange={handleSortChange} // 선택 바뀔 때 실행할 함수
          />
        </TopBar>

        <TableWrap>
          <StyledTable>
            <thead>
              <TableHeader columns={columns} />
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <TD>{startIndex + index + 1}위</TD>
                  <TD>
                    <CompanyCell>
                      <Logo src={item.imageUrl} alt={`${item.name} 로고`} />
                      <Link to={`/company-detail/${item.id}`}>{item.name}</Link>
                    </CompanyCell>
                  </TD>
                  <TD>
                    <Link to={`/company-detail/${item.id}`}>
                      {item.description}
                    </Link>
                  </TD>
                  <TD>{item.category}</TD>
                  <TD>{item.pickAsMyStartupCount.toLocaleString()}회</TD>
                  <TD>{item.pickAsComparisonCount.toLocaleString()}회</TD>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrap>

        <PaginationWrap>
          <BtnPagination
            size="big"
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={compareData.length}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </PaginationWrap>
      </Content>
    </Wrap>
  );
}

export default CompareStatus;

const Wrap = styled.div`
  background-color: ${black_400};
  color: ${gray_100};
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  width: 1200px;
  padding: 40px 0;
  ${media.mobile} {
    padding: 20px;
    width: 100%;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: white;
`;

const TableWrap = styled.div`
  margin-bottom: 32px;
`;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead tr {
    border-bottom: 16px solid #131313; // 헤더 아래 간격
  }
`;

const TD = styled.td`
  padding: 20px 16px;
  border-bottom: 1px solid #333;
  font-size: 14px;
  background-color: #212121; // 셀 배경색 적용
  color: #d8d8d8; // 텍스트 색상 적용
  text-align: center;
`;

const CompanyCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Logo = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
`;
