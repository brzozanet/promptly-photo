# Sprint 3: Integracja & Deploy - Promptly Photo AI

> 🎯 **Część Phase 1 MVP**: Połączenie frontendu z backendem, testy, deploy na produkcję

**Timeframe**: 1 dzień (4-5h pracy efektywnej)
**Cel końcowy**: Działająca aplikacja online (Vercel + Render), czat z AI Photography Assistant

---

## 📋 Przegląd Sprintu

W tym sprincie integrujemy frontend z backendem (proxy do OpenAI), testujemy cały flow, wdrażamy aplikację na produkcję i dopracowujemy UX.

**Na koniec Sprint 3 powinieneś mieć**:

- ✅ Frontend i backend połączone (czat działa end-to-end)
- ✅ Testy lokalne (pełny flow: wpisz pytanie → AI odpowiada)
- ✅ Deploy: backend na Render, frontend na Vercel
- ✅ Konfiguracja zmiennych środowiskowych na produkcji
- ✅ Finalne poprawki UX/UI

---

## 🎯 Task 3.1: Podłączenie Frontend → Backend (`chatService.ts`) (0.5h)

### Cel

Zaimplementowanie funkcji wysyłającej wiadomość do backendu i odbierającej odpowiedź AI.

### Plik: `frontend/src/services/chatService.ts`

```typescript
export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!res.ok) throw new Error("Błąd połączenia z AI");
  return res.json();
}
```

- [x] Funkcja wysyła POST do `/api/chat`
- [x] Obsługa błędów (np. brak połączenia)
- [x] Użycie `VITE_API_URL` z `.env.local`

---

## 🎯 Task 3.2: Testowanie flow'u lokalnie (0.5h)

### Cel

Sprawdzenie, czy czat działa end-to-end lokalnie (frontend ↔ backend ↔ OpenAI).

### Kroki

1. Uruchom backend:
   ```bash
   cd backend
   npm run dev
   ```
2. Uruchom frontend:
   ```bash
   cd frontend
   npm run dev
   ```
3. Otwórz `http://localhost:5173` i wyślij pytanie do AI.

- [x] Odpowiedź AI pojawia się na czacie
- [x] Brak błędów w konsoli

---

## 🎯 Task 3.3: Weryfikacja persystencji localStorage (0.25h)

### Cel

Upewnienie się, że historia czatu przetrwa odświeżenie strony.

### Kroki

1. Wyślij kilka wiadomości
2. Odśwież stronę (F5)
3. Sprawdź, czy historia rozmowy jest zachowana

- [x] Wiadomości nie znikają po refreshu
- [x] localStorage zawiera klucz `chat-storage`

---

## 🎯 Task 3.4: UX improvements (loading states, error messages, clear chat) (0.75h)

### Cel

Poprawa doświadczenia użytkownika: loading spinner, obsługa błędów, przycisk "Wyczyść czat".

### Przykłady:

- **Loading spinner**:
  ```tsx
  {
    isLoading && <Spinner />;
  }
  ```
- **Obsługa błędów**:
  ```tsx
  {
    error && <AlertDialog>{error}</AlertDialog>;
  }
  ```
- **Przycisk "Wyczyść czat"** (np. w Header lub Footer):

  ```tsx
  <Button onClick={clearMessages}>Wyczyść czat</Button>
  ```

- [x] Spinner podczas oczekiwania na odpowiedź
- [x] Komunikat błędu przy problemach z API
- [x] Możliwość wyczyszczenia historii czatu

---

## 🎯 Task 3.5: Deploy Backend na Render (0.5h)

### Cel

Wdrożenie backendu na Render.com (darmowy tier).

### Kroki

1. Zaloguj się na [render.com](https://render.com)
2. Stwórz nowy Web Service z repozytorium GitHub
3. Ustaw build command: `npm install && npm run build`
4. Ustaw start command: `npm run start`
5. Skonfiguruj zmienne środowiskowe (`OPENAI_API_KEY`, `OPENAI_MODEL`, `SYSTEM_PROMPT`, `PORT`)
6. Zdeployuj i sprawdź endpoint `/api/chat`

- [x] Backend online, endpoint `/api/chat` działa
- [x] Test przez Postman/curl

---

## 🎯 Task 3.6: Deploy Frontend na Vercel (0.5h)

### Cel

Wdrożenie frontendu na Vercel.com (darmowy tier).

### Kroki

1. Zaloguj się na [vercel.com](https://vercel.com)
2. Importuj repozytorium z GitHub
3. Ustaw build command: `npm run build`
4. Skonfiguruj zmienną `VITE_API_URL` (adres backendu z Render)
5. Deployuj projekt

- [x] Frontend online, strona działa pod publicznym URL
- [x] Czat łączy się z backendem (nie localhost!)

---

## 🎯 Task 3.7: Konfiguracja environment variables produkcji (0.25h)

### Cel

Ustawienie wszystkich niezbędnych zmiennych środowiskowych na Render i Vercel.

### Przykład:

- **Render (backend)**:
  - `OPENAI_API_KEY=...`
  - `OPENAI_MODEL=gpt-4`
  - `SYSTEM_PROMPT=...`
  - `PORT=10000` (lub domyślny)
- **Vercel (frontend)**:
  - `VITE_API_URL=https://twoj-backend.onrender.com`

- [x] Wszystkie zmienne ustawione poprawnie
- [x] Brak wycieków kluczy API do frontendu

---

## 🎯 Task 3.8: End-to-end testing produkcji (0.5h)

### Cel

Przetestowanie całego flow na produkcji (publiczne URL).

### Kroki

1. Otwórz frontend na Vercel
2. Wyślij pytanie do AI
3. Sprawdź odpowiedź, loading, obsługę błędów
4. Przetestuj na mobile

- [x] Czat działa online
- [x] Odpowiedzi AI pojawiają się poprawnie
- [x] UX bez błędów

---

## 🎯 Task 3.9: Final polish (favicon, meta tags, README update) (0.5h)

### Cel

Ostatnie poprawki przed publikacją.

### Przykłady:

- **Favicon**: Dodaj do `frontend/public/` i zaktualizuj w `index.html`
- **Meta tags**: SEO, opis, social preview
- **README**: Dodaj linki do produkcji, screenshoty

- [x] Favicon widoczny w przeglądarce
- [x] Meta tagi poprawione
- [x] README zaktualizowane

---

## ✅ Checklist Sprint 3 - Finał

- [ ] Frontend i backend połączone (czat działa end-to-end)
- [ ] Deploy: backend na Render, frontend na Vercel
- [ ] Zmienne środowiskowe skonfigurowane
- [ ] Testy produkcyjne zaliczone
- [ ] Finalne poprawki UX/UI

---

**Efekt końcowy**: 🚀 **MVP ONLINE** - Promptly Photo AI dostępna publicznie
