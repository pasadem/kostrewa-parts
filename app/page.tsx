import { Product } from '@/lib/models/Product';
import { dbConnect } from '@/lib/models/dbConnect';
import ProductGrid from '@/components/ProductGrid';
import Header from '@/components/Header';

export default async function HomePage() {
  await dbConnect();
  const products = await Product.find().lean();

  return (
    <div>
      
      <h1 className="text-2xl font-bold p-4">Каталог товарів</h1>
      <ProductGrid products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}
