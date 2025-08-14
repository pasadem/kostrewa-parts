import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://pdemianski75:FgdFGwi6kIo2ZWKf@cluster0.si05xlv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

if (!MONGODB_URI) {
  throw new Error('Будь ласка, встанови MONGODB_URI у .env.local');
}

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGODB_URI);
}
export async function dbDisconnect() {
  if (mongoose.connection.readyState === 0) return;

  return mongoose.disconnect();
}