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
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'mydb', // 👉 можно заменить на своё имя БД
        bufferCommands: false,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}