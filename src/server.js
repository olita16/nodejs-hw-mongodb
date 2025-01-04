import express from "express";
import cors from "cors";
import pino from "pino-http";
import { contactsRouter } from "./routes/contacts.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { initMongoConnection } from "./db/initMongoConnection.js"; // Імпортуємо функцію для підключення до MongoDB

const PORT = process.env.PORT || 3000;

export const setupServer = async () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(pino());

  // Роутинг
  app.use("/contacts", contactsRouter);

  // Додаємо обробник для кореневого маршруту
  app.get('/', (req, res) => {
  res.send('Welcome to the Contacts API');
  });

  // Обробка неіснуючих маршрутів
  app.use(notFoundHandler);

  // Обробка помилок
  app.use(errorHandler);

  try {
    // Викликаємо функцію для підключення до MongoDB
    await initMongoConnection();

    // Запуск сервера
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};


// import express from 'express';
// import cors from 'cors';
// import pino from 'pino-http';
// import contactsRouter from './routes/contacts.js';

// export const setupServer = () => {
//   const app = express();

//   app.use(cors());
//   app.use(express.json());
//   app.use(pino());

//   app.use('/contacts', contactsRouter);

//   app.use(notFoundHandler);
//   app.use(errorHandler);

//   app.use((req, res) => {
//     res.status(404).json({ message: 'Not found' });
//   });

//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };

