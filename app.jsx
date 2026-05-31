const { useState, useEffect, useRef } = React;

/* ---------------- logo wordmark ---------------- */
function Logo({ large }) {
  return (
    <span className={`logo ${large ? "lg" : ""}`} aria-label="KROLLEWICZ">
      KRO<span className="logo-accent">L</span>LEWICZ
    </span>
  );
}

/* ---------------- bilingual copy ---------------- */
const COPY = {
  pl: {
    brandSub: "MIŁO\nCIĘ\nWIDZIEĆ",
    nav: ["HOME", "PORTFOLIO", "ABOUT", "SERVICES", "CONTACT"],
    reel: "REEL — WYBRANE 2024 / 25",
    loop: "LOOP",
    playCap1: "showreel.loop.mp4",
    playCap2: "upuść zapętlone wideo · 1920×1080 · bez dźwięku",
    status: "DOSTĘPNY DO ZLECEŃ — 2025",
    boxHead: ["Obraz, który", "się <em>nie</em> zatrzymuje."],
    boxLede: "<b>KROLLEWICZ</b> — projektant wizualny łączący fotografię, ruch i obrazy generowane przez AI.",
    headline: ["Obraz, który", "się <em>nie</em>", "zatrzymuje."],
    lede: "Jestem KROLLEWICZ — projektant wizualny łączący fotografię, ruch i obrazy generowane przez AI. Buduję spójne systemy wizualne dla marek, które chcą wyróżnić się ciszą, a nie hałasem.",
    indexH: "WYBRANE PRACE / KATEGORIE",
    index: [
      { name: "Fotografia", count: "24 ↗" },
      { name: "Wideo / Loop", count: "12 ↗" },
      { name: "Grafiki AI", count: "31 ↗" },
      { name: "Reklamy / Kampanie", count: "09 ↗" },
    ],
    cta: "Zobacz pełne portfolio",
    book: "Umów konsultację",
    aboutLabel: "O MNIE",
    navKicker: "— MENU —",
    pg: {
      portfolio: "WYBRANE PRACE",
      aboutTitle: "O MNIE",
      aboutBio: "Marcin Królewicz — projektant wizualny łączący fotografię, ruch i obrazy generowane przez AI. Tworzę spójne systemy wizualne dla marek, które chcą wyróżnić się ciszą, nie hałasem.",
      servicesTitle: "USŁUGI",
      contactTitle: "ZACZNIJMY",
      contactLead: "Zostaw maila i opisz zapytanie graficzne — odezwę się w ciągu 24h.",
      emailPh: "twój@email.com",
      msgPh: "Opisz swój projekt graficzny…",
      send: "Wyślij zapytanie",
      sent: "Dziękuję! Odezwę się wkrótce.",
      services: [
        { n: "AI", d: "Obrazy i wideo generowane sztuczną inteligencją" },
        { n: "PHOTO", d: "Fotografia produktowa, modowa, portretowa" },
        { n: "VIDEO", d: "Reel, kampanie, treści społecznościowe" },
        { n: "CREATIVE IDEA", d: "Koncepcja i kierunek kreatywny" },
        { n: "GRAPHIC DESIGN", d: "Identyfikacja, layout, typografia" },
        { n: "COMMERCIALS", d: "Reklamy i filmy komercyjne" },
        { n: "DIGITAL", d: "Strony, social, treści cyfrowe" },
      ],
    },
    bento: {
      role: ["ROLA", "Art Director\n& Visual Designer"],
      based: ["LOKALIZACJA", "Warszawa, PL\n52.23° N"],
      clients: ["KLIENCI", "40+"],
      since: ["OD", "2018"],
      focus: ["SPECJALIZACJA", "Brand · Motion · AI Imagery · Kampanie"],
    },
    miniH: "MENU",
    foot: "DOSTĘPNY 2025",
  },
  en: {
    brandSub: "NICE\nTO\nSEE\nYOU",
    nav: ["HOME", "PORTFOLIO", "ABOUT", "SERVICES", "CONTACT"],
    reel: "REEL — SELECTED 2024 / 25",
    loop: "LOOP",
    playCap1: "showreel.loop.mp4",
    playCap2: "drop a looping video · 1920×1080 · muted",
    status: "AVAILABLE FOR WORK — 2025",
    boxHead: ["The image that", "never <em>stops</em> moving."],
    boxLede: "<b>KROLLEWICZ</b> — visual designer merging photography, motion and AI-generated imagery.",
    headline: ["The image that", "never <em>stops</em>", "moving."],
    lede: "I'm KROLLEWICZ — a visual designer merging photography, motion and AI-generated imagery. I build coherent visual systems for brands that want to stand out through silence, not noise.",
    indexH: "SELECTED WORK / CATEGORIES",
    index: [
      { name: "Photography", count: "24 ↗" },
      { name: "Video / Loop", count: "12 ↗" },
      { name: "AI Graphics", count: "31 ↗" },
      { name: "Ads / Campaigns", count: "09 ↗" },
    ],
    cta: "View full portfolio",
    book: "Book a consultation",
    aboutLabel: "ABOUT",
    navKicker: "— MENU —",
    pg: {
      portfolio: "SELECTED WORK",
      aboutTitle: "ABOUT",
      aboutBio: "Marcin Królewicz — a visual designer merging photography, motion and AI-generated imagery. I build coherent visual systems for brands that want to stand out through silence, not noise.",
      servicesTitle: "SERVICES",
      contactTitle: "LET’S START",
      contactLead: "Leave your email and describe your graphic inquiry — I’ll reply within 24h.",
      emailPh: "your@email.com",
      msgPh: "Describe your graphic project…",
      send: "Send inquiry",
      sent: "Thank you! I’ll be in touch soon.",
      services: [
        { n: "AI", d: "AI-generated imagery and video" },
        { n: "PHOTO", d: "Product, fashion, portrait photography" },
        { n: "VIDEO", d: "Reels, campaigns, social content" },
        { n: "CREATIVE IDEA", d: "Concept and creative direction" },
        { n: "GRAPHIC DESIGN", d: "Identity, layout, typography" },
        { n: "COMMERCIALS", d: "Ads and commercial films" },
        { n: "DIGITAL", d: "Websites, social, digital content" },
      ],
    },
    bento: {
      role: ["ROLE", "Art Director\n& Visual Designer"],
      based: ["BASED IN", "Warsaw, PL\n52.23° N"],
      clients: ["CLIENTS", "40+"],
      since: ["SINCE", "2018"],
      focus: ["FOCUS", "Brand · Motion · AI Imagery · Campaigns"],
    },
    miniH: "MENU",
    foot: "AVAILABLE 2025",
  },
};

const ACCENTS = {
  mono: { v: "#141413", ink: "#fafafa", label: "MONO" },
  lime: { v: "#c2e600", ink: "#141413", label: "LIME" },
  red:  { v: "#ff4d2e", ink: "#fafafa", label: "RED" },
  blue: { v: "#2f6bff", ink: "#fafafa", label: "BLUE" },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "mono",
  "rightLayout": "stats",
  "navStyle": "plain",
  "gridTexture": true
}/*EDITMODE-END*/;

/* ---------------- live timecode ---------------- */
function useTimecode() {
  const [tc, setTc] = useState("00:00:00:00");
  useEffect(() => {
    let f = 0;
    const id = setInterval(() => {
      f = (f + 1) % (24 * 60 * 60 * 25);
      const fr = f % 25;
      const s = Math.floor(f / 25) % 60;
      const m = Math.floor(f / (25 * 60)) % 60;
      const h = Math.floor(f / (25 * 3600)) % 24;
      const p = (n) => String(n).padStart(2, "0");
      setTc(`${p(h)}:${p(m)}:${p(s)}:${p(fr)}`);
    }, 40);
    return () => clearInterval(id);
  }, []);
  return tc;
}

function useClock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = (n) => String(n).padStart(2, "0");
      setNow(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/* ---------------- NAV (bottom dock) ---------------- */
function Nav({ t, lang, setLang, active, setActive }) {
  return (
    <nav className="nav-center">
      <div className="nav-stack">
        {t.nav.map((label, i) => (
          <button
            key={label}
            className={`nav-v-item reveal ${active === i ? "active" : ""}`}
            style={{ animationDelay: `${0.26 + i * 0.05}s` }}
            onClick={() => setActive(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <CornerUtility lang={lang} setLang={setLang} />
    </nav>
  );
}

function AboutSquare({ t }) {
  const b = t.bento;
  return (
    <div className="about-square reveal" style={{ animationDelay: "0.34s" }}>
      <span className="sq-tick tl"></span>
      <span className="sq-tick br"></span>
      <span className="as-label mono">{t.aboutLabel}</span>
      <div className="as-body">
        <div className="as-name">Marcin<br />Królewicz</div>
        <div className="as-meta">
          <div className="as-row"><span className="k mono">{b.role[0]}</span><span className="v">Art Director / Visual Designer</span></div>
          <div className="as-row"><span className="k mono">{b.based[0]}</span><span className="v">Warszawa, PL</span></div>
        </div>
      </div>
      <button className="as-btn">{t.book} <span className="a">→</span></button>
    </div>
  );
}

function CursorWords() {
  const [labels, setLabels] = useState([]);
  const idRef = useRef(0);
  const lastRef = useRef({ x: 0, y: 0, t: 0 });
  useEffect(() => {
    const words = ["oj", "oh", "aj", "hi", "ej", "hej", "o!", "ha", "no!"];
    const onMove = (e) => {
      const now = performance.now();
      const dx = e.clientX - lastRef.current.x;
      const dy = e.clientY - lastRef.current.y;
      const dist = Math.hypot(dx, dy);
      if (now - lastRef.current.t < 240) return;
      if (dist < 45) return;
      lastRef.current = { x: e.clientX, y: e.clientY, t: now };
      if (Math.random() > 0.4) return;
      const id = ++idRef.current;
      const word = words[Math.floor(Math.random() * words.length)];
      const jx = (Math.random() - 0.5) * 34;
      const jy = 16 + Math.random() * 16;
      setLabels((ls) => [...ls, { id, x: e.clientX - dx * 1.4 + jx, y: e.clientY - dy * 1.4 + jy, word }]);
      setTimeout(() => setLabels((ls) => ls.filter((l) => l.id !== id)), 950);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div className="cursor-words" aria-hidden="true">
      {labels.map((l) => (
        <span key={l.id} className="cw" style={{ left: l.x, top: l.y }}>{l.word}</span>
      ))}
    </div>
  );
}

/* ---------------- STAGE / VIDEO ---------------- */
function Stage({ t }) {
  const tc = useTimecode();
  return (
    <section className="stage">
      <div className="video-full fade-in" style={{ animationDelay: "0.2s" }}>
        <video
          className="video-el"
          src="assets/showreel.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <span className="ov ov-tc mono">{tc}</span>
      </div>
    </section>
  );
}

/* ---------------- Swiss grid + Future UI overlays ---------------- */
function GridOverlay() {
  return <div className="grid-overlay" aria-hidden="true"></div>;
}

function HUD() {
  return (
    <div className="hud" aria-hidden="true">
      <span className="hud-corner tl"></span>
      <span className="hud-corner tr"></span>
      <span className="hud-corner bl"></span>
      <span className="hud-corner br"></span>
      <span className="cross" style={{ left: "33.333%", top: "30%" }}></span>
      <span className="cross" style={{ left: "66.666%", top: "70%" }}></span>
    </div>
  );
}

/* ---------------- cursor effects (reticle + parallax + glow) ---------------- */
function CursorFX() {
  const ref = useRef(null);
  const [p, setP] = useState({ x: -200, y: -200, on: false, w: 1, h: 1 });
  useEffect(() => {
    const el = ref.current;
    const main = el && el.parentElement;
    if (!main) return;
    let raf = 0, last = null;
    const apply = () => {
      raf = 0;
      if (!last) return;
      const r = main.getBoundingClientRect();
      const x = last.clientX - r.left, y = last.clientY - r.top;
      const on = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      main.style.setProperty("--px", ((x / r.width) - 0.5).toFixed(3));
      main.style.setProperty("--py", ((y / r.height) - 0.5).toFixed(3));
      setP({ x, y, on, w: r.width, h: r.height });
    };
    const move = (e) => { last = e; if (!raf) raf = requestAnimationFrame(apply); };
    const leave = () => setP((s) => ({ ...s, on: false }));
    window.addEventListener("mousemove", move);
    main.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      main.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);
  const cx = p.w ? Math.round((p.x / p.w) * 1000) : 0;
  const cy = p.h ? Math.round((p.y / p.h) * 1000) : 0;
  const pad = (n) => String(Math.max(0, Math.min(1000, n))).padStart(4, "0");
  return (
    <div className={`cursorfx ${p.on ? "on" : ""}`} ref={ref} aria-hidden="true">
      <span className="cfx-glow" style={{ left: p.x, top: p.y }}></span>
      <span className="cfx-v" style={{ left: p.x }}></span>
      <span className="cfx-h" style={{ top: p.y }}></span>
      <span className="cfx-dot" style={{ left: p.x, top: p.y }}></span>
      <span className="cfx-read" style={{ left: p.x, top: p.y }}>X{pad(cx)} · Y{pad(cy)}</span>
    </div>
  );
}

function CornerUtility({ lang, setLang }) {
  return (
    <div className="corner-utility">
      <div className="nav-social">
        <a href="mailto:hello@krollewicz.studio" aria-label="Email">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14"></rect><path d="M3 6.5l9 6.5 9-6.5"></path></svg>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4.3"></circle><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"></circle></svg>
        </a>
      </div>
      <div className="lang-toggle">
        <button className={`lang-btn ${lang === "pl" ? "on" : ""}`} onClick={() => setLang("pl")}>PL</button>
        <span className="lang-sep"></span>
        <button className={`lang-btn ${lang === "en" ? "on" : ""}`} onClick={() => setLang("en")}>EN</button>
      </div>
    </div>
  );
}

/* ---------------- SQUARE BOX CONTENT (3 variants) ---------------- */
function SquareEditorial({ t }) {
  return (
    <>
      <h2 className="sq-head reveal" style={{ animationDelay: "0.2s" }}>
        {t.boxHead.map((line, i) => (
          <span key={i} style={{ display: "block" }} dangerouslySetInnerHTML={{ __html: line }}></span>
        ))}
      </h2>
      <div className="sq-foot reveal" style={{ animationDelay: "0.28s" }}>
        <p className="sq-lede" dangerouslySetInnerHTML={{ __html: t.boxLede }}></p>
        <button className="sq-link">{t.cta} <span className="a">→</span></button>
      </div>
    </>
  );
}

function SquareStats({ t }) {
  const b = t.bento;
  return (
    <>
      <div className="sq-info reveal" style={{ animationDelay: "0.2s" }}>
        <div className="sq-row">
          <span className="k mono">{b.role[0]}</span>
          <span className="v" style={{ whiteSpace: "pre-line" }}>{b.role[1]}</span>
        </div>
        <div className="sq-row">
          <span className="k mono">{b.based[0]}</span>
          <span className="v" style={{ whiteSpace: "pre-line" }}>{b.based[1]}</span>
        </div>
      </div>
      <div className="sq-actions reveal" style={{ animationDelay: "0.3s" }}>
        <button className="sq-link">{t.cta} <span className="a">→</span></button>
        <button className="sq-btn">{t.book} <span className="a">→</span></button>
      </div>
    </>
  );
}

function SquareMinimal({ t }) {
  return (
    <>
      <div className="reveal" style={{ animationDelay: "0.2s" }}>
        <Logo />
      </div>
      <div className="sq-foot reveal" style={{ animationDelay: "0.28s" }}>
        <p className="sq-lede" dangerouslySetInnerHTML={{ __html: t.boxLede }}></p>
        <button className="sq-link">{t.cta} <span className="a">→</span></button>
      </div>
    </>
  );
}

function SquareBox({ t, layout }) {
  return (
    <div className="square reveal" style={{ animationDelay: "0.12s" }}>
      <span className="sq-tick tl"></span>
      <span className="sq-tick tr"></span>
      <span className="sq-tick bl"></span>
      <span className="sq-tick br"></span>
      <div className="sq-hud">
        <span className="live">●</span>{t.status}
      </div>
      <div className="sq-content">
        {layout === "editorial" && <SquareEditorial t={t} />}
        {layout === "stats" && <SquareStats t={t} />}
        {layout === "minimal" && <SquareMinimal t={t} />}
      </div>
    </div>
  );
}

/* ---------------- APP ---------------- */
function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState("pl");
  const [active, setActive] = useState(0);
  const t = COPY[lang];

  const acc = ACCENTS[tw.accent] || ACCENTS.mono;
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", acc.v);
    document.documentElement.style.setProperty("--accent-ink", acc.ink);
    document.documentElement.lang = lang;
  }, [acc, lang]);

  useEffect(() => {
    const shell = document.querySelector(".shell");
    if (!shell) return;
    const COLORS = ["#ffffff", "#15c7f5", "#c2e600", "#ff4d2e", "#2f6bff", "#ff3da1", "#ffd23d", "#a78bfa", "#36e0a0"];
    let raf = 0, last = null, lastColorT = 0;
    const apply = () => {
      raf = 0;
      if (!last) return;
      const px = (last.clientX / window.innerWidth - 0.5);
      const py = (last.clientY / window.innerHeight - 0.5);
      shell.style.setProperty("--px", px.toFixed(3));
      shell.style.setProperty("--py", py.toFixed(3));
    };
    const move = (e) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
      const now = performance.now();
      if (now - lastColorT > 70) {
        lastColorT = now;
        const c = COLORS[Math.floor(Math.random() * COLORS.length)];
        const logo = document.querySelector(".logo-top .logo");
        if (logo) {
          logo.style.color = c;
          const acc = logo.querySelector(".logo-accent");
          if (acc) acc.style.color = c;
        }
      }
    };
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="shell">
      <Stage t={t} />
      {tw.gridTexture && <GridOverlay />}
      <div className="frame" aria-hidden="true"></div>
      <div className="greeting">
        <span className="greet-text">{t.brandSub}</span>
        <svg className="crown" viewBox="0 0 100 56" aria-hidden="true"><polygon points="3,54 7,6 37,30 54,4 66,28 95,7 98,54" fill="#ffffff"></polygon></svg>
      </div>
      <div className="logo-top fade-in" style={{ animationDelay: "0.1s" }}><Logo /></div>
      <Nav t={t} lang={lang} setLang={setLang} active={active} setActive={setActive} />
      <AboutSquare t={t} />
      <CursorWords />

      <TweaksPanel>
        <TweakSection label="Wygląd" />
        <TweakColor
          label="Akcent"
          value={acc.v}
          options={[ACCENTS.mono.v, ACCENTS.lime.v, ACCENTS.red.v, ACCENTS.blue.v]}
          onChange={(v) => {
            const key = Object.keys(ACCENTS).find((k) => ACCENTS[k].v === v) || "mono";
            setTweak("accent", key);
          }}
        />
        <TweakToggle
          label="Siatka Swiss"
          value={tw.gridTexture}
          onChange={(v) => setTweak("gridTexture", v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
