import { dbConnect } from '@/lib/dbConnect';
import { Product } from '@/lib/models/Product';

export async function GET(request, { params }) {
  await dbConnect();
  const product = await Product.findById(params.id);
  if (!product) {
    return new Response('Not found', { status: 404 });
  }
  return Response.json(product);
}