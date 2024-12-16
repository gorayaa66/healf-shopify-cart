import { PRODUCTS_QUERY } from '@/lib/queries';
import { NextResponse } from "next/server";


const SHOPIFY_STOREFRONT_URL = process.env.SHOPIFY_STOREFRONT_URL || '';
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || '';

export async function POST(req: Request) {
    try {
      const response = await fetch(SHOPIFY_STOREFRONT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query: PRODUCTS_QUERY }),
      });

      const data = await response.json();
      console.log({data})
      return NextResponse.json(data?.data?.products?.edges );
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching data from Shopify' });
    }
}
