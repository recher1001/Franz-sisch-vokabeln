// KI-Server für die Vokabel-Lernseite: Cloudflare Worker mit Workers AI (Gratis-Kontingent pro Tag).
// Die Seite schickt Gespräche an /v1/chat/completions und bekommt die Antwort Stück für Stück zurück.
// Nur die Lernseite darf den Server aus dem Browser benutzen. Gespräche werden hier nicht gespeichert.

const ERLAUBT = ['https://recher1001.github.io'];

// Erstes Modell: kann Französisch und Deutsch sehr gut. Fällt es aus, wird das nächste genommen.
const MODELLE = [
  '@cf/mistralai/mistral-small-3.1-24b-instruct',
  '@cf/google/gemma-3-12b-it',
  '@cf/meta/llama-3.1-8b-instruct-fp8',
];

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': ERLAUBT.includes(origin) ? origin : ERLAUBT[0],
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });

    const pfad = new URL(req.url).pathname;
    if (pfad === '/health') return Response.json({ status: 'ok' }, { headers: cors });
    if (pfad !== '/v1/chat/completions' || req.method !== 'POST') return new Response('Nicht gefunden', { status: 404, headers: cors });
    if (!ERLAUBT.includes(origin)) return new Response('Nicht erlaubt', { status: 403, headers: cors });

    let body;
    try { body = await req.json(); } catch { return new Response('Ungültige Anfrage', { status: 400, headers: cors }); }

    const rollen = ['system', 'user', 'assistant'];
    const messages = (Array.isArray(body.messages) ? body.messages : []).slice(-14).map((m) => ({
      role: rollen.includes(m && m.role) ? m.role : 'user',
      content: String((m && m.content) || '').slice(0, 6000),
    }));
    if (!messages.length) return new Response('Keine Nachricht', { status: 400, headers: cors });

    const zahl = (x, min, max, std) => (typeof x === 'number' && isFinite(x) ? Math.min(max, Math.max(min, x)) : std);
    const optionen = {
      messages,
      stream: true,
      max_tokens: zahl(body.max_tokens, 50, 600, 450),
      temperature: zahl(body.temperature, 0, 1.2, 0.4),
      top_p: zahl(body.top_p, 0.1, 1, 0.9),
    };

    let fehler = null;
    for (const modell of MODELLE) {
      try {
        const strom = await env.AI.run(modell, optionen);
        return new Response(strom, { headers: { ...cors, 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' } });
      } catch (e) {
        fehler = e;
        // Tageskontingent aufgebraucht: kein anderes Modell probieren, das Kontingent gilt für alle.
        if (/4006|daily free allocation|neurons/i.test(String(e && e.message))) {
          return Response.json({ error: 'limit' }, { status: 429, headers: cors });
        }
      }
    }
    return Response.json({ error: String((fehler && fehler.message) || fehler) }, { status: 503, headers: cors });
  },
};
