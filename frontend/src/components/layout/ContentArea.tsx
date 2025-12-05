"use client";
import { useSidebar } from "@/src/components/ui/sidebar";
import { ReactNode } from "react";

export function ContentArea({ children }: { children: ReactNode }) {
  const { open } = useSidebar();

  return (
    <main
      className={`
        flex-1 overflow-y-auto bg-background p-6 pt-20
        transition-all duration-300
        ${open ? "pl-64" : "pl-20"}
      `}
    >
      {children}
    </main>
  );
}
