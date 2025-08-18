import mongoose, { Schema, InferSchemaType } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  modelSlug: { type: String, required: false },
  powerSlug: { type: String, required: false },
  versionSlug: { type: String, required: false },
});

export type ProductType = InferSchemaType<typeof ProductSchema>;

export const Product =
  mongoose.models.Product ||
  mongoose.model<ProductType>('Product', ProductSchema);