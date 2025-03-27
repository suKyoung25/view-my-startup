import React from "react";
import styles from "./MyCompanyComparison.module.css";
import plusIcon from "../../assets/icon/btn_plus.svg";
import styled from "styled-components";

function MyCompanyComparison() {
  return (
    <>
      <Wrap>
        <div className={styles.container}>
          <h2 className={styles.title}>나의 기업을 선택해 주세요!</h2>

          <div className={styles.addBox}>
            <button className={styles.addButton}>
              <img src={plusIcon} alt="추가" className={styles.plusIcon} />
              기업 추가
            </button>
          </div>

          <button className={styles.compareButton} disabled>
            기업 비교하기
          </button>
        </div>
      </Wrap>
    </>
  );
}

export default MyCompanyComparison;

const Wrap = styled.div`
  background-color: #131313;
  min-height: 100vh;
  //   width: 100%;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
