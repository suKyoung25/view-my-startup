import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { media } from "../../styles/mixin";
import CompareBtn from "./CompareBtn";
import styles from "./CompareResult.module.css";
import SortDropdown from "../../components/Dropdown";
import BtnLarge from "../../components/BtnLarge";
import TableHeader from "../../components/TableHeader";
import InvestmentModal from "../../components/modal/InvestmentModal";

// url 주소 /select-company/compare-results
function CompareResults() {
  const [mediaSize, setMediaSize] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function updateMediaSize() {
    const { innerWidth: width } = window;
    if (width >= 1200) {
      setMediaSize("big");
    } else if (width > 744) {
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
        <div className={styles.contents}>
          <div className={styles.content1}>
            내가 선택한 기업
            <CompareBtn />
          </div>
          {/* input field 들어갈 예정 */}

          <div className={styles.content2}>
            비교 결과 확인하기
            <SortDropdown size={mediaSize} />
          </div>
          <TableHeader
            columns={[
              {
                label: "순위",
                name: "ranking",
                flex: 0.5,
              },
              {
                label: "기업명",
                name: "name",
                flex: 1.5,
              },
              {
                label: "기업 소개",
                name: "description",
                flex: 4,
              },
              {
                label: "카테고리",
                name: "category",
                flex: 2,
              },
              {
                label: "누적 투자 금액",
                name: "investmentAmount",
                flex: 1,
              },
              {
                label: "매출액",
                name: "revenue",
                flex: 2,
              },
              {
                label: "고용 인원",
                name: "employees",
                flex: 1.5,
              },
            ]}
          />

          <div className={styles.content3}>
            기업 순위 확인하기
            <SortDropdown size={mediaSize} />
          </div>
          <TableHeader
            columns={[
              {
                label: "순위",
                name: "ranking",
                flex: 0.5,
              },
              {
                label: "기업명",
                name: "name",
                flex: 1.5,
              },
              {
                label: "기업 소개",
                name: "description",
                flex: 4,
              },
              {
                label: "카테고리",
                name: "category",
                flex: 2,
              },
              {
                label: "누적 투자 금액",
                name: "investmentAmount",
                flex: 1,
              },
              {
                label: "매출액",
                name: "revenue",
                flex: 2,
              },
              {
                label: "고용 인원",
                name: "employees",
                flex: 1.5,
              },
            ]}
          />

          <BtnLarge
            type={"orange"}
            size={mediaSize}
            label={"나의 기업에 투자하기"}
            onClick={() => openModal()}
          />

          <InvestmentModal onClose={closeModal} isOpen={isModalOpen} />
        </div>
      </Wrap>
    </>
  );
}

export default CompareResults;

const Wrap = styled.div`
  background-color: #131313;
  color: #ffffff;
`;
