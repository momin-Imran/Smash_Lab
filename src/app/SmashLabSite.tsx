/* eslint-disable @next/next/no-img-element */
"use client";

import React, {
  useMemo,
  useState,
  type ReactNode,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";




/* ===================== */
/*        TYPES          */
/* ===================== */

type MenuItem = {
  name: string;
  desc: string;
  badge?: string;
  price?: number;
  prices?: { single: number; double: number };
};

type ChipProps = { label: string };
type PriceProps = { amount: number };
type MenuCardProps = { item: MenuItem };

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  children: ReactNode;
};

type FieryLogoProps = { src: string; alt?: string };

type HeroDecorProps = {
  side?: "left" | "right";
  lighter?: boolean;
};

type DriftStyle = CSSProperties & { ["--drift"]?: string };

/* ===================== */
/*     ORIGINAL CODE     */
/* ===================== */

/* config stuff */
const googleFormUrl = "https://forms.gle/REPLACE_WITH_YOUR_FORM_ID"; // catering form
const instagramUrl = "https://www.instagram.com/smash__lab/";
const emailAddress = "smashlab9292@gmail.com";

/* assets live in /public */
const assets = {
  logo: "/logo1.png", // my transparent logo
  hero: "/wallpaper.jpg",
};

/* brand tokens */
const brand = {
  bg: "#0c0b0a",
  text: "#fff3d7",
  accent: "#f6a700",
  accent2: "#c94d1b",
  ring: "#f6a70040",
};

/* menu data */
const menuData = {
  specials: [
    {
      name: "Classic",
      desc:
        "100% juicy grass-fed beef, onion, pickle, cheese, served with our homemade special sauce",
      prices: { single: 10.99, double: 13.99 },
      badge: "Best Seller",
    },
    {
      name: "Flamin’ Smash",
      desc:
        "Grass-fed beef, cheese, fresh jalapeños, onion, pickle, hot peppers, spicy lava sauce",
      prices: { single: 10.99, double: 13.99 },
      badge: "Spicy",
    },
    {
      name: "Bacon Super Smash",
      desc:
        "Grass-fed beef, beef bacon, double cheese, fries, onions, pickles, double homemade sauce",
      prices: { single: 12.99, double: 15.99 },
      badge: "Loaded",
    },
  ],
  mains: [
    {
      name: "Chopped Cheese",
      desc: "Seasoned beef with melted cheese, onions, pickles & house sauce",
      price: 10.99,
    },
  ],
  sides: [
    {
      name: "Seasoned Fries",
      desc: "Crispy golden fries with our homemade special sauce",
      price: 2.99,
    },
    {
      name: "Loaded Fries",
      desc: "Fries with juicy beef, melted cheese, onions, pickles & house sauce",
      price: 10.99,
    },
  ],
  drinks: [
    { name: "Mint Margarita", price: 5.99 },
    { name: "Mango Mojito", price: 5.99 },
    { name: "Soda Can / Water", price: 1.99 },
  ],
  extras: [
    { name: "Extra Sauce", price: 0.5 },
    { name: "Extra Patty", price: 1.99 },
  ],
};

/* tiny UI bits */
const Chip: React.FC<ChipProps> = ({ label }) => (
  <span
    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide"
    style={{ borderColor: brand.accent2, color: brand.text, background: "#00000040" }}
  >
    {label}
  </span>
);

const Price: React.FC<PriceProps> = ({ amount }) => (
  <span className="font-bold tracking-wide" style={{ color: brand.accent }}>
    ${amount.toFixed(2)}
  </span>
);

/* menu card (gentle reveal on scroll) */
const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const prefersReduced = useReducedMotion();
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: prefersReduced ? 0 : 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="group relative flex flex-col rounded-2xl border p-5 transition-transform hover:-translate-y-0.5 focus-within:-translate-y-0.5"
      style={{ borderColor: brand.accent2, background: "#151312" }}
    >
      <div className="mb-2 flex items-center gap-2">
        <h3 className="text-xl font-extrabold leading-tight" style={{ color: brand.text }}>
          {item.name}
        </h3>
        {item.badge && <Chip label={item.badge} />}
      </div>
      <p className="mb-4 text-sm opacity-90" style={{ color: brand.text }}>{item.desc}</p>

      {item.prices ? (
        <div className="mt-auto grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-black/30 p-3 text-center">
            <div className="text-[11px] uppercase tracking-widest opacity-70">Single</div>
            <div className="text-lg"><Price amount={item.prices.single} /></div>
          </div>
          <div className="rounded-xl bg-black/30 p-3 text-center">
            <div className="text-[11px] uppercase tracking-widest opacity-70">Double</div>
            <div className="text-lg"><Price amount={item.prices.double} /></div>
          </div>
        </div>
      ) : (
        <div className="mt-auto"><Price amount={item.price!} /></div>
      )}
    </motion.article>
  );
};

/* section wrapper (scroll offset so sticky nav doesn't cover headings) */
const Section: React.FC<SectionProps> = ({ id, eyebrow, title, children, subtitle }) => (
  <section id={id} className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-24">
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-2 text-xs uppercase tracking-[0.2em]" style={{ color: brand.accent }}>
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="text-3xl font-black sm:text-4xl" style={{ color: brand.text }}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-2 max-w-2xl text-sm opacity-80" style={{ color: brand.text }}>
          {subtitle}
        </p>
      )}
    </div>
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  </section>
);

//helper type
const ember = (base: CSSProperties, drift: string): DriftStyle => ({
  ...base,
  ["--drift"]: drift,
});

//testing with a bunch of stuff just to experiment
const FieryLogo: React.FC<FieryLogoProps> = ({ src, alt = "Smash Lab mark" }) => {
  const prefersReduced = useReducedMotion();

  // // helper to allow custom CSS var (--drift) on style objects
  // const ember = (base: CSSProperties, drift: string): CSSProperties =>
  //   ({ ...base, ["--drift" as any]: drift } as unknown as CSSProperties);

  return (
    <div className="fiery-wrap">
      {!prefersReduced && (
        <>
          {/* faint glow layer sitting behind logo */}
          <span className="flame-glow" aria-hidden="true" />

          {/* floating ember particles with different timings/drift */}
          <span
            className="ember"
            style={ember(
              { left: "30%", animationDuration: "4.2s", animationDelay: "0.2s" },
              "-10px"
            )}
          />
          <span
            className="ember"
            style={ember(
              { left: "45%", animationDuration: "5s", animationDelay: "0.8s" },
              "8px"
            )}
          />
          <span
            className="ember"
            style={ember(
              { left: "60%", animationDuration: "4.5s", animationDelay: "1.1s" },
              "-6px"
            )}
          />
          <span
            className="ember"
            style={ember(
              { left: "40%", animationDuration: "5.4s", animationDelay: "1.6s" },
              "12px"
            )}
          />
          <span
            className="ember"
            style={ember(
              { left: "70%", animationDuration: "4.8s", animationDelay: "0.5s" },
              "-34px"
            )}
          />
          <span
            className="ember"
            style={ember(
              { left: "34%", animationDuration: "6.8s", animationDelay: "0.5s" },
              "-22px"
            )}
          />
          <span
            className="ember"
            style={ember(
              { left: "5%", animationDuration: "3.8s", animationDelay: "0.15s" },
              "-32px"
            )}
          />
          <span
            className="ember"
            style={ember(
              { right: "5%", animationDuration: "5.8s", animationDelay: "0.15s" },
              "22px"
            )}
          />
          <span
            className="ember"
            style={ember(
              { right: "7%", animationDuration: "3.8s", animationDelay: "1.5s" },
              "12px"
            )}
          />
        </>
      )}
      {/* main logo image */}
      <img src={src} alt={alt} className="mb-4 h-54 w-54 rounded-full sm:h-66 sm:w-66" />
    </div>
  );
};

// decorative fries for hero — masked, subtle, responsive
const HeroDecor: React.FC<HeroDecorProps> = ({ side = "left", lighter = false }) => {
  const prefersReduced = useReducedMotion();

  const base =
    "pointer-events-none select-none hidden sm:block absolute z-[1] " +
    (lighter ? "opacity-100 md:opacity-100" : "opacity-100 md:opacity-100");

  const posSize =
    side === "left"
      ? "left-[-9vw] top-[8vw] w-[36vw] max-w-[520px] min-w-[260px] lg:w-[30vw] xl:w-[26vw]"
      : "right-[-8vw] bottom-[-1vw] w-[28vw] max-w-[420px] min-w-[200px] lg:w-[22vw] xl:w-[20vw]";

  const maskStyle: CSSProperties =
    side === "left"
      ? {
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,.65) 18%, rgba(0,0,0,1) 55%)",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,.65) 18%, rgba(0,0,0,1) 55%)",
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,.25))",
        }
      : {
          transform: "scaleX(-1)", // flip horizontally
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,.65) 18%, rgba(0,0,0,1) 55%)",
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,.65) 18%, rgba(0,0,0,1) 55%)",
          filter: "drop-shadow(0 4px 10px rgba(0,0,0,.25))",
        };

  if (prefersReduced) {
    return (
      <img
        src="/fries.png"
        alt=""
        aria-hidden="true"
        className={`${base} ${posSize}`}
        style={maskStyle}
      />
    );
  }

  return (
    <motion.img
      src="/fries.png"
      alt=""
      aria-hidden="true"
      className={`${base} ${posSize}`}
      style={maskStyle}
      initial={{ y: 0, rotate: 0 }}
      animate={{ y: [-4, -10, -4], rotate: [0, side === "left" ? -2 : 2, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

/* main app */
const SmashLabSite: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const nav = useMemo(
    () => [
      { label: "Menu", href: "#menu" },
      { label: "Catering", href: "#catering" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  const handleCatering = () => window.open(googleFormUrl, "_blank", "noopener");

  // smooth scroll handler
  const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const header = document.querySelector("header") as HTMLElement | null;
    const offset = header ? header.offsetHeight : 0;

    const y =
      window.scrollY + el.getBoundingClientRect().top - offset - 8; // tiny breathing room
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }}
      style={{
        backgroundColor: "rgba(12,11,10,0.70)", // translucent overlay so the body pattern can show
        color: brand.text,
        fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      {/* nav bar */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur supports-[backdrop-filter]:bg-black/60 bg-black/70"
        style={{ borderColor: "#2b1c16" }}
      >
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="flex items-center gap-3"
            aria-label="Smash Lab Home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
          >
            <img src={assets.logo} alt="Smash Lab Logo" className="h-11 w-11 rounded-full" />
            <span className="text-lg font-extrabold tracking-wide text-amber-500">SMASH LAB</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => handleSmoothScroll(e, n.href)}
                className="group relative text-sm font-semibold tracking-wide opacity-90 transition hover:opacity-100 focus:outline-none focus-visible:ring-2"
                style={{ color: brand.text }}
              >
                {n.label}
                <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button
              onClick={handleCatering}
              className="cursor-pointer rounded-xl px-4 py-2 text-sm font-extrabold shadow-sm transition focus:outline-none focus-visible:ring-2 hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: brand.accent2, color: brand.text }}
            >
              Book Catering
            </button>
          </div>

          <button
            className="inline-flex md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke={brand.text} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </nav>

        {mobileOpen && (
          <div className="border-t md:hidden" style={{ borderColor: "#2b1c16", background: "rgba(12,11,10,0.95)" }}>
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => {
                    handleSmoothScroll(e, n.href);
                    setMobileOpen(false);
                  }}
                  className="text-base font-semibold"
                  style={{ color: brand.text }}
                >
                  {n.label}
                </a>
              ))}
              <button
                onClick={handleCatering}
                className="cursor-pointer rounded-xl px-4 py-3 text-base font-extrabold shadow-sm"
                style={{ background: brand.accent2, color: brand.text }}
              >
                Book Catering
              </button>
            </div>
          </div>
        )}
      </header>

      {/* hero */}
      <section id="home" className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          // if I want the repeating body pattern to show through here, comment this out ↓
          //style={{ backgroundImage: `linear-gradient(rgba(12,11,10,0.45), rgba(12,11,10,0.85)), url(${assets.hero})` }}
          aria-hidden="true"
        />

        <HeroDecor side="left" />         {/* main fries on left */}
        <HeroDecor side="right" lighter /> {/* subtle fries on right */}

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mx-auto flex max-w-6xl flex-col items-center px-4 py-11 text-center sm:px-6 lg:px-8 lg:py-11 sm:py-16"
        >
          {/* fiery logo */}
          <motion.div variants={{ hidden: { opacity: 0, y:5 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <FieryLogo src={assets.logo} />
          </motion.div>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: prefersReduced ? 0 : 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="max-w-3xl text-4xl font-black sm:text-6xl"
            style={{ color: brand.text }}
          >
            Fresh. Simple. <span style={{ color: brand.accent }}>Delicious.</span>
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: prefersReduced ? 0 : 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="mt-4 max-w-2xl text-sm opacity-90 sm:text-base"
          >
            Science-backed smash burgers, crispy fries, and ice-cold drinks. Small menu. Big flavor.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: prefersReduced ? 0 : 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#menu"
              onClick={(e) => handleSmoothScroll(e, "#menu")}
              className="rounded-xl px-5 py-3 text-sm font-extrabold shadow-sm focus:outline-none focus-visible:ring-2 active:scale-[0.98] transition-transform"
              style={{ background: brand.accent, color: "#1a120b" }}
            >
              See the Menu
            </a>
            <button
              onClick={handleCatering}
              className="cursor-pointer rounded-xl border px-5 py-3 text-sm font-extrabold focus:outline-none focus-visible:ring-2 hover:-translate-y-0.5 active:translate-y-0 transition-transform"
              style={{ borderColor: brand.accent2 }}
            >
              Book Catering
            </button>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: prefersReduced ? 0 : 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-6"
          >
            {["100% Zabiha Halal", "Grass-Fed Beef", "House Special Sauce", "Hand-Smashed", "Made Hot & Fresh", "Locally Sourced"].map((f) => (
              <div key={f} className="rounded-xl border px-3 py-2 text-xs font-semibold opacity-90" style={{ borderColor: "#2b1c16", background: "#00000040" }}>
                {f}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* menu */}
      <Section
        id="menu"
        eyebrow="Menu"
        title={
          <>
            The <span style={{ color: brand.accent, fontWeight: 900 }}>Smash Lab</span> Line-Up
          </>
        }
        subtitle="Simple lineup. Maximum crave. Prices may vary by event."
      >
        <div className="mb-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* leave this empty or add a tiny note if you want */}
          <span className="text-xs opacity-60"></span>

          <a
            href="/menu.pdf"                 // rename your file in /public to menu.pdf if it has spaces
            download                          // prompts download; remove if you prefer to open in a new tab
            target="_blank"                   // open in new tab if not downloading
            rel="noopener"
            aria-label="Download the Smash Lab menu as PDF"
            className="cursor-pointer inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-extrabold shadow-sm transition focus:outline-none focus-visible:ring-2 hover:-translate-y-0.5 active:translate-y-0"
            style={{ background: brand.accent2, color: brand.text }}
          >
            {/* tiny icon + label */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mr-2" aria-hidden="true">
              <path d="M12 16V4M12 16l-3.5-3.5M12 16l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="4" y="16" width="16" height="4" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Download PDF Menu
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {menuData.specials.map((item) => (
            <MenuCard key={item.name} item={item} />
          ))}
        </div>

        {/* mains + sides */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {menuData.mains.map((item) => (
            <MenuCard key={item.name} item={item} />
          ))}
          {menuData.sides.map((item) => (
            <MenuCard key={item.name} item={item} />
          ))}
        </div>

        {/* drinks */}
        <div className="mt-12 rounded-2xl border p-6" style={{ borderColor: brand.accent2, background: "#151312" }}>
          <h3 className="mb-2 text-xl font-extrabold" style={{ color: brand.text }}>Drinks</h3>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {menuData.drinks.map((d) => (
              <li key={d.name} className="flex items-center justify-between rounded-xl bg-black/30 px-4 py-3">
                <span className="font-semibold">{d.name}</span>
                <Price amount={d.price} />
              </li>
            ))}
          </ul>
        </div>

        {/* extras */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          {menuData.extras.map((x) => (
            <Chip key={x.name} label={`${x.name} +$${x.price.toFixed(2)}`} />
          ))}
        </div>
      </Section>

      {/* catering */}
      <Section id="catering" eyebrow="Catering" title="Pop-ups, events & private catering">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-6" style={{ borderColor: brand.accent2, background: "#151312" }}>
            <h3 className="mb-2 text-xl font-extrabold" style={{ color: brand.accent }}>
                Bring Smash Lab to your event
            </h3>
            <p className="mb-4 text-sm opacity-90">
              We handle the grills, the sizzle, and the smiles. You choose the menu, we smash on-site. Perfect for campus events, festivals, office lunches and private parties.
            </p>
            <ul className="mb-6 list-inside list-disc text-sm opacity-90">
              <li>Flexible packages: burgers, fries, drinks</li>
              <li>Quick service setup with minimal footprint</li>
              <li>Transparent pricing & simple booking</li>
            </ul>
            <button
              onClick={handleCatering}
              className="cursor-pointer w-full rounded-xl px-5 py-3 text-sm font-extrabold shadow-sm focus:outline-none focus-visible:ring-2 hover:-translate-y-0.5 active:translate-y-0 transition-transform"
              style={{ background: brand.accent, color: "#1a120b" }}
            >
              Start Catering Request
            </button>
          </div>
          <div className="rounded-2xl border p-6" style={{ borderColor: brand.accent2, background: "#151312" }}>
            <h3 className="mb-2 text-xl font-extrabold" style={{ color: brand.accent }}>What we need from you</h3>
            <ol className="list-inside list-decimal space-y-2 text-sm opacity-90">
              <li>Date, time & location</li>
              <li>Estimated headcount</li>
              <li>Power/water availability (nice to have)</li>
              <li>Any venue/campus restrictions</li>
            </ol>
            <p className="mt-4 text-xs opacity-70">After you submit the form I’ll reply within 24 hours with a quote and next steps.</p>
          </div>
        </div>
      </Section>

      {/* about */}
      <Section id="about" eyebrow="Our Story" title="Smash science meets street food energy">
        <div className="grid gap-6 md:grid-cols-2">
          <p className="text-sm opacity-90">
            Smash Lab started as a pop-up passion project focused on three things: fresh ingredients, clean technique, and ridiculous flavor.
            I keep the menu tight so every order is hot, fast, and consistent. No fluff—just the chemistry of a perfect smash.
          </p>
          <div className="rounded-2xl border p-6 text-sm opacity-90" style={{ borderColor: brand.accent2, background: "#151312" }}>
            <div className="mb-3 text-xs uppercase tracking-widest" style={{ color: brand.accent }}>What makes us different</div>
            <ul className="list-inside list-disc space-y-2">
              <li>Grass-fed beef smashed to crispy-edge perfection</li>
              <li>House special sauce (the one everyone asks about)</li>
              <li>Pop-up ready: fast setup, fast service, big smiles</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* contact */}
      <Section id="contact" eyebrow="Contact" title="Say hello!">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-6" style={{ borderColor: brand.accent2, background: "#151312" }}>
            <h3 className="mb-2 text-xl font-extrabold">DM or email us!</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a className="inline-flex items-center gap-2 underline underline-offset-4" href={instagramUrl} target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="6" stroke={brand.text} strokeWidth="2" />
                  <circle cx="12" cy="12" r="5" stroke={brand.text} strokeWidth="2" />
                  <circle cx="17" cy="7" r="1.2" fill={brand.text} />
                </svg>
                Instagram
              </a>
              <a className="inline-flex items-center gap-2 underline underline-offset-4" href={`mailto:${emailAddress}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="4" stroke={brand.text} strokeWidth="2" />
                  <polyline points="4,6 12,13 20,6" stroke={brand.text} strokeWidth="2" fill="none" />
                </svg>
                {emailAddress}
              </a>
            </div>
          </div>
          <div className="rounded-2xl border p-6" style={{ borderColor: brand.accent2, background: "#151312" }}>
            <h3 className="mb-2 text-xl font-extrabold">Vendor & pop-up requests</h3>
            <p className="mb-4 text-sm opacity-90">Got a campus or festival event? We’d love to serve. Quick form below, We’ll coordinate details.</p>
            <button
              onClick={handleCatering}
              className="cursor-pointer w-full rounded-xl px-5 py-3 text-sm font-extrabold"
              style={{ background: brand.accent2, color: brand.text }}
            >
              Open Catering Form
            </button>
          </div>
        </div>
      </Section>

      {/* footer */}
      <footer className="mt-8 border-t" style={{ borderColor: "#2b1c16", background: "#000" }}>
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src={assets.logo} alt="Smash Lab" className="h-8 w-8 rounded-full" />
            <span className="text-sm opacity-80">© {new Date().getFullYear()} Smash Lab LLC. All rights reserved.</span>
          </div>
          <div className="text-xs opacity-60">
            Built by <a href="https://www.linkedin.com/in/mominimran1/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Momin Imran</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default SmashLabSite;
