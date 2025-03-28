import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Search from "../Search";
import closeIcon from "../../assets/icon/ic_delete.png";
import { black_300 } from "../../styles/colors";
import { black_400 } from "../../styles/colors";
import { client } from "../../api/index.api";

// 아래 props는 size=big/small
function SelectMyEnterprise({ isOpen, onClose, size, onSelect }) {
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const [companies, setCompanies] = useState([]);
  const [mediaSize, setMediaSize] = useState("");

  const handleCompanySelect = (c) => {
    if (onSelect) {
      onSelect(c);
    }
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
        const res = await client.get("/api/companies", {
          params: { keyword },
        });
        setCompanies(res.data);
      } catch (e) {
        console.error("기업 불러오기 실패:", e);
      }
    };

    fetchCompanies();
  }, [keyword]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(companies.length / perPage);
  const currentData = companies.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

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
        <SectionTitle>검색결과 ({companies.length})</SectionTitle>
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
`;

const Container = styled.div`
  position: relative;
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
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const SectionTitle = styled.div`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 12px;
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
