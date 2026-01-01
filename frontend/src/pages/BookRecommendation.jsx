import { useState } from "react";
import api from "../api/axios";
import { FcInfo } from "react-icons/fc";

const AiInlineBox = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setAnswer("");

      const res = await api.post("/recommend", { query });

      setAnswer(
        typeof res.data.recommendation === "string"
          ? res.data.recommendation
          : JSON.stringify(res.data.recommendation, null, 2)
      );
    } catch (err) {
      setAnswer("❌ AI service not reachable");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setQuery("");
    setAnswer("");
  };

  return (
    <div className="max-w-md border rounded-xl bg-white shadow-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg flex items-center align-middle font-semibold text-gray-800">
           AI Book Assistant <span className="ml-3"><FcInfo/>  </span>
        </h3>

        {open && (
          <button
            onClick={() => {
              setOpen(false);
              clearAll();
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        )}
      </div>

      {/* Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Ask AI for Recommendation
        </button>
      )}

      {/* Input + Output */}
      {open && (
        <>
          <input
            type="text"
            placeholder="e.g. I want a mystery book"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border px-3 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="flex gap-2 mb-3">
            <button
              onClick={askAI}
              disabled={loading}
              className={`flex-1 py-2 rounded-lg text-white transition
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {loading ? "Thinking..." : "Ask AI"}
            </button>

            <button
              onClick={clearAll}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Clear
            </button>
          </div>

          {/* Answer */}
          {answer && (
            <div className="mt-2 p-3 bg-gray-50 border rounded-md text-sm text-gray-800 whitespace-pre-wrap">
              {answer}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AiInlineBox;
