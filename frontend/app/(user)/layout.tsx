"use client";
import "../globals.css";
import AppSidebar from "@/components/layout/AppSidebar";
import { ContentArea } from "@/components/layout/ContentArea";
import TopNav from "@/components/layout/TopNav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <SidebarProvider>
    //   <div className="flex h-screen">
    //     <AppSidebar />

    //     <div className="flex-1 flex flex-col">
    //       <TopNav />
    //       <ContentArea>{children}</ContentArea>
    //     </div>
    //   </div>
    // </SidebarProvider>
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />

        <div className="flex-1 flex flex-col ml-64">
          <TopNav />
          <main className="flex-1 overflow-y-auto bg-background pt-20 pb-20 px-8 hide-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
