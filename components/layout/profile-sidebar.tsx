"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import {
  User,
  Package,
  ShoppingCart,
  FileText,
  MessageSquareWarning,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const profileLinks: SidebarItem[] = [
  { href: "/profile", label: "Overview", icon: User },
  { href: "/profile/orders", label: "My Orders", icon: Package },
  { href: "/profile/preorders", label: "My Preorders", icon: ShoppingCart },
  { href: "/profile/prescriptions", label: "Prescriptions", icon: FileText },
  {
    href: "/profile/complaints",
    label: "Complaints",
    icon: MessageSquareWarning,
  },
  { href: "/profile/settings", label: "Settings", icon: Settings },
];

export function ProfileSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 shrink-0">
      <div className="sticky top-20">
        <div className="mb-4 px-3">
          <p className="text-sm font-medium">{user?.fullName}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
        <Separator className="mb-4" />
        <nav className="flex flex-col gap-1">
          {profileLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/profile" &&
                pathname.startsWith(link.href + "/"));
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
        <Separator className="my-4" />
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 text-muted-foreground"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
