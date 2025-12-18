import { useState } from "react";
import HistoryModal from "./components/HistoryModal";
import useDarkMode from "./hooks/useDarkMode";
import UrlShortenerForm from "./components/UrlShortenerForm";
import UrlCard from "./components/UrlCard";
import ParticleBackground from "./components/ParticleBackground";


function App() {
  const [showHistory, setShowHistory] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
  setMousePos({
    x: e.clientX / window.innerWidth,
    y: e.clientY / window.innerHeight,
  });
};

  return (
 <div
  onMouseMove={handleMouseMove}
  className="min-h-screen relative overflow-hidden"
>
  
    
    <div
      className={`absolute inset-0 -z-20 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    ></div>
    <div className="absolute inset-0 -z-10">
  <ParticleBackground darkMode={darkMode} />
</div>

    {/* CONTENT */}
    <div className="flex flex-col items-center pt-20 px-4 text-gray-900 dark:text-gray-100 transition duration-300">
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-xl shadow hover:scale-105 transition text-sm"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1 className="text-4xl font-bold mb-6">URL Shortener</h1>

      <UrlShortenerForm setShortenedUrls={setShortenedUrls} />

      <button
        onClick={() => setShowHistory(true)}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        View History
      </button>

      <div className="w-full max-w-xl mt-6 space-y-4">
        {shortenedUrls.length > 0 && <UrlCard shortUrl={shortenedUrls[0]} />}
      </div>

      {showHistory && <HistoryModal onClose={() => setShowHistory(false)} />}
    </div>
  </div>
);

}

export default App;
