import { Glasses, Eye, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">About Spectra</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We believe everyone deserves to see the world clearly and look great
          doing it. Spectra combines premium eyewear with cutting-edge
          technology to deliver a seamless shopping experience.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
        {[
          { label: "Frames Available", value: "500+", icon: Glasses },
          { label: "Happy Customers", value: "10,000+", icon: Users },
          { label: "Virtual Try-Ons", value: "50,000+", icon: Eye },
          { label: "Partner Brands", value: "20+", icon: Award },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold">Our Story</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Founded with a simple mission: make premium eyewear accessible to
              everyone. We noticed that buying glasses online felt impersonal
              and uncertain. You never knew how frames would look until they
              arrived.
            </p>
            <p>
              That&apos;s why we built our Virtual Try-On technology. Using
              advanced 3D rendering and WebXR, customers can see exactly how
              frames look on their face before making a purchase.
            </p>
            <p>
              Combined with our curated selection from brands like Rayban,
              Gucci, Oakley, and Persol, we offer a shopping experience that
              rivals any physical store while being entirely online.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-12">
          <div className="space-y-6">
            <div className="rounded-xl bg-background p-4 shadow-sm">
              <h3 className="font-semibold">Mission</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Make premium eyewear accessible through innovative technology.
              </p>
            </div>
            <div className="rounded-xl bg-background p-4 shadow-sm">
              <h3 className="font-semibold">Vision</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                A world where everyone can try before they buy, from anywhere.
              </p>
            </div>
            <div className="rounded-xl bg-background p-4 shadow-sm">
              <h3 className="font-semibold">Values</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Quality, innovation, transparency, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
