import { client } from "./index.api"; // axios 인스턴스

/**
 * 선택 기업 + 비교 기업 리스트를 백엔드에 POST 요청하여 정보 조회
 * @param {Object} params
 * @param {string} params.selectedCompanyId - 선택한 기업 ID
 * @param {string[]} params.compareCompanyIds - 비교할 기업 ID 배열
 * @returns {Promise<Object[]>} - 기업 정보 리스트
 */
export const fetchComparedCompanies = async ({
  selectedCompanyId,
  compareCompanyIds = [],
}) => {
  if (!selectedCompanyId) {
    throw new Error("selectedCompanyId는 필수입니다.");
  }

  try {
    const response = await client.post("/api/resultCompare/selected", {
      selectedCompanyId,
      compareCompanyIds,
    });
    return response.data;
  } catch (error) {
    console.error("기업 비교 API 요청 실패:", error);
    throw error;
  }
};
