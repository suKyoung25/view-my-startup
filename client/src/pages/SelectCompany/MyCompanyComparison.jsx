import React, { useEffect, useState } from "react";
import styles from "./MyCompanyComparison.module.css";
import plusIcon from "../../assets/icon/btn_plus.svg";
import styled from "styled-components";
import BtnLarge from "../../components/BtnLarge";
import SelectMyEnterprise from "../../components/modal/SelectMyEnterprise";
import CompareListSection from "../../components/CompareListSection";

function MyCompanyComparison() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mediaSize, setMediaSize] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [recentCompanies, setRecentCompanies] = useState([]);

  const handleSelect = (c) => {
    setSelectedCompany(c);
    setModalOpen(false);

    setRecentCompanies((prev) => {
      const exists = prev.find((company) => company.id === c.id);
      if (exists) return prev;
      return [c, ...prev].slice(0, 5);
    });
  };

  const handleCancel = () => {
    setSelectedCompany(null);
  };

  function updateMediaSize() {
    const { innerWidth: width } = window;
    if (width >= 744) {
      setMediaSize("big");
    } else {
      setMediaSize("medium");
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
        <h2 className={styles.title}>나의 기업을 선택해 주세요!</h2>

        <div className={styles.addBoxWrapper}>
          {selectedCompany && (
            <button className={styles.cancelBtn} onClick={handleCancel}>
              선택 취소
            </button>
          )}
          <div className={styles.addBox}>
            {selectedCompany ? (
              <div className={styles.companyInfo}>
                <CompanyInfoWrap>
                  <Logo
                    src={selectedCompany.imageUrl}
                    alt={`${selectedCompany.name} 로고`}
                  />
                  <div className={styles.infoText}>
                    <div className={styles.name}>{selectedCompany.name}</div>
                    <div className={styles.category}>
                      {selectedCompany.category}
                    </div>
                  </div>
                </CompanyInfoWrap>
              </div>
            ) : (
              <button className={styles.addButton}>
                <img
                  src={plusIcon}
                  alt="추가"
                  className={styles.plusIcon}
                  onClick={() => setModalOpen(true)}
                />
                기업 추가
              </button>
            )}
          </div>
        </div>
        <CompareListSection />

        <div className={styles.buttonWrapper}>
          <BtnLarge type={"black"} size={"big"} label={"기업 비교하기"} />
        </div>

        <SelectMyEnterprise
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSelect={handleSelect}
          size={mediaSize}
          recentCompanies={recentCompanies}
        />
      </Wrap>
    </>
  );
}

export default MyCompanyComparison;

const Wrap = styled.div`
  background-color: #131313;
  color: #fff;
  max-width: 1200px;
  min-height: 100vh;
  padding: 70px 0px 10% 10%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;



const CompanyInfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;
