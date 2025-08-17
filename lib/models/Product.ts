// lib/models/Product.js
import { Schema, model, models, Document } from 'mongoose';

interface MyDocument extends Document {
  _id: string;
  name: string;
  categorySlug: string;
  modelSlug: string;
  powerSlug: string;
  versionSlug: string;
  description: string;
  price: number;
  image: string;
}

const mySchema = new Schema<MyDocument>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  categorySlug: { type: String, required: true },
  modelSlug: { type: String, required: true },
  powerSlug: { type: String, required: true },
  versionSlug: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export const Product = models.Product ||model<MyDocument>('Product', mySchema);
