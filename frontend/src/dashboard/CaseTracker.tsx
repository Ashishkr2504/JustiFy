import React, { useState } from "react";
import axios from "axios";

const CaseTracker = () => {
  const [cnr, setCnr] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.post("/api/casetracker", { cnr });
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Track Case by CNR Number</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter CNR Number (e.g. MHCC010118642022)"
          value={cnr}
          onChange={(e) => setCnr(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default CaseTracker;
