
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";

export const metadata = {
  title: "About GAEL",
  description:
    "Discover GAEL â€” streetwear footwear inspired by individuality, confidence, and everyday movement.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#111111]">
      <Navbar />

      {/* HERO */}
      <section className="bg-[#090909] text-white">
        <div className="mx-auto grid min-h-[520px] max-w-7xl items-center gap-20 px-6 py-20 md:grid-cols-2 md:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
              GAEL / About Us
            </p>

            <h1 className="mt-8 text-6xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              MORE THAN
              <br />
              JUST
              <br />
              FOOTWEAR<span className="text-gray-500">.</span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-gray-400 md:text-base">
              GAEL represents individuality, confidence,
              and the freedom to express yourself through
              everyday style.
            </p>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden bg-[#1c1c1c]">
            <Image
              src="https://urqqhuofcqknneyebrdg.supabase.co/storage/v1/object/public/product-images/class-runner-black.jpg"
              alt="GAEL black sneaker"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-300">
                Our Identity
              </p>
              <p className="mt-2 text-2xl font-black uppercase">
                OWN YOUR EVERY STEP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center md:px-12">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
         Our Story
          </p>

          <h2 className="mt-4 text-4xl font-black uppercase leading-tight md:text-5xl">
            MADE FOR
            <br />
            EVERYDAY
            <br />
            MOVEMENT.
          </h2>
        </div>

        <div>
          <p className="text-base leading-8 text-gray-600">
            GAEL is a streetwear footwear concept built
            around a simple idea: what you wear should
            reflect who you are.
          </p>

          <p className="mt-5 text-base leading-8 text-gray-600">
            Inspired by modern street culture and everyday
            movement, GAEL brings together versatile style,
            practical comfort, and a confident attitude.
          </p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-white px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
              Our Philosophy
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase leading-tight md:text-6xl">
              YOUR STYLE.
              <br />
              YOUR PACE.
              <br />
              YOUR RULES.
            </h2>

            <p className="mt-6 text-sm leading-7 text-gray-500">
              We believe personal style has no fixed rules.
              Every step is an opportunity to express
              yourself, embrace your individuality, and
              move with confidence.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            <div className="border-t-2 border-black pt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400"></p>
              <h3 className="mt-4 text-xl font-black uppercase">
                Individuality
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Express your identity. Make your own
                statement.
              </p>
            </div>

            <div className="border-t-2 border-black pt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400"></p>
              <h3 className="mt-4 text-xl font-black uppercase">
                Confidence
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Move through every day with confidence
                in your own style.
              </p>
            </div>

            <div className="border-t-2 border-black pt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400"></p>
              <h3 className="mt-4 text-xl font-black uppercase">
                Versatility
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Everyday footwear that fits different
                moments and personal styles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="bg-[#090909] px-6 py-24 text-center text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
             This Is GAEL
          </p>

          <h2 className="mt-7 text-5xl font-black uppercase leading-tight tracking-tight sm:text-6xl md:text-8xl">
            OWN YOUR
            <br />
            EVERY STEP<span className="text-gray-500">.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-gray-400">
            Find your style. Set your pace.
            Make every step your own.
          </p>

          <Link
            href="/shop"
            className="mt-9 inline-flex border border-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition hover:bg-white hover:text-black"
          >
            Explore The Collection â†—
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#090909] px-6 pb-8 text-white md:px-12">
        <div className="mx-auto max-w-7xl border-t border-white/15 pt-8">
          <div className="flex flex-col justify-between gap-4 text-[10px] uppercase tracking-wider text-gray-500 sm:flex-row">
            <p>Â© 2026 GAEL. All rights reserved.</p>
            <p>OWN YOUR EVERY STEP.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
