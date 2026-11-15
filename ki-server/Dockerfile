# KI-Server für die Vokabel-Lernseite (läuft als Hugging Face Space, kostenlos, ohne Grafikkarte).
# Startet llama.cpp mit dem freien Modell Qwen3 1.7B (Apache-2.0-Lizenz).
FROM ghcr.io/ggml-org/llama.cpp:server

# Hier legt der Server das heruntergeladene Modell ab (im Space beschreibbar).
ENV LLAMA_CACHE=/tmp/llama-cache \
    HOME=/tmp

EXPOSE 7860

# -hf                  Modell direkt von Hugging Face holen (beim Start, dauert innerhalb von HF nur Sekunden)
# -c 8192 -np 2        zwei Gespräche gleichzeitig, je 4096 Token Kontext
# -t 2                 der Gratis-Space hat 2 CPU-Kerne
# --reasoning-budget 0 kein langes "Nachdenken", damit Antworten auf der CPU schnell genug kommen
# --cors-origins       nur die Lernseite darf den Server aus dem Browser benutzen
# --no-webui           keine eingebaute Chat-Oberfläche, der Server ist nur für die Lernseite da
CMD ["-hf", "unsloth/Qwen3-1.7B-GGUF:Q4_K_M", \
     "--host", "0.0.0.0", "--port", "7860", \
     "-c", "8192", "-np", "2", "-t", "2", \
     "--jinja", "--reasoning-budget", "0", \
     "--cors-origins", "https://recher1001.github.io", \
     "--no-webui"]
