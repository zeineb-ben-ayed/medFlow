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
import { useCurrentUser } from "@/src/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { LOGOUT_MUTATION } from "@/src/graphql/mutations";
import { client } from "@/src/lib/apollo-client";

export default function TopNav() {
  const { state, isMobile } = useSidebar();
  const { user } = useCurrentUser();
  const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();
  const router = useRouter();
  const goToProfile = () => router.push("/profile");

  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: async () => {
      await client.clearStore();
      window.location.href = "/login";
    },
    onError: (err) => {
      console.error('Logout failed', err);
    },
  });

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
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            {user?.roles.includes("admin") ? (
              <DropdownMenuItem
                className="flex flex-col items-start gap-0 font-semibold"
              >
                <span>
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className="font-semibold" onClick={goToProfile}>
                My Profile
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>Settings</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-500" onClick={async () => await logout()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
