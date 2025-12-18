import React, { useState } from "react";

export default function UrlShortenerForm({ setShortenedUrls }) {
  const [longUrl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl }),
      });

      const data = await res.json();

      if (!data.error) {
        // Show ONLY latest URL
        setShortenedUrls([data]);

        // Save to history
        const existing =
          JSON.parse(localStorage.getItem("urlHistory")) || [];
        localStorage.setItem(
          "urlHistory",
          JSON.stringify([data, ...existing])
        );

        setLongUrl("");
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Backend unreachable");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl w-full max-w-xl transition"
    >
      <input
        type="url"
        placeholder="Enter a long URL..."
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
        className="w-full p-3 border rounded-lg mb-4 focus:ring-2 
        focus:ring-blue-400 outline-none dark:bg-gray-700 dark:border-gray-600"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-3 rounded-lg text-white text-lg font-semibold transition 
        ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
    </form>
  );
}
