# Sprint 2: Backend Proxy - Promptly Photo AI

> 🎯 **Część Phase 1 MVP**: Stworzenie backend proxy do OpenAI API

**Timeframe**: 1 dzień (4-5h pracy efektywnej).
**Cel końcowy**: Działający backend Express.js, który pośredniczy między frontendem a OpenAI API.

---

## 📋 Przegląd Sprintu

Tworzymy **Backend** aplikacji Photography AI Assistant. To prosty serwer Express.js z **jednym endpointem** `/api/chat`, który:

1. Przyjmuje wiadomość od użytkownika (z frontendu)
2. Przekazuje ją do OpenAI API wraz z system promptem
3. Zwraca odpowiedź AI z powrotem do frontendu

**Dlaczego backend?**

- ✅ **Bezpieczeństwo**: API key OpenAI pozostaje na serwerze (nigdy nie trafia do przeglądarki)
- ✅ **System Prompt**: Kontrolujesz "osobowość" AI (Photography Expert) z jednego miejsca
- ✅ **Historia rozmowy**: Zarządzasz `previous_response_id` (jak w [example.ts](./example.ts))
- ✅ **Jedna logika**: Zarządzanie AI w jednym miejscu zamiast w każdym komponencie React

**Na koniec Sprint 2 powinieneś mieć**:

- ✅ Backend Express + TypeScript działający na `localhost:3001`
- ✅ Endpoint `/api/chat` przyjmujący wiadomości i zwracający odpowiedzi AI
- ✅ Integracja z OpenAI SDK (model `gpt-4`)
- ✅ System prompt fotograficzny wbudowany
- ✅ Obsługa historii rozmowy (`previous_response_id`)
- ✅ CORS skonfigurowany (frontend może łączyć się z backendem)
- ✅ Error handling (obsługa błędów)
- ✅ Gotowy do testowania z Postman/curl
- ✅ Gotowy do deployu na Render (Sprint 3)

**Co to jest Express.js?**

- Framework do budowania serwerów HTTP w Node.js (jak React, ale dla backendu)
- Pozwala łatwo tworzyć API endpoints (np. `/api/chat`)
- Najpopularniejszy framework Node.js (85M pobrań/tydzień npm)

**Projekt portfolio**: Ten sprint pokazuje umiejętności backend, API integration, security best practices

---

## 🧠 Czym Jest Backend Proxy?

**Analogia**: Wyobraź sobie, że frontend to "kelner w restauracji", a OpenAI API to "kuchnia". Backend proxy to "szef kuchni", który:

1. Przyjmuje zamówienie od kelnera (frontend)
2. Wie, jak przygotować danie (dodaje system prompt, zarządza historią)
3. Chroni przepis (API key pozostaje w kuchni, nie wychodzi na salę)
4. Zwraca gotowe danie do kelnera (odpowiedź AI do frontendu)

**Bez proxy**: Frontend musiałby przechowywać API key (❌ niebezpieczne - każdy może go zobaczyć w kodzie źródłowym przeglądarki)

**Z proxy**: API key w pliku `.env` na serwerze (✅ bezpieczne - nikt poza serwerem nie ma dostępu)

---

## 📐 Architektura Backend

```
┌─────────────────────────────────────────────────────────┐
│  Frontend (React)                                       │
│  User pisze: "Jak robić zdjęcia nocne?"                │
└────────────────┬────────────────────────────────────────┘
                 │ HTTP POST /api/chat
                 │ Body: { message: "...", previousResponseId: "..." }
                 ▼
┌─────────────────────────────────────────────────────────┐
│  Backend Proxy (Express.js)                             │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 1. Middleware (CORS, JSON parser)                │  │
│  └─────────────────┬─────────────────────────────────┘  │
│                    ▼                                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 2. Route Handler /api/chat                        │  │
│  │    - Odczytuje message z request body             │  │
│  │    - Przygotowuje payload dla OpenAI              │  │
│  └─────────────────┬─────────────────────────────────┘  │
│                    ▼                                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 3. OpenAI SDK Client                              │  │
│  │    - Dodaje system prompt (Photography Expert)    │  │
│  │    - Wysyła request do OpenAI API                 │  │
│  │    - Używa previous_response_id (historia)        │  │
│  └─────────────────┬─────────────────────────────────┘  │
│                    ▼                                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 4. Response Handler                               │  │
│  │    - Odbiera odpowiedź od OpenAI                  │  │
│  │    - Formatuje do JSON                            │  │
│  │    - Zwraca do frontendu                          │  │
│  └───────────────────────────────────────────────────┘  │
└────────────────┬────────────────────────────────────────┘
                 │ HTTP 200 OK
                 │ Body: { id: "...", message: "...", timestamp: "..." }
                 ▼
┌─────────────────────────────────────────────────────────┐
│  Frontend (React)                                       │
│  Wyświetla: "Do fotografii nocnej bez tripodu..."      │
└─────────────────────────────────────────────────────────┘
```

**Flow**:

1. **Frontend** wysyła POST request do backendu
2. **Backend Middleware** przetwarza request (CORS, parsuje JSON)
3. **Route Handler** (`/api/chat`) odbiera wiadomość
4. **OpenAI Client** wysyła request do OpenAI z system promptem
5. **Response Handler** zwraca odpowiedź do frontendu

---

## 🎯 Task 2.1: Inicjalizacja Projektu Backend (0.5h)

### Cel

Stworzenie folderu `backend/` w głównym projekcie i konfiguracja Express + TypeScript.

### **Czym jest Express?**

Express.js to "szkielet" do budowania serwerów HTTP. Pozwala:

- Definiować endpointy (np. `GET /users`, `POST /api/chat`)
- Obsługiwać requesty (HTTP methods: GET, POST, PUT, DELETE)
- Zwracać odpowiedzi (JSON, HTML, pliki)

**Analogia**: Express to jak "instrukcja obsługi telefonu" - mówi co zrobić, gdy ktoś zadzwoni (wyśle request).

### **Czym jest TypeScript w backendzie?**

TypeScript to JavaScript + typy. Zamiast:

```javascript
function add(a, b) {
  return a + b;
} // 😱 Co jeśli a = "5"?
```

Masz:

```typescript
function add(a: number, b: number): number {
  return a + b;
} // ✅ Pewność
```

**Korzyści**: Mniej błędów, lepsze IDE hints, łatwiejszy refactoring.

---

### Kroki

**WAŻNE**: Upewnij się, że jesteś w **głównym folderze projektu** `promptly-photo-ai/`, a nie w `frontend/`!

```bash
# 1. Sprawdź gdzie jesteś (powinieneś być w promptly-photo-ai/)
pwd
# Jeśli jesteś w frontend/, wróć: cd ..

# 2. Stwórz folder backend
mkdir backend
cd backend

# 3. Zainicjuj npm project
npm init -y

# 4. Zainstaluj zależności produkcyjne
npm install express openai dotenv cors

# 5. Zainstaluj zależności deweloperskie (TypeScript, typy, narzędzia)
npm install -D typescript @types/node @types/express @types/cors tsx nodemon

# 6. Zainicjuj TypeScript config
npx tsc --init
```

### Co zainstalowałeś?

**Produkcyjne** (działają w aplikacji):

- `express` - framework serwerowy
- `openai` - oficjalny SDK OpenAI (komunikacja z API)
- `dotenv` - ładowanie zmiennych z pliku `.env`
- `cors` - pozwala frontendowi łączyć się z backendem (różne originy)

**Deweloperskie** (tylko na twoim komputerze):

- `typescript` - kompilator TypeScript → JavaScript
- `@types/*` - definicje typów dla bibliotek JavaScript
- `tsx` - uruchamianie TypeScript bez kompilacji (dev mode)
- `nodemon` - auto-restart serwera przy zmianach kodu

---

### Edycja `tsconfig.json`

Otwórz `backend/tsconfig.json` i **zastąp całą zawartość** tym:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Co to robi?**

- `target: ES2020` - kompiluje do nowoczesnego JavaScript
- `module: commonjs` - format modułów dla Node.js
- `outDir: ./dist` - kompilowane pliki trafiają do `dist/`
- `rootDir: ./src` - kod źródłowy w folderze `src/`
- `strict: true` - wszystkie sprawdzenia typów włączone (bezpieczeństwo)

---

### Edycja `package.json`

Otwórz `backend/package.json` i **dodaj/zmień** sekcję `scripts`:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon --exec tsx src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "openai": "^4.80.0",
    "dotenv": "^16.4.7",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "typescript": "^5.7.3",
    "@types/node": "^22.10.5",
    "@types/express": "^5.0.0",
    "@types/cors": "^2.8.17",
    "tsx": "^4.19.2",
    "nodemon": "^3.1.9"
  }
}
```

**Co robią te komendy?**

- `npm run dev` - uruchamia serwer w trybie deweloperskim (auto-restart przy zmianach)
- `npm run build` - kompiluje TypeScript → JavaScript (dla produkcji)
- `npm start` - uruchamia skompilowaną aplikację (po `npm run build`)

---

### Oczekiwana struktura po Task 2.1

```
promptly-photo-ai/
├── frontend/                  (Sprint 1 - gotowy)
├── backend/                   👈 Nowy folder
│   ├── node_modules/
│   ├── src/                   (utworzysz w Task 2.2)
│   ├── package.json           ✅
│   ├── tsconfig.json          ✅
│   └── package-lock.json
└── README.md
```

### Sprawdzenie

- [x] Folder `backend/` istnieje w `promptly-photo-ai/backend/`
- [x] Plik `backend/package.json` ma sekcję `scripts` z `dev`, `build`, `start`
- [x] Plik `backend/tsconfig.json` skonfigurowany (outDir, rootDir, strict)
- [x] Zależności zainstalowane (sprawdź `node_modules/` folder)
- [x] Brak błędów w terminalu

### Test

Uruchom w terminalu (w folderze `backend/`):

```bash
npx tsc --version
# Powinno wyświetlić: Version 5.x.x
```

---

## 🎯 Task 2.2: Struktura Folderów Backend (0.25h)

### Cel

Organizacja kodu backend w logiczne foldery.

### **Struktura Backend - Wyjaśnienie**

Backend to nie jeden wielki plik, ale zestaw modułów:

- **`index.ts`** - punkt wejścia (uruchamia serwer)
- **`routes/`** - definicje endpointów (np. `/api/chat`)
- **`middleware/`** - funkcje przetwarzające requesty (np. CORS, error handling)
- **`services/`** - logika biznesowa (np. komunikacja z OpenAI)
- **`types/`** - typy TypeScript

**Analogia z frontendem**:

- Frontend ma `components/` → Backend ma `routes/`
- Frontend ma `services/` → Backend też ma `services/`
- Frontend ma `types/` → Backend też ma `types/`

---

### Kroki

**Upewnij się, że jesteś w folderze `backend/`**:

```bash
# Jeśli jesteś w głównym folderze promptly-photo-ai:
cd backend

# Utwórz strukturę folderów
mkdir -p src/routes
mkdir -p src/middleware
mkdir -p src/services
mkdir -p src/types
```

### Oczekiwane drzewo (po Task 2.2)

```
promptly-photo-ai/
└── backend/
    ├── src/
    │   ├── routes/          (endpointy API - utworzysz w Task 2.4)
    │   ├── middleware/      (CORS, error handling - Task 2.5-2.6)
    │   ├── services/        (opcjonalnie - logika OpenAI)
    │   ├── types/           (typy TypeScript - Task 2.4)
    │   └── index.ts         (główny plik serwera - następny task)
    ├── node_modules/
    ├── package.json
    └── tsconfig.json
```

### Sprawdzenie

- [x] Folder `backend/src/` istnieje
- [x] Podfoldery: `routes/`, `middleware/`, `services/`, `types/` utworzone

---

## 🎯 Task 2.3: Environment Variables (0.25h)

### Cel

Konfiguracja zmiennych środowiskowych (API key, port, system prompt).

### **Czym są zmienne środowiskowe?**

To "sekrety" aplikacji, które:

- ❌ **NIE trafiają** do Git (plik `.env` w `.gitignore`)
- ✅ **Są różne** dla dev/staging/production
- ✅ **Przechowują** API keys, hasła, konfigurację

**Analogia**: To jak "sejf" - przechowujesz tam klucze do OpenAI, a nie w kodzie.

**Przykład bez .env** (❌ ZŁE):

```typescript
const apiKey = "sk-1234abcd..."; // 😱 Każdy widzi w kodzie!
```

**Przykład z .env** (✅ DOBRE):

```typescript
const apiKey = process.env.OPENAI_API_KEY; // ✅ Odczyt z sejfu
```

---

### Kroki

**Upewnij się, że jesteś w folderze `backend/`**:

#### 1. Utwórz plik `.env`

```bash
# W folderze backend/
touch .env
```

#### 2. Zapisz w `.env` (backend/.env):

```env
# OpenAI Configuration
OPENAI_API_KEY=twoj_klucz_api_tutaj
OPENAI_MODEL=gpt-4o-mini

# Server Configuration
PORT=3001
NODE_ENV=development

# System Prompt - Photography Expert
SYSTEM_PROMPT="Jesteś ekspertem w fotografii z doświadczeniem 20+ lat. Odpowiadasz na pytania dotyczące: technik fotograficznych (ekspozycja, przesłona, ISO, ogniskowa), kompozycji i estetyki, doboru sprzętu (aparaty, obiektywy, oświetlenie), obróbki zdjęć (lightroom, photoshop, rawtherapee), fotografii specjalistycznej (portret, krajobraz, makro, sportowa, eventowa), tipów dla początkujących fotografów. Odpowiadaj zwięźle (max 2-3 paragrafy), praktycznie i dostępnie. Jeśli pytanie jest poza fotografią, grzecznie przekieruj. Kończąc każdą odpowiedź, nawiąż do jej treści i zaproś odbiorcę na odpowiednie plenery lub warsztaty fotograficzne: jeśli pytanie dotyczyło krajobrazów - zaproś na plener krajobrazowy, jeśli portretu - na warsztat portretowy, itd. Zaproszenie powinno brzmieć naturalnie i być powiązane z omawianym tematem. Na końcu dodaj link do fotowarsztaty.com (https://fotowarsztaty.com)."
```

**📝 WAŻNE**:

- Zamień `twoj_klucz_api_tutaj` na prawdziwy klucz z [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Model `gpt-4o-mini` jest tańszy, do testów. Potem zmienisz na `gpt-4o` lub `gpt-4`

#### 3. Utwórz plik `.env.example` (template dla innych)

```bash
# W folderze backend/
touch .env.example
```

Zapisz w `.env.example` (backend/.env.example):

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4o-mini

# Server Configuration
PORT=3001
NODE_ENV=development

# System Prompt - Photography Expert
SYSTEM_PROMPT="Jesteś ekspertem w fotografii z doświadczeniem 20+ lat..."
```

**Czemu .env.example?**

- `.env` - twój prawdziwy plik z kluczami (GIT IGNORE)
- `.env.example` - template dla teamów (TRAFIA DO GIT, bez prawdziwych kluczy)

#### 4. Dodaj `.env` do `.gitignore`

Edytuj główny plik `.gitignore` (w `promptly-photo-ai/.gitignore`):

```gitignore
# Environment variables
.env
.env.local
.env.*.local

# Dependencies
node_modules/

# Build outputs
dist/
build/

# IDE
.vscode/
.idea/
```

---

### Sprawdzenie

- [x] Plik `backend/.env` istnieje z prawdziwym kluczem OpenAI
- [x] Plik `backend/.env.example` istnieje (bez prawdziwego klucza)
- [x] Plik `.gitignore` zawiera `.env`
- [x] Sprawdź: `git status` - plik `.env` **nie** pojawia się na liście (✅ ignorowany)

---

## 🎯 Task 2.4: Główny Plik Serwera (index.ts) (0.5h)

### Cel

Stworzenie punktu wejścia backend - plik, który uruchamia serwer Express.

### **Co to jest index.ts?**

To "main.tsx" backendu - plik, który:

1. Importuje Express
2. Konfiguruje middleware (CORS, JSON parser)
3. Rejestruje routes (endpointy API)
4. Uruchamia serwer na porcie 3001

**Analogia**: To jak "główny wyłącznik" - gdy uruchamiasz `npm run dev`, ten plik odpala cały serwer.

---

### Plik: `backend/src/index.ts`

```typescript
import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./routes/chat";

// Załaduj zmienne środowiskowe z .env
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// ═══════════════════════════════════════════════════════════
// Middleware - funkcje przetwarzające każdy request
// ═══════════════════════════════════════════════════════════

// 1. CORS - pozwala frontendowi (localhost:5173) łączyć się z backendem
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// 2. JSON Parser - automatycznie parsuje body requestów do JSON
app.use(express.json());

// ═══════════════════════════════════════════════════════════
// Routes - definicje endpointów API
// ═══════════════════════════════════════════════════════════

// Wszystkie requesty do /api/chat obsługuje chatRouter
app.use("/api/chat", chatRouter);

// Health check endpoint (sprawdzenie czy serwer działa)
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ═══════════════════════════════════════════════════════════
// Start serwera
// ═══════════════════════════════════════════════════════════

app.listen(PORT, () => {
  console.log(`🚀 Backend proxy nasłuchuje na http://localhost:${PORT}`);
  console.log(`📸 Photography AI Assistant - Backend Ready`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
```

### **Wyjaśnienie kodu linijka po linijce**

```typescript
import express, { Application } from "express";
```

**Co to robi?** Importuje Express (framework) i typ `Application` (TypeScript wie, co to za obiekt).

---

```typescript
dotenv.config();
```

**Co to robi?** Ładuje zmienne z pliku `.env` do `process.env` (teraz możesz użyć `process.env.OPENAI_API_KEY`).

---

```typescript
const app: Application = express();
```

**Co to robi?** Tworzy aplikację Express - to główny obiekt serwera. Dalej dodajesz do niego middleware i routes.

---

```typescript
app.use(cors({ origin: "http://localhost:5173" }));
```

**Co to robi?** Middleware CORS - pozwala frontendowi (5173) wysyłać requesty do backendu (3001). Bez tego przeglądarka blokowałaby połączenie (polityka bezpieczeństwa).

**Analogia**: To jak "lista gości na imprezie" - tylko localhost:5173 może wejść.

---

```typescript
app.use(express.json());
```

**Co to robi?** Automatycznie parsuje body requestów z JSON do JavaScript obiektów. Bez tego `req.body` byłoby `undefined`.

**Przykład**:

```
Request: POST /api/chat
Body (raw): {"message": "Jak robić zdjęcia?"}

↓ express.json() ↓

req.body = { message: "Jak robić zdjęcia?" }  // ✅ Gotowe do użycia
```

---

```typescript
app.use("/api/chat", chatRouter);
```

**Co to robi?** Rejestruje router - wszystkie requesty do `/api/chat` przekierowuje do `chatRouter` (plik `routes/chat.ts` - utworzysz za chwilę).

**Analogia**: To jak "recepcja w hotelu" - kieruje cię do odpowiedniego pokoju.

---

```typescript
app.listen(PORT, () => { console.log(...) });
```

**Co to robi?** Uruchamia serwer na porcie 3001. Funkcja callback wywołuje się, gdy serwer jest gotowy.

---

### Sprawdzenie

- [x] Plik `backend/src/index.ts` utworzony
- [x] Brak błędów TypeScript (na razie `chatRouter` nie istnieje - to normalne, utworzysz go w kolejnym tasku)

---

## 🎯 Task 2.5: Typy TypeScript (0.25h)

### Cel

Definicja typów dla requestów i responsów API.

### **Dlaczego typy?**

Bez typów:

```typescript
function sendMessage(data) {
  // 😱 Co jest w data?
  console.log(data.message); // Może data.msg? data.text?
}
```

Z typami:

```typescript
interface ChatRequest {
  message: string;
  previousResponseId?: string;
}

function sendMessage(data: ChatRequest) {
  // ✅ Pewność
  console.log(data.message); // IDE podpowiada!
}
```

---

### Plik: `backend/src/types/chat.ts`

```typescript
// ═══════════════════════════════════════════════════════════
// Request - co frontend wysyła do backendu
// ═══════════════════════════════════════════════════════════

export interface ChatRequest {
  message: string; // Wiadomość użytkownika
  previousResponseId?: string; // ID poprzedniej odpowiedzi (dla historii)
}

// ═══════════════════════════════════════════════════════════
// Response - co backend zwraca do frontendu
// ═══════════════════════════════════════════════════════════

export interface ChatResponse {
  id: string; // ID odpowiedzi z OpenAI (do użycia jako previousResponseId)
  message: string; // Odpowiedź AI
  timestamp: string; // ISO timestamp
}

// ═══════════════════════════════════════════════════════════
// Error Response - odpowiedź w przypadku błędu
// ═══════════════════════════════════════════════════════════

export interface ErrorResponse {
  error: string; // Komunikat błędu
  details?: string; // Dodatkowe informacje (opcjonalne)
}
```

### **Wyjaśnienie typów**

#### `ChatRequest` - co wysyła frontend?

```typescript
{
  "message": "Jak robić zdjęcia nocne?",
  "previousResponseId": "chatcmpl-abc123..." // opcjonalne
}
```

- `message` - pytanie użytkownika (string, wymagane)
- `previousResponseId?` - znak zapytania `?` = opcjonalne (pierwsza wiadomość w rozmowie nie ma tego pola)

#### `ChatResponse` - co zwraca backend?

```typescript
{
  "id": "chatcmpl-xyz789...",
  "message": "Do fotografii nocnej...",
  "timestamp": "2026-02-06T10:30:00Z"
}
```

#### `ErrorResponse` - gdy coś pójdzie nie tak

```typescript
{
  "error": "Failed to connect to OpenAI API",
  "details": "Network timeout after 30s"
}
```

---

### Sprawdzenie

- [x] Plik `backend/src/types/chat.ts` utworzony
- [x] 3 interfejsy wyeksportowane: `ChatRequest`, `ChatResponse`, `ErrorResponse`
- [x] Brak błędów TypeScript

---

## 🎯 Task 2.6: Endpoint `/api/chat` - Integracja OpenAI (1.5h)

### Cel

Stworzenie głównego endpointu API, który:

1. Przyjmuje wiadomość od użytkownika
2. Wysyła ją do OpenAI z system promptem
3. Zarządza historią (`previous_response_id`)
4. Zwraca odpowiedź

**To serce backendu** - najważniejsza część Sprint 2.

---

### **Czym jest Router w Express?**

Router to "moduł endpointów". Zamiast definiować wszystkie endpointy w `index.ts`, grupujesz je w osobne pliki:

- `routes/chat.ts` - endpointy czatu (`POST /api/chat`)
- `routes/user.ts` - endpointy użytkownika (`GET /api/user`, `POST /api/login`) - Phase 2
- `routes/images.ts` - upload zdjęć - Phase 3

**Analogia**: To jak "działy w firmie" - chat ma swój dział, users ma swój.

---

### **Jak działa OpenAI Responses API?**

OpenAI ma 2 API:

1. **Chat Completions** (stary sposób) - wysyłasz tablicę wiadomości
2. **Responses API** (nowy sposób) - używasz `previous_response_id` (jak w `example.ts`)

**Responses API jest prostsze**:

```typescript
// Pierwsza wiadomość
const response1 = await client.responses.create({
  model: "gpt-4",
  input: "Jak robić zdjęcia nocne?",
  // Brak previous_response_id
});

// Druga wiadomość (kontynuacja)
const response2 = await client.responses.create({
  model: "gpt-4",
  input: "A bez tripodu?",
  previous_response_id: response1.id, // 👈 Magiczne połączenie!
});
```

OpenAI **automatycznie pamięta** historię, gdy podasz `previous_response_id`.

---

### Plik: `backend/src/routes/chat.ts`

```typescript
import { Router, Request, Response } from "express";
import OpenAI from "openai";
import { ChatRequest, ChatResponse, ErrorResponse } from "../types/chat";

const router = Router();

// ═══════════════════════════════════════════════════════════
// Konfiguracja OpenAI Client
// ═══════════════════════════════════════════════════════════

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const SYSTEM_PROMPT =
  process.env.SYSTEM_PROMPT || "Jesteś pomocnym asystentem.";

// ═══════════════════════════════════════════════════════════
// POST /api/chat - główny endpoint czatu
// ═══════════════════════════════════════════════════════════

router.post("/", async (req: Request, res: Response) => {
  try {
    // 1. Odczytaj dane z request body
    const { message, previousResponseId }: ChatRequest = req.body;

    // 2. Walidacja - sprawdź czy wiadomość istnieje
    if (!message || message.trim() === "") {
      return res.status(400).json({
        error: "Message is required",
      } as ErrorResponse);
    }

    console.log(`📩 Otrzymano wiadomość: "${message}"`);
    if (previousResponseId) {
      console.log(`🔗 Historia: previous_response_id = ${previousResponseId}`);
    }

    // 3. Wywołanie OpenAI Responses API
    const response = await openai.responses.create({
      model: MODEL,
      // Używamy modifiedInput zamiast input, aby dodać system prompt
      modifiedInput: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: message,
        },
      ],
      // Historia rozmowy - klucz do kontekstu (jak w example.ts)
      previous_response_id: previousResponseId || undefined,
    });

    // 4. Wyciągnij odpowiedź z OpenAI
    const aiMessage =
      response.output_text ||
      response.output?.[0]?.content ||
      "Brak odpowiedzi";

    console.log(`✅ Odpowiedź AI: "${aiMessage.substring(0, 50)}..."`);

    // 5. Zwróć odpowiedź do frontendu
    const chatResponse: ChatResponse = {
      id: response.id,
      message: aiMessage,
      timestamp: new Date().toISOString(),
    };

    return res.status(200).json(chatResponse);
  } catch (error: any) {
    // ═══════════════════════════════════════════════════════════
    // Error Handling - obsługa błędów
    // ═══════════════════════════════════════════════════════════

    console.error("❌ Błąd OpenAI API:", error);

    // Różne typy błędów OpenAI
    if (error.status === 401) {
      return res.status(401).json({
        error: "Invalid OpenAI API key",
        details: "Check OPENAI_API_KEY in .env",
      } as ErrorResponse);
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: "Rate limit exceeded",
        details: "Too many requests. Try again later.",
      } as ErrorResponse);
    }

    if (error.status === 500) {
      return res.status(500).json({
        error: "OpenAI server error",
        details: "OpenAI API is temporarily unavailable",
      } as ErrorResponse);
    }

    // Ogólny błąd
    return res.status(500).json({
      error: "Failed to process chat request",
      details: error.message,
    } as ErrorResponse);
  }
});

// ═══════════════════════════════════════════════════════════
// Eksport routera
// ═══════════════════════════════════════════════════════════

export default router;
```

---

### **Wyjaśnienie kodu - krok po kroku**

#### 1. Import i konfiguracja

```typescript
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

**Co to robi?** Tworzy klienta OpenAI z kluczem API z `.env`.

---

#### 2. Endpoint definition

```typescript
router.post("/", async (req: Request, res: Response) => {
```

**Co to robi?** Definiuje endpoint `POST /api/chat` (ścieżka `/` bo router jest już podpięty pod `/api/chat` w `index.ts`).

**`async`** - funkcja asynchroniczna (czeka na odpowiedź OpenAI).

---

#### 3. Odczyt danych z requestu

```typescript
const { message, previousResponseId }: ChatRequest = req.body;
```

**Co to robi?** Destrukturyzuje `req.body` - bierze pole `message` i `previousResponseId`.

**Przykład**:

```
Request body: { "message": "Jak robić zdjęcia?", "previousResponseId": "abc123" }
                ↓
message = "Jak robić zdjęcia?"
previousResponseId = "abc123"
```

---

#### 4. Walidacja

```typescript
if (!message || message.trim() === "") {
  return res.status(400).json({ error: "Message is required" });
}
```

**Co to robi?** Sprawdza, czy wiadomość nie jest pusta. Jeśli jest, zwraca błąd 400 (Bad Request).

**Status codes**:

- `200` - OK (sukces)
- `400` - Bad Request (błąd użytkownika)
- `401` - Unauthorized (brak/zły API key)
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error (błąd serwera)

---

#### 5. Wywołanie OpenAI

```typescript
const response = await openai.responses.create({
  model: MODEL,
  modifiedInput: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: message },
  ],
  previous_response_id: previousResponseId || undefined,
});
```

**Co to robi?**

1. **`model`** - używa modelu z `.env` (np. `gpt-4o-mini`)
2. **`modifiedInput`** - tablica wiadomości:
   - `system` - instrukcja dla AI (Photography Expert)
   - `user` - pytanie użytkownika
3. **`previous_response_id`** - ID poprzedniej odpowiedzi (historia)

**Analogia**: To jak rozmowa z ekspertem, gdzie na początku mówisz mu "Jesteś fotografem", a potem pytasz "Jak robić zdjęcia nocne?".

---

#### 6. Wyciągnięcie odpowiedzi

```typescript
const aiMessage =
  response.output_text || response.output?.[0]?.content || "Brak odpowiedzi";
```

**Co to robi?** OpenAI może zwrócić odpowiedź w różnych formatach - sprawdzamy kolejno:

1. `output_text` - najprostszy format
2. `output[0].content` - format tablicowy
3. Fallback: "Brak odpowiedzi"

---

#### 7. Zwrot odpowiedzi do frontendu

```typescript
return res.status(200).json({
  id: response.id,
  message: aiMessage,
  timestamp: new Date().toISOString(),
});
```

**Co to robi?** Zwraca JSON z:

- `id` - ID odpowiedzi OpenAI (frontend użyje tego jako `previousResponseId` w następnym requeście)
- `message` - odpowiedź AI
- `timestamp` - czas odpowiedzi (ISO format: `2026-02-06T10:30:00Z`)

---

#### 8. Error handling

```typescript
catch (error: any) {
  if (error.status === 401) { ... }
  if (error.status === 429) { ... }
  ...
}
```

**Co to robi?** Łapie błędy OpenAI i zwraca user-friendly komunikaty.

**Typy błędów**:

- **401** - Zły API key (sprawdź `.env`)
- **429** - Za dużo requestów (rate limit)
- **500** - Problem po stronie OpenAI

---

### Sprawdzenie

- [x] Plik `backend/src/routes/chat.ts` utworzony
- [x] Router eksportuje się poprawnie (`export default router`)
- [x] Używa typów `ChatRequest`, `ChatResponse`, `ErrorResponse`
- [x] Integracja z OpenAI SDK (`openai.responses.create`)
- [x] Obsługa `previous_response_id` (jak w `example.ts`)

---

## 🎯 Task 2.7: Testowanie Lokalnie - Uruchomienie Serwera (0.5h)

### Cel

Uruchomienie backendu i sprawdzenie czy działa.

### **Czym jest Postman?**

Postman to "narzędzie do testowania API" - wysyła requesty HTTP bez frontendu. Alternatywnie możesz użyć `curl` (terminal) lub REST Client (VS Code extension).

**Analogia**: Frontend to "kelner", Postman to "tester potrawy przed otwarciem restauracji".

---

### Kroki

#### 1. Uruchom serwer

**Upewnij się, że jesteś w folderze `backend/`**:

```bash
npm run dev
```

**Oczekiwany output**:

```plaintext
🚀 Backend proxy nasłuchuje na http://localhost:3001
📸 Photography AI Assistant - Backend Ready
🔗 Health check: http://localhost:3001/health
```

Jeśli widzisz błędy:

- **`Cannot find module 'dotenv'`** → Uruchom `npm install` (zależności nie zainstalowane)
- **`OPENAI_API_KEY is not defined`** → Sprawdź plik `.env` (brak klucza)
- **`Port 3001 already in use`** → Zmień port w `.env` na np. `3002`

---

#### 2. Testuj endpoint Health Check

Otwórz przeglądarkę lub użyj `curl`:

**Przeglądarka**: http://localhost:3001/health

**curl** (terminal):

```bash
curl http://localhost:3001/health
```

**Oczekiwana odpowiedź**:

```json
{
  "status": "ok",
  "timestamp": "2026-02-06T10:30:00.000Z"
}
```

✅ Jeśli widzisz to, serwer działa!

---

#### 3. Testuj endpoint `/api/chat` - Pierwsza wiadomość

**Postman**:

1. Utwórz nowy request: `POST http://localhost:3001/api/chat`
2. Headers: `Content-Type: application/json`
3. Body (raw JSON):
   ```json
   {
     "message": "Jak robić zdjęcia nocne?"
   }
   ```
4. Kliknij `Send`

**curl** (terminal):

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Jak robić zdjęcia nocne?"}'
```

**Oczekiwana odpowiedź**:

```json
{
  "id": "chatcmpl-abc123...",
  "message": "Do fotografii nocnej polecam...",
  "timestamp": "2026-02-06T10:30:00.000Z"
}
```

✅ Jeśli widzisz odpowiedź AI, endpoint działa!

---

#### 4. Testuj historię rozmowy - Druga wiadomość

Skopiuj `id` z poprzedniej odpowiedzi, np. `"chatcmpl-abc123..."`.

**Postman**:
Body (raw JSON):

```json
{
  "message": "A bez tripodu?",
  "previousResponseId": "chatcmpl-abc123..."
}
```

**curl**:

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"A bez tripodu?","previousResponseId":"chatcmpl-abc123..."}'
```

**Oczekiwana odpowiedź**:

```json
{
  "id": "chatcmpl-xyz789...",
  "message": "Bez tripodu możesz...",
  "timestamp": "2026-02-06T10:31:00.000Z"
}
```

✅ Jeśli odpowiedź nawiązuje do poprzedniej (np. wspomina o fotografi nocnej), historia działa!

---

#### 5. Testuj błędy - Pusta wiadomość

**Postman**:
Body:

```json
{
  "message": ""
}
```

**curl**:

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":""}'
```

**Oczekiwana odpowiedź**:

```json
{
  "error": "Message is required"
}
```

Status code: `400 Bad Request`

✅ Jeśli widzisz błąd, walidacja działa!

---

### Sprawdzenie

- [x] Serwer uruchamia się bez błędów (`npm run dev`)
- [x] Endpoint `/health` zwraca `{"status": "ok"}`
- [x] Endpoint `/api/chat` zwraca odpowiedź AI
- [x] Historia rozmowy działa (`previousResponseId`)
- [x] Walidacja działa (pusta wiadomość → błąd 400)
- [x] Logi w terminalu pokazują requesty i odpowiedzi

**Przykładowe logi**:

```
📩 Otrzymano wiadomość: "Jak robić zdjęcia nocne?"
✅ Odpowiedź AI: "Do fotografii nocnej polecam..."
```

---

## 🎯 Task 2.8: CORS Configuration - Doprecyzowanie (0.25h)

### Cel

Upewnienie się, że frontend może łączyć się z backendem.

### **Czym jest CORS?**

CORS = Cross-Origin Resource Sharing = polityka bezpieczeństwa przeglądarki.

**Problem bez CORS**:

```
Frontend (localhost:5173) → Backend (localhost:3001)
                          ↓
       🚫 BLOCKED by browser (różne originy)
```

**Rozwiązanie z CORS**:

```
Backend mówi: "Zezwalam na requesty z localhost:5173"
                          ↓
       ✅ ALLOWED
```

---

### Aktualizacja `index.ts` - Dodaj FRONTEND_URL do `.env`

#### 1. Edytuj `backend/.env`

Dodaj na końcu:

```env
# Frontend Configuration
FRONTEND_URL=http://localhost:5173
```

#### 2. Sprawdź `backend/src/index.ts`

Powinno być (już jest z Task 2.4):

```typescript
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
```

**Co to robi?**

- `origin` - lista dozwolonych domen (tylko one mogą wysyłać requesty)
- `credentials: true` - pozwala na cookies/authorization headers

---

#### 3. Test CORS z przeglądarki

Otwórz konsolę JavaScript w przeglądarce (F12) i wpisz:

```javascript
fetch("http://localhost:3001/health")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

**Oczekiwany output**:

```javascript
{ status: "ok", timestamp: "..." }
```

✅ Jeśli widzisz JSON, CORS działa!

❌ Jeśli widzisz błąd `CORS policy`, sprawdź:

- Czy serwer nasłuchuje (`npm run dev` w terminalu)
- Czy `FRONTEND_URL` w `.env` jest poprawny

---

### Sprawdzenie

- [x] CORS skonfigurowany w `index.ts`
- [x] `FRONTEND_URL` w `.env`
- [x] Test z przeglądarki działa (fetch do `/health`)

---

## 🎯 Task 2.9: Environment Variables - Produkcja (0.25h)

### Cel

Przygotowanie konfiguracji dla deployment (Render, Railway, itp.).

### **Development vs Production**

**Development** (localhost):

- `FRONTEND_URL=http://localhost:5173`
- `NODE_ENV=development`
- Szczegółowe logi w terminalu

**Production** (Render):

- `FRONTEND_URL=https://twoja-aplikacja.vercel.app`
- `NODE_ENV=production`
- Minimalny logging (tylko błędy)

---

### Aktualizacja `.env` - Komentarze dla produkcji

Edytuj `backend/.env`:

```env
# ═══════════════════════════════════════════════════════════
# Development Configuration (localhost)
# ═══════════════════════════════════════════════════════════

# OpenAI Configuration
OPENAI_API_KEY=twoj_klucz_api_tutaj
OPENAI_MODEL=gpt-4o-mini

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend Configuration (lokalna)
FRONTEND_URL=http://localhost:5173

# ═══════════════════════════════════════════════════════════
# Production Configuration (uncomment when deploying)
# ═══════════════════════════════════════════════════════════

# PORT=10000  # Render używa zmiennej PORT automatycznie
# NODE_ENV=production
# FRONTEND_URL=https://twoja-aplikacja.vercel.app

# System Prompt - Photography Expert (to samo dla dev i prod)
SYSTEM_PROMPT="Jesteś ekspertem w fotografii z doświadczeniem 20+ lat..."
```

---

### Aktualizacja `index.ts` - Conditional Logging

Dodaj conditional logging (tylko szczegółowe logi w development):

```typescript
// W pliku backend/src/index.ts, przed app.listen:

// Conditional logging - szczegółowe logi tylko w development
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}
```

**Co to robi?** Loguje każdy request tylko w trybie development (produkcja ma mniej logów = szybsza).

---

### Sprawdzenie

- [x] `.env` ma sekcję produkcyjną (zakomentowaną)
- [x] Conditional logging dodany do `index.ts`

---

## 🎯 Task 2.10: Build & Compilation Test (0.25h)

### Cel

Sprawdzenie, czy backend kompiluje się do JavaScript (gotowy na deploy).

### **Czym jest kompilacja?**

TypeScript to "język pisania kodu", ale Node.js rozumie tylko JavaScript.

**Kompilacja** = TypeScript → JavaScript

```
src/index.ts (TypeScript - piszesz)
      ↓ npm run build
dist/index.js (JavaScript - uruchamia się)
```

---

### Kroki

**Upewnij się, że jesteś w folderze `backend/`**:

```bash
# 1. Zatrzymaj serwer dev (Ctrl+C w terminalu)

# 2. Skompiluj TypeScript → JavaScript
npm run build
```

**Oczekiwany output**:

```
Compilation complete. Watching for file changes.
```

**Oczekiwana struktura po build**:

```
backend/
├── src/             (TypeScript - źródło)
├── dist/            👈 Nowy folder (JavaScript - skompilowany)
│   ├── index.js
│   ├── routes/
│   │   └── chat.js
│   └── types/
│       └── chat.js
├── package.json
└── tsconfig.json
```

---

### Test skompilowanej aplikacji

```bash
# Uruchom skompilowaną wersję (JavaScript)
npm start
```

**Oczekiwany output**:

```
🚀 Backend proxy nasłuchuje na http://localhost:3001
📸 Photography AI Assistant - Backend Ready
```

✅ Jeśli serwer uruchamia się, kompilacja działa!

**Testuj endpoint**:

```bash
curl http://localhost:3001/health
```

Powinno zwrócić: `{"status":"ok",...}`

---

### Cleanup - Usuń dist/

Po testach możesz usunąć folder `dist/` (będzie tworzony automatycznie przy deploy):

```bash
# W folderze backend/
rm -rf dist/
```

---

### Sprawdzenie

- [x] `npm run build` kompiluje bez błędów
- [x] Folder `dist/` tworzony z plikami `.js`
- [x] `npm start` uruchamia skompilowaną aplikację
- [x] Endpoint `/health` działa w trybie production

---

## ✅ Checklist Sprint 2 - Finał

### Weryfikacja struktury projektu

- [x] Folder `backend/` w głównym projekcie `promptly-photo-ai/backend/` ✅
- [x] Struktura: `src/index.ts`, `src/routes/chat.ts`, `src/types/chat.ts` ✅
- [x] Pliki konfiguracyjne: `package.json`, `tsconfig.json`, `.env`, `.env.example` ✅

### Weryfikacja techniczna

- [x] Backend uruchamia się bez błędów (`npm run dev`)
- [x] Endpoint `/health` zwraca `{"status":"ok"}`
- [x] Endpoint `/api/chat` przyjmuje wiadomości i zwraca odpowiedzi AI
- [x] Historia rozmowy działa (`previousResponseId` jak w `example.ts`)
- [x] CORS skonfigurowany (frontend może łączyć się z backendem)
- [x] Error handling działa (pusta wiadomość → 400, zły API key → 401)
- [x] Environment variables skonfigurowane (`.env` z `OPENAI_API_KEY`)
- [x] TypeScript kompiluje się bez błędów (`npm run build`)
- [x] System prompt fotograficzny wbudowany

### Testowanie

- [x] Test Postman/curl: Pierwsza wiadomość → odpowiedź AI ✅
- [x] Test Postman/curl: Druga wiadomość z `previousResponseId` → kontekst zachowany ✅
- [x] Test Postman/curl: Pusta wiadomość → błąd 400 ✅
- [x] Test przeglądarki: `/health` endpoint działa ✅
- [x] Test CORS: `fetch` z przeglądarki działa ✅

### Git & Dokumentacja

- [x] Kod scommitowany do Git: `git commit -m "feat: sprint-2-backend-proxy"`
- [x] Plik `.env` w `.gitignore` (nie trafia do Git)
- [x] Plik `.env.example` scommitowany (template dla innych)

### Gotowość do Sprint 3

- [x] Backend działa lokalnie (`http://localhost:3001`) ✅
- [x] Frontend może testować integrację (chatService.ts) ✅
- [x] Gotowy do deployu na Render (Task 3.5) ✅

---

## 🚀 Następny Krok: Sprint 3 - Integracja & Deploy

**Co dalej?**: Po ukończeniu Sprint 2 przejdź do **Sprint 3: Integracja Frontend + Backend i Deploy**

**Sprint 3 będzie obejmował**:

- Podłączenie frontendu do backendu (`chatService.ts`)
- Testowanie flow'u lokalnie (komunikacja Frontend ↔ Backend)
- UX improvements (loading states, error messages)
- Deploy backendu na Render
- Deploy frontendu na Vercel
- Konfiguracja environment variables produkcji
- End-to-end testing aplikacji online
- Final polish (favicon, meta tags, README)

**Timeframe Sprint 3**: 1 dzień (4-5h pracy efektywnej)

**Przejdź do**: [SPRINT-3.md](./SPRINT-3.md) (utworzysz w przyszłości)

---

## 💡 Notatki dla Początkujących

### Co osiągnąłeś w Sprint 2?

✅ **Backend Stack**: Express.js + TypeScript + OpenAI SDK  
✅ **API Endpoint**: `/api/chat` proxy do OpenAI  
✅ **Historia rozmowy**: `previous_response_id` (jak w terminal chatbotie)  
✅ **System Prompt**: Photography Expert wbudowany  
✅ **Security**: API key bezpiecznie w `.env`  
✅ **CORS**: Frontend może łączyć się z backendem  
✅ **Error Handling**: Obsługa błędów OpenAI  
✅ **TypeScript**: Typy dla requestów i responsów  
✅ **Testing**: Postman/curl testowanie endpointów  
✅ **Compilation**: Gotowy do build i deploy

### Nowe umiejętności backend

- ✅ Express.js: routing, middleware, error handling
- ✅ TypeScript dla backend: typy, interfaces, kompilacja
- ✅ OpenAI SDK: Responses API, system prompt, historia
- ✅ Environment variables: `.env`, `dotenv`, security
- ✅ CORS: polityka bezpieczeństwa, konfiguracja
- ✅ API testing: Postman, curl, HTTP methods
- ✅ Status codes: 200, 400, 401, 429, 500
- ✅ Async/await: obsługa API calls

### Umiejętności CV

Po Sprint 2 możesz dodać do CV:

- ✅ **Express.js** - REST API development
- ✅ **TypeScript** - typu bezpieczeństwa backend
- ✅ **OpenAI API** - integracja AI w aplikacjach
- ✅ **CORS & Security** - best practices
- ✅ **Error Handling** - graceful errors, user-friendly komunikaty
- ✅ **Environment Variables** - konfiguracja dev/production

### Problemy podczas Sprint 2?

- **OpenAI zwraca 401**: Sprawdź `OPENAI_API_KEY` w `.env` (czy klucz jest prawidłowy)
- **CORS błędy**: Sprawdź `FRONTEND_URL` w `.env` (czy zgadza się z frontendem)
- **Port zajęty**: Zmień `PORT` w `.env` na inny (np. `3002`)
- **TypeScript errors**: Sprawdź czy wszystkie typy są zaimportowane
- **express.json() not working**: Sprawdź czy middleware jest **przed** routes
- **previousResponseId nie działa**: Sprawdź logi OpenAI - czy ID jest przekazywany

### Debugging tips

1. **Logi w terminalu** - czytaj uważnie (pokazują requesty, błędy)
2. **Postman** - testuj endpointy przed integracją z frontendem
3. **Console.log** - dodawaj logi w kodzie (np. `console.log("Otrzymano:", message)`)
4. **Status codes** - sprawdzaj co zwraca endpoint (200 = OK, 400 = błąd użytkownika, 500 = błąd serwera)
5. **OpenAI Dashboard** - sprawdzaj zużycie API na [platform.openai.com/usage](https://platform.openai.com/usage)

---

## 📚 Przydatne Zasoby

### Express.js

- [Express.js Official Guide](https://expressjs.com/en/guide/routing.html) - routing, middleware
- [Express Error Handling](https://expressjs.com/en/guide/error-handling.html)

### OpenAI API

- [OpenAI Responses API](https://platform.openai.com/docs/api-reference/responses) - `previous_response_id`
- [OpenAI Models](https://platform.openai.com/docs/models) - `gpt-4o`, `gpt-4o-mini`
- [OpenAI Rate Limits](https://platform.openai.com/docs/guides/rate-limits)

### TypeScript Backend

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript with Express](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)

### Testing

- [Postman Docs](https://learning.postman.com/docs/getting-started/introduction/)
- [curl Cheat Sheet](https://devhints.io/curl)

### CORS

- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Express CORS Middleware](https://expressjs.com/en/resources/middleware/cors.html)

---

**Sprint Leader**: [Twoje imię]  
**Data rozpoczęcia**: \***\*\_\_\_\*\***  
**Data zakończenia**: \***\*\_\_\_\*\***  
**Status**: 🟡 W trakcie / ✅ Ukończony

**Commit message po zakończeniu**:

```bash
cd backend
git add .
git commit -m "feat: sprint-2-backend-proxy - Express + OpenAI integration"
git push origin main
```

---

**Gratulacje! 🎉 Backend działa!**  
**Następny krok**: [Sprint 3 - Integracja Frontend + Backend + Deploy](./SPRINT-3.md)
