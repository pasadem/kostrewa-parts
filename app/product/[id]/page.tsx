import React from 'react';
import { dbConnect } from '@/lib/dbConnect';
import { Product, ProductType } from '@/lib/models/Product';

export interface PageProps {
  params: Promise<{
    id: string;
  }>;
}



export default async function ProductPage({ params }: PageProps) {
  await dbConnect();
  const { id } = await params;

  const product = await Product.findById(id).lean<ProductType>();
  console.log

  if (!product) {
    return <div className="p-4">Запчастина не знайдена</div>;
  }

  return (
    <div className="p-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-96 h-64 object-contain mb-4"
      />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">
        {product.modelSlug} | {product.powerSlug} | {product.versionSlug}
      </p>
      <p className="text-blue-700 text-xl font-semibold">{product.price} грн</p>
      <p className="mt-4">{product.description}</p>
    </div>
  );
}