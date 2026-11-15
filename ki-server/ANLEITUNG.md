# So richtest du die Online-KI ein (einmalig, etwa 10 Minuten, kostenlos)

Die KI läuft bei Cloudflare („Workers AI“). Cloudflare schenkt jeden Tag ein Kontingent,
das für einige hundert Antworten reicht. Es wird um 1 Uhr nachts (deutsche Zeit) zurückgesetzt.
Eine Kreditkarte ist nicht nötig.

1. **Konto anlegen:** https://dash.cloudflare.com/sign-up (E-Mail bestätigen).
2. **Worker anlegen:** Links im Menü **Compute (Workers)** → **Workers & Pages** → **Create** →
   **Start with Hello World!** → Name: `vokabel-ki` → **Deploy**.
3. **Code einfügen:** Auf **Edit code** klicken. Den gesamten Inhalt links löschen und
   den Inhalt der Datei `worker.js` aus diesem Ordner einfügen. Oben rechts **Deploy**.
4. **KI freischalten:** Zurück zum Worker → **Settings** → **Bindings** → **Add** →
   **Workers AI** → Variable name: `AI` → **Deploy**/**Save**.
5. **Adresse kopieren:** Auf der Übersichtsseite des Workers steht die Adresse,
   zum Beispiel `https://vokabel-ki.DEINNAME.workers.dev`. Diese Adresse an Claude schicken.

Test: Wenn du `https://vokabel-ki.DEINNAME.workers.dev/health` im Browser öffnest,
muss `{"status":"ok"}` erscheinen.
