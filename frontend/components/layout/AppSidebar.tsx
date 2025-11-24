"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Calendar,
  DollarSign,
  Settings,
  Heart,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Patients", url: "/patients", icon: Users },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "Billing", url: "/billing", icon: DollarSign },
  { title: "Admin", url: "/admin", icon: Settings },
];

export default function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className={`
    border-r border-border/40
    transition-all duration-300 ease-in-out  
    md:${open ? "w-64" : "w-20"} 
    h-screen fixed top-0 left-0 z-40
  `}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-center border-b border-border/40 px-4">
        {open ? (
          <div className="flex items-center gap-2">
            <img
              src="logo\mediumlightlogo-withoutBG.png"
              alt="MedFlow Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
        ) : (
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary via-primary-hover to-accent flex items-center justify-center shadow-sm">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
      </div>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname?.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-11 rounded-xl transition-all duration-200 hover:bg-primary/5 data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-medium"
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-3 px-2"
                      >
                        <item.icon className="h-5 w-5" />
                        {open && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
