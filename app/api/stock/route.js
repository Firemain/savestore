import { updateStock } from '@/lib/shopping';
import { NextResponse } from 'next/server';


export async function POST( request ) {
  const data = await request.json();

  updateStock (data.cartItems);

  return NextResponse.json({
    hello: "world",
  });
};
