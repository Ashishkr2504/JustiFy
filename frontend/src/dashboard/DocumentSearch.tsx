import { useState } from 'react';
import axios from 'axios';

export default function DocumentSearch() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setResults([]);
    if (!query) {
      setError('Please enter a search query.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/document/search', { query, filter });
      setResults(res.data);
    } catch {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to highlight keywords
  function highlightKeywords(text: string, query: string) {
    if (!query) return text;
    const words = query.split(/\s+/).filter(Boolean);
    let highlighted = text;
    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark>$1</mark>');
    });
    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Document Search</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-1 rounded"
          placeholder="Ask any legal question or type keywords to search relevant laws…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select className="border p-2 rounded" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="IPC">IPC</option>
          <option value="Constitution">Constitution</option>
          <option value="Contracts">Contracts</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSearch}
          disabled={loading || !query}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div>
        {results.length === 0 && !loading && <div className="text-gray-500">No results yet.</div>}
        {results.map((res, idx) => (
          <div key={idx} className="bg-gray-50 p-4 rounded mb-4 shadow">
            <div className="font-semibold text-blue-700 mb-2">{res.source || 'Unknown Source'}</div>
            <div className="mb-2">{res.text}</div>
            {res.score && (
              <div className="text-xs text-gray-500">Relevance: {(res.score * 100).toFixed(1)}%</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

