"use client";

import { useAuth } from "@/contexts/auth-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProfileSidebar } from "@/components/layout/profile-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === "admin") router.push("/admin");
      else if (user.role === "manager") router.push("/manager");
      else if (user.role === "staff") router.push("/staff");
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <ProfileSidebar />
        </div>

        {/* Mobile sidebar toggle */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="mb-4 gap-2">
                <Menu className="h-4 w-4" />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <ProfileSidebar />
            </SheetContent>
          </Sheet>
        </div>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
