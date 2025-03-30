import { Link } from "@inertiajs/react"
import { BookOpen, Folder, LayoutGrid } from "lucide-react"

import { NavFooter } from "@/components/nav-footer"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { dashboardPath } from "@/routes"
import type { NavItem } from "@/types"

import AppLogo from "./app-logo"

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: dashboardPath(),
    icon: LayoutGrid,
  },
]

const footerNavItems: NavItem[] = [
  {
    title: "Repository",
    href: "https://github.com/skryukov/inertia-rails-shadcn-starter",
    icon: Folder,
  },
  {
    title: "Documentation",
    href: "https://inertia-rails.dev",
    icon: BookOpen,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={dashboardPath()} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
