'use client';

import Image from 'next/image'

import UserRegister from '@/components/UserRegister';

export default function Home() {
  return  (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold mb-4">David Cudrado Álvarez</h1>
      <h2 className="text-4xl mb-2">Práctica final Next</h2>
      <h3 className="text-3xl">Gestor de comercios</h3>
    </div>
  );
}
