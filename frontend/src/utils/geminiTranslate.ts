export async function geminiTranslate(text: string): Promise<string> {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Translation failed");
  const data = await res.json();
  return data.translation;
}