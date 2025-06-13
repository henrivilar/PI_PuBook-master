'use cliente'; 
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Perfil() {
  const router = useRouter()
  const [usuario, setUsuario] = useState<{ nome: string; sobrenome: string } | null>(null);

  // ✅ Verifica autenticação ao carregar a página
  useEffect(() => {
    const logado = localStorage.getItem('usuarioLogado')
    if (logado !== 'true') {
      router.push('/login')
    } else {
      // Recupera nome e sobrenome do localStorage
      const nome = localStorage.getItem('usuarioNome') || '';
      const sobrenome = localStorage.getItem('usuarioSobrenome') || '';
      setUsuario({ nome, sobrenome });
    }
  }
  , [])

  const fazerLogout = () => {
    localStorage.removeItem('usuarioLogado')
    router.push('/login')
  }

  return (
    <div className="bg-[--gray-bg] h-full w-full flex">
      <section id="Sidebar">
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
          </main>
        </SidebarProvider>
      </section>
      <div className="w-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
          <img
            src="/imgs/Perfil.svg" 
            alt="Foto do usuário"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{usuario ? `${usuario.nome} ${usuario.sobrenome}` : 'Usuário'}</h2>

          <div className="flex flex-col gap-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2">
             <a
               href="/EditarPerfil"
               className="text-blue-600 underline hover:text-blue-800"
              >
               Editar Perfil
              </a> ✏ 
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2">
              ⚙ Ajustar preferências
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2">
              ⚙ Configurações
            </button>
            <button className="bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2">
              🚪 Desativar conta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}