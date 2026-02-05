# Promptly Photo - AI Photography Assistant

## 📋 Opis Projektu

Promptly Photo to **aplikacja webowa z AI asystentem** specjalizującym się w **fotografii**. Asystent udziela porad na temat techniki fotograficznej, kompozycji, wyboru sprzętu, obróbki zdjęć i fotografii specjalistycznej.

**Geneza**: Projekt bazuje na prostej implementacji czatu AI w terminalu ([example.ts](./example.ts)), która wykorzystuje OpenAI API z zachowaniem historii rozmowy (`previous_response_id`). Celem jest transformacja tego rozwiązania w pełnoprawną aplikację webową.

**Cel**: Szybkie stworzenie MVP (2-3 tygodnie), potem iteracyjna rozbudowa o nowe feature'y.

**Zastosowanie**: Projekt portfolio dla programisty - demonstracja umiejętności: React, TypeScript, API integration, deployment, UI/UX.

### Fazy Rozwoju

| Faza              | Cel                                               | Timeframe    |
| ----------------- | ------------------------------------------------- | ------------ |
| **Phase 1 (MVP)** | Czat z AI + wdrożenie na produkcję                | 2-3 tygodnie |
| **Phase 2**       | Konta użytkowników, historia chatów, wiele rozmów | Q2 2026      |
| **Phase 3**       | Upload zdjęć + ocena przez AI (GPT-4 Vision)      | Q3 2026      |
| **Phase 4**       | Edycja zdjęć przez AI (komendy tekstowe → DALL-E) | Q4 2026+     |

**Roadmap szczegółowy**:

- ✅ **Phase 1**: Podstawowy czat tekstowy, system prompt fotograficzny, deploy
- 🔄 **Phase 2**: Autentykacja, persystencja rozmów, wiele chatów użytkownika
- 🔜 **Phase 3**: Użytkownik uploaduje zdjęcie → AI analizuje i ocenia (kompozycja, ekspozycja, błędy)
- 🔜 **Phase 4**: Użytkownik podaje komendy tekstowe → AI edytuje zdjęcie (usuń obiekt, dodaj element, popraw kolory)

---

## � Od Terminal CLI do Web App

**example.ts (Terminal)** → **Promptly Photo (Web)**

| Aspekt            | example.ts (Terminal)  | Promptly Photo (Web)                                          |
| ----------------- | ---------------------- | ------------------------------------------------------------- |
| **Interface**     | CLI (readline)         | React UI (Shadcn/ui)                                          |
| **Historia**      | `previous_response_id` | Zustand store + API                                           |
| **Model**         | `gpt-5-nano`           | `gpt-4`, `gpt-4o`                                             |
| **System Prompt** | Brak                   | Photography Expert                                            |
| **Deployment**    | Lokalnie (Node.js)     | Vercel (FE) + Render (BE)                                     |
| **Użytkownicy**   | 1 sesja                | Multi-user (Phase 2+)                                         |
| **Persystencja**  | Brak                   | Phase 1: localStorage (aktywny czat), Phase 2+: DB (historia) |

**Kluczowa koncepcja z example.ts**:

```typescript
// Zachowanie historii rozmowy - to samo podejście w web app
const response = await client.responses.create({
  model: "gpt-4",
  input: userInput,
  previous_response_id: previousResponseId, // 👈 Klucz do kontekstu
});
```

W webowej wersji implementujemy to samo w `backend/src/routes/chat.ts`

---

## �🛠️ Tech Stack - MVP

| Warstwa             | Technologia                               | Dlaczego?                                                           |
| ------------------- | ----------------------------------------- | ------------------------------------------------------------------- |
| **Frontend**        | React 18 + Vite + TailwindCSS + Shadcn/ui | Szybki dev loop, UI components ready-to-use                         |
| **State**           | Zustand                                   | Lekkie, bez boilerplate                                             |
| **Backend**         | Express.js + TypeScript                   | Prosty proxy (1 endpoint), ~100 LOC + **nauka fundamentów backend** |
| **AI**              | OpenAI API                                | Gotowa, niezawodna integracja                                       |
| **DB**              | Brak (Phase 1)                            | MVP bez persystencji                                                |
| **Deployment**      | Vercel (FE) + Render (BE)                 | Free tier, szybki deploy                                            |
| **Version Control** | Git + GitHub                              | Kontrola wersji                                                     |

---

## 📁 Struktura Projektu

```
promptly-photo-ai/
├── frontend/                 # Aplikacja React (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx         (logo + navigation menu)
│   │   │   │   └── Layout.tsx         (wrapper całej aplikacji)
│   │   │   ├── chat/
│   │   │   │   ├── ChatWindow.tsx     (kontener: łączy MessageList + ChatInput)
│   │   │   │   ├── MessageList.tsx    (scroll area z listą Message)
│   │   │   │   ├── Message.tsx        (pojedynczy bąbelek wiadomości)
│   │   │   │   └── ChatInput.tsx      (textarea + button wyślij)
│   │   │   └── ui/
│   │   │       └── (komponenty shadcn/ui - auto-generated)
│   │   ├── pages/
│   │   │   ├── HomePage.tsx       (główna strona z czatem)
│   │   │   ├── AboutPage.tsx      (/about)
│   │   │   ├── HowItWorksPage.tsx (/how-it-works)
│   │   │   └── ContactPage.tsx    (/contact)
│   │   ├── store/
│   │   │   └── chatStore.ts (Zustand)
│   │   ├── types/
│   │   │   └── chat.ts
│   │   ├── services/
│   │   │   └── chatService.ts (komunikacja z backend proxy)
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
│
├── backend/                  # Micro-service proxy (~200 linii)
│   ├── src/
│   │   ├── routes/
│   │   │   └── chat.ts (proxy endpoint)
│   │   └── index.ts (Express server)
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## 📅 Plan Pracy - Phase 1 (MVP) - Szczegółowy

**Cel MVP**: Działająca aplikacja online, czat z AI Photography Assistant, bez rejestracji użytkowników

**Inspiracja**: Plik `example.ts` (terminal chatbot) → Web aplikacja z UI

**Timeframe**: 2-3 tygodnie (4-5 dni pracy efektywnej)

---

### Sprint 1: Setup Frontend (1-2 dni) 👉 [SPRINT-1.md](./SPRINT-1.md)

**Efekt końcowy**: Działająca aplikacja React z mockowanym czatem

- [x] Task 1.1: Inicjalizacja React + Vite (0.5h)
- [x] Task 1.2: Instalacja TailwindCSS (0.5h)
- [x] Task 1.3: Instalacja Shadcn/ui (0.5h)
- [x] Task 1.4: Struktura folderów (components/layout, components/chat, pages) (0.5h)
- [x] Task 1.5: Instalacja React Router (0.25h)
- [x] Task 1.6: Typy TypeScript (`chat.ts`) (0.5h)
- [x] Task 1.7: Zustand Store (0.5h)
- [x] Task 1.8: Layout Components (Header, Layout) (0.5h)
- [x] Task 1.9: Chat Components - Message & MessageList (0.75h)
- [x] Task 1.10: Chat Components - ChatInput (0.5h)
- [x] Task 1.11: Chat Components - ChatWindow (połączenie wszystkiego) (0.5h)
- [x] Task 1.12: Pages (About, How It Works, Contact) (0.75h)
- [x] Task 1.13: Routing & App.tsx - finalna integracja (0.5h)
- [x] Task 1.14: Chat Services - template (0.5h)
- [x] Task 1.15: Environment Variables (0.25h)
- [x] Task 1.16: Testing & Polish (0.5h)
- [x] Task 1.17: Deployment Setup - Vercel (0.5h)

**Output**: Mockowany czat działa lokalnie, gotowy na integrację z backendem

---

### Sprint 2: Backend Proxy (1 dzień) 👉 [SPRINT-2.md](./SPRINT-2.md) _(do utworzenia)_

**Efekt końcowy**: Backend proxy do OpenAI API, działający lokalnie

- [ ] Task 2.1: Inicjalizacja Express + TypeScript (0.5h)
- [ ] Task 2.2: Struktura projektu backend (0.25h)
- [ ] Task 2.3: Environment Variables + .env.example (0.25h)
- [ ] Task 2.4: Endpoint `/api/chat` - proxy do OpenAI (1h)
  - Integracja z OpenAI SDK
  - System prompt fotograficzny (z README)
  - Obsługa `previous_response_id` dla historii (jak w `example.ts`)
- [ ] Task 2.5: CORS configuration (0.25h)
- [ ] Task 2.6: Error handling (0.5h)
- [ ] Task 2.7: Testing lokalnie (Postman/curl) (0.5h)
- [ ] Task 2.8: Deployment na Render (0.5h)

**Output**: Backend proxy online, testowany z Postman

---

### Sprint 3: Integracja & Deploy (1 dzień) 👉 [SPRINT-3.md](./SPRINT-3.md) _(do utworzenia)_

**Efekt końcowy**: Działająca aplikacja na produkcji (Vercel + Render)

- [ ] Task 3.1: Podłączenie Frontend → Backend (chatService.ts) (1h)
- [ ] Task 3.2: Testowanie flow'u lokalnie (0.5h)
- [ ] Task 3.3: UX improvements (loading states, error messages) (1h)
- [ ] Task 3.4: Deploy Frontend na Vercel (0.5h)
- [ ] Task 3.5: Konfiguracja environment variables produkcji (0.25h)
- [ ] Task 3.6: End-to-end testing produkcji (0.5h)
- [ ] Task 3.7: Final polish (favicon, meta tags, README update) (0.5h)

**Output**: 🚀 **MVP ONLINE** - Promptly Photo AI dostępna publicznie

---

### Post-MVP: Dokumentacja & Portfolio (0.5 dnia)

- [ ] Screenshot aplikacji
- [ ] Demo GIF/wideo
- [ ] Update README z linkami do live demo
- [ ] Dodanie do portfolio (LinkedIn, GitHub profile)

---

## ⚡ Szybki Start - Lokalna Praca

```bash
# 1. Backend proxy
cd backend
npm install
cp .env.example .env      # Wpisz OPENAI_API_KEY
npm run dev               # Nasłuchuje na :3001

# 2. Frontend (nowe okno terminala)
cd frontend
npm install
npm run dev               # Nasłuchuje na :5173
```

Otwórz **http://localhost:5173** w przeglądarce

---

## 💡 System Prompt - Photography AI Assistant

```
Jesteś ekspertem w fotografii z doświadczeniem 20+ lat.
Odpowiadasz na pytania dotyczące:
- Technik fotograficznych (ekspozycja, przesłona, ISO, ogniskowa)
- Kompozycji i estetyki
- Doboru sprzętu (aparaty, obiektywy, oświetlenie)
- Obróbki zdjęć (lightroom, photoshop, rawtherapee)
- Fotografii specjalistycznej (portret, krajobraz, makro, sportowa, eventowa)
- Tipów dla początkujących fotografów

Odpowiadaj zwięźle (max 2-3 paragrafy), praktycznie i dostępnie.
Jeśli pytanie jest poza fotografią, grzecznie przekieruj.
Kończąc każdą odpowiedź, nawiąż do jej treści i zaproś odbiorcę na odpowiednie plenery lub warsztaty fotograficzne: jeśli pytanie dotyczyło krajobrazów - zaproś na plener krajobrazowy, jeśli portretu - na warsztat portretowy, itd. Zaproszenie powinno brzmieć naturalnie i być powiązane z omawianym tematem. Na końcu dodaj link do [fotowarsztaty.com](https://fotowarsztaty.com).
```

---

## 📊 Metryki Sukcesu - MVP

- ✅ Działająca aplikacja lokalnie i na produkcji
- ✅ Minimum 3 rozmowy testowe z AI
- ✅ Integracja Frontend ↔ Backend bez błędów
- ✅ Kod na GitHub z dokumentacją

---

## 🔧 Troubleshooting & FAQ

### Backend replies `401 Unauthorized`

Sprawdź czy `OPENAI_API_KEY` jest poprawny w `.env`

### Vite showing `localhost` ale brak dostępu

Upewnij się że terminal nie pokazuje błędów TypeScript - fix ich i poczekaj hot reload

### Mogę zmienić model OpenAI?

Tak! W `backend/src/routes/chat.ts` zmień pole `model`. Dostępne: `gpt-4o`, `gpt-4o-mini`, `o1-preview`

---

## 🚀 Kluczowe Features - MVP

✅ **Podstawowa Funkcjonalność**

- Wysyłanie pytań do Photography AI
- Odbieranie porad fotograficznych
- Historia aktywnego czatu (localStorage - przetrwa refresh)
- UI podobne do ChatGPT (dark mode, responsywne)
- System prompt zapewnia spójne, ekspertowe odpowiedzi

❌ **Poza Scope - Phase 1**

- Konta użytkowników
- Persystencja w bazie danych
- Historia wielu czatów (sidebar, przełączanie)
- Tworzenie/zarządzanie wieloma rozmowami

---

## Environment Variables

### Backend (.env)

```
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4
PORT=3001

SYSTEM_PROMPT=Jesteś ekspertem w fotografii z doświadczeniem 20+ lat. Odpowiadasz na pytania dotyczące: technik fotograficznych (ekspozycja, przesłana, ISO, ogniskowa), kompozycji i estetyki, doboru sprzętu (aparaty, obiektywy, oświetlenie), obróbki zdjęć (lightroom, photoshop, rawtherapee), fotografii specjalistycznej (portret, krajobraz, makro, sportowa, eventowa), tipów dla początkujących fotografów. Odpowiadaj zwięźle (max 2-3 paragrafy), praktycznie i dostępnie. Jeśli pytanie jest poza fotografią, grzecznie przekieruj. Kończąc każdą odpowiedź, nawiąż do jej treści i zaproś odbiorcę na odpowiednie plenery lub warsztaty fotograficzne: jeśli pytanie dotyczyło krajobrazów - zaproś na plener krajobrazowy, jeśli portretu - na warsztat portretowy, itd. Zaproszenie powinno brzmieć naturalnie i być powiązane z omawianym tematem. Na końcu dodaj link do fotowarsztaty.com (https://fotowarsztaty.com).
```

### Frontend (.env.local)

```
VITE_API_URL=http://localhost:3001
```

---

## 📝 API Specification - MVP

### Chat Endpoint

```
POST /api/chat

Request Body:
{
  "message": "Jak robić zdjęcia nocne bez tripodu?",
  "previousResponseId": "chatcmpl-1234..." (optional)
}

Response:
{
  "id": "chatcmpl-5678...",
  "message": "Do fotografii nocnej bez tripodu rekomenduje...",
  "timestamp": "2026-01-31T10:00:00Z"
}

Error Response (e.g., 500):
{
  "error": "Failed to connect to OpenAI API"
}
```

---

## 💡 System Prompt - Jak To Działa?

System prompt to "instrukcja" dla modelu AI. Ustawiasz ją raz, a model "zachowuje się" jak zadany ekspert - bez trenowania, bez ML.

W naszym projekcie system prompt definiuje:

- **Kim jest asystent**: Ekspert w fotografii z 20+ latami doświadczenia
- **Co potrafi**: Technika, kompozycja, sprzęt, obróbka, fotografia specjalistyczna
- **Jak odpowiada**: Zwięźle, praktycznie, z kontekstem
- **Co robi na koniec**: Nawiązuje do tematu i zaprasza na warsztaty - [fotowarsztaty.com](https://fotowarsztaty.com)

**Efekt**: Każda odpowiedź brzmi jak od rzeczywistego fotografa, a nie chatbota 📸

---

## 🎨 Design Inspiration

- ChatGPT UI (prosty, funkcjonalny layout)
- Tematy fotograficzne (dark mode, ciepłe akcenty)
- Responsive design (mobile-first approach)

---

## 📚 Techniczne Notatki

1. **State Management**: Historia aktywnego czatu przechowywana w Zustand + localStorage (przetrwa refresh). Phase 2 dodaje bazę danych dla historii wielu czatów.
2. **HTTP Client**: MVP używa Fetch API. **Axios planowany do Sprint 2+** (dodatkowy learning).
3. **System Prompt**: Konfigurowany w backend `.env` - łatwo zmienić tematykę asystenta (np. na "Fitness Coach" czy "Web Dev Expert")
4. **Error Handling**: Graceful error handling z user-friendly komunikatami.
5. **CORS**: Backend proxy musi mieć poprawnie skonfigurowany CORS dla frontendu.
6. **Bezpieczeństwo**: API key przechowywany po stronie serwera, nigdy nie trafia do frontendu.
7. **Express → Next.js Migration Strategy**:
   - **Phase 1-2**: Express.js + Vite (nauka fundamentów backend, routing, middleware, CORS)
   - **Phase 3**: Migracja do Next.js (upload zdjęć wymaga Image Optimization, łatwiejsze API Routes)
   - **Uzasadnienie**: Express = uniwersalna umiejętność (CV value), Next.js = optymalizacja dla produkcji
   - **Timeline**: Q3 2026 (wraz z implementacją GPT-4 Vision)
   - **Korzyści migracji**: 1 projekt zamiast 2, automatyczna optymalizacja obrazów, lepsze SEO, scalony deployment

---

## 🔄 Next Steps - Phase 2+ (Future Roadmap)

### Phase 2: Konta Użytkowników & Historia Chatów (Q2 2026)

**Stack dodatkowy**: PostgreSQL (Supabase/Neon), JWT auth

**Features**:

- Rejestracja i logowanie użytkowników
- Zapisywanie rozmów w bazie danych
- Możliwość tworzenia wielu chatów
- Historia rozmów dostępna po zalogowaniu
- Dashboard użytkownika

**Sprinty**:

- Sprint 4: Setup bazy danych (PostgreSQL + Prisma ORM)
- Sprint 5: Autentykacja (JWT, bcrypt, login/register endpoints)
- Sprint 6: Zapisywanie rozmów do DB
- Sprint 7: UI dla wielu chatów (sidebar, tworzenie nowych rozmów)

---

### Phase 3: Upload & Ocena Zdjęć (Q3 2026)

**Stack dodatkowy**: GPT-4 Vision API, S3/Cloudinary dla storage

**🔄 MIGRACJA DO NEXT.JS** - Najbardziej sensowny moment:

**Dlaczego teraz?**

- ✅ Nauczyłeś się już Express (fundamenty backend)
- ✅ Upload zdjęć wymaga lepszej optymalizacji obrazów
- ✅ Scalenie frontend + backend = prostszy deployment
- ✅ Przygotowanie pod skalowanie (Phase 4-5)

**Co zyskujesz:**

- **Image Optimization** - Next.js automatycznie kompresuje/konwertuje obrazy (WebP, AVIF)
- **API Routes** - 1 projekt zamiast 2 (frontend + backend razem)
- **SSR/SSG** - lepsze SEO dla galerii publicznych (Phase 5)
- **Performance** - szybsze ładowanie dużych plików

**Effort**: 2-3 dni (przepisanie Express endpoints → Next.js API Routes)

**Decision Matrix**:
| Faza | Express | Next.js | Status |
|------|---------|---------|--------|
| Phase 1-2 | ✅ Idealny (nauka) | ❌ Overkill | **Express** |
| Phase 3+ | ⚠️ Działa, ale... | ✅ **Lepszy** | **→ Next.js** |

**Features**:

- Upload zdjęć przez użytkownika
- AI analizuje zdjęcie (kompozycja, ekspozycja, balans bieli)
- AI podaje ocenę i sugestie poprawy
- Historia zdjęć z ocenami w profilu użytkownika

**API wykorzystywane**:

- OpenAI Vision API (GPT-4V) - analiza obrazów
- System prompt: "Jesteś ekspertem fotografii. Oceń to zdjęcie pod kątem kompozycji, ekspozycji, ostrości..."

**Sprinty**:

- Sprint 8: Upload zdjęć (frontend + backend storage)
- Sprint 9: Integracja GPT-4 Vision
- Sprint 10: UI dla galerii zdjęć z ocenami

---

### Phase 4: Edycja Zdjęć przez AI (Q4 2026+)

**Stack dodatkowy**: DALL-E API, Image Editing Models

**Features**:

- Użytkownik podaje komendy tekstowe: "usuń drzewo", "dodaj chmury", "wygładź skórę"
- AI wykonuje edycję zdjęcia
- Użytkownik widzi before/after
- Możliwość zapisania edytowanego zdjęcia

**API wykorzystywane**:

- OpenAI DALL-E 3 (image editing/inpainting)
- Stable Diffusion (alternatywa open-source)

**Sprinty**:

- Sprint 11: Integracja DALL-E API
- Sprint 12: UI do edycji (before/after, komendy tekstowe)
- Sprint 13: Eksport edytowanych zdjęć

---

### Phase 5: Społeczność & Portfolio (2027+)

**Features**:

- Galeria publiczna zdjęć użytkowników
- Komentarze i oceny społeczności
- Portfolio fotograficzne dla każdego użytkownika
- Eksport rozmów do PDF
- Integracja z social media

---

## 📖 Przydatne Zasoby

- [OpenAI API Docs](https://platform.openai.com/docs)
- [OpenAI Responses API](https://platform.openai.com/docs/api-reference/responses) (previous_response_id)
- [React Best Practices](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [TailwindCSS](https://tailwindcss.com)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Zustand State Management](https://github.com/pmndrs/zustand)
- [Vercel Deployment](https://vercel.com/docs)
- [Render Deployment](https://render.com/docs)

---

## 🎯 Quick Reference - Dla Początkujących

### Rozpoczęcie pracy (MVP - Phase 1)

1. **Sprint 1** (1-2 dni): Zbuduj UI w React - mockowany czat działa
2. **Sprint 2** (1 dzień): Stwórz backend proxy do OpenAI
3. **Sprint 3** (1 dzień): Połącz Frontend + Backend, deploy online

**Po 4-5 dniach efektywnej pracy masz działającą aplikację online! 🚀**

### Jak używać tego README?

- ✅ Czytaj sekcje **📅 Plan Pracy - Phase 1** krok po kroku
- ✅ Każdy Sprint ma osobny plik (SPRINT-1.md, SPRINT-2.md, SPRINT-3.md)
- ✅ Każdy Task ma:
  - Cel (co osiągasz)
  - Kroki (co robisz)
  - Kod (co wpisujesz)
  - Checklist (jak sprawdzasz)
- ✅ Nie przeskakuj tasków - rób po kolei
- ✅ Po każdym Tasku commit do Git: `git commit -m "feat: task-1.x-nazwa"`

### Problemy?

- Troubleshooting → sekcja **🔧 Troubleshooting & FAQ**
- Pytania techniczne → [OpenAI Community](https://community.openai.com)
- Błędy React/Vite → sprawdź konsolę przeglądarki (F12)

---

**Status**: 📝 Plan Phase 1 MVP - Gotowy do implementacji  
**Następny krok**: [Sprint 1: Setup Frontend](./SPRINT-1.md)  
**Ostatnia Aktualizacja**: 01.02.2026
