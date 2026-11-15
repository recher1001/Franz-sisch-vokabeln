# So richtest du den KI-Server ein (einmalig, etwa 10 Minuten, kostenlos)

1. Konto anlegen auf https://huggingface.co/join (E-Mail bestätigen).
2. Neuen Space anlegen: https://huggingface.co/new-space
   - **Space name:** `vokabel-ki`
   - **License:** apache-2.0
   - **Space SDK:** Docker → **Blank**
   - **Space hardware:** CPU basic (free)
   - **Public** auswählen (sonst kann die Lernseite ihn nicht erreichen)
   - **Create Space**
3. Im neuen Space oben auf **Files** → **Add file** → **Upload files**.
   Lade die beiden Dateien `Dockerfile` und `README.md` aus diesem Ordner hoch
   (die vorhandene README.md wird ersetzt) → **Commit changes to main**.
4. Oben auf **App** wechseln. Der Space baut sich jetzt (Status „Building“, dann „Running“).
   Das dauert beim ersten Mal ein paar Minuten.
5. Die Adresse des Servers ist `https://DEINNAME-vokabel-ki.hf.space`
   (DEINNAME = dein Hugging-Face-Benutzername). Diese Adresse an Claude schicken.

Gut zu wissen: Nach 48 Stunden ohne Nutzung schläft der Space ein. Der erste Aufruf weckt ihn wieder,
das dauert 1 bis 2 Minuten.
