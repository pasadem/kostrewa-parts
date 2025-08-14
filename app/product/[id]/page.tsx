import { dbConnect } from '@/lib/models/dbConnect';
import { Product } from '@/lib/models/Product';

export default async function ProductPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const product = await Product.findById(params.id).lean();

  if (!product) return <div className="p-4">Запчастина не знайдена</div>;

  return (
    <div className="p-6">
      <img src={product.image} alt={product.name} className="w-96 h-64 object-contain mb-4" />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">{product.modelSlug} | {product.powerSlug} | {product.versionSlug}</p>
      <p className="text-blue-700 text-xl font-semibold">{product.price} грн</p>
      <p className="mt-4">{product.description}</p>
    </div>
  );
}