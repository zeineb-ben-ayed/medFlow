"use client";

import { Bell, Menu } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/src/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/src/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

export default function TopNav() {
  const { state, isMobile } = useSidebar();
  return (
    <header
      className={cn(
        "h-16 border-b bg-background flex items-center justify-between px-6 fixed top-0 right-0 z-50 transition-all duration-300",
        isMobile ? "left-0" : state === "expanded" ? "left-64" : "left-20"
      )}
    >
      {/* LEFT SECTION */}
      <div className="flex items-center gap-3">
        {/* Mobile sidebar toggle */}
        <div className="">
          <SidebarTrigger>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SidebarTrigger>
        </div>

        {/* Search Bar */}
        {/* <div className="hidden md:block">
          <Input className="w-64" placeholder="Search..." />
        </div> */}
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/avatar.png" alt="User" />
              <AvatarFallback>MF</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="font-semibold">
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
