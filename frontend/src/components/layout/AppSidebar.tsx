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
  Grid,
  Grid2x2,
  LayoutGrid,
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
} from "@/src/components/ui/sidebar";
import { useCurrentUser } from "@/src/hooks/useCurrentUser";
import { protectedRoutes } from "@/src/middleware";
import Image from "next/image";

const menuItems = [
  { title: "Dashboard", url: "/dashboardAdmin", icon: LayoutGrid },
  { title: "Dashboard", url: "/dashboardReceptionniste", icon: LayoutGrid },
  { title: "Patients", url: "/patientList", icon: Users },
  { title: "Appointments", url: "/appointmentListPatient", icon: Calendar },
  { title: "Appointments (All)", url: "/appointmentList", icon: Calendar },
  { title: "Consultation", url: "/consultation", icon: Heart },
  { title: "Staff", url: "/staffList", icon: Users },
];

export default function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();
  const { user } = useCurrentUser();
  const roles = user?.roles;

  const filteredMenuItems = menuItems.filter((item) => {
    const allowedRoles = protectedRoutes[item.url];
    if (!allowedRoles) return true;
    return allowedRoles.some((role) => roles?.includes(role));
  });

  return (
    <Sidebar
      collapsible="icon"
      className={`
      border-r border-border/40
      transition-all duration-300 ease-in-out  
      ${open ? "w-64" : "w-20"}
      h-screen fixed top-0 left-0 z-40
    `}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-center border-b border-border/40 px-4">
        {open ? (
          <div className="flex items-center gap-2">
            <img
              src="/logo/mediumlightlogo-withoutBG.png"
              alt="MedFlow Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
        ) : (
          <div className="h-9 w-9 rounded-xl flex items-center justify-center shadow-sm">
            <Image
              src="/logo/iconlightNoBg.png"
              alt="App Icon"
              width={90}
              height={90}
              className="object-contain"
            />
          </div>
        )}
      </div>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => {
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
