"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  LayoutGrid,
  Users,
  User,
  Calendar,
  Newspaper,
  Award,
  BookUser,
} from "lucide-react";

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/alumni", label: "Alumni Directory", icon: Users },
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/news", label: "News & Updates", icon: Newspaper },
  { href: "/success-stories", label: "Success Stories", icon: Award },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <BookUser className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-headline font-semibold text-primary">
            FriendliGrad
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <p className="text-xs text-muted-foreground">© 2025 FriendliGrad</p>
      </SidebarFooter>
    </Sidebar>
  );
}
