import mongoose from 'mongoose';



const MONGODB_URI = process.env.MONGODB_URI as string;



if (!MONGODB_URI) {
  throw new Error(
    '❌ Пожалуйста, укажи переменную окружения MONGODB_URI в .env.local'
  );
}

/**
 * Чтобы Mongoose не создавал новое соединение на каждый запрос
 * используем глобальный кеш (важно для Next.js hot reload)
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log('MongoDB already connected');
      return;
    }
    await mongoose.connect(MONGODB_URI, { dbName: 'test' });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // чтобы ошибка была видна в терминале и в логах
  }
}