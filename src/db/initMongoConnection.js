import 'dotenv/config';
import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
    process.env;

  try {
    const mongoURI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(mongoURI);

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
