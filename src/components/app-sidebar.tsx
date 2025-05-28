
import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  House,
  LayoutList,
  Star,
  History,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "@example.com",
    avatar: "/imgs/Logo.png",
  },
  navMain: [
    {
      title: "Inicio",
      url: "/dashboard",
      icon: House,
      isActive: true,
    },
    {
      title: "Categorias",
      url: "#",
      icon: LayoutList,
    },
    {
      title: "Favoritos",
      url: "#",
      icon: Star,
    },
    {
      title: "Histórico",
      url: "#",
      icon: History,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[--blue-bg] text-white">
        <img src="/imgs/Logo.png" alt="" className="w-40 mx-auto mt-4"/>
      </SidebarHeader>
      <SidebarContent className="bg-[--blue-bg] text-white">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user}/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
