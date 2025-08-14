// lib/models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categorySlug: { type: String, required: true },
  modelSlug: { type: String, required: true },
  powerSlug: { type: String, required: true },
  versionSlug: { type: String, required: true },
  description: String,
  price: Number,
  image: String,
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
