import Link from "next/link";
import { Glasses } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Glasses className="h-6 w-6" />
              <span className="text-lg font-bold tracking-tight">SPECTRA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium eyewear with cutting-edge virtual try-on technology.
              Experience the future of glasses shopping.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/shop" className="hover:text-foreground">
                  All Frames
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?shape=Square"
                  className="hover:text-foreground"
                >
                  Square
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?shape=Round"
                  className="hover:text-foreground"
                >
                  Round
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?shape=Rectangle"
                  className="hover:text-foreground"
                >
                  Rectangle
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/try-on" className="hover:text-foreground">
                  Virtual Try-On
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Spectra Eyewear. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
