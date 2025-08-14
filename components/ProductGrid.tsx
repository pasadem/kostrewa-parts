import ProductCard from './ProductCard';

export default function ProductGrid({ products }: any) {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {products.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
