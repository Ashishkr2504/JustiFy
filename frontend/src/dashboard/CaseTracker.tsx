import React, { useState } from "react";
import axios from "axios";

const CaseTracker = () => {
  const [cnr, setCnr] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaImg, setCaptchaImg] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCaptcha = async () => {
    setCaptcha("");
    setCaptchaImg(null);
    setError("");
    setResult(null);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE}/casetracker/captcha?ts=${Date.now()}`);
      // Fix: tell TypeScript the type
      const { image, sessionId } = data as { image: string; sessionId: string };
      setCaptchaImg(image);
      setSessionId(sessionId); // Store session ID
    } catch {
      setError("Failed to load captcha. Try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_BASE}/casetracker`, {
        cnr,
        captcha,
        sessionId, // Send session ID
      });
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch case details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Case Tracker</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter 16-digit CNR Number"
          value={cnr}
          onChange={(e) => setCnr(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <button
          type="button"
          onClick={fetchCaptcha}
          disabled={!cnr}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {captchaImg ? "Reload Captcha" : "Get Captcha"}
        </button>
        {captchaImg && (
          <img src={captchaImg} alt="Captcha" className="my-2 border" />
        )}
        {captchaImg && (
          <div>
            <input
              type="text"
              placeholder="Enter Captcha"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              required
              className="border p-2 w-full"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading || !captchaImg || !captcha}
        >
          {loading ? "Searching..." : "Track"}
        </button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-2">Case Details</h3>
          <div><strong>Title:</strong> {result.title}</div>
          <div><strong>Type:</strong> {result.caseType}</div>
          <div><strong>Filing Date:</strong> {result.filingDate}</div>
          <div><strong>Hearing Date:</strong> {result.hearingDate}</div>
        </div>
      )}
    </div>
  );
};

export default CaseTracker;
