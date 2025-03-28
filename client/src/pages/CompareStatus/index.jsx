// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { black_400, gray_100 } from "../../styles/colors";
// import { media } from "../../styles/mixin";
// import BtnPagination from "../../components/BtnPagination";
// import Dropdown from "../../components/Dropdown";
// import TableHeader from "../../components/TableHeader";
// import investmentAPI from "../../api/investment.api";

// function InvestState() {
//   const [mediaSize, setMediaSize] = useState("");
//   const [selectedSort, setSelectedSort] = useState(
//     "View My Startup 투자 금액 높은순"
//   );
//   const [investData, setInvestData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const columns = [
//     { label: "순위", name: "ranking", width: "6%" },
//     { label: "기업명", name: "name", width: "12%" },
//     { label: "기업 소개", name: "description", width: "30%" },
//     { label: "카테고리", name: "category", width: "12%" },
//     {
//       label: "나의 기업 선택 횟수",
//       name: "pickAsMyStartupCount",
//       width: "20%",
//     },
//     {
//       label: "비교 기업 선택 횟수",
//       name: "pickAsComparisonCount",
//       width: "20%",
//     },
//   ];

//   const sortOptions = [
//     "나의 기업 선택 횟수 높은순",
//     "나의 기업 선택 횟수 낮은순",
//     "비교 기업 선택 횟수 높은순",
//     "비교 기업 선택 횟수 낮은순",
//   ];

//   const handleSortChange = (option) => {
//     setSelectedSort(option);
//     setCurrentPage(1); // 정렬 변경 시 페이지 초기화
//   };

//   const updateMediaSize = () => {
//     const { innerWidth: width } = window;
//     setMediaSize(width > 744 ? "medium" : "small");
//   };

//   useEffect(() => {
//     updateMediaSize();
//     window.addEventListener("resize", updateMediaSize);
//     return () => window.removeEventListener("resize", updateMediaSize);
//   }, []);

//   useEffect(() => {
//     investmentAPI
//       .getInvestmentStatus()
//       .then((data) => setInvestData(data))
//       .catch((err) => console.error("비교 현황 불러오기 실패:", err));
//   }, []);

//   const sortedData = [...investData].sort((a, b) => {
//     switch (selectedSort) {
//       case "나의 기업 선택 횟수 높은순":
//         return b.totalVirtualInvestmentAmount - a.totalVirtualInvestmentAmount;
//       case "나의 기업 선택 횟수 낮은순":
//         return a.totalVirtualInvestmentAmount - b.totalVirtualInvestmentAmount;
//       case "실제 누적 투자 금액 높은순":
//         return b.realInvestmentAmount - a.realInvestmentAmount;
//       case "실제 누적 투자 금액 낮은순":
//         return a.realInvestmentAmount - b.realInvestmentAmount;
//       default:
//         return 0;
//     }
//   });

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedData = sortedData.slice(startIndex, endIndex);

//   return (
//     <Wrap>
//       <Content>
//         <TopBar>
//           <Title>비교 현황</Title>
//           <Dropdown
//             size={mediaSize}
//             options={sortOptions}
//             onChange={handleSortChange}
//             defaultOption={selectedSort}
//           />
//         </TopBar>

//         <TableWrap>
//           <StyledTable>
//             <thead>
//               <TableHeader columns={columns} />
//             </thead>
//             <tbody>
//               {paginatedData.map((item, index) => (
//                 <tr key={item.id}>
//                   <TD>{startIndex + index + 1}위</TD>
//                   <TD>{item.name}</TD>
//                   <TD>{item.description}</TD>
//                   <TD>{item.category}</TD>
//                   <TD>
//                     {item.totalVirtualInvestmentAmount.toLocaleString()}억 원
//                   </TD>
//                   <TD>{item.realInvestmentAmount.toLocaleString()}억 원</TD>
//                 </tr>
//               ))}
//             </tbody>
//           </StyledTable>
//         </TableWrap>

//         <PaginationWrap>
//           <BtnPagination
//             size="big"
//             currentPage={currentPage}
//             itemsPerPage={itemsPerPage}
//             totalItems={sortedData.length}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         </PaginationWrap>
//       </Content>
//     </Wrap>
//   );
// }

// export default InvestState;

// const Wrap = styled.div`
//   background-color: ${black_400};
//   color: ${gray_100};
//   display: flex;
//   justify-content: center;
//   width: 100%;
//   min-height: 100vh;
// `;

// const Content = styled.div`
//   width: 1200px;
//   padding: 40px 0;
//   ${media.mobile} {
//     padding: 20px;
//     width: 100%;
//   }
// `;

// const TopBar = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 24px;
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   font-weight: 700;
//   color: white;
// `;

// const TableWrap = styled.div`
//   margin-bottom: 32px;
// `;

// const PaginationWrap = styled.div`
//   display: flex;
//   justify-content: center;
//   padding-top: 20px;
// `;

// const StyledTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// const TD = styled.td`
//   padding: 12px 16px;
//   border-bottom: 1px solid #333;
//   font-size: 14px;
//   text-align: center;
// `;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { black_400, gray_100 } from "../../styles/colors";
import { media } from "../../styles/mixin";
import BtnPagination from "../../components/BtnPagination";
import Dropdown from "../../components/Dropdown";
import TableHeader from "../../components/TableHeader";
import resultCompareAPI from "../../api/resultCompare.api";

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
    resultCompareAPI
      .getCompareStatus()
      .then((data) => setCompareData(data))
      .catch((err) => console.error("비교 현황 불러오기 실패:", err));
  }, []);

  const sortedData = [...compareData].sort((a, b) => {
    switch (selectedSort) {
      case "나의 기업 선택 횟수 높은순":
        return b.pickAsMyStartupCount - a.pickAsMyStartupCount;
      case "나의 기업 선택 횟수 낮은순":
        return a.pickAsMyStartupCount - b.pickAsMyStartupCount;
      case "비교 기업 선택 횟수 높은순":
        return b.pickAsComparisonCount - a.pickAsComparisonCount;
      case "비교 기업 선택 횟수 낮은순":
        return a.pickAsComparisonCount - b.pickAsComparisonCount;
      default:
        return 0;
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <Wrap>
      <Content>
        <TopBar>
          <Title>비교 현황</Title>
          <Dropdown
            size={mediaSize}
            options={sortOptions}
            onChange={handleSortChange}
            defaultOption={selectedSort}
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
                  <TD>{item.name}</TD>
                  <TD>{item.description}</TD>
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
            totalItems={sortedData.length}
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
`;

const TD = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #333;
  font-size: 14px;
  text-align: center;
`;
