# Sprint 1: Setup Frontend - Promptly Photo AI

> 🎯 **Część Phase 1 MVP**: Transformacja terminal chatbota ([example.ts](./example.ts)) w pełnoprawną aplikację webową

**Timeframe**: 1-2 dni (6-8h pracy efektywnej)  
**Cel końcowy**: Działająca aplikacja React z mockowanym czatem (bez integracji z backendem)

---

## 📋 Przegląd Sprintu

Tworzymy **Frontend** aplikacji Photography AI Assistant. Bazujemy na koncepcji z `example.ts` (terminal chatbot z OpenAI), ale w wersji webowej z React.

**Na koniec Sprint 1 powinieneś mieć**:

- ✅ Aplikacja React + Vite działająca na `localhost:5173`
- ✅ TailwindCSS + Shadcn/ui zainstalowane i gotowe
- ✅ Zustand store skonfigurowany (zarządzanie stanem czatu)
- ✅ Komponenty UI (Message, MessageList, ChatInput, ChatWindow) z mockowanymi danymi
- ✅ Setup Vercel dla przyszłego deployu (gotowy do Push)

**Dlaczego mockujemy?**: W Sprint 1 skupiamy się tylko na UI. Backend proxy do OpenAI zrobimy w Sprint 2.

**Projekt portfolio**: Ten sprint pokazuje umiejętności React, TypeScript, state management, UI design

---

## 🎯 Task 1.1: Inicjalizacja Projektu (0.5h)

### Cel

Stworzenie struktury projektu: `promptly-photo-ai/` (główny folder) z podfolderem `frontend/` (React + Vite).

### Kroki

```bash
# 1. Stwórz folder główny projektu
mkdir promptly-photo-ai
cd promptly-photo-ai

# 2. Zainicjuj Git (opcjonalnie, ale zalecane)
git init
echo "node_modules/" > .gitignore

# 3. Stwórz podfolder frontend z React + Vite + TypeScript
npm create vite@latest frontend -- --template react-ts

# 4. Wejdź do folderu frontend
cd frontend

# 5. Zainstaluj zależności
npm install

# 6. Uruchom dev server
npm run dev
```

### Oczekiwana struktura po Task 1.1

```
promptly-photo-ai/              ← Główny folder projektu
├── .git/                       ← Git repository (opcjonalnie)
├── .gitignore
├── frontend/                   ← Aplikacja React (Vite)
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── ...
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── (backend/ dodamy w Sprint 2)
```

### Oczekiwane rezultaty

- [x] Dev server nasłuchuje na `http://localhost:5173`
- [x] Aplikacja wyświetla się w przeglądarce (domyślna strona Vite)
- [x] Terminal pokazuje `✓ Local: http://localhost:5173/`
- [x] Brak błędów TypeScript/ESLint
- [x] Struktura: `promptly-photo-ai/frontend/` ✅
- [x] Gotowa na dodanie `promptly-photo-ai/backend/` w Sprint 2 ✅

---

## 🎯 Task 1.2: Instalacja Zależności - TailwindCSS (0.5h)

### Cel

Skonfigurowanie TailwindCSS dla stylowania (instalacja w `frontend/`).

### Kroki

**Upewnij się, że jesteś w folderze `frontend/`**:

```bash
# Jeśli jesteś w głównym folderze promptly-photo-ai:
cd frontend

# Zainstaluj TailwindCSS i narzędzia
npm install -D tailwindcss postcss autoprefixer

# Zainicjuj pliki konfiguracyjne
npx tailwindcss init -p
```

### Konfiguracja plików

1. **Edytuj `tailwind.config.js`** (w folderze `frontend/`):

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

2. **Edytuj `src/index.css`** (dodaj na początku):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. **Upewnij się, że `src/main.tsx` importuje `index.css`**:

```tsx
import "./index.css";
```

### Sprawdzenie

- [x] Pliki `tailwind.config.js` i `postcss.config.js` zostały utworzone
- [x] Plik `src/index.css` ma dyrektywy Tailwind:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- [x] `src/main.tsx` importuje `index.css`

### Ćwiczenie testowe

Zmień App.tsx na:

```tsx
export default function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <h1 className="text-white text-3xl">TailwindCSS Działa! 🎨</h1>
    </div>
  );
}
```

- [x] Po refresh strony tło jest niebieskie, tekst biały i wyśrodkowany

---

## 🎯 Task 1.3: Instalacja Shadcn/ui (0.5h)

### Cel

Zainstalowanie biblioteki komponentów UI Shadcn (w `frontend/`).

### Kroki

**Upewnij się, że jesteś w folderze `frontend/`**:

```bash
# Zainstaluj shadcn/ui CLI i zainicjuj konfigurację
npx shadcn@latest init
```

### Podczas konfiguracji

Odpowiadaj na pytania:

- `Which style would you like to use?` → `Default`
- `Which color would you like as the base color?` → `Slate`
- `Would you like to use CSS variables for theming?` → `yes`

### Instalacja podstawowych komponentów

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add scroll-area
npx shadcn@latest add spinner
```

### Sprawdzenie

- [x] Folder `src/components/ui/` istnieje z komponentami
- [x] Zainstalowane komponenty: button.tsx, input.tsx, textarea.tsx, scroll-area.tsx, spinner.tsx

---

## 🎯 Task 1.4: Struktura Folderów (0.5h)

### Cel

Organizacja projektu zgodnie z planem (w folderze `frontend/src/`).

### Kroki

**Upewnij się, że jesteś w folderze `frontend/`**:

```bash
# Utwórz strukturę folderów w src/
mkdir -p src/components/layout
mkdir -p src/components/chat
mkdir -p src/pages
mkdir -p src/store
mkdir -p src/types
mkdir -p src/services
```

### Oczekiwane drzewo (po Task 1.4)

```
promptly-photo-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/              (utworzysz w Task 1.8)
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Layout.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   ├── chat/                (utworzysz w Task 1.9-1.11)
│   │   │   │   ├── Message.tsx
│   │   │   │   ├── MessageList.tsx
│   │   │   │   ├── ChatInput.tsx
│   │   │   │   └── ChatWindow.tsx
│   │   │   └── ui/                 (shadcn/ui komponenty)
│   │   │       ├── button.tsx
│   │   │       ├── input.tsx
│   │   │       ├── textarea.tsx
│   │   │       ├── scroll-area.tsx
│   │   │       └── spinner.tsx
│   │   ├── pages/               (utworzysz w Task 1.12)
│   │   │   ├── HomePage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── HowItWorksPage.tsx
│   │   │   └── ContactPage.tsx
│   │   ├── store/
│   │   │   └── chatStore.ts        (utworzysz w Task 1.7)
│   │   ├── types/
│   │   │   └── chat.ts             (utworzysz w Task 1.6)
│   │   ├── services/
│   │   │   └── chatService.ts      (utworzysz w Task 1.14)
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── ...
└── backend/                        (Sprint 2)
```

- [x] Wszystkie foldery utworzone (components/layout, components/chat, pages)
- [x] Pliki `ui/` znajdują się w `components/ui/`

---

## 🎯 Task 1.5: Instalacja React Router (0.25h)

### Cel

Dodanie routingu dla nawigacji między stronami (Home, About, How It Works, Contact).

### Kroki

**Upewnij się, że jesteś w folderze `frontend/`**:

```bash
npm install react-router-dom
```

### Sprawdzenie

- [x] `react-router-dom` zainstalowany w `package.json`
- [x] Brak błędów instalacji

---

## 🎯 Task 1.6: Typy TypeScript (0.5h)

### Cel

Definicja typów dla czatu.

### Plik: `frontend/src/types/chat.ts`

```typescript
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
```

### Strategia System Prompt (MVP vs Phase 4+)

**MVP (Sprint 1-2)**:

- System prompt z instrukcją dla AI ("Jesteś ekspertem fotografii...") jest **hardcoded w backendzie**
- Frontend **nie widzi** system messages - wysyła tylko user message, otrzymuje assistant response
- `role` w interfejsie `Message` to tylko `"user" | "assistant"` (bez `"system"`)
- Prostsze zarządzanie stanem, bezpieczniejsze (prompt nie w kodzie frontendu)

**Phase 4+ (opcjonalnie)**:

- Jeśli system prompt ma być **edytowalny przez użytkownika** lub **widoczny w UI czatu**
- Dodaj `role: "user" | "assistant" | "system"` do interfejsu `Message`
- Wyświetlaj system messages jako info box (np. żółte tło, ikona ⚙️)
- Wymaga rozszerzenia `MessageList` i `Message` komponentów

**Decyzja**: W MVP używamy `"user" | "assistant"` - system prompt pozostaje w backendzie.

### Sprawdzenie

- [x] Plik utworzony bez błędów TypeScript
- [x] Interfejsy eksportują się prawidłowo
- [x] Typy `role` zgodne ze strategią MVP (bez `"system"`)

---

## 🎯 Task 1.7: Zustand Store (0.5h)

### Cel

Skonfigurowanie state managementu do zarządzania historią czatu (w `frontend/`).  
**Phase 1 Feature**: Historia aktywnego czatu przechowywana w **localStorage** (przetrwa refresh) za pomocą Zustand persist middleware.

### Instalacja

**Upewnij się, że jesteś w folderze `frontend/`**:

```bash
npm install zustand
```

### Plik: `frontend/src/store/chatStore.ts`

**Wersja z localStorage (Phase 1)**:

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChatState, Message } from "../types/chat";

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,
      error: null,

      addMessage: (message: Message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),

      clearMessages: () =>
        set({
          messages: [],
          error: null,
        }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),
    }),
    {
      name: "chat-storage", // Klucz w localStorage
    },
  ),
);
```

**Co to daje?**

- ✅ Historia aktywnego czatu **przetrwa refresh** przeglądarki
- ✅ Dane zapisywane automatycznie w `localStorage` pod kluczem `"chat-storage"`
- ✅ Użytkownik nie traci rozmowy po przypadkowym zamknięciu karty
- ❌ **Tylko aktywny czat** (bez historii wielu czatów - to Phase 2 z bazą danych)

**Różnica Phase 1 vs Phase 2**:

- **Phase 1** (localStorage): 1 rozmowa, lokalnie w przeglądarce, bez kont użytkowników
- **Phase 2+** (DB): Wiele rozmów, synchronizacja między urządzeniami, wymagane konto

### Sprawdzenie

- [x] Plik utworzony bez błędów
- [x] Store eksportuje się prawidłowo
- [x] `persist` middleware skonfigurowany z kluczem `"chat-storage"`
- [x] Po dodaniu wiadomości i refresh strony - dane się zachowują

---

## 🎯 Task 1.8: Layout Components (Header, Layout) (0.5h)

### Cel

Stworzenie podstawowych komponentów układu strony (Header + Layout bez Sidebar). Sidebar dodamy w Phase 2 gdy będzie historia czatów.

### Plik 1: `frontend/src/components/layout/Header.tsx`

```typescript
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-blue-600">📸 Promptly Photo AI</h1>
        </Link>

        <nav className="flex gap-6">
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
            O projekcie
          </Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600 transition">
            Jak działa
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">
            Kontakt
          </Link>
        </nav>
      </div>
    </header>
  );
}
```

### Plik 2: `frontend/src/components/layout/Layout.tsx`

```typescript
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
```

### Sprawdzenie

- [x] 2 pliki utworzone bez błędów
- [x] Header wyświetla logo i menu nawigacyjne
- [x] Layout łączy Header + content area
- [x] Brak Sidebar (zostanie dodany w Phase 2)

---

## 📐 Hierarchia Komponentów Czatu

Przed przystąpieniem do implementacji komponentów czatu, zrozum ich hierarchię:

```
┌─────────────────────────────────────────┐
│  ChatWindow.tsx                         │  ← Główny kontener czatu
│  ┌───────────────────────────────────┐  │
│  │ MessageList.tsx                   │  │  ← Scroll area + wrapper
│  │ ┌─────────────────────────────┐   │  │
│  │ │ Message.tsx (user)          │   │  │  ← Pojedynczy bąbelek
│  │ └─────────────────────────────┘   │  │
│  │ ┌─────────────────────────────┐   │  │
│  │ │ Message.tsx (assistant)     │   │  │  ← Kolejny bąbelek
│  │ └─────────────────────────────┘   │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │ ChatInput.tsx                     │  │  ← Textarea + Button
│  │ [Textarea] [Send Button]          │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Flow:**

1. **ChatWindow** - kontener główny, zarządza stanem i logiką
2. **MessageList** - renderuje tablicę wiadomości, auto-scroll
3. **Message** - pojedynczy bąbelek (user = prawo/niebieski, AI = lewo/szary)
4. **ChatInput** - textarea + button, obsługa Enter/Shift+Enter

---

## 🎯 Task 1.9: Chat Components - Message & MessageList (0.75h)

### Cel

Komponenty do wyświetlania wiadomości: **Message** (pojedynczy bąbelek) i **MessageList** (scroll area z listą).

**Hierarchia**: MessageList renderuje wiele komponentów Message w pętli.

### Plik 1: `frontend/src/components/chat/Message.tsx`

```typescript
import type { Message as MessageType } from '@/types/chat';

export function Message({ role, content, timestamp }: MessageType) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
          isUser
            ? 'ml-auto bg-primary text-primary-foreground'
            : 'mr-auto bg-muted text-foreground'
        }`}
      >
        <p>{content}</p>
        <span className="text-[10px] text-muted-foreground mt-1 block">
          {timestamp.toLocaleTimeString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}
```

### Sprawdzenie

- [x] 2 komponenty utworzone bez błędów
- [x] Message wyświetla pojedyncze wiadomości
- [x] MessageList renderuje listę wiadomości z auto-scroll

---

## 🎯 Task 1.10: Chat Components - ChatInput (0.5h)

### Cel

Input użytkownika: **textarea** (wieloliniowy) + **button** wyślij.

**Funkcje**: Enter = wyślij, Shift+Enter = nowa linia, disabled podczas ładowania.

### Plik 2: `frontend/src/components/chat/MessageList.tsx`

```typescript
import { useRef, useEffect } from 'react';
import { Message as MessageType } from '../../types/chat';
import { Message } from './Message';
import { ScrollArea } from '../ui/scroll-area';

interface MessageListProps {
  messages: MessageType[];
}

export function MessageList({ messages }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll na dół gdy pojawiają się nowe wiadomości
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4 bg-gray-50">
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>Brak wiadomości. Zacznij rozmowę! 📸</p>
          </div>
        ) : (
          messages.map((msg) => <Message key={msg.id} message={msg} />)
        )}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
}
```

### Plik 3: `frontend/src/components/chat/ChatInput.tsx`

```typescript
import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t">
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Pytaj o fotografię... (Shift+Enter = nowa linia)"
          disabled={isLoading}
          className="resize-none"
          rows={3}
        />
        <Button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="self-end"
        >
          {isLoading ? '⏳ Czekam...' : '📤 Wyślij'}
        </Button>
      </div>
    </div>
  );
}
```

### Sprawdzenie

- [x] Komponent kompiluje się
- [x] Enter wysyła wiadomość, Shift+Enter dodaje nową linię
- [x] Button disabled gdy input pusty lub loading

---

## 🎯 Task 1.11: Chat Components - ChatWindow (0.5h)

### Cel

**Główny kontener czatu**: łączy MessageList (góra) + ChatInput (dół).

**Odpowiedzialność**:

- Układ komponentów (flex column)
- Przekazywanie danych i funkcji między komponentami
- Logika wysyłania wiadomości (mockowana w MVP)
- Header czatu z tytułem

### Plik: `frontend/src/components/chathatWindow (0.5h)

### Cel

Główny komponent łączący wszystko razem.

### Plik: `frontend/src/components/ChatWindow.tsx`

```typescript
import { useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import { Message as MessageType } from '../types/chat';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { Card } from './ui/card';

export function ChatWindow() {
  const { messages, isLoading, addMessage, setLoading } = useChatStore();

  const handleSendMessage = async (content: string) => {
    // Dodaj wiadomość użytkownika
    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    addMessage(userMessage);

    // Symulacja API call (mockowanie)
    setLoading(true);
    setTimeout(() => {
      const assistantMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `[MOCK] Odpowiedź na: "${content}"`,
        timestamp: new Date(),
      };
      addMessage(assistantMessage);
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full h-screen flex flex-col bg-white">
      <div className="bg-linear-to-r from-purple-600 to-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">📸 Promptly Photo - AI Photography Assistant</h1>
        <p className="text-sm opacity-90">Zapytaj o fotografię, kompozycję, sprzęt...</p>
        [...]

```

### Sprawdzenie

- [x] Komponent kompiluje się
- [x] Logika wysyłania mockowanych wiadomości działa

---

## 🎯 Task 1.12: Pages (About, How It Works, Contact) (0.75h)

### Cel

Stworzenie dodatkowych stron informacyjnych.

### Plik: `frontend/src/App.tsx`

```typescript
import { ChatWindow } from './components/ChatWindow';
import './App.css';

function App() {
  return (
    <div className="w-full h-screen bg-gray-100">
      <ChatWindow />
    </div>
  );
}

export default App;
```

### Sprawdzenie

- [x] Aplikacja uruchamia się na `localhost:5173`
- [x] Widoczne jest okno czatu z headerem
- [x] Można wpisywać i "wysyłać" (mockowe) wiadomości
- [x] Brak błędów w konsoli

---

## 🎯 Task 1.13: Routing & App.tsx - Finalna Integracja (0.5h)

### Cel

Połączenie wszystkiego w głównym komponencie z routingiem.

---

## 🎯 Task 1.14: Chat Services - Setup (0.5h)

### Cel

Przygotowanie serwisu do komunikacji z backendem (na razie pusty template).

### Plik: `frontend/src/services/chatService.ts`

```typescript
// Placeholder na integrację z backendem w Sprint 2

export interface ChatRequest {
  message: string;
  previousResponseId?: string;
}

export interface ChatResponse {
  id: string;
  message: string;
  timestamp: string;
}

export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  // TODO: Sprint 2 - Integracja z backend API
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(request),
  // });
  // return response.json();

  // Mockowanie na razie
  return {
    id: Date.now().toString(),
    message: `[TODO] Rzeczywista odpowiedź z AI`,
    timestamp: new Date().toISOString(),
  };
}
```

### Sprawdzenie

- [x] Plik utworzony ze szablonami funkcji
- [x] Przygotowany do rozszerzenia w Sprint 2

---

## 🎯 Task 1.15: Environment Variables (0.25h)

### Cel

Skonfigurowanie zmiennych środowiskowych dla frontend.

### Plik: `frontend/.env.local`

```env
VITE_API_URL=http://localhost:3001
```

### Sprawdzenie

- [x] Plik `frontend/.env.local` utworzony
- [x] Nie jest śledzony przez Git (sprawdź `.gitignore`)
- [x] Dodaj do `frontend/.gitignore` (jeśli nie ma):
  ```
  .env.local
  ```

---

## 🎯 Task 1.16: Testing & Polish (0.5h)

### Cel

Testowanie całego flow'u UI.

### Testy manualne

- [x] Aplikacja ładuje się bez błędów
- [x] Input pozwala wpisywać tekst
- [x] Można wysyłać wiadomości (mockowe)
- [x] Wiadomości pojawiają się na czacie
- [x] Auto-scroll działa (nowe wiadomości na dole)
- [x] Design responsywny (test na mobile w DevTools)
- [x] Ciemna paleta kolorów jest spójna
- [x] Brak błędów TypeScript (`npm run build`)

### Polishing

- [x] Dodaj favicona w `index.html`
- [x] Zmień title na "Promptly Photo AI"
- [x] Sprawdź, czy font jest czytelny na mobile

---

## 🎯 Task 1.17: Deployment Setup - Vercel (0.5h)

### Cel

Przygotowanie do deployu na Vercel (nie wdrażamy jeszcze).

### Kroki

**Upewnij się, że jesteś w folderze `frontend/`**:

1. Utwórz plik `vercel.json` w folderze `frontend/`:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ]
}
```

2. Upewnij się, że `package.json` ma build script:

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

3. Sprawdź build localnie (w folderze `frontend/`):

```bash
npm run build
npm run preview
```

### Sprawdzenie

- [ ] `npm run build` generuje folder `frontend/dist/`
- [ ] `npm run preview` wyświetla skompilowaną aplikację na `http://localhost:4173`
- [ ] Brak błędów w buildie

---

## ✅ Checklist Sprint 1 - Finał

### Weryfikacja struktury projektu

- [ ] Folder główny: `promptly-photo-ai/` ✅
- [ ] Podfolder: `promptly-photo-ai/frontend/` ✅
- [ ] Gotowy na dodanie `promptly-photo-ai/backend/` w Sprint 2 ✅

### Weryfikacja techniczna

- [ ] React + Vite zainstalowany i działa (`http://localhost:5173`)
- [ ] TailwindCSS + Shadcn/ui skonfigurowane (komponenty w `frontend/src/components/ui/`)
- [ ] Zustand store zaimplementowany (`frontend/src/store/chatStore.ts`)
- [ ] Wszystkie komponenty UI (Message, MessageList, ChatInput, ChatWindow) działają
- [ ] ChatWindow wyświetla się bez błędów w konsoli
- [ ] Mockowe wiadomości wysyłają się i pojawiają na czacie
- [ ] TypeScript nie pokazuje błędów (`npm run build` bez errorów w `frontend/`)
- [ ] Build lokalnie się udaje (`npm run build` + `npm run preview` w `frontend/`)
- [ ] Vercel setup przygotowany (`vercel.json` w `frontend/`)
- [ ] Environment variables (`frontend/.env.local` z `VITE_API_URL`)

### Git & Dokumentacja

- [ ] Kod scommitowany do Git: `git commit -m "feat: sprint-1-frontend-setup"`
- [ ] README zaktualizowane z linkami (jeśli potrzebne)
- [ ] Screenshots UI (opcjonalnie - dla portfolio)

### Gotowość do Sprint 2

- [ ] Struktura projektu: `promptly-photo-ai/frontend/` ✅
- [ ] Miejsce na `promptly-photo-ai/backend/` w Sprint 2 ✅
- [ ] `chatService.ts` ma placeholdery do wypełnienia w Sprint 2 ✅

---

## 🚀 Następny Krok: Sprint 2 - Backend Proxy

**Co dalej?**: Po ukończeniu Sprint 1 przejdź do **Sprint 2: Backend Setup** (plik `SPRINT-2.md` do utworzenia)

**Sprint 2 będzie obejmował**:

- Express.js + TypeScript setup
- Endpoint `/api/chat` proxy do OpenAI API
- Implementacja `previous_response_id` (jak w `example.ts`)
- System prompt Photography Assistant
- Deployment backendu na Render

**Timeframe Sprint 2**: 1 dzień (4h pracy efektywnej)

---

## 💡 Notatki dla Początkujących

### Co osiągnąłeś w Sprint 1?

✅ **Frontend Stack**: React 18 + Vite + TypeScript + TailwindCSS + Shadcn/ui  
✅ **State Management**: Zustand (prosta alternatywa dla Redux)  
✅ **Komponenty UI**: Message, MessageList, ChatInput, ChatWindow  
✅ **Mockowanie**: Symulacja API (przygotowanie na Sprint 2)  
✅ **Deployment Ready**: Vercel konfiguracja

### Co robisz dalej?

W **Sprint 2** stworzysz backend, który:

- Ukrywa OpenAI API key (bezpieczeństwo)
- Proxy requests Frontend → OpenAI API
- Zachowuje historię rozmowy (`previous_response_id` jak w `example.ts`)
- Dodaje system prompt (Photography Expert)

W **Sprint 3** połączysz Frontend + Backend i wdrożysz na produkcję! 🚀

### Problemy podczas Sprint 1?

- **TailwindCSS nie działa**: Sprawdź `tailwind.config.js` i `postcss.config.js`
- **Shadcn/ui nie instaluje**: Użyj `npx shadcn-ui@latest init --force`
- **TypeScript errors**: Upewnij się że wszystkie importy są poprawne
- **Brak Hot Reload**: Restartuj `npm run dev`

---

**Sprint Leader**: [Twoje imię]  
**Data rozpoczęcia**: 01.02.2026  
**Data zakończenia**: \***\*\_\_\_\*\***  
**Status**: 🟡 W trakcie / ✅ Ukończony

**Commit message po zakończeniu**:

```bash
git add .
git commit -m "feat: sprint-1-frontend-setup - UI mockup ready"
git push origin main
```

## 🚀 Następny Krok: Sprint 2 - Backend Proxy

**Co dalej?**: Po ukończeniu Sprint 1 przejdź do **Sprint 2: Backend Setup** (plik `SPRINT-2.md` do utworzenia)

**Sprint 2 będzie obejmował**:

- Express.js + TypeScript setup
- Endpoint `/api/chat` proxy do OpenAI API
- Implementacja `previous_response_id` (jak w `example.ts`)
- System prompt Photography Assistant
- Deployment backendu na Render

**Timeframe Sprint 2**: 1 dzień (4h pracy efektywnej)

**Przejdź do**: [README.md](./README.md) → sekcja "📅 Plan Pracy - Phase 1" → Sprint 2

---
