"use client";
import { CartButton } from "@/components/CartButton";
import { ProductCard } from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { CartModal } from "@/components/CartModal";

async function getProducts() {
  const res = await (await fetch("/api/shopify", { method: "POST" })).json();
  return res || [];
}

export default function Home() {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const p = await getProducts();

      setProducts(p);
      return p;
    };

    fetchProducts();
  }, []);

  return (
    <div className="">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-12 flex h-16 items-center">
          <div>
            <h3 className="font-bold">Healf Shopify Cart</h3>
          </div>
          <div className="flex-1" />
          <CartButton />
        </div>
      </header>

      <main className="container py-8 mx-auto">
        <div className="mx-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(({ node: product }: {node: any}) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <CartModal />
    </div>
  );
}
