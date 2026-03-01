"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  MessageSquareWarning,
  Users,
  BarChart3,
  Glasses,
  Eye,
  LogOut,
  ShoppingCart,
  Layers,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const staffLinks: SidebarItem[] = [
  { href: "/staff", label: "Overview", icon: LayoutDashboard },
  { href: "/staff/orders", label: "Orders", icon: Package },
  { href: "/staff/preorders", label: "Preorders", icon: ShoppingCart },
  {
    href: "/staff/complaints",
    label: "Complaints",
    icon: MessageSquareWarning,
  },
];

const managerLinks: SidebarItem[] = [
  { href: "/manager", label: "Overview", icon: LayoutDashboard },
  { href: "/manager/orders", label: "Orders", icon: Package },
  { href: "/manager/frames", label: "Frames", icon: Glasses },
  { href: "/manager/media", label: "Frame Media", icon: ImageIcon },
  { href: "/manager/lens-types", label: "Lens Types", icon: Eye },
  { href: "/manager/lens-features", label: "Lens Features", icon: Layers },
  { href: "/manager/inventory", label: "Inventory", icon: ClipboardList },
  { href: "/manager/analytics", label: "Analytics", icon: BarChart3 },
];

const adminLinks: SidebarItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/orders", label: "Orders", icon: Package },
  { href: "/admin/frames", label: "Frames", icon: Glasses },
  {
    href: "/admin/complaints",
    label: "Complaints",
    icon: MessageSquareWarning,
  },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links =
    user?.role === "admin"
      ? adminLinks
      : user?.role === "manager"
        ? managerLinks
        : user?.role === "staff"
          ? staffLinks
          : staffLinks;

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-muted/20 lg:block">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2">
            <Glasses className="h-6 w-6" />
            <span className="text-lg font-bold tracking-tight">SPECTRA</span>
          </Link>
        </div>

        {/* Nav */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href + "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-3">
          <div className="mb-2 px-3 py-1">
            <p className="text-sm font-medium">{user?.fullName}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role}
            </p>
          </div>
          <Separator className="mb-2" />
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
