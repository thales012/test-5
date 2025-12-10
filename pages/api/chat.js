
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método inválido" });

  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: "OPENAI_API_KEY não configurada" });

  try {
    const { message } = req.body;
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Você é o Professor Lucas, especialista em Português." },
          { role: "user", content: message }
        ]
      })
    });
    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content || "";
    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ error: "Erro interno" });
  }
}
