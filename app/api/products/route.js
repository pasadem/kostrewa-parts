import { dbConnect } from '@/lib/models/dbConnect';
import { Product } from '@/lib/models/Product';

export async function GET() {
  await dbConnect();
  const products = await Product.find();
  return Response.json(products);
}
