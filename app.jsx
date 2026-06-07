const { useState, useEffect, useRef } = React;

/* ---------------- logo wordmark ---------------- */
function Logo() {
  return (
    <span className="logo" aria-label="KROLLEWICZ">
      KRO<span className="logo-accent">L</span>LEWICZ
    </span>
  );
}

/* ---------------- bilingual copy ---------------- */
const COPY = {
  pl: {
    marcin: "MARCIN",
    status: "DOSTĘPNY 2026 — WARSZAWA",
    nav: ["HOME", "PORTFOLIO", "ABOUT", "SERVICES", "CONTACT"],
    role: "ART DIRECTOR / VISUAL DESIGNER",
    based: "WARSZAWA, PL",
    pf: {
      kicker: "WYBRANE PRACE",
      title: "PORTFOLIO",
    },
    about: {
      kicker: "O MNIE",
      title: "ABOUT",
      bio: "Jestem <b>Marcin Królewicz</b> — projektant wizualny łączący fotografię, ruch i obrazy generowane przez AI. Buduję spójne systemy wizualne dla marek, które chcą wyróżnić się ciszą, nie hałasem.",
      stats: [
        ["DOŚWIADCZENIE", "od 2018"],
        ["KLIENCI", "40+ marek"],
        ["SPECJALIZACJA", "Brand · Motion\nAI · Kampanie"],
        ["BAZA", "Warszawa\n52.23° N"],
      ],
    },
    svc: {
      kicker: "CO ROBIĘ",
      title: "SERVICES",
      items: [
        ["AI", "Obrazy i wideo generowane sztuczną inteligencją"],
        ["PHOTO", "Fotografia produktowa, modowa, portretowa"],
        ["VIDEO", "Reel, kampanie, treści społecznościowe"],
        ["CREATIVE IDEA", "Koncepcja i kierunek kreatywny"],
        ["GRAPHIC DESIGN", "Identyfikacja, layout, typografia"],
        ["COMMERCIALS", "Reklamy i filmy komercyjne"],
        ["DIGITAL", "Strony, social, treści cyfrowe"],
      ],
    },
    contact: {
      kicker: "ZACZNIJMY",
      title: "CONTACT",
      lead: "Zostaw maila i opisz swoje zapytanie graficzne — odezwę się w ciągu 24h.",
      emailL: "TWÓJ EMAIL",
      emailPh: "twoj@email.com",
      msgL: "ZAPYTANIE",
      msgPh: "Opisz swój projekt graficzny…",
      send: "Wyślij zapytanie",
      sent: "DZIĘKUJĘ — ODEZWĘ SIĘ WKRÓTCE.",
      directK: "BEZPOŚREDNIO",
      igK: "SOCIAL",
    },
    foot: {
      menu: "MENU",
      contactH: "KONTAKT",
      socialH: "SOCIAL",
      rights: "© 2026 MARCIN KRÓLEWICZ — WSZELKIE PRAWA ZASTRZEŻONE",
      made: "PORTFOLIO GRAFICZNE / WARSZAWA",
    },
  },
  en: {
    marcin: "MARCIN",
    status: "AVAILABLE 2026 — WARSAW",
    nav: ["HOME", "PORTFOLIO", "ABOUT", "SERVICES", "CONTACT"],
    role: "ART DIRECTOR / VISUAL DESIGNER",
    based: "WARSAW, PL",
    pf: {
      kicker: "SELECTED WORK",
      title: "PORTFOLIO",
    },
    about: {
      kicker: "ABOUT",
      title: "ABOUT",
      bio: "I'm <b>Marcin Królewicz</b> — a visual designer merging photography, motion and AI-generated imagery. I build coherent visual systems for brands that want to stand out through silence, not noise.",
      stats: [
        ["EXPERIENCE", "since 2018"],
        ["CLIENTS", "40+ brands"],
        ["FOCUS", "Brand · Motion\nAI · Campaigns"],
        ["BASED IN", "Warsaw\n52.23° N"],
      ],
    },
    svc: {
      kicker: "WHAT I DO",
      title: "SERVICES",
      items: [
        ["AI", "AI-generated imagery and video"],
        ["PHOTO", "Product, fashion, portrait photography"],
        ["VIDEO", "Reels, campaigns, social content"],
        ["CREATIVE IDEA", "Concept and creative direction"],
        ["GRAPHIC DESIGN", "Identity, layout, typography"],
        ["COMMERCIALS", "Ads and commercial films"],
        ["DIGITAL", "Websites, social, digital content"],
      ],
    },
    contact: {
      kicker: "LET'S START",
      title: "CONTACT",
      lead: "Leave your email and describe your graphic inquiry — I'll reply within 24h.",
      emailL: "YOUR EMAIL",
      emailPh: "your@email.com",
      msgL: "INQUIRY",
      msgPh: "Describe your graphic project…",
      send: "Send inquiry",
      sent: "THANK YOU — I'LL BE IN TOUCH SOON.",
      directK: "DIRECT",
      igK: "SOCIAL",
    },
    foot: {
      menu: "MENU",
      contactH: "CONTACT",
      socialH: "SOCIAL",
      rights: "© 2026 MARCIN KRÓLEWICZ — ALL RIGHTS RESERVED",
      made: "GRAPHIC PORTFOLIO / WARSAW",
    },
  },
};

const ACCENTS = {
  mono: { v: "#141413", ink: "#fafafa" },
  lime: { v: "#c2e600", ink: "#141413" },
  red:  { v: "#ff4d2e", ink: "#fafafa" },
  blue: { v: "#2f6bff", ink: "#fafafa" },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "mono",
  "cursorWords": true
}/*EDITMODE-END*/;

/* ---------------- live timecode ---------------- */
function useTimecode() {
  const [tc, setTc] = useState("00:00:00:00");
  useEffect(() => {
    let f = 0;
    const id = setInterval(() => {
      f = (f + 1) % (24 * 60 * 60 * 25);
      const fr = f % 25, s = Math.floor(f / 25) % 60, m = Math.floor(f / (25 * 60)) % 60, h = Math.floor(f / (25 * 3600)) % 24;
      const p = (n) => String(n).padStart(2, "0");
      setTc(`${p(h)}:${p(m)}:${p(s)}:${p(fr)}`);
    }, 40);
    return () => clearInterval(id);
  }, []);
  return tc;
}

/* ---------------- cursor word labels ---------------- */
function CursorWords() {
  const [labels, setLabels] = useState([]);
  const idRef = useRef(0);
  const lastRef = useRef({ x: 0, y: 0, t: 0 });
  useEffect(() => {
    const words = ["oj", "oh", "aj", "hi", "ej", "hej", "o!", "ha", "no!"];
    const onMove = (e) => {
      const now = performance.now();
      const dx = e.clientX - lastRef.current.x, dy = e.clientY - lastRef.current.y;
      const dist = Math.hypot(dx, dy);
      if (now - lastRef.current.t < 240 || dist < 45) return;
      lastRef.current = { x: e.clientX, y: e.clientY, t: now };
      if (Math.random() > 0.4) return;
      const id = ++idRef.current;
      const word = words[Math.floor(Math.random() * words.length)];
      const jx = (Math.random() - 0.5) * 34, jy = 16 + Math.random() * 16;
      setLabels((ls) => [...ls, { id, x: e.clientX - dx * 1.4 + jx, y: e.clientY - dy * 1.4 + jy, word }]);
      setTimeout(() => setLabels((ls) => ls.filter((l) => l.id !== id)), 950);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div className="cursor-words" aria-hidden="true">
      {labels.map((l) => <span key={l.id} className="cw" style={{ left: l.x, top: l.y }}>{l.word}</span>)}
    </div>
  );
}

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14"></rect><path d="M3 6.5l9 6.5 9-6.5"></path></svg>
);
const IgIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4.3"></circle><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"></circle></svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="4"></rect><line x1="7.4" y1="10.6" x2="7.4" y2="16.6"></line><circle cx="7.4" cy="7.7" r="0.95" fill="currentColor" stroke="none"></circle><path d="M11 16.6 v-3.2 a2.3 2.3 0 0 1 4.6 0 V16.6"></path><line x1="11" y1="10.8" x2="11" y2="16.6"></line></svg>
);

/* ---------------- HEADER (top utility: brand + lang/social, right cluster) ---------------- */
function Header({ t, lang, setLang }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="hsocial">
          <a href="mailto:hello@krollewicz.studio" aria-label="Email"><MailIcon /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><IgIcon /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
        </div>
      </div>
      <div className="header-right">
        <div className="hlang">
          <button className={lang === "pl" ? "on" : ""} onClick={() => setLang("pl")}>PL</button>
          <span className="sep"></span>
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
      </div>
    </header>
  );
}

/* ---------------- FLOATING NAV (bottom on home -> docks at top as portfolio enters) ---------------- */
function FloatNav({ t, active, go, docked }) {
  return (
    <nav className={`floatnav ${docked ? "docked" : ""}`}>
      {t.nav.map((label, i) => (
        <button key={label} className={`hnav-item ${active === i ? "active" : ""}`} onClick={() => go(i)}>{label}</button>
      ))}
    </nav>
  );
}

/* ---------------- HOME (pinned reveal: plate retracts, video shows) ---------------- */
function Hero({ t, innerRef }) {
  return (
    <section className="home" ref={innerRef}>
      <div className="home-video-band">
        <video className="home-video fade-in" src="assets/showreel.mp4" autoPlay loop muted playsInline></video>
        <div className="home-video-fx"></div>
        <div className="home-video-grain"></div>
      </div>
      <div className="home-plate"></div>
      <div className="home-scroll">
        <span>SCROLL</span>
        <span className="line"></span>
      </div>
    </section>
  );
}

/* ---------------- PORTFOLIO lives in portfolio.jsx (window.Portfolio) ---------------- */

/* ---------------- ABOUT ---------------- */
function About({ t, innerRef }) {
  return (
    <section className="block" id="about" ref={innerRef}>
      <div className="about-wrap">
        <div className="about-photo reveal">
          <image-slot id="about-portrait" shape="rect" placeholder="Upuść zdjęcie portretowe"></image-slot>
        </div>
        <div className="about-copy reveal" style={{ transitionDelay: "0.1s" }}>
          <p className="about-bio" dangerouslySetInnerHTML={{ __html: t.about.bio }}></p>
          <div className="about-stats">
            {t.about.stats.map(([k, v], i) => (
              <div className="cell" key={i}>
                <span className="k">{k}</span>
                <span className="v">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
function Services({ t, innerRef }) {
  return (
    <section className="block" id="services" ref={innerRef}>
      <div className="svc-list">
        {t.svc.items.map(([name, desc], i) => (
          <div className="svc-row reveal" key={name} style={{ transitionDelay: `${i * 0.04}s` }}>
            <span className="svc-no">{String(i + 1).padStart(2, "0")}</span>
            <span className="svc-name">{name}</span>
            <span className="svc-desc">{desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact({ t, innerRef }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Zapytanie graficzne — KROLLEWICZ");
    const body = encodeURIComponent(`${msg}\n\n— ${email}`);
    window.location.href = `mailto:hello@krollewicz.studio?subject=${subject}&body=${body}`;
    setSent(true);
  };
  return (
    <section className="block" id="contact" ref={innerRef}>
      <div className="contact-wrap">
        <div className="reveal">
          <p className="contact-lead">{t.contact.lead}</p>
          <div className="contact-meta">
            <a href="mailto:hello@krollewicz.studio"><span className="k">{t.contact.directK}</span> hello@krollewicz.studio</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><span className="k">{t.contact.igK}</span> @krollewicz</a>
          </div>
        </div>
        <form className="form reveal" style={{ transitionDelay: "0.1s" }} onSubmit={submit}>
          <div className="field">
            <label>{t.contact.emailL}</label>
            <input type="email" required placeholder={t.contact.emailPh} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>{t.contact.msgL}</label>
            <textarea rows="4" required placeholder={t.contact.msgPh} value={msg} onChange={(e) => setMsg(e.target.value)}></textarea>
          </div>
          <button className="form-send" type="submit">{t.contact.send} <span className="a">→</span></button>
          {sent && <div className="form-sent">{t.contact.sent}</div>}
        </form>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer({ t, go }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h4>{t.foot.menu}</h4>
          {t.nav.map((label, i) => <a key={label} href="#" onClick={(e) => { e.preventDefault(); go(i); }}>{label}</a>)}
        </div>
        <div className="footer-col">
          <h4>{t.foot.contactH}</h4>
          <a href="mailto:hello@krollewicz.studio">hello@krollewicz.studio</a>
          <p>{t.based}</p>
        </div>
        <div className="footer-col">
          <h4>{t.foot.socialH}</h4>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href="https://behance.net" target="_blank" rel="noreferrer">Behance ↗</a>
        </div>
      </div>
      <div className="footer-wordmark">kro<span className="logo-accent">l</span>lewicz</div>
      <div className="footer-base">
        <span>{t.foot.rights}</span>
        <span>{t.foot.made}</span>
      </div>
    </footer>
  );
}

/* ---------------- toast (new-project detection) ---------------- */
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div className="toast" key={msg.id}>
      <span className="toast-dot"></span>
      <span className="toast-k mono">{msg.k}</span>
      <span className="toast-v">{msg.v}</span>
    </div>
  );
}

/* ---------------- APP ---------------- */
function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState("pl");
  const [active, setActive] = useState(0);
  const [docked, setDocked] = useState(false);
  const t = COPY[lang];
  const acc = ACCENTS[tw.accent] || ACCENTS.mono;

  const { projects, newIds, sync, simulate } = usePortfolioSync();
  const [lb, setLb] = useState(null);
  const [lbIndex, setLbIndex] = useState(0);
  const [toast, setToast] = useState(null);
  const seenNew = useRef(new Set());

  const refs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const openLb = (project, idx) => { setLb(project); setLbIndex(idx || 0); };

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", acc.v);
    document.documentElement.style.setProperty("--accent-ink", acc.ink);
    document.documentElement.lang = lang;
  }, [acc, lang]);

  /* surface a toast the first time a project id is flagged new */
  useEffect(() => {
    const fresh = newIds.find((id) => !seenNew.current.has(id));
    if (!fresh) return;
    seenNew.current.add(fresh);
    const p = projects.find((x) => x.id === fresh);
    const id = Date.now();
    setToast({ id, k: lang === "pl" ? "WYKRYTO NOWY PROJEKT" : "NEW PROJECT DETECTED", v: p ? p.title : fresh });
    const tm = setTimeout(() => setToast((cur) => (cur && cur.id === id ? null : cur)), 5200);
    return () => clearTimeout(tm);
  }, [newIds, projects, lang]);

  /* active-section highlight + scroll-driven fallback for older engines */
  useEffect(() => {
    const supportsST = window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()");
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vh = window.innerHeight;
        const probe = vh * 0.42;
        let cur = 0;
        refs.forEach((r, i) => { if (r.current && r.current.getBoundingClientRect().top <= probe) cur = i; });
        setActive(cur);
        // nav snap threshold: dock once the portfolio is ~halfway into view
        const pf0 = refs[1].current;
        if (pf0) {
          const top0 = pf0.getBoundingClientRect().top;
          const dprog = (vh - top0) / (vh * 0.85);
          setDocked(dprog > 0.5);
        }
        // parallax: footer wordmark drifts right over the final stretch of the page
        const fw = document.querySelector(".footer-wordmark");
        const maxS = document.documentElement.scrollHeight - window.innerHeight;
        if (fw && maxS > 0) {
          const sp = window.scrollY / maxS;
          const fp = Math.max(0, Math.min(1, (sp - 0.74) / 0.26));
          fw.style.transform = `translateX(${(-9 + fp * 26).toFixed(2)}%)`;
        }
        // Always drive --dock / --hp from JS as a robust fallback. When the CSS
        // scroll/view timeline is active it overrides these inline values (the
        // animation wins the cascade); when the timeline can't resolve, JS keeps
        // the logo morph + plate reveal alive.
        {
          const y = window.scrollY;
          const pf = refs[1].current;
          let d = 0;
          if (pf) { const top = pf.getBoundingClientRect().top; d = Math.max(0, Math.min(1, (vh - top) / (vh * 0.85))); }
          // plate retraction is synced to the logo morph so the wordmark rides the
          // light plate down and settles onto the pinned top bar in the final phase
          document.documentElement.style.setProperty("--hp", d.toFixed(3));
          document.documentElement.style.setProperty("--dock", d.toFixed(3));
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  /* reveal on scroll (non scroll-timeline elements) */
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.14 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang, projects]);

  /* parallax on the home video */
  useEffect(() => {
    let raf = 0, last = null;
    const apply = () => {
      raf = 0; if (!last) return;
      const hero = refs[0].current;
      if (hero) {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--px", ((last.clientX / window.innerWidth) - 0.5).toFixed(3));
        hero.style.setProperty("--py", (((last.clientY - r.top) / r.height) - 0.5).toFixed(3));
      }
    };
    const move = (e) => { last = e; if (!raf) raf = requestAnimationFrame(apply); };
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  const go = (i) => {
    const el = refs[i].current;
    if (!el) return;
    const y = i === 0 ? 0 : window.scrollY + el.getBoundingClientRect().top - 66;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <Header t={t} lang={lang} setLang={setLang} />
      <div className="home-mark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <span className="home-name">kro<span style={{ color: "var(--accent)" }}>l</span>lewicz</span>
        <span className="home-sub">marcin<span className="dot">.</span></span>
      </div>
      <FloatNav t={t} active={active} go={go} docked={docked} />
      <Hero t={t} innerRef={refs[0]} />
      <div className="reveal-spacer"></div>
      <div className="curtain">
        <Portfolio t={t} lang={lang} innerRef={refs[1]} sync={sync} projects={projects} newIds={newIds} onOpen={openLb} onContact={() => go(4)} />
        <About t={t} innerRef={refs[2]} />
        <Services t={t} innerRef={refs[3]} />
        <Contact t={t} innerRef={refs[4]} />
        <Footer t={t} go={go} />
      </div>
      <div className="frame-border"></div>
      {tw.cursorWords && <CursorWords />}
      <Toast msg={toast} />
      <Lightbox project={lb} index={lbIndex} setIndex={setLbIndex} onClose={() => setLb(null)} lang={lang} />

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
        <TweakToggle label="Etykiety kursora" value={tw.cursorWords} onChange={(v) => setTweak("cursorWords", v)} />
        <TweakSection label="Portfolio / auto-sync" />
        <TweakButton label={lang === "pl" ? "Symuluj wgranie projektu" : "Simulate upload"} onClick={() => simulate()} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
