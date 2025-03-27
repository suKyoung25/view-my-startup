import { client } from "./index.api";

//투자 리스트 가져오기 (아직 완성 안됨)
const getAllInvestment = async (options) => {
  const {} = options;

  const response = await client.get(`/api/investments`);
  const result = response.data;

  return result;
};

const investmentAPI = {
  getAllInvestment,
};

export default investmentAPI;
