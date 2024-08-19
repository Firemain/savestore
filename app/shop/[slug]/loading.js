"use client";
import logo from '@/assets/logo.png';
import Image from 'next/image';

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
      <Image src={logo} alt="logo" className="w-32 h-32 animate-blink" />
      <h1 className="text-3xl font-bold mt-4">En train de compter les stocks...</h1>
    </div>
    )
}