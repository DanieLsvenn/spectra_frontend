import Image from "next/image";
import Link from "next/link";
import { Glasses } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding & Image */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&h=1600&fit=crop"
          alt="Stylish eyewear"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-violet/20 to-transparent" />

        {/* Branding overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <Link href="/" className="mb-8 inline-flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Glasses className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">SPECTRA</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">
            See life in full color
          </h2>
          <p className="mt-3 max-w-md text-lg text-white/70">
            Premium eyewear with virtual try-on technology. Find your perfect
            frames from anywhere.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="relative flex w-full items-center justify-center px-4 lg:w-1/2">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 blob-violet opacity-20 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-64 w-64 blob-pink opacity-15 blur-3xl" />
        </div>

        {/* Mobile logo */}
        <div className="absolute left-4 top-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Glasses className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold gradient-text">SPECTRA</span>
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}
