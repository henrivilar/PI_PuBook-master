import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Livros from "@/components/Livros";
import Favoritos from "@/components/Favoritos";

export default function Dashboard() {
  return (
    <div className="bg-[--gray-bg] h-screen w-screen flex">
      {/* Sidebar */}
      <section id="Sidebar">
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
          </main>
        </SidebarProvider>
      </section>

      {/* Main */}
      <section id="Main" className="flex flex-col mx-auto px-8 py-10 overflow-y-auto w-full">
        {/* Header */}
        <div id="Header" className="mb-6">
          
        </div>
        
        {/* Descoberta */}
        <div id="DescubraLivros" className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Descubra novos livros</h2>
          <Livros />
        </div>

        {/* Continuar lendo */}
        <div id="ContinuarLendo" className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Continuar lendo</h2>
          <Favoritos />
        </div>
      </section>
    </div>
  );
}