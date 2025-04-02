import { client } from "./index.api";

// 전체 개별 투자 내역
const getAllInvestment = async () => {
  const response = await client.get(`/api/investments`);
  return response.data;
};

// 기업별 누적 투자 요약 - 정렬 기준 포함
const getInvestmentStatus = async (sortBy, order) => {
  const response = await client.get(`/api/investments/status`, {
    params: { sortBy, order },
  });
  return response.data;
};

// 특정 기업에 투자하기
const postInvestment = async (options) => {
  const response = await client.post("/api/investments", options);
  return response.data;
};

// 투자 수정 (비밀번호 포함)
// options 예: { investorName, password, amount, comment }
const updateInvestment = async (investmentId, options) => {
  const response = await client.put(
    `/api/investments/${investmentId}`,
    options
  );
  return response.data;
};

// 특정 투자 삭제 (비밀번호 포함)
const deleteInvestment = async (id, password) => {
  const response = await client.delete(`/api/investments/${id}`, {
    data: { password }, // 반드시 data로 감싸야 req.body.password로 서버 전달됨
  });
  return response.data;
};

// 투자 수정/삭제를 위한 비밀번호 검증
const verifyPassword = async (investmentId, password) => {
  const response = await client.post(
    `/api/investments/${investmentId}/verify-password`,
    {
      password,
    }
  );
  return response.data;
};

// 모듈 export
const investmentAPI = {
  getAllInvestment,
  getInvestmentStatus,
  postInvestment,
  updateInvestment,
  deleteInvestment,
  verifyPassword,
};

export default investmentAPI;
