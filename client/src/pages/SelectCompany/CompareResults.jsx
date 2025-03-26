import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { media } from "../../styles/mixin";
import Gnb from "../../components/Gnb";
import CompareBtn from "./CompareBtn";
import styles from "./CompareResult.module.css";
import SortDropdown from "../../components/Dropdown";
import BtnLarge from "../../components/BtnLarge";
import SelectMyEnterprise from "../../components/modal/SelectMyEnterprise";

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
        <Gnb length={"long"} />

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
          {/* 다은님의 row 컴포넌트가 들어갈 예정 */}

          <div className={styles.content3}>
            기업 순위 확인하기
            <SortDropdown size={mediaSize} />
          </div>

          <BtnLarge
            type={"orange"}
            size={mediaSize}
            label={"나의 기업에 투자하기"}
            onClick={openModal}
          />

          <SelectMyEnterprise
            isOpen={isModalOpen}
            onClose={closeModal}
            size={mediaSize}
          />
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
