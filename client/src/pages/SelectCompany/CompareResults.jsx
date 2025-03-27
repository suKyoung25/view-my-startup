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
  //Modal-investment 렌더링 여부부
  const [isModalOpen, setIsModalOpen] = useState(false);
  //Modal-popupOne 렌더링 여부
  const [isPopupModalAble, setIsPopupModalAble] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPopupModal = () => {
    setIsPopupModalAble(true);
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
          <div className={styles.data1}>
            <InputField />
          </div>

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
          <div className={styles.data2}>{/* {비교 api 위치할 예정} */}</div>

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
          <div className={styles.data3}>
            {/* {기업 순위 api 위치할 예정} */}
          </div>

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
        {isPopupModalAble && <PopupOneButton />}
      </Wrap>
    </>
  );
}

export default CompareResults;

const Wrap = styled.div`
  background-color: #131313;
  color: #ffffff;
`;
