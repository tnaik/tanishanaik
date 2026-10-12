'use client';
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from 'react';
import { ASSET, CAROUSELS, POSTS } from './data';
import { css } from './styles';

const FW = 1080, FH = 1350, PAD = 240, GAP = 900;
const MIN_Z = 0.02, MAX_Z = 1.5;
const pad2 = (n: number) => String(n).padStart(2, '0');

// world-space layout for the canvas view (rows stacked like the Figma file)
const ROWS = CAROUSELS.map((c, i) => ({ ...c, y: i * (FH + GAP) }));
const BOUNDS = (() => {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  ROWS.forEach((r) => {
    const xs = r.frames.map((f) => f.x);
    minX = Math.min(minX, Math.min(...xs) - PAD);
    maxX = Math.max(maxX, Math.max(...xs) + FW + PAD);
    minY = Math.min(minY, r.y - PAD - 60);
    maxY = Math.max(maxY, r.y + FH + PAD);
  });
  return { minX, minY, w: maxX - minX, h: maxY - minY };
})();

type Props = { backHref?: string };

export default function AifaBrandCaseStudy({ backHref = '/#projects' }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cmpRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<(animate: boolean) => void>(() => {});

  const [mode, setMode] = useState<'slides' | 'canvas'>('slides');
  const [setIdx, setSetIdx] = useState(0);
  const [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  /* ---------- scroll reveal ---------- */
  useEffect(() => {
    const root = rootRef.current!;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('inview'); io.unobserve(e.target); } }),
      { threshold: 0.15 },
    );
    root.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ---------- dark / light slider (transform-based, eased) ---------- */
  useEffect(() => {
    const d = cmpRef.current!;
    const clip = d.querySelector<HTMLElement>('.clip')!;
    const inner = clip.firstElementChild as HTMLElement;
    const hd = d.querySelector<HTMLElement>('.handle')!;
    const pDark = d.querySelector<HTMLElement>('.pill-dark')!;
    const pLight = d.querySelector<HTMLElement>('.pill-light')!;
    let target = 0, cur = 0, drag = false, loop = 0, intro = 0, W = d.clientWidth;
    const render = () => {
      const x = (cur / 100) * W;
      clip.style.transform = `translate3d(${x - W}px,0,0)`;
      inner.style.transform = `translate3d(${W - x}px,0,0)`;
      hd.style.transform = `translate3d(${x}px,0,0)`;
      pDark.style.opacity = cur > 12 ? '1' : '0';
      pLight.style.opacity = cur < 88 ? '1' : '0';
      d.setAttribute('aria-valuenow', String(Math.round(cur)));
    };
    const tick = () => {
      const diff = target - cur;
      cur += Math.abs(diff) < 0.05 ? diff : diff * (drag ? 0.45 : 0.18);
      render();
      loop = Math.abs(target - cur) > 0.01 ? requestAnimationFrame(tick) : 0;
    };
    const set = (v: number) => { target = Math.max(0, Math.min(100, v)); if (!loop) loop = requestAnimationFrame(tick); };
    const at = (e: PointerEvent) => { const r = d.getBoundingClientRect(); return ((e.clientX - r.left) / r.width) * 100; };
    const down = (e: PointerEvent) => { drag = true; cancelAnimationFrame(intro); d.classList.add('dragging'); d.setPointerCapture(e.pointerId); set(at(e)); };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const ev = (e.getCoalescedEvents?.().pop() as PointerEvent | undefined) ?? e;
      set(at(ev));
    };
    const up = () => { drag = false; d.classList.remove('dragging'); };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); set(target + 5); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); set(target - 5); }
    };
    d.addEventListener('pointerdown', down);
    d.addEventListener('pointermove', move);
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((t) => d.addEventListener(t, up));
    d.addEventListener('keydown', key);
    const ro = new ResizeObserver(() => { W = d.clientWidth; render(); });
    ro.observe(d);
    // on first view, glide the handle to the middle so both versions show
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      timer = setTimeout(() => {
        if (drag || target > 0) return;
        const t0 = performance.now();
        const go = (t: number) => {
          const k = Math.min(1, (t - t0) / 1300);
          cur = target = (1 - Math.pow(1 - k, 3)) * 50;
          render();
          if (k < 1) intro = requestAnimationFrame(go);
        };
        intro = requestAnimationFrame(go);
      }, 600);
    }, { threshold: 0.5 });
    io.observe(d);
    render();
    return () => {
      d.removeEventListener('pointerdown', down);
      d.removeEventListener('pointermove', move);
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((t) => d.removeEventListener(t, up));
      d.removeEventListener('keydown', key);
      ro.disconnect(); io.disconnect(); clearTimeout(timer);
      cancelAnimationFrame(loop); cancelAnimationFrame(intro);
    };
  }, []);

  /* ---------- canvas view: pan / zoom ---------- */
  useEffect(() => {
    const cv = cvRef.current!, world = worldRef.current!, pct = pctRef.current!;
    let x = 0, y = 0, k = 0.1, anim = 0, active = false;
    const isSlides = () => cv.classList.contains('mode-slides');
    const apply = () => {
      world.style.transform = `translate(${x}px,${y}px) scale(${k})`;
      world.style.setProperty('--k', String(k));
      world.classList.toggle('tiny', k < 0.055);
      pct.textContent = Math.round(k * 100) + '%';
    };
    const tween = (tx: number, ty: number, tk: number, ms = 420) => {
      cancelAnimationFrame(anim);
      const sx = x, sy = y, sk = k, t0 = performance.now();
      const step = (t: number) => {
        const u = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - u, 3);
        k = sk * Math.pow(tk / sk, e); x = sx + (tx - sx) * e; y = sy + (ty - sy) * e; apply();
        if (u < 1) anim = requestAnimationFrame(step);
      };
      anim = requestAnimationFrame(step);
    };
    const fitRect = (rx: number, ry: number, rw: number, rh: number, p: number, animate: boolean) => {
      const W = cv.clientWidth, H = cv.clientHeight - 56;
      const nk = Math.min(MAX_Z, Math.min((W - p * 2) / rw, (H - p * 2) / rh));
      const nx = (W - rw * nk) / 2 - rx * nk, ny = (H - rh * nk) / 2 - ry * nk + 8;
      if (animate) tween(nx, ny, nk); else { x = nx; y = ny; k = nk; apply(); }
    };
    const fitAll = (animate: boolean) => fitRect(BOUNDS.minX, BOUNDS.minY, BOUNDS.w, BOUNDS.h, 24, animate);
    // on phones, open on the first carousel row so slides are legible; "Fit" still shows everything
    const fitStart = (animate: boolean) => {
      if (cv.clientWidth >= 640) return fitAll(animate);
      const r = ROWS[0], x0 = Math.min(...r.frames.map((f) => f.x)) - PAD;
      const k0 = (cv.clientWidth - 32) / (FW * 2.4);
      const nx = 16 - x0 * k0, ny = 72 - (r.y - PAD) * k0;
      if (animate) tween(nx, ny, k0); else { x = nx; y = ny; k = k0; apply(); }
    };
    fitRef.current = fitStart;
    const zoomAt = (nk: number, px: number, py: number) => {
      nk = Math.max(MIN_Z, Math.min(MAX_Z, nk));
      x = px - (px - x) * (nk / k); y = py - (py - y) * (nk / k); k = nk; apply();
    };

    const wheel = (e: WheelEvent) => {
      if (isSlides()) return;
      const r = cv.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault(); cancelAnimationFrame(anim);
        zoomAt(k * Math.exp(-e.deltaY * (e.ctrlKey && !e.metaKey ? 0.01 : 0.002)), px, py);
        return;
      }
      if (!active) return; // let the page scroll until the canvas has been clicked
      e.preventDefault(); cancelAnimationFrame(anim); x -= e.deltaX; y -= e.deltaY; apply();
    };
    const leave = () => { if (!cv.classList.contains('full')) { active = false; cv.classList.remove('active'); } };

    const pts = new Map<number, { x: number; y: number }>();
    let last: { x: number; y: number } | null = null;
    let pinch: { d: number; k: number } | null = null;
    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('.toolbar,.seg') || isSlides()) return;
      active = true; cv.classList.add('active'); cancelAnimationFrame(anim);
      cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 1) { last = { x: e.clientX, y: e.clientY }; cv.classList.add('panning'); }
      if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), k }; }
    };
    const move = (e: PointerEvent) => {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 2 && pinch) {
        const [a, b] = [...pts.values()], r = cv.getBoundingClientRect();
        zoomAt((pinch.k * Math.hypot(a.x - b.x, a.y - b.y)) / pinch.d, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
        return;
      }
      if (last) { x += e.clientX - last.x; y += e.clientY - last.y; last = { x: e.clientX, y: e.clientY }; apply(); }
    };
    const up = (e: PointerEvent) => {
      pts.delete(e.pointerId);
      if (pts.size < 2) pinch = null;
      if (pts.size === 0) { last = null; cv.classList.remove('panning'); }
      else { const v = [...pts.values()][0]; last = { x: v.x, y: v.y }; }
    };
    const dbl = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.toolbar,.seg') || isSlides()) return;
      const f = document.elementsFromPoint(e.clientX, e.clientY)
        .map((n) => (n as HTMLElement).closest?.('.frame') as HTMLElement | null).find(Boolean);
      if (f) fitRect(+f.dataset.x!, +f.dataset.y!, FW, FH, 24, true); else fitAll(true);
    };
    const toolbar = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest('button') as HTMLButtonElement | null;
      if (!b) return;
      const cx = cv.clientWidth / 2, cy = cv.clientHeight / 2, z = b.dataset.z;
      const zoomTo = (nk: number, ms: number) => tween(cx - (cx - x) * (nk / k), cy - (cy - y) * (nk / k), nk, ms);
      if (z === 'in') zoomTo(Math.min(MAX_Z, k * 1.5), 250);
      if (z === 'out') zoomTo(Math.max(MIN_Z, k / 1.5), 250);
      if (z === '100') zoomTo(1, 350);
      if (z === 'fit') fitAll(true);
      if (z === 'full') {
        const on = !cv.classList.contains('full');
        cv.classList.toggle('full', on); document.body.style.overflow = on ? 'hidden' : '';
        active = on; cv.classList.toggle('active', on); setTimeout(() => fitAll(true), 30);
      }
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && cv.classList.contains('full')) {
        cv.classList.remove('full'); document.body.style.overflow = ''; setTimeout(() => fitAll(true), 30);
      }
    };
    const tb = cv.querySelector<HTMLElement>('.toolbar')!;
    cv.addEventListener('wheel', wheel, { passive: false });
    cv.addEventListener('pointerleave', leave);
    cv.addEventListener('pointerdown', down);
    cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);
    cv.addEventListener('dblclick', dbl);
    tb.addEventListener('click', toolbar);
    document.addEventListener('keydown', esc);
    const ro = new ResizeObserver(() => fitStart(false));
    ro.observe(cv);
    fitStart(false);
    return () => {
      cv.removeEventListener('wheel', wheel);
      cv.removeEventListener('pointerleave', leave);
      cv.removeEventListener('pointerdown', down);
      cv.removeEventListener('pointermove', move);
      cv.removeEventListener('pointerup', up);
      cv.removeEventListener('pointercancel', up);
      cv.removeEventListener('dblclick', dbl);
      tb.removeEventListener('click', toolbar);
      document.removeEventListener('keydown', esc);
      ro.disconnect(); cancelAnimationFrame(anim);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    cvRef.current!.classList.toggle('mode-slides', mode === 'slides');
    if (mode === 'canvas') fitRef.current(false);
  }, [mode]);

  /* ---------- slides view ---------- */
  const slides = CAROUSELS[setIdx].frames;

  const syncSlide = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const c = track.scrollLeft + track.clientWidth / 2;
    let best = 0, bd = Infinity;
    Array.from(track.children).forEach((el, i) => {
      const h = el as HTMLElement;
      const d = Math.abs(h.offsetLeft + h.offsetWidth / 2 - c);
      if (d < bd) { bd = d; best = i; }
    });
    setSlide(best);
  }, []);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const kids = track.children;
    const el = kids[Math.max(0, Math.min(kids.length - 1, i))] as HTMLElement | undefined;
    if (el) track.scrollTo({ left: el.offsetLeft + el.offsetWidth / 2 - track.clientWidth / 2, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const track = trackRef.current!;
    // slide width = whichever is smaller: what fits the height, or ~78% of the width (so neighbours peek on phones)
    const size = () => {
      const cs = getComputedStyle(track);
      const h = track.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const w = Math.max(120, Math.min((h * 1080) / 1350, track.clientWidth * 0.78));
      track.style.setProperty('--sw', w + 'px');
    };
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(syncSlide); };
    track.addEventListener('scroll', onScroll);
    const ro = new ResizeObserver(() => { size(); syncSlide(); });
    ro.observe(track);
    size();
    return () => { track.removeEventListener('scroll', onScroll); ro.disconnect(); cancelAnimationFrame(raf); };
  }, [syncSlide]);

  useEffect(() => { const t = trackRef.current; if (t) t.scrollLeft = 0; setSlide(0); }, [setIdx]);

  useEffect(() => {
    if (mode !== 'slides') return;
    const key = (e: KeyboardEvent) => {
      const r = cvRef.current!.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      if ((e.target as HTMLElement).closest?.('.cmp')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(slide + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(slide - 1); }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [mode, slide, goTo]);

  /* ---------- campaign: banner parallax + card tilt ---------- */
  useEffect(() => {
    const c = coverRef.current!;
    const mv = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', -(((e.clientX - r.left) / r.width - 0.5) * 8) + 'px');
      c.style.setProperty('--my', -(((e.clientY - r.top) / r.height - 0.5) * 3) + 'px');
    };
    const lv = () => { c.style.setProperty('--mx', '0px'); c.style.setProperty('--my', '0px'); };
    c.addEventListener('pointermove', mv); c.addEventListener('pointerleave', lv);
    const tilts = Array.from(rootRef.current!.querySelectorAll<HTMLElement>('.tilt'));
    const offs = tilts.map((t) => {
      const card = t.querySelector<HTMLElement>('.card')!;
      const m = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        const r = t.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.transform = `rotateY(${(px - 0.5) * 10}deg) rotateX(${(0.5 - py) * 8}deg)`;
        card.style.setProperty('--gx', px * 100 + '%'); card.style.setProperty('--gy', py * 100 + '%');
      };
      const l = () => { card.style.transform = ''; };
      t.addEventListener('pointermove', m); t.addEventListener('pointerleave', l);
      return () => { t.removeEventListener('pointermove', m); t.removeEventListener('pointerleave', l); };
    });
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    document.addEventListener('keydown', esc);
    return () => { c.removeEventListener('pointermove', mv); c.removeEventListener('pointerleave', lv); offs.forEach((f) => f()); document.removeEventListener('keydown', esc); };
  }, []);

  return (
    <div className="aifa-cs" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <main className="container">
        <a className="back" href={backHref}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Back to Projects
        </a>

        <h1 className="h1">AiFA Labs Brand System</h1>
        <div className="tags">
          <span className="tag" style={{ background: '#f256dc' }}>Branding</span>
          <span className="tag" style={{ background: '#a78bfa' }}>Visual Design</span>
          <span className="tag" style={{ background: '#4ecdc4' }}>Social Media</span>
          <span className="tag" style={{ background: '#ff9f6d' }}>Campaign</span>
        </div>

        {/* LOGO: dark ↔ light */}
        <div ref={cmpRef} className="cmp reveal" tabIndex={0} role="slider" aria-label="Compare dark and light logo" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
          <div className="logo-layer" style={{ backgroundImage: `url(${ASSET}/logo-light-bg.jpg)` }}>
            <img className="logo-mark" src={`${ASSET}/logo-light.svg`} alt="Cerebro logo, light" draggable={false} />
          </div>
          <div className="clip">
            <div className="logo-layer" style={{ backgroundImage: `url(${ASSET}/logo-dark-bg.jpg)` }}>
              <img className="logo-mark" src={`${ASSET}/logo-dark.svg`} alt="Cerebro logo, dark" draggable={false} />
            </div>
          </div>
          <span className="pill pill-dark">Dark</span>
          <span className="pill pill-light">Light</span>
          <div className="handle"><div className="grip" /></div>
        </div>
        <p className="cap">Cerebro mark — drag to compare dark and light</p>

        {/* CAROUSELS */}
        <h3 className="h3 reveal">Carousels</h3>
        <div className="reveal">
        {/* mode/pan classes are toggled imperatively so React re-renders never wipe them */}
        <div ref={cvRef} className="canvas mode-slides">
          <div className="world" ref={worldRef}>
            {ROWS.map((r) => {
              const xs = r.frames.map((f) => f.x), x0 = Math.min(...xs), x1 = Math.max(...xs) + FW;
              return (
                <div key={r.name}>
                  <div className="section" style={{ left: x0 - PAD, top: r.y - PAD, width: x1 - x0 + PAD * 2, height: FH + PAD * 2 }}>
                    <span className="sname">{r.name}</span>
                  </div>
                  {r.frames.map((f) => (
                    <div key={f.src} className="frame" data-x={f.x} data-y={r.y} style={{ left: f.x, top: r.y }}>
                      <span className="fname">{f.name}</span>
                      <img src={f.src} alt="" draggable={false} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          <div className="seg" role="tablist">
            <button className={mode === 'slides' ? 'on' : ''} role="tab" aria-selected={mode === 'slides'} onClick={() => setMode('slides')}>Slides</button>
            <button className={mode === 'canvas' ? 'on' : ''} role="tab" aria-selected={mode === 'canvas'} onClick={() => setMode('canvas')}>Canvas</button>
          </div>

          <div className="sv">
            <div className="sv-track" ref={trackRef}>
              {slides.map((f, i) => (
                <button key={f.src} className={`sv-slide${i === slide ? ' on' : ''}`} onClick={() => i !== slide && goTo(i)} aria-label={`${CAROUSELS[setIdx].name}, slide ${i + 1}`}>
                  <img src={f.src} alt="" />
                </button>
              ))}
            </div>
            <div className="sv-bar">
              <div className="sv-tabs">
                {CAROUSELS.map((c, i) => (
                  <button key={c.name} className={i === setIdx ? 'on' : ''} onClick={() => setSetIdx(i)}>Carousel {i + 1}</button>
                ))}
              </div>
              <div className="sv-ctrl">
                <span className="sv-count">{pad2(slide + 1)} / {pad2(slides.length)}</span>
                <button className="sv-arw" aria-label="Previous slide" disabled={slide === 0} onClick={() => goTo(slide - 1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button className="sv-arw" aria-label="Next slide" disabled={slide === slides.length - 1} onClick={() => goTo(slide + 1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            </div>
          </div>

          <div className="cv-hint">Drag to pan · pinch or ⌘ + scroll to zoom</div>
          <div className="toolbar">
            <button data-z="out" aria-label="Zoom out"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14" /></svg></button>
            <button className="pct" data-z="100" ref={pctRef} title="Zoom to 100%">100%</button>
            <button data-z="in" aria-label="Zoom in"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg></button>
            <span className="sep" />
            <button data-z="fit" title="Zoom to fit">Fit</button>
            <button data-z="full" aria-label="Full screen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg></button>
          </div>
        </div>
        </div>
        <p className="cap">LinkedIn carousels · 4 series, 28 frames</p>

        {/* CAMPAIGN */}
        <h3 className="h3 reveal">Campaign</h3>
        <div className="reveal">
          <div className="cover" ref={coverRef}><img src={`${ASSET}/banner-sasa.jpg`} alt="SASA LinkedIn banner" /></div>
        </div>
        <div className="posts">
          {POSTS.map((p) => (
            <div className="tilt reveal" key={p.src}>
              <button className="card" onClick={() => setLightbox(p.src)} aria-label={`Open ${p.alt}`}>
                <img src={p.src} alt={p.alt} width={p.w} height={p.h} />
                <span className="glare" />
              </button>
            </div>
          ))}
        </div>
        <p className="cap">Banner, feed and square formats</p>
      </main>

      <div className={`lb${lightbox ? ' open' : ''}`} onClick={() => setLightbox(null)}>
        {lightbox && <img src={lightbox} alt="" />}
      </div>
    </div>
  );
}
