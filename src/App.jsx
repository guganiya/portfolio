import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import ContactSection from "./pages/Contact/ContactSection";

// Компонент-помощник для сброса скролла
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      {/* Теперь при каждом переходе скролл будет прыгать в начало */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>
    </div>
  );
}

export default App;
