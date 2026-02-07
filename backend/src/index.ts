import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";
// import { chatRouter } from "./routes/chat";

dotenv.config();

const app = express();
const PORT = process.env.PORT || "3001";

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// app.use("/api/chat", chatRouter);

app.get("/health", (request, response) => {
  response.json({
    status: "Backend server OK",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", cors(corsOptions), (request, response) => {
  response.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`
    ${chalk.red.bold("EXPRESS")} ${chalk.gray("ready server")} ${chalk.bold("backend")} 
    ${chalk.red.bold("➜")} ${chalk.bold("Local: ")} ${chalk.cyan("http://localhost:")}${chalk.cyan.bold(PORT)}${chalk.cyan("/")}
    `);
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import express, { Application } from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import chatRouter from "./routes/chat";

// // Załaduj zmienne środowiskowe z .env
// dotenv.config();

// const app: Application = express();
// const PORT = process.env.PORT || 3001;

// // NOTE: Middleware - funkcje przetwarzające każdy request

// // CORS - pozwala frontendowi łączyć się z backendem
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   }),
// );

// // JSON Parser - automatycznie parsuje body requestów do JSON
// app.use(express.json());

// // NOTE: Routes - definicje endpointów API

// // Wszystkie requesty do /api/chat obsługuje chatRouter
// app.use("/api/chat", chatRouter);

// // Health check endpoint (sprawdzenie czy serwer działa)
// app.get("/health", (request, response) => {
//   response.json({ status: "ok", timestamp: new Date().toISOString() });
// });

// // NOTE: Start serwera

// app.listen(PORT, () => {
//   console.log(`📸 Promptly Photo AI Assistant - Backend Ready`);
//   console.log(`🚀 Backend proxy nasłuchuje na http://localhost:${PORT}`);
//   console.log(`🔗 Health check: http://localhost:${PORT}/health`);
// });
