"use client";
import "../globals.css";
import AppSidebar from "@/components/layout/AppSidebar";
import { ContentArea } from "@/components/layout/ContentArea";
import TopNav from "@/components/layout/TopNav";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsTabletOrMobile } from "@/hooks/useIsTabletOrMobile";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

function MainWrapper({ children }: { children: React.ReactNode }) {
  const { state, isMobile } = useSidebar();
  return (
    <div
      className={cn(
        "flex flex-col flex-1 transition-all duration-300",
        isMobile ? "ml-0" : state === "expanded" ? "ml-64" : "ml-20"
      )}
    >
      <SidebarInset>
        <TopNav />
        <main
          className="flex-1 overflow-y-auto bg-background px-4 sm:px-6 py-6
 hide-scrollbar mt-16"
        >
          {children}
        </main>
      </SidebarInset>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <MainWrapper>{children}</MainWrapper>
      </div>
    </SidebarProvider>
  );
}
