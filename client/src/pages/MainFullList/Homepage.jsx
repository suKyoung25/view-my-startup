import styles from "./Homepage.module.css";
import TableHeader from "../../components/TableHeader";
import Search from "../../components/Search";
import BtnPagination from "../../components/BtnPagination";
import React, { useEffect, useState } from "react";
import SortDropdown from "../../components/Dropdown";
import styled from "styled-components";

function HomePage() {
  //TableHeader props
  const columns = [
    { label: "순위", name: "ranking", flex: 0.5 },
    { label: "기업명", name: "name", flex: 1.5 },
    { label: "기업 소개", name: "description", flex: 4 },
    { label: "카테고리", name: "category", flex: 2 },
    { label: "누적 투자 금액", name: "investmentAmount", flex: 1 },
    { label: "매출액", name: "revenue", flex: 2 },
    { label: "고용 인원", name: "employees", flex: 1.5 },
  ];

  const [mediaSize, setMediaSize] = useState("");

  //SortDropdown props
  const sortOptions = [
    "누적 투자금액 높은순",
    "누적 투자금액 낮은순",
    "매출액 높은순",
    "매출액 낮은순",
    "고용 인원 많은순",
    "고용 인원 적은순",
  ];

  function updateMediaSize() {
    const { innerWidth: width } = window;
    if (width > 744) {
      setMediaSize("medium");
    } else {
      setMediaSize("small");
    }
  }

  useEffect(() => {
    updateMediaSize();

    window.addEventListener("resize", updateMediaSize);

    return () => {
      window.removeEventListener("resize", updateMediaSize);
    };
  }, []);

  return (
    <>
      <Wrap>
        <div className={styles.container}>
          {/* navigation bar는 추후 수정할 예정 */}

          <div className={styles.content}>
            <div className={styles.head}>
              <div className={styles.title}>전체 스타트업 목록</div>

              <div className={styles.controls}>
                <Search size={mediaSize} state={"none"} />
                <SortDropdown size={"medium"} options={sortOptions} />
              </div>
            </div>

            <table className={styles.table}>
              <thead>
                <TableHeader columns={columns} />
              </thead>
              <tbody>
                {/* 데이터 자리 */}
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
              </tbody>
            </table>
            <div className={styles.pagination}>
              <BtnPagination size={"big"} />
            </div>
          </div>
        </div>
      </Wrap>
    </>
  );
}

export default HomePage;

const Wrap = styled.div`
  background-color: #131313;
  min-height: 100vh;
  width: 100%;
`;
