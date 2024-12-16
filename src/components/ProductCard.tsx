'use client';

import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { useCart } from '../context/CartContext';


interface ProductCardProps {
  product: {
    id: string;
    title: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: {
        node: {
          url: string;
          altText: string;
        };
      }[];
    };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { cartItems, addItem } = useCart();

  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;

  // console.log({cartItems})

  return (
    <div className="group relative rounded-lg border bg-card p-4 transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden rounded-md">
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            width={400}
            height={400}
            className="object-cover transition-transform group-hover:scale-105"
          />
        )}
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-medium h-12">{product.title}</h3>
        <p className="text-lg font-bold">
          {formatPrice(parseFloat(price.amount), price.currencyCode)}
        </p>
        <button 
          onClick={() => {
            console.log("clicked")
            addItem(product)
        }}
          className="w-full bg-gray-500 rounded-md py-2 text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}