---
title: Vokabel KI
colorFrom: green
colorTo: yellow
sdk: docker
app_port: 7860
pinned: false
license: apache-2.0
---

# Vokabel-KI

Kleiner KI-Server für die Französisch-Lernseite https://recher1001.github.io/Franz-sisch-vokabeln/

Er startet [llama.cpp](https://github.com/ggml-org/llama.cpp) mit dem freien Modell Qwen3 1.7B und bietet die Schnittstelle `/v1/chat/completions`. Gespräche werden nicht gespeichert.
