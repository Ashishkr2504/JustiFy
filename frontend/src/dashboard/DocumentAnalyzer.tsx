// dashboard/DocumentAnalyzer.tsx
import { useState } from 'react';
import axios from 'axios';

export default function DocumentAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/document/analyze', formData);
      const data = res.data as { analysis: string };
      setResult(data.analysis);
    } catch (err) {
      setResult('Error analyzing document.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to format the analysis text
  const formatAnalysis = (text: string) => {
    // Split into sections by numbers or headings
    const sections = text.split(/\n(?=\d+\.)/g);
    return (
      <div>
        {sections.map((section, idx) => {
          // Try to split section into heading and content
          const match = section.match(/^(\d+\.\s*)([^\n]+)\n?([\s\S]*)/);
          if (match) {
            const [, num, heading, content] = match;
            // Format bullet points if present
            const bullets = content.split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'));
            return (
              <div key={idx} className="mb-4">
                <div className="font-semibold text-blue-700">{num}{heading}</div>
                <div className="ml-4">
                  {bullets.length > 0 ? (
                    <ul className="list-disc ml-6">
                      {bullets.map((b, i) => <li key={i}>{b.replace(/^[-•]\s*/, '')}</li>)}
                    </ul>
                  ) : (
                    <div className="whitespace-pre-line">{content.trim()}</div>
                  )}
                </div>
              </div>
            );
          }
          // Fallback: just show as preformatted text
          return <div key={idx} className="whitespace-pre-line mb-4">{section.trim()}</div>;
        })}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Legal Document</h2>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading || !file}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      {result && (
        <div className="mt-8 bg-gray-50 p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Analysis Result</h3>
          {formatAnalysis(result)}
        </div>
      )}
    </div>
  );
}
