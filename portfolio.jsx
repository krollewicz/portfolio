/* =========================================================================
   PORTFOLIO — manifest-driven, auto-syncing grid + full-size lightbox
   Loads portfolio/manifest.json and POLLS it. When the server index gains
   a new project, its thumbnail animates in with a NEW badge + toast.
   Clicking any thumbnail opens the full-size lightbox gallery.
   ========================================================================= */
const { useState: pUseState, useEffect: pUseEffect, useRef: pUseRef, useCallback: pUseCallback } = React;

const PF_POLL_MS = 5000;

/* a demo project used only by the "simulate upload" tweak button, so the
   auto-detect animation can be previewed without editing files on a server */
const PF_DEMO = {
  id: "amelia_editorial",
  title: "Amelia — Editorial Cut",
  client: "AA Wings of Color",
  category: "PHOTO / EDITORIAL",
  year: "2025",
  ratio: "0.667",
  feature: false,
  cover: "portfolio/ciao_bella/thumbs/amelia_1925.jpg",
  images: [
    { thumb: "portfolio/ciao_bella/thumbs/amelia_1925.jpg", full: "portfolio/ciao_bella/full/amelia_1925.jpg" },
    { thumb: "portfolio/ciao_bella/thumbs/amelia_1184.jpg", full: "portfolio/ciao_bella/full/amelia_1184.jpg" },
    { thumb: "portfolio/ciao_bella/thumbs/amelia_525.jpg", full: "portfolio/ciao_bella/full/amelia_525.jpg" }
  ]
};

/* ---------------- auto-sync hook ---------------- */
function usePortfolioSync() {
  const [projects, setProjects] = pUseState([]);
  const [newIds, setNewIds] = pUseState([]);
  const [sync, setSync] = pUseState({ state: "idle", at: null, count: 0 });
  const known = pUseRef(new Set());
  const first = pUseRef(true);
  const injected = pUseRef([]); // client-side simulated projects

  const flagNew = pUseCallback((ids) => {
    if (!ids.length) return;
    setNewIds((cur) => [...new Set([...cur, ...ids])]);
    ids.forEach((id) =>
      setTimeout(() => setNewIds((cur) => cur.filter((x) => x !== id)), 14000)
    );
  }, []);

  const merge = pUseCallback((serverList) => {
    const list = [...serverList, ...injected.current];
    const fresh = list.filter((p) => !known.current.has(p.id));
    if (fresh.length && !first.current) flagNew(fresh.map((p) => p.id));
    list.forEach((p) => known.current.add(p.id));
    first.current = false;
    setProjects(list);
    return list.length;
  }, [flagNew]);

  const poll = pUseCallback(async () => {
    setSync((s) => ({ ...s, state: "checking" }));
    try {
      const res = await fetch("portfolio/manifest.json", { cache: "no-store" });
      if (!res.ok) throw new Error("no manifest");
      const data = await res.json();
      const count = merge(data.projects || []);
      setSync({ state: "ok", at: new Date(), count });
    } catch (e) {
      // offline / file:// — fall back to whatever we already have
      setSync((s) => ({ ...s, state: "offline", at: new Date() }));
    }
  }, [merge]);

  pUseEffect(() => {
    poll();
    const id = setInterval(poll, PF_POLL_MS);
    return () => clearInterval(id);
  }, [poll]);

  // simulate a new project landing on the server
  const simulate = pUseCallback(() => {
    if (known.current.has(PF_DEMO.id)) return false;
    injected.current = [...injected.current, PF_DEMO];
    merge(projects.filter((p) => !injected.current.includes(p)));
    setSync((s) => ({ ...s, state: "ok", at: new Date(), count: s.count + 1 }));
    return true;
  }, [merge, projects]);

  return { projects, newIds, sync, simulate, poll };
}

/* ---------------- sync status pill ---------------- */
function SyncPill({ sync, lang }) {
  const txt = {
    pl: { sync: "AUTO-SYNC", chk: "SPRAWDZAM…", off: "TRYB OFFLINE", proj: "PROJEKTY", upd: "ZAKTUALIZOWANO" },
    en: { sync: "AUTO-SYNC", chk: "CHECKING…", off: "OFFLINE MODE", proj: "PROJECTS", upd: "LAST SYNC" },
  }[lang];
  const time = sync.at
    ? sync.at.toLocaleTimeString(lang === "pl" ? "pl-PL" : "en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "—";
  return (
    <div className={`sync-pill ${sync.state}`} title={txt.upd + " " + time}>
      <span className="sync-dot"></span>
      <span className="sync-label">{sync.state === "checking" ? txt.chk : sync.state === "offline" ? txt.off : txt.sync}</span>
      <span className="sync-sep"></span>
      <span className="sync-count">{String(sync.count).padStart(2, "0")} {txt.proj}</span>
      <span className="sync-time">{time}</span>
    </div>
  );
}

/* ---------------- card video cover: 5s muted loop ---------------- */
function CardVideo({ src }) {
  const ref = pUseRef(null);
  pUseEffect(() => {
    const v = ref.current;
    if (!v) return;
    const cap = () => { if (v.currentTime >= 5) v.currentTime = 0; };
    const play = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    v.addEventListener("timeupdate", cap);
    if (v.readyState >= 2) play(); else v.addEventListener("loadeddata", play, { once: true });
    return () => v.removeEventListener("timeupdate", cap);
  }, [src]);
  return <video ref={ref} src={src} muted loop playsInline preload="metadata"></video>;
}

/* ---------------- project card ---------------- */
function pfPlural(n, forms) {
  // forms: [one, few, many]  e.g. ['klip','klipy','klipów']
  const m10 = n % 10, m100 = n % 100;
  if (n === 1) return forms[0];
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return forms[1];
  return forms[2];
}
function ProjectCard({ project, index, isNew, lang, onOpen }) {
  const imgN = project.images.length;
  const isVideo = project.coverType === "video";
  const label = lang === "pl"
    ? (isVideo ? pfPlural(imgN, ["klip", "klipy", "klipów"]) : pfPlural(imgN, ["obraz", "obrazy", "obrazów"]))
    : (isVideo ? (imgN === 1 ? "clip" : "clips") : (imgN === 1 ? "image" : "images"));
  return (
    <button
      className={`pfg-card ${project.wide ? "wide" : ""} ${isNew ? "is-new" : ""}`}
      style={{ "--i": index }}
      onClick={() => onOpen(project, 0)}
      aria-label={project.title}
    >
      <span className="pfg-media">
        {isVideo
          ? <CardVideo src={project.cover} />
          : <img src={project.cover} alt={project.title} loading="lazy" draggable="false" />}
      </span>
      <span className="pfg-ix mono">{String(index + 1).padStart(2, "0")}</span>
      {isVideo && <span className="pfg-play" aria-hidden="true">▶</span>}
      {isNew && <span className="pfg-new mono">{lang === "pl" ? "NOWY" : "NEW"}</span>}
      <span className="pfg-grad"></span>
      <span className="pfg-meta">
        <span className="pfg-cat mono">{project.category}</span>
        <span className="pfg-title">{project.title}</span>
        <span className="pfg-foot">
          <span className="pfg-count mono">{imgN} {label}</span>
          <span className="pfg-open mono">{lang === "pl" ? "OTWÓRZ" : "OPEN"} <span className="ar">↗</span></span>
        </span>
      </span>
    </button>
  );
}

/* ---------------- lightbox (full-size gallery) ---------------- */
function Lightbox({ project, index, setIndex, onClose, lang }) {
  const [zoom, setZoom] = pUseState(false);
  const total = project ? project.images.length : 0;

  pUseEffect(() => { setZoom(false); }, [index, project]);

  pUseEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
      else if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; };
  }, [project, total, onClose, setIndex]);

  if (!project) return null;
  const img = project.images[index];
  const isVid = img.type === "video";
  return (
    <div className="lb" onClick={onClose}>
      <div className="lb-top" onClick={(e) => e.stopPropagation()}>
        <div className="lb-id">
          <span className="lb-cat mono">{project.category}</span>
          <span className="lb-title">{project.title}</span>
          <span className="lb-client mono">{project.client} · {project.year}</span>
        </div>
        <div className="lb-tools">
          <span className="lb-counter mono">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          <button className="lb-x" onClick={onClose} aria-label="Close">✕</button>
        </div>
      </div>

      <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
        <button className="lb-nav prev" onClick={() => setIndex((i) => (i - 1 + total) % total)} aria-label="Previous">‹</button>
        <div className={`lb-frame ${zoom && !isVid ? "zoom" : ""} ${isVid ? "is-video" : ""}`} onClick={() => { if (!isVid) setZoom((z) => !z); }}>
          {isVid
            ? <video key={img.full} src={img.full} controls autoPlay loop playsInline></video>
            : <img key={img.full} src={img.full} alt={project.title} draggable="false" />}
          {!isVid && <span className="lb-hint mono">{zoom ? (lang === "pl" ? "KLIKNIJ — DOPASUJ" : "CLICK — FIT") : (lang === "pl" ? "KLIKNIJ — POWIĘKSZ" : "CLICK — ZOOM")}</span>}
        </div>
        <button className="lb-nav next" onClick={() => setIndex((i) => (i + 1) % total)} aria-label="Next">›</button>
      </div>

      <div className="lb-strip" onClick={(e) => e.stopPropagation()}>
        {project.images.map((im, i) => (
          <button key={im.thumb} className={`lb-thumb ${i === index ? "on" : ""} ${im.type === "video" ? "vid" : ""}`} onClick={() => setIndex(i)}>
            {im.type === "video"
              ? <video src={im.thumb} muted playsInline preload="metadata"></video>
              : <img src={im.thumb} alt="" loading="lazy" draggable="false" />}
            {im.type === "video" && <span className="lb-thumb-play" aria-hidden="true">▶</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- closing CTA tile (always last) ---------------- */
function ProjectCTA({ lang, onClick }) {
  return (
    <button
      className="pfg-card pfg-cta"
      onClick={onClick}
      aria-label={lang === "pl" ? "Stwórzmy razem projekt" : "Let's create a project together"}
    >
      <span className="pfg-cta-kick mono">{lang === "pl" ? "WOLNY SLOT · 2026" : "OPEN SLOT · 2026"}</span>
      <span className="pfg-cta-h">{lang === "pl" ? "STWÓRZMY RAZEM PROJEKT" : "LET\u2019S CREATE SOMETHING TOGETHER"}</span>
      <span className="pfg-cta-foot">
        <span className="pfg-cta-sub mono">{lang === "pl" ? "TU MOŻE BYĆ TWÓJ PROJEKT" : "YOUR PROJECT COULD BE HERE"}</span>
        <span className="pfg-cta-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M7 17 L17 7"></path>
            <path d="M8 7 H17 V16"></path>
          </svg>
        </span>
      </span>
    </button>
  );
}

/* ---------------- portfolio section ---------------- */
function Portfolio({ t, lang, innerRef, sync, projects, newIds, onOpen, onContact }) {
  return (
    <section className="pf-block" id="portfolio" ref={innerRef}>
      <div className="pfg" data-count={projects.length}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} isNew={newIds.includes(p.id)} lang={lang} onOpen={onOpen} />
        ))}
        <ProjectCTA lang={lang} onClick={onContact} />
      </div>
    </section>
  );
}

Object.assign(window, { usePortfolioSync, Portfolio, Lightbox, SyncPill, ProjectCard, ProjectCTA });
