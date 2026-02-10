import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";
import { chatRouter } from "./routes/chat";

dotenv.config();

const app = express();
const PORT = process.env.PORT || "3001";

// NOTE: Middleware - funkcje przetwarzające każdy request

// CORS - pozwala frontendowi łączyć się z backendem
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// JSON Parser - automatycznie parsuje body requestów do JSON
app.use(express.json());

// NOTE: Routes - definicje endpointów API

// Wszystkie requesty do /api/chat obsługuje chatRouter
app.use("/api/chat", chatRouter);

app.get("/health", (request, response) => {
  response.json({
    status: "Backend server status OK",
    timestamp: new Date().toISOString(),
  });
});

// NOTE: Conditional logging - szczegółowe logi tylko w development
if (process.env.NODE_ENV === "development") {
  app.use((request, response, next) => {
    console.log(`${request.method} ${request.path}`);
    next();
  });
}

// NOTE: Start serwera

app.listen(PORT, () => {
  console.log(`
    ${chalk.red.bold("EXPRESS")} ${chalk.gray("ready server")} ${chalk.bold("backend")} 
    ${chalk.red.bold("➜")} ${chalk.bold("Local: ")} ${chalk.cyan("http://localhost:")}${chalk.cyan.bold(PORT)}${chalk.cyan("/")}
    `);
});
