# Sprint 3: Integracja & Deploy - Promptly Photo AI

> 🎯 **Część Phase 1 MVP**: Integracja Frontend ↔ Backend, testowanie, deploy na produkcję

**Timeframe**: 1 dzień (4-5h pracy efektywnej)
**Cel końcowy**: Działająca aplikacja online (Vercel + Render), pełny flow czatu z AI, gotowa do publicznego użycia.

---

## 📋 Przegląd Sprintu

Sprint 3 to kluczowy etap, w którym łączysz frontend (React) z backendem (Express), testujesz całość lokalnie i na produkcji, poprawiasz UX oraz finalizujesz projekt pod kątem deployu i dokumentacji.

**Dlaczego integracja i deploy?**

- ✅ **Pełny flow**: Użytkownik może wysłać pytanie, otrzymać odpowiedź AI, zobaczyć loading/error states
- ✅ **Testowanie**: Sprawdzasz całość lokalnie i na produkcji (Vercel + Render)
- ✅ **UX**: Dodajesz spinner, komunikaty o błędach, poprawiasz responsywność
- ✅ **Deploy**: Publikujesz aplikację online, konfigurujesz environment variables
- ✅ **Dokumentacja**: Uzupełniasz README, dodajesz checklistę, final polish

**Na koniec Sprint 3 powinieneś mieć**:

- ✅ Frontend i backend połączone (działający czat z AI)
- ✅ Przetestowany flow lokalnie i na produkcji
- ✅ Poprawione loading/error states, responsywność, accessibility
- ✅ Aplikację online (Vercel + Render)
- ✅ Zaktualizowaną dokumentację (README, SPRINT-3.md)

---

## 🗂️ Struktura Sprintu

```
promptly-photo-ai/
├── frontend/                  (React, czat UI)
├── backend/                   (Express, proxy do OpenAI)
├── README.md                  (dokumentacja główna)
├── SPRINT-1.md                (setup frontend)
├── SPRINT-2.md                (backend proxy)
├── SPRINT-3.md                👈 Ten plik
```

---

## 🎯 Task 3.1: Podłączenie Frontend → Backend (`chatService.ts`)

### Cel

Skonfigurować komunikację między frontendem a backendem, obsłużyć fetch/axios, błędy, CORS.

### Kroki

1. Upewnij się, że backend działa (`npm run dev` w backend/)
2. Skonfiguruj endpoint w `frontend/src/services/chatService.ts` (fetch/axios do `/api/chat`)
3. Dodaj obsługę błędów (network, timeout, CORS)
4. Testuj narzędziami: Postman, devtools, curl

### Checklist

- [ ] Frontend otrzymuje odpowiedzi z backendu
- [ ] Obsługa błędów (network, timeout, CORS)

---

## 🎯 Task 3.2: Testowanie flow'u lokalnie

### Cel

Przetestować pełny flow czatu: wysyłanie, odbieranie, loading/error states.

### Kroki

1. Uruchom backend i frontend lokalnie
2. Wyślij kilka pytań do AI, sprawdź odpowiedzi
3. Sprawdź loading spinner, komunikaty o błędach

### Checklist

- [ ] Czat działa bez błędów
- [ ] Loading/error są widoczne

---

## 🎯 Task 3.3: UX improvements (loading states, error messages)

### Cel

Poprawić doświadczenie użytkownika: spinner, komunikaty o błędach, responsywność.

### Kroki

1. Dodaj spinner do UI (np. `spinner.tsx`)
2. Dodaj user-friendly komunikaty o błędach
3. Sprawdź responsywność na różnych urządzeniach

### Checklist

## 🎯 Task 3.4: Zapisywanie stanu do localStorage

### Cel

Utrzymać stan czatu (wiadomości, input) między odświeżeniami/przeładowaniami strony.

### Kroki

1. W pliku `frontend/src/store/chatStore.ts` dodaj zapisywanie stanu (np. tablicy wiadomości) do localStorage przy każdej zmianie.
2. Przy starcie aplikacji odczytaj stan z localStorage i ustaw jako initial state.
3. Przetestuj czy po odświeżeniu czat zachowuje historię.

### Checklist

- [ ] Stan czatu zapisuje się do localStorage
- [ ] Po odświeżeniu czat ładuje poprzedni stan

---

## 🎯 Task 3.4: Deploy Frontend na Vercel

### Cel

Opublikować frontend na Vercel, skonfigurować environment variables, przetestować wersję produkcyjną.

### Kroki

1. Zbuduj aplikację (`npm run build` w frontend/)
2. Skonfiguruj projekt na Vercel (link do repo, ustaw env)
3. Deployuj i testuj wersję produkcyjną

### Checklist

- [ ] Aplikacja działa na Vercel
- [ ] API działa z produkcji

---

## 🎯 Task 3.5: Konfiguracja environment variables produkcji

### Cel

Ustawić zmienne środowiskowe dla produkcji (VITE_API_URL, OPENAI_API_KEY).

### Kroki

1. Skonfiguruj env na Vercel (frontend) i Render (backend)
2. Sprawdź czy produkcja korzysta z poprawnych env

### Checklist

- [ ] Produkcja korzysta z poprawnych env

---

## 🎯 Task 3.6: End-to-end testing produkcji

### Cel

Przetestować flow na wersji live (Vercel + Render).

### Kroki

1. Otwórz aplikację online
2. Wyślij kilka pytań do AI, sprawdź odpowiedzi
3. Sprawdź loading/error states, responsywność

### Checklist

- [ ] Czat działa online
- [ ] Brak błędów sieciowych

---

## 🎯 Task 3.7: Final polish (favicon, meta tags, README update)

### Cel

Dopracować aplikację wizualnie, SEO, accessibility, dokumentację.

### Kroki

1. Dodaj favicon do frontend/public
2. Dodaj meta tags (SEO) do `index.html`
3. Sprawdź accessibility (a11y)
4. Zaktualizuj README i SPRINT-3.md

### Checklist

- [ ] Aplikacja jest kompletna wizualnie
- [ ] README i SPRINT-3.md są aktualne
- [ ] Aplikacja jest dostępna (a11y)

---

## ✅ Output

🚀 **MVP ONLINE** - Promptly Photo AI dostępna publicznie (Vercel + Render)

---

## 📝 Dokumentacja & Portfolio (Post-MVP)

- [ ] Screenshot aplikacji
- [ ] Demo GIF/wideo
- [ ] Update README z linkami do live demo
- [ ] Dodanie do portfolio (LinkedIn, GitHub profile)

---

## 🛠️ Troubleshooting

- CORS errors? Sprawdź konfigurację backendu
- Brak odpowiedzi z AI? Sprawdź API key i endpoint
- Błędy sieciowe? Sprawdź env, devtools, logi backendu

---

**Status**: Plan Sprint 3 gotowy do realizacji
**Ostatnia aktualizacja**: 10.02.2026
