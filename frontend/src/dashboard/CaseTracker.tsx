import React, { useState } from "react";
import axios from "axios";

const CaseTracker = () => {
  const [cnr, setCnr] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaImg, setCaptchaImg] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCaptcha = async () => {
    setCaptcha("");
    setCaptchaImg(null);
    setError("");
    setResult(null);
    try {
      const { data } = await axios.get(`/api/casetracker/captcha?ts=${Date.now()}`);
      setCaptchaImg(data.image);
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
      const { data } = await axios.post("/api/casetracker", { cnr, captcha });
      setResult(data);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Track Case by CNR Number</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter CNR Number (e.g. MHAU019999992015)"
          value={cnr}
          onChange={(e) => setCnr(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={fetchCaptcha}
          disabled={!cnr}
        >
          {captchaImg ? "Reload Captcha" : "Get Captcha"}
        </button>
        {captchaImg && (
          <div>
            <img src={captchaImg} alt="Captcha" className="my-2 border" />
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
        <div className="mt-6 bg-gray-50 p-4 rounded shadow">
          <div><b>Case Title:</b> {result.title}</div>
          <div><b>Case Type:</b> {result.caseType}</div>
          <div><b>Filing Date:</b> {result.filingDate}</div>
          <div><b>Next Hearing Date:</b> {result.hearingDate}</div>
        </div>
      )}
    </div>
  );
};

export default CaseTracker;
