import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import MainFullList from "./pages/MainFullList";
import SelectCompany from "./pages/SelectCompany";
import InvestStatus from "./pages/InvestStatus";
import CompareStatus from "./pages/CompareStatus";
import CompanyDetail from "./pages/CompanyDetail";
import CompareResults from "./pages/SelectCompany/CompareResults";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainFullList />} />
          <Route path="/select-company" element={<SelectCompany />} />
          <Route path="/invest-status" element={<InvestStatus />} />
          <Route path="/compare-status" element={<CompareStatus />} />
          <Route path="/company-detail" element={<CompanyDetail />} />
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
