import express from "express";
import cors from "cors";
import pino from "pino-http";
import { contactsRouter } from "./routes/contacts.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { initMongoConnection } from "./db/initMongoConnection.js"; 

const PORT = process.env.PORT || 3000;

export const setupServer = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(pino());

  app.use("/contacts", contactsRouter);

  app.get('/', (req, res) => {
  res.send('Welcome to the Contacts API');
  });

  app.use(notFoundHandler);

  app.use(errorHandler);

  try {

    await initMongoConnection();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

