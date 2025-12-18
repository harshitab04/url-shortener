import React, { useState } from "react";

export default function UrlCard({ shortUrl }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 hover:shadow-xl transition">
      <p className="text-gray-600 dark:text-gray-400 text-sm">Original:</p>
      <p className="text-gray-800 dark:text-gray-200 break-all mb-2">{shortUrl.longUrl}</p>

      <div className="flex items-center justify-between">
        <a
          href={shortUrl.shortUrl}
          target="_blank"
          className="text-blue-600 font-bold underline"
        >
          {shortUrl.shortUrl}
        </a>

        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
