Promptly Photo AI - Podsumowanie Projektu

📋 O Projekcie

Aplikacja webowa z AI asystentem specjalizującym się w fotografii. Asystent udziela porad dotyczących techniki fotograficznej, kompozycji, sprzętu i obbóbki zdjęć. Projekt portfolio demonstrujący umiejętności: React, TypeScript, API integration, deployment.

Geneza: Transformacja prostego chatbota terminalowego ([example.ts](./example.ts)) wykorzystującego OpenAI API w pełnoprawną aplikację webową.

Cel: Szybkie stworzenie MVP (2-3 tygodnie), następnie iteracyjna rozbudowa o nowe funkcjonalności.

---

🛠️ Tech Stack

Frontend: React 18 + Vite + TypeScript
Styling: TailwindCSS + Shadcn/ui
State Management: Zustand (+ persist middleware dla localStorage)
Backend: Express.js + TypeScript
AI: OpenAI API
Deployment: Vercel (frontend) + Render (backend)
DB: Brak w MVP → PostgreSQL w Phase 2+

---

🚀 Fazy Rozwoju

Phase 1: MVP (2-3 tygodnie)

- Czat z AI Photography Assistant
- System prompt fotograficzny
- Historia aktywnego czatu (localStorage)
- Deploy na produkcję (Vercel + Render)

Phase 2: User Management (Q2 2026)

- Autentykacja użytkowników (JWT)
- Persystencja w bazie danych (PostgreSQL + Prisma)
- Historia wielu czatów
- Dashboard użytkownika

Phase 3: Image Analysis (Q3 2026)

- Upload zdjęć
- Analiza przez GPT-4 Vision (kompozycja, ekspozycja, ocena)
- Migracja do Next.js (Image Optimization)

Phase 4: AI Editing (Q4 2026+)

- Edycja zdjęć komendami tekstowymi
- Integracja DALL-E 3
- Before/after preview

---

💡 Kluczowe Koncepcje

Historia konwersacji:

- previous_response_id

Persystencja:

- Phase 1: `localStorage` (aktywny czat, bez konta)
- Phase 2+: Baza danych (wiele chatów, multi-device sync)

System Prompt:

- Hardcoded w backendzie, definiuje "osobowość" AI - ekspert fotografii z 20+ latami doświadczenia.

---

🕗 Work diary

1️⃣ 1 lutego 2026

Opracowanie założeń oraz planu pracy (przy pomocy AI). Inicjalizacja projektu.
https://github.com/brzozanet/promptly-photo-ai/blob/main/README.md

2️⃣ 2 lutego - 5 lutego 2026

Phase 1 Sprint 1: Frontend Setup

- Inicjalizacja React + Vite + TailwindCSS
- Komponenty czatu (Message, MessageList, ChatInput, ChatWindow)
- Zustand store
- Routing + Pages

c.d.n.

Phase 1 Sprint 2: Backend Proxy

- Express.js + TypeScript
- Endpoint `/api/chat` → proxy do OpenAI
- System prompt fotograficzny
- Obsługa `previous_response_id` (historia konwersacji)
- CORS + error handling

Phase 1 Sprint 3: Integracja & Deploy

- Połączenie Frontend ↔ Backend
- UX improvements (loading states, error messages)
- Deploy na Vercel (FE) + Render (BE)
- Environment variables + testing produkcji
