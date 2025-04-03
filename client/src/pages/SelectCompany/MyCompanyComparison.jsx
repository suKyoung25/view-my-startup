import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./MyCompanyComparison.module.css";
import plusIcon from "../../assets/icon/btn_plus.svg";
import restart from "../../assets/icon/ic_restart.svg";
import styled from "styled-components";
import BtnLarge from "../../components/BtnLarge";
import SelectMyEnterprise from "../../components/modal/SelectMyEnterprise";
import SelectComparison from "../../components/modal/SelectComparison";
import CompareListSection from "../../components/CompareListSection";

function MyCompanyComparison() {
  const location = useLocation();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [mediaSize, setMediaSize] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null); // '다른기업비교하기' 버튼에 의해 초기 상태가 이미 선택된 상태인 경우도 있음
  const [compareCompanies, setCompareCompanies] = useState([]);
  const [recentMyCompanies, setRecentMyCompanies] = useState([]);
  const [selectionMode, setSelectionMode] = useState("my");

  useEffect(() => {
    const navigationType = performance.getEntriesByType("navigation")[0]?.type;
    const isReload = navigationType === "reload";

    const shouldPreserve = location.state?.preserveOnRefresh;

    // 페이지 처음 로드될 때만 실행되도록
    if (shouldPreserve) {
      setSelectedCompany(location.state.selectedCompany || null);
      setCompareCompanies(location.state.compareCompanies || []);
    } else if (isReload) {
      // 새로고침이나 직접 접속 시 초기화
      setSelectedCompany(null);
      setCompareCompanies([]);
    }
  }, []);

  // '나의 기업' 선택 핸들러
  const handleSelectMyCompany = (company) => {
    setSelectedCompany(company);
    updateRecentMyCompanies(company);
    setModalOpen(false);
  };

  // 최근 '나의 기업' 목록 업데이트
  const updateRecentMyCompanies = (company) => {
    setRecentMyCompanies((prev) => {
      const existingIndex = prev.findIndex((c) => c.id === company.id);
      if (existingIndex !== -1) {
        const updatedRecent = [
          company,
          ...prev.slice(0, existingIndex),
          ...prev.slice(existingIndex + 1),
        ];
        return updatedRecent.slice(0, 5);
      }
      return [company, ...prev].slice(0, 5);
    });
  };

  const handleCancel = () => {
    setSelectedCompany(null);
  };

  const handleResetClick = () => {
    setSelectedCompany(null);
    setCompareCompanies([]);
    setRecentMyCompanies([]);
  };

  const handleCompareClick = () => {
    if (!selectedCompany || compareCompanies.length === 0) {
      alert("기업을 선택해주세요!");
      return;
    }

    const selectedCompanyId = selectedCompany.id;
    const compareCompanyIds = compareCompanies
      .filter((c) => c.id !== selectedCompanyId)
      .map((c) => c.id);

    if (compareCompanyIds.length === 0) {
      alert("비교할 기업을 1개 이상 선택해주세요!");
      return;
    }

    // 디버깅
    console.log("선택 기업 ID:", selectedCompanyId);
    console.log("비교 기업 IDs:", compareCompanyIds);

    navigate("/select-company/compare-results", {
      state: {
        selectedCompanyId,
        compareCompanyIds,
      },
    });
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
    return () => window.removeEventListener("resize", updateMediaSize);
  }, []);

  return (
    <Wrap>
      <Inner>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>나의 기업을 선택해 주세요!</h2>
          {selectedCompany && (
            <BtnLarge
              label="전체 초기화"
              type="orange"
              mediaSize="medium"
              icon={restart}
              onClick={handleResetClick}
            />
          )}
        </div>

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
              <button
                className={styles.addButton}
                onClick={() => {
                  setSelectionMode("my");
                  setModalOpen(true);
                }}
              >
                <img src={plusIcon} alt="추가" className={styles.plusIcon} />
                기업 추가
              </button>
            )}
          </div>
        </div>

        {/* 비교 기업 리스트 및 버튼 포함 */}
        {(selectedCompany || compareCompanies.length > 0) && (
          <CompareListSection
            companies={compareCompanies}
            onAddClick={() => {
              setSelectionMode("compare");
              setModalOpen(true);
            }}
            onDelete={(id) => {
              setCompareCompanies((prev) => prev.filter((c) => c.id !== id));
            }}
            isActive={true}
          />
        )}

        <div className={styles.buttonWrapper}>
          <BtnLarge
            type={compareCompanies.length > 0 ? "orange" : "black"}
            mediaSize={mediaSize}
            label={"기업 비교하기"}
            onClick={handleCompareClick}
          />
        </div>

        {/* 모달 - 기업 선택 */}
        {selectionMode === "compare" ? (
          <SelectComparison
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            mediaSize={mediaSize}
            selectedCompanies={compareCompanies}
            setSelectedCompanies={setCompareCompanies}
            selectedCompany={selectedCompany}
          />
        ) : (
          <SelectMyEnterprise
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSelect={handleSelectMyCompany}
            mediaSize={mediaSize}
            excludeCompanies={compareCompanies} // 비교기업목록을 제외할 수 있게 전달
          />
        )}
      </Inner>
    </Wrap>
  );
}

export default MyCompanyComparison;

const Wrap = styled.div`
  background-color: #131313;
  color: #fff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 70px 16px;
  box-sizing: border-box;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CompanyInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
`;
