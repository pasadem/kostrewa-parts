import { dbConnect } from '@/lib/dbConnect';
import { Product } from '@/lib/models/Product';
import Link from 'next/link';

const PAGE_SIZE = 12;

export default async function CategoryPage(props) {
  const params = await props.params as { slug: string[] };
  const searchParams = await props.searchParams || {};
  await dbConnect();

  const slugArr = params.slug || [];
  const [categorySlug, modelSlug, powerSlug, versionSlug] = slugArr;

  const filter: any = {};
  if (categorySlug) filter.categorySlug = categorySlug;
  if (modelSlug) filter.modelSlug = modelSlug;
  if (powerSlug) filter.powerSlug = powerSlug;
  if (versionSlug) filter.versionSlug = versionSlug;

  const page = parseInt(searchParams.page) || 1;
  const skip = (page - 1) * PAGE_SIZE;

  const [products, total] = await Promise.all([
    Product.find(filter).skip(skip).limit(PAGE_SIZE).lean(),
    Product.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (!products || products.length === 0) {
    return <div className="p-4">Нет товаров в этой категории</div>;
  }

  // 1. Только категория: список моделей
  if (categorySlug && !modelSlug) {
    const models = [...new Set(products.map(p => p.modelSlug))];
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Модели</h1>
        <ul>
          {models.map(model => (
            <li key={model} className="mb-2">
              <Link href={`/category/${categorySlug}/${model}`}>
                <span className="text-blue-600 hover:underline">{model}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // 2. Категория + модель: список мощностей
  if (categorySlug && modelSlug && !powerSlug) {
    const powers = [...new Set(products.map(p => p.powerSlug))];
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Мощности</h1>
        <ul>
          {powers.map(power => (
            <li key={power} className="mb-2">
              <Link href={`/category/${categorySlug}/${modelSlug}/${power}`}>
                <span className="text-blue-600 hover:underline">{power}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // 3. Категория + модель + мощность: список версий
  if (categorySlug && modelSlug && powerSlug && !versionSlug) {
    const versions = [...new Set(products.map(p => p.versionSlug))];
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Версии</h1>
        <ul>
          {versions.map(version => (
            <li key={version} className="mb-2">
              <Link href={`/category/${categorySlug}/${modelSlug}/${powerSlug}/${version}`}>
                <span className="text-blue-600 hover:underline">{version}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // 4. Все выбрано: список запчастей (карточки)
  if (categorySlug && modelSlug && powerSlug && versionSlug) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Запчастини</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product._id} className="border rounded p-4 shadow hover:shadow-lg transition">
              <img src={product.image} alt={product.name} className="w-full h-32 object-contain mb-2" />
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.price} грн</p>
              <Link
                href={`/product/${product._id}`}
                className="text-blue-600 hover:underline block mt-2"
              >
                Детальніше
              </Link>
            </div>
          ))}
        </div>
          {/* Пагинация */}
      <div className="flex gap-2 mt-6 justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i + 1}
            href={`?page=${i + 1}`}
            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
  }

  // Если путь невалидный — пустой div
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Запчасти</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="border rounded p-4 shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-32 object-contain mb-2" />
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.price} грн</p>
            <Link
              href={`/product/${product._id}`}
              className="text-blue-600 hover:underline block mt-2"
            >
              Подробнее
            </Link>
          </div>
        ))}
      </div>
      {/* Пагинация */}
      <div className="flex gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i + 1}
            href={`?page=${i + 1}`}
            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}