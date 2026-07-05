import { Outlet } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import ScrollProgress from "../progress/ScrollProgress";
import ScrollToTopButton from "../scrollToTop/ScrollToTopButton";

function MainLayout() {
  return (
    <>
      <ScrollProgress />

      <Navbar />

      <main className="min-h-screen bg-slate-950">
        <Outlet />
      </main>

      <Footer />

      <ScrollToTopButton />
    </>
  );
}

export default MainLayout;