import React from "react";

export default function HistoryModal({ onClose }) {
  const history = JSON.parse(localStorage.getItem("urlHistory")) || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 w-96 max-h-[80vh] rounded-xl p-6 shadow-lg overflow-y-auto">

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">History</h1>

        <button
          onClick={onClose}
          className="relative text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 text-xl font-bold"
        >
          <img src="src/assets/close_button.png" alt="x" className="w-6 h-6"/>
        </button>
        </div>
        {history.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No history yet.</p>
        ) : (
          <ul className="space-y-3">
            {history.map((item, idx) => (
              <li
                key={idx}
                className="p-3 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <p className="text-sm text-gray-600 dark:text-gray-300">Original:</p>
                <p className="break-all text-gray-900 dark:text-gray-100">{item.longUrl}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Shortened:</p>
                <a
                  href={item.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline text-sm"
                >
                  {item.shortUrl}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Close
        </button> */}

      </div>
    </div>
  );
}
