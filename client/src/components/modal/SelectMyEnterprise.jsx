import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Search from "../Search";
import closeIcon from "../../assets/icon/ic_delete.png";
import { black_300 } from "../../styles/colors";
import { black_400 } from "../../styles/colors";
import { client } from "../../api/index.api";

// 아래 props는 size=big/small
function SelectMyEnterprise({
  isOpen,
  onClose,
  size,
  onSelect,
  recentCompanies,
}) {
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const [companies, setCompanies] = useState([]);
  const [mediaSize, setMediaSize] = useState("");

  // 한글 초성 배열
  const CHO_LIST = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  // 초성 추출 함수
  const Chosung = (t) => {
    return t
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 44032 && code <= 55203) {
          const cho = Math.floor((code - 44032) / 588);
          return CHO_LIST[cho];
        }
        return "";
      })
      .join("");
  };

  function updateMediaSize() {
    const { innerWidth: width } = window;
    if (width >= 744) {
      setMediaSize("big");
    } else {
      setMediaSize("short");
    }
  }

  useEffect(() => {
    updateMediaSize();

    window.addEventListener("resize", updateMediaSize);

    return () => {
      window.removeEventListener("resize", updateMediaSize);
    };
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await client.get("/api/companies");
        setCompanies(res.data);
      } catch (e) {
        console.error("기업 불러오기 실패:", e);
      }
    };

    fetchCompanies();
  }, []);

  // 초성추출함수로 기업명 조회하기
  const filteredCompanies = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) return [];

    return companies.filter((company) => {
      const chosungName = Chosung(company.name.toLowerCase());
      return (
        company.name.toLowerCase().includes(query) || // -> keyword
        chosungName.startsWith(query)
      ); // 아니면 초성
    });
  }, [keyword, companies]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredCompanies.length / perPage);
  const currentData = filteredCompanies.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleCompanySelect = (c) => {
    if (onSelect) {
      onSelect(c);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Container $size={size} onClick={(e) => e.stopPropagation()}>
        <Title>
          <div>나의 기업 선택하기</div>
          <img onClick={onClose} src={closeIcon} alt="닫기" />
        </Title>
        <Search
          size={mediaSize}
          state="searching"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setCurrentPage(1);
          }}
          onClear={() => setKeyword("")}
        />

        {/* 최근 비교한 기업 영역 */}
        {recentCompanies?.length > 0 && (
          <>
            <SectionTitle>
              최근 비교한 기업 ({recentCompanies.length})
            </SectionTitle>
            <CompanyList>
              {recentCompanies.map((company) => (
                <CompanyItem key={company.id}>
                  <Info>
                    <div className="name">{company.name}</div>
                    <div className="tagline">{company.category}</div>
                  </Info>
                  <SelectBtn onClick={() => handleCompanySelect(company)}>
                    선택하기
                  </SelectBtn>
                </CompanyItem>
              ))}
            </CompanyList>
          </>
        )}

        {/* 검색 결과 영역 */}
        {keyword.trim() !== "" && (
          <>
            <SectionTitle>검색결과 ({filteredCompanies.length})</SectionTitle>
            <CompanyList>
              {currentData.map((c) => (
                <CompanyItem key={c.id}>
                  <Info>
                    <div className="name">{c.name}</div>
                    <div className="tagline">{c.category}</div>
                  </Info>
                  <SelectBtn onClick={() => handleCompanySelect(c)}>
                    선택하기
                  </SelectBtn>
                </CompanyItem>
              ))}
            </CompanyList>

            {/* 페이지네이션 */}
            <Pagination>
              {[...Array(totalPages)].map((_, i) => (
                <PageBtn
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  $active={currentPage === i + 1}
                >
                  {i + 1}
                </PageBtn>
              ))}
            </Pagination>
          </>
        )}
      </Container>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${black_400}80;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Container = styled.div`
  background-color: ${black_300};
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  font-size: 20px;
  width: ${(props) => {
    if (props.$size === "big") return "496px";
    if (props.$size === "short") return "343px";
  }};
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const SectionTitle = styled.div`
  font-size: 14px;
  color: #aaa;
  margin: 20px 0 12px;
`;

const CompanyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

const CompanyItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  padding: 10px 12px;
  border-radius: 8px;

  .name {
    font-size: 14px;
    font-weight: bold;
  }

  .tagline {
    font-size: 12px;
    color: #888;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectBtn = styled.button`
  background-color: transparent;
  border: 1px solid #ff6b00;
  color: #ff6b00;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
`;

const PageBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background-color: ${(props) => (props.$active ? "#ff6b00" : "#333")};
  color: ${(props) => (props.$active ? "white" : "#aaa")};
  border: none;
  cursor: pointer;
  font-size: 14px;
`;

export default SelectMyEnterprise;
