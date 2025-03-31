import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import MyCompanyComparison from "./pages/SelectCompany/MyCompanyComparison";
import InvestStatus from "./pages/InvestStatus";
import CompareStatus from "./pages/CompareStatus";
import CompanyDetail from "./pages/CompanyDetail";
import CompareResults from "./pages/SelectCompany/CompareResults";
import HomePage from "./pages/MainFullList/Homepage";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/select-company" element={<MyCompanyComparison />} />
          <Route path="/invest-status" element={<InvestStatus />} />
          <Route path="/compare-status" element={<CompareStatus />} />
          <Route
            path="/company-detail/:companyId"
            element={<CompanyDetail />}
          />
          <Route
            path="/select-company/compare-results"
            element={<CompareResults />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
