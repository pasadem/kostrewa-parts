import Link from 'next/link';

export default function ProductCard({ product }: any) {
  return (
    <div className="border p-4 rounded shadow w-64">
      <img src={product.image} alt={product.name} className="mb-2 w-full h-40 object-cover" />
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600">{product.power} | {product.material}</p>
      <p className="text-blue-700 font-semibold">{product.price} грн</p>
      <Link href={`/product/${product._id}`} className="text-sm text-blue-500 mt-2 inline-block">Детальніше</Link>
    </div>
  );
}
//                     maxHeight='md'
//                     overflow={'hidden'}
//                     mb={'2'}
//                     py={'2'}
//                 >{props.power} | {props.material}</Text>
//                 <Text
//                     fontSize={['md', 'md', 'lg', 'lg']}
//                     fontWeight={'bold'}
//                     color={'blue.700'}
//                     textAlign={'center'}
//                     mb={'2'}
//                 >{props.price} грн</Text>
//                 <Link
//                     href={`/product/${props.id}`}
//                     className='text-sm text-blue-500 mt-2 inline-block'
//                 >Детальніше</Link>
//             </Box>
//         </Box>
//     );
// }
//
//