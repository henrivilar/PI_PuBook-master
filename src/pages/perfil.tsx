'use cliente'; 
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Perfil() {
  const router = useRouter()
  const [usuario, setUsuario] = useState(null)

  // ✅ Verifica autenticação ao carregar a página
  useEffect(() => {
    const logado = localStorage.getItem('usuarioLogado')
    if (logado !== 'true') {
      router.push('/login')
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
    </div>
  )
}