import React from "react";
import styled from "styled-components";
import BtnPage from "./BtnPage";
import BtnLeft from "./BtnLeft";
import BtnRight from "./BtnRight";

function BtnPagination({
  size,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Container>
      <div onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}>
        <BtnLeft size={size} />
      </div>

      {pageNumbers.map((num) => (
        <div key={num} onClick={() => onPageChange(num)}>
          <BtnPage text={num} size={size} isActive={currentPage === num} />
        </div>
      ))}

      <div
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      >
        <BtnRight size={size} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export default BtnPagination;
