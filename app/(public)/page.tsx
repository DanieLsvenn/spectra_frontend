import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Glasses, Eye, RotateCcw, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              See the World
              <br />
              <span className="text-muted-foreground">Through Spectra</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Premium eyewear crafted for clarity, comfort, and style. Try on
              frames virtually with our cutting-edge 3D technology before you
              buy.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/shop">
                <Button size="lg" className="gap-2">
                  Shop Frames
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/try-on">
                <Button variant="outline" size="lg">
                  Virtual Try-On
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative gradient */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Why Choose Spectra
            </h2>
            <p className="mt-4 text-muted-foreground">
              From browsing to buying, we make every step effortless.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Glasses,
                title: "Premium Frames",
                desc: "Curated collection from top brands like Rayban, Gucci, and Oakley.",
              },
              {
                icon: Eye,
                title: "Virtual Try-On",
                desc: "See how frames look on you with our 3D & VR technology.",
              },
              {
                icon: RotateCcw,
                title: "Easy Returns",
                desc: "Not satisfied? Submit a return or exchange request with ease.",
              },
              {
                icon: Shield,
                title: "Prescription Safe",
                desc: "Store your prescriptions securely and link them to every order.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-card p-6 text-center transition-shadow hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h2 className="text-2xl font-bold">Ready to find your frames?</h2>
              <p className="mt-1 text-primary-foreground/80">
                Explore our collection and try on glasses virtually.
              </p>
            </div>
            <Link href="/shop">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 whitespace-nowrap"
              >
                Browse Collection
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            BRANDS WE CARRY
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {["Rayban", "Gucci", "Oakley", "Persol", "Spectra"].map((brand) => (
              <span
                key={brand}
                className="text-xl font-bold tracking-tight text-muted-foreground/50"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
