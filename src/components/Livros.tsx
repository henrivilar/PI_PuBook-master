"use client";

import { useEffect, useState } from "react";

export default function Livros() {
  const [query, setQuery] = useState("");
  const [livros, setLivros] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [sinopse, setSinopse] = useState("");
  const [livroSelecionado, setLivroSelecionado] = useState<any>(null);
  const [favoritos, setFavoritos] = useState<any[]>([]);

  useEffect(() => {
    const armazenados = localStorage.getItem("favoritos");
    if (armazenados) {
      setFavoritos(JSON.parse(armazenados));
    }
  }, []);

  const salvarFavorito = (livro: any) => {
    const jaExiste = favoritos.some((fav) => fav.key === livro.key);
    if (!jaExiste) {
      const novosFavoritos = [...favoritos, livro];
      setFavoritos(novosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
      alert("Livro salvo como favorito!");
    } else {
      alert("Este livro já está nos favoritos.");
    }
  };

  const buscarLivros = async () => {
    if (!query.trim()) return;
    setCarregando(true);
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    const livrosFiltrados = data.docs
      .filter((livro: any) => livro.cover_i && livro.title && livro.author_name && livro.first_publish_year && livro.key)
      .slice(0, 10);

    setLivros(livrosFiltrados);
    setCarregando(false);
  };

  const abrirModal = async (livro: any) => {
    setLivroSelecionado(livro);
    setSinopse("Carregando...");

    try {
      const res = await fetch(`https://openlibrary.org${livro.key}.json`);
      const data = await res.json();

      const descricao =
        typeof data.description === "string"
          ? data.description
          : data.description?.value || "Sinopse não disponível.";

      setSinopse(descricao);
    } catch {
      setSinopse("Erro ao carregar sinopse.");
    }

    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setLivroSelecionado(null);
    setSinopse("");
  };

  return (
    <div className="mt-4">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Buscar por título ou autor"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded"
          onClick={buscarLivros}
        >
          Buscar
        </button>
      </div>

      {carregando && <p>Carregando...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {livros.map((livro, index) => (
          <div key={index} className="border p-4 rounded shadow bg-white">
            <img
              src={`https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`}
              alt="Capa do livro"
              className="mb-2 w-full h-60 object-cover"
            />
            <h2 className="text-lg font-semibold">{livro.title}</h2>
            <p className="text-sm text-gray-700">Autor: {livro.author_name.join(", ")}</p>
            <p className="text-sm text-gray-500">Ano: {livro.first_publish_year}</p>
            <div className="flex flex-col gap-2 mt-2">
              <button
                className="text-sm text-blue-600 hover:underline text-left"
                onClick={() => abrirModal(livro)}
              >
                Ver detalhes
              </button>
              <button
                className="text-sm text-green-600 hover:underline text-left"
                onClick={() => salvarFavorito(livro)}
              >
                Salvar como favorito
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalAberto && livroSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <button
              onClick={fecharModal}
              className="absolute top-2 right-4 text-gray-600 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2">{livroSelecionado.title}</h2>
            <p className="text-sm text-gray-600 mb-4">
              Autor: {livroSelecionado.author_name.join(", ")} | Ano:{" "}
              {livroSelecionado.first_publish_year}
            </p>
            <p className="text-gray-800 whitespace-pre-line mb-4">{sinopse}</p>
            {livroSelecionado.key && (
              <a
                href={`https://openlibrary.org${livroSelecionado.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Ler na Open Library →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
