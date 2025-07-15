import React from "react";

export default function App() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-center text-indigo-700">RelaxPerú</h1>
        <p className="text-center text-sm text-gray-500">Descubre experiencias, eventos y viajes grupales en Perú</p>
      </header>
      <section className="grid gap-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-2">🎶 Eventos musicales y culturales</h2>
          <p>Explora conciertos, teatro, espectáculos y más.</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-2">🧳 Viajes grupales para solteros</h2>
          <p>Conoce gente nueva mientras recorres el Perú.</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-2">🐾 Experiencias con mascotas</h2>
          <p>Eventos y tours pet-friendly para ti y tu mejor amigo.</p>
        </div>
      </section>
      <footer className="mt-10 text-center text-xs text-gray-500 border-t pt-4">
        © 2025 RelaxPerú. No gestionamos eventos ni entradas. Verifica fuentes oficiales.
      </footer>
    </div>
  );
}
