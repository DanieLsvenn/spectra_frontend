"use client";

import Link from "next/link";
import {
  Glasses,
  Heart,
  ArrowUpRight,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GridPattern } from "@/components/ui/grid-pattern";
import { toast } from "sonner";

const footerLinks = {
  shop: [
    { href: "/shop", label: "All Frames" },
    { href: "/shop?shape=Square", label: "Square" },
    { href: "/shop?shape=Round", label: "Round" },
    { href: "/shop?shape=Rectangle", label: "Rectangle" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/try-on", label: "Virtual Try-On" },
  ],
  support: [
    { href: "/contact", label: "Help Center" },
    { href: "/contact", label: "Shipping & Returns" },
    { href: "/contact", label: "Warranty" },
  ],
};

export function Footer() {
  const handleNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thanks for subscribing! Stay tuned for updates.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <footer className="relative overflow-hidden border-t border-primary/10">
      {/* Grid pattern background */}
      <GridPattern
        width={32}
        height={32}
        className="[mask-image:linear-gradient(to_bottom,white_10%,transparent_60%)] opacity-50"
      />

      {/* Decorative blobs */}
      <div className="absolute -left-32 -top-32 h-64 w-64 blob-violet opacity-30 blur-3xl" />
      <div className="absolute -right-32 -bottom-32 h-64 w-64 blob-pink opacity-20 blur-3xl" />
      <div className="absolute left-1/2 top-0 h-48 w-48 blob-teal opacity-15 blur-3xl" />

      {/* Newsletter bar */}
      <div className="relative border-b border-primary/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold">
                Stay in the <span className="gradient-text">loop</span>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get updates on new frames, exclusive deals, and style tips.
              </p>
            </div>
            <form
              onSubmit={handleNewsletter}
              className="flex w-full max-w-sm gap-2"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                required
                className="rounded-xl border-primary/20 bg-background/50 backdrop-blur-sm"
              />
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  className="shimmer-button gap-2 rounded-xl shadow-lg shadow-primary/20"
                >
                  <Mail className="h-4 w-4" />
                  Subscribe
                </Button>
              </motion.div>
            </form>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <Glasses className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">SPECTRA</span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Premium eyewear meets cutting-edge virtual try-on tech. See
              yourself in frames before you buy — from anywhere, anytime.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
              ].map((social) => (
                <motion.button
                  key={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.button>
              ))}
            </div>

            {/* CTA button */}
            <Link href="/shop" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="outline"
                  className="gap-2 rounded-xl border-primary/20 text-sm"
                >
                  Start Shopping
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-foreground">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-foreground">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-foreground">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-primary/10 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Spectra Eyewear. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Terms of Service
            </Link>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              Made with{" "}
              <Heart className="h-3 w-3 text-brand-coral fill-brand-coral" /> in
              Vietnam
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
