'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  modelSlug: string;
  modelName: string;
  powerSlug: string;
  powerName: string;
  versionSlug: string;
  versionName: string;
  description: string;
  price: number;
  image: string;
}
type MenuTree = {
  [categorySlug: string]: {
    name: string;
    models: {
      [modelSlug: string]: {
        name: string;
        powers: {
          [powerSlug: string]: {
            name: string;
            versions: {
              [versionSlug: string]: {
                name: string;
              };
            };
          };
        };
      };
    };
  };
};

export default function Header() {
  const [products, setProducts] = useState<Product[]>([]);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [openModel, setOpenModel] = useState<string | null>(null);
  const [openPower, setOpenPower] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Построение дерева меню с украинскими названиями
  const menu: MenuTree = {};
  products.forEach(prod => {
    if (!menu[prod.categorySlug]) menu[prod.categorySlug] = { name: prod.categoryName, models: {} };
    if (!menu[prod.categorySlug].models[prod.modelSlug]) menu[prod.categorySlug].models[prod.modelSlug] = { name: prod.modelName, powers: {} };
    if (!menu[prod.categorySlug].models[prod.modelSlug].powers[prod.powerSlug]) menu[prod.categorySlug].models[prod.modelSlug].powers[prod.powerSlug] = { name: prod.powerName, versions: {} };
    if (!menu[prod.categorySlug].models[prod.modelSlug].powers[prod.powerSlug].versions[prod.versionSlug]) menu[prod.categorySlug].models[prod.modelSlug].powers[prod.powerSlug].versions[prod.versionSlug] = { name: prod.versionName };
  });

  return (
    <header>
    <div className="bg-white flex  py-3">
        <Link href="/">
          <img src="/images/logo-czesci.png" alt="Логотип" className="h-14 w-auto" />
        </Link>
      </div>
    <nav className="bg-gray-800 text-white px-4 py-2">
      
      <ul className="flex flex-row gap-6 items-center m-0 p-0 list-none">
        {Object.entries(menu).map(([catSlug, catObj]) => (
          <li
            key={catSlug}
            className="relative"
            onMouseEnter={() => setOpenCat(catSlug)}
            onMouseLeave={() => { setOpenCat(null); setOpenModel(null); setOpenPower(null); }}
          >
            <span className="cursor-pointer font-semibold hover:text-yellow-400 px-4 py-2 block">{catObj.name}</span>
            {/* 1 уровень подменю */}
            {openCat === catSlug && (
              <ul className="absolute left-0 top-full bg-white text-black min-w-[180px] shadow-lg rounded z-20">
                {Object.entries(catObj.models).map(([modelSlug, modelObj]) => (
                  <li
                    key={modelSlug}
                    className="relative"
                    onMouseEnter={() => setOpenModel(modelSlug)}
                    onMouseLeave={() => setOpenModel(null)}
                  >
                    <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">{modelObj.name}</span>
                    {/* 2 уровень подменю */}
                    {openModel === modelSlug && (
                      <ul className="absolute left-full top-0 bg-white text-black min-w-[180px] shadow-lg rounded z-30">
                        {Object.entries(modelObj.powers).map(([powerSlug, powerObj]) => (
                          <li
                            key={powerSlug}
                            className="relative"
                            onMouseEnter={() => setOpenPower(powerSlug)}
                            onMouseLeave={() => setOpenPower(null)}
                          >
                            <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">{powerObj.name}</span>
                            {/* 3 уровень подменю */}
                            {openPower === powerSlug && (
                              <ul className="absolute left-full top-0 bg-white text-black min-w-[180px] shadow-lg rounded z-40">
                                {Object.entries(powerObj.versions).map(([versionSlug, versionObj]) => (
                                  <li key={versionSlug}>
                                    <Link
                                      href={`/category/${catSlug}/${modelSlug}/${powerSlug}/${versionSlug}`}
                                      className="block px-4 py-2 hover:bg-yellow-100"
                                    >
                                      {versionObj.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  </header>
  );
}