'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

interface Livro {
  id: number
  title: string
  authors: { name: string }[]
  formats: { [key: string]: string }
}

export default function Dashboard() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [livros, setLivros] = useState<Livro[]>([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)
  const [detalhes, setDetalhes] = useState<Livro | null>(null)

  // ✅ Verifica autenticação ao carregar a página
  useEffect(() => {
    const logado = localStorage.getItem('usuarioLogado')
    if (logado !== 'true') {
      router.push('/login')
    } else {
      buscarLivros('romance')
    }
  }, [])

  const buscarLivros = async (q: string) => {
    setCarregando(true)
    setErro(false)
    try {
      const res = await fetch(`https://gutendex.com/books/?search=${encodeURIComponent(q)}`)
      const data = await res.json()
      setLivros(data.results)
    } catch (e) {
      setErro(true)
    } finally {
      setCarregando(false)
    }
  }

  const getCapaUrl = (formats: { [key: string]: string }) => {
    return formats['image/jpeg'] || '/placeholder.png'
  }

  const abrirModal = (livro: Livro) => {
    setDetalhes(livro)
    setModalAberto(true)
  }

  const fazerLogout = () => {
    localStorage.removeItem('usuarioLogado')
    router.push('/login')
  }

  return (
    <div className="bg-[--gray-bg] h-screen w-screen flex">
      <section id="Sidebar">
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
          </main>
        </SidebarProvider>
      </section>

      <section id="Main" className="flex flex-col mx-auto w-full px-6">
        {/* ✅ Botão de logout no topo */}
        <div className="flex justify-end mt-4">
          <button
            onClick={fazerLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>

        <div id="Header" className="mt-10">
          <div className="flex gap-4 w-full max-w-xl bg-[#F6F6F6] p-4 rounded-xl">
            <img src="/imgs/Search.svg" alt="Buscar" />
            <input
              type="text"
              name="pesquisa"
              id="pesquisa"
              placeholder="Pesquise por livros, autor, gênero..."
              className="w-full bg-[#F6F6F6] border-none outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={() => buscarLivros(query)}
              className="text-sm text-white bg-blue-600 px-4 py-2 rounded-lg"
            >
              Buscar
            </button>
          </div>
        </div>

        <div id="Descubra" className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Descubra novos livros</h2>
          {carregando && <p>Carregando livros...</p>}
          {erro && <p className="text-red-500">Erro ao carregar livros.</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {livros.map((livro) => (
              <div
                key={livro.id}
                className="bg-white border rounded-xl p-4 shadow-md hover:shadow-lg transition"
              >
                <img
                  src={getCapaUrl(livro.formats)}
                  alt={`Capa do livro ${livro.title}`}
                  className="w-full h-64 object-cover mb-4 rounded-md"
                />
                <h2 className="font-semibold text-lg mb-1">{livro.title}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  {livro.authors.map((a) => a.name).join(', ') || 'Autor desconhecido'}
                </p>
                <button
                  onClick={() => abrirModal(livro)}
                  className="text-blue-600 hover:underline text-sm mb-2"
                >
                  Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        </div>

        {modalAberto && detalhes && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full">
              <h2 className="text-2xl font-bold mb-2">{detalhes.title}</h2>
              <p className="mb-2 text-sm text-gray-700">
                Autor(es): {detalhes.authors.map((a) => a.name).join(', ') || 'Desconhecido'}
              </p>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Leia este livro:</h3>
                <ul className="space-y-2">
                  {Object.entries(detalhes.formats)
                    .filter(([tipo]) => tipo.includes('text/html'))
                    .map(([tipo, url], index) => (
                      <li key={index}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Ler Online
                        </a>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setModalAberto(false)}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}