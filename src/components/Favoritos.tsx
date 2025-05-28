"use client";

import { useEffect, useState } from "react";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<any[]>([]);

  useEffect(() => {
    const armazenados = localStorage.getItem("favoritos");
    if (armazenados) {
      setFavoritos(JSON.parse(armazenados));
    }
  }, []);

  if (favoritos.length === 0) {
    return <p className="text-gray-500 mt-2">Nenhum livro salvo.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {favoritos.map((livro, index) => (
        <div key={index} className="border p-4 rounded shadow bg-white">
          <img
            src={`https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`}
            alt="Capa do livro"
            className="mb-2 w-full h-60 object-cover"
          />
          <h2 className="text-lg font-semibold">{livro.title}</h2>
          <p className="text-sm text-gray-700">Autor: {livro.author_name.join(", ")}</p>
          <p className="text-sm text-gray-500">Ano: {livro.first_publish_year}</p>
          <a
            href={`https://openlibrary.org${livro.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700  text-lg mt-2 inline-block"
          >
            LER →
          </a>
        </div>
      ))}
    </div>
  );
}
