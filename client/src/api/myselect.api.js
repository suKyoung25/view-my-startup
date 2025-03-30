import { client } from "./index.api";

const searchCompanies = async () => {
  const response = await client.get(`/api/companies`);
  return response.data;
};

const myCompanyAPI = {
  searchCompanies,
};

export default myCompanyAPI;
