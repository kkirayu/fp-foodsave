import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./Pages/HomePage";
import CariMakanan from "./Pages/CariMakanan";
import BrowseFoodPage from "./sections/Food";
import CommunityNewsPage from "./Pages/ComunityNewsPages";
import ArticleDetailPage from "./Pages/ArticleDetailPage";
import PaymentPage from "./Pages/PaymentPage";
import InvoicePage from "./Pages/InvoicePage";
import HowItWorksPage from "./Pages/HowItWorkpage";
import UserProfilePage from "./Pages/UserProfile";
import ScrollToTop from "./components/ScrollToTop";
import SellerRegistrationPage from "./Pages/SellerRegistrationPage";
import EmailVerificationPage from "./components/EmailVerificationPage";
import DashboardOverview from "./sections/DashboardOverview";
import ProductManagement from "./sections/ProductManagement";
import OrderApproval from "./sections/OrderApproval";
import SellerDashboardPage from "./Pages/SellerDashboardPage";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="komunitas" element={<CommunityNewsPage />} />
          <Route path="komunitas/:articleId" element={<ArticleDetailPage />} />
          <Route path="cara-kerja" element={<HowItWorksPage />} />
          <Route path="profil" element={<UserProfilePage />} />{" "}
          <Route path="regis-penjual" element={<SellerRegistrationPage />} />
          <Route path="verifikasi-email" element={<EmailVerificationPage />} />
        </Route>
        <Route path="/makanan" element={<Layout />}>
          <Route index element={<CariMakanan />} />
          <Route path="browse" element={<BrowseFoodPage />} />
        </Route>
        <Route path="/pembayaran" element={<Layout />}>
          <Route index element={<PaymentPage />} />
        </Route>
        <Route path="/invoice" element={<Layout />}>
          <Route index element={<InvoicePage />} />
        </Route>
         <Route path="/penjual" element={<SellerDashboardPage />}> 
          <Route index element={<DashboardOverview />} />
          <Route path="-p-makanan" element={<ProductManagement />} />
          <Route path="-p-pesanan" element={<OrderApproval />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
