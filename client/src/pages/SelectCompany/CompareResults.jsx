import React, { useEffect, useState } from "react";
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

// url 주소 /select-company/compare-results
function CompareResults() {
  const [mediaSize, setMediaSize] = useState("");
  //Modal-investment 렌더링 여부
  const [isModalOpen, setIsModalOpen] = useState(false);
  //Modal-popupOne 렌더링 여부
  const [isPopupModalOpen, setIsPopupModalAble] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  //invest 모달을 비활성화/활성화
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //popupOne 모달을 비활성화/활성화
  const closePopupModal = () => {
    setIsPopupModalAble(false);
  };

  const openPopupModal = () => {
    setIsPopupModalAble(true);
  };

  //화면 사이즈에 따라 mediaSize 변수 조절
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

  //Dropdown 내용
  const sortOptions = [
    "누적 투자금액 높은순",
    "누적 투자금액 낮은순",
    "매출액 높은순",
    "매출액 낮은순",
    "고용 인원 많은순",
    "고용 인원 적은순",
  ];

  //TableHeader colums
  const columns = [
    { label: "기업명", name: "name", flex: 1.5 },
    { label: "기업 소개", name: "description", flex: 4 },
    { label: "카테고리", name: "category", flex: 2 },
    { label: "누적 투자 금액", name: "investmentAmount", flex: 1 },
    { label: "매출액", name: "revenue", flex: 2 },
    { label: "고용 인원", name: "employees", flex: 1.5 },
  ];

  return (
    <>
      <Wrap>
        <div className={styles.contents}>
          <div className={styles.content1}>
            내가 선택한 기업
            <CompareBtn />
          </div>
          <div className={styles.data1}>
            <InputField />
          </div>

          <div className={styles.content2}>
            비교 결과 확인하기
            <SortDropdown size={mediaSize} options={sortOptions} />
          </div>
          <table className={styles.table1}>
            <thead>
              <TableHeader columns={columns} />
            </thead>
            <div className={styles.data2}>{/* {비교 api 위치할 예정} */}</div>
          </table>
          <div className={styles.content3}>
            기업 순위 확인하기
            <SortDropdown size={mediaSize} options={sortOptions} />
          </div>
          <table className={styles.table2}>
            <thead>
              <TableHeader columns={columns} />
            </thead>

            <div className={styles.data3}>
              {/* {기업 순위 api 위치할 예정} */}
            </div>
          </table>

          <BtnLarge
            type={"orange"}
            size={mediaSize}
            label={"나의 기업에 투자하기"}
            onClick={() => openModal()}
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