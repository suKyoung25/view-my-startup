import { client } from "./index.api";

const getCompareStatus = async () => {
  const response = await client.post("/api/result-comparisons", {
    myCompanyId: "cuid1",
    compareCompanyIds: ["cuid2", "cuid3"],
    sortBy: "pickAsMyStartupCount",
    order: "desc",
  });
  return response.data;
};

const resultCompareAPI = {
  getCompareStatus,
};

export default resultCompareAPI;
