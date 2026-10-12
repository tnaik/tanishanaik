// Scoped under .aifa-cs so nothing leaks into (or collides with) the rest of the site.
// Injected via a <style> tag so it works with both the App Router and Pages Router.
export const css = String.raw`
.aifa-cs{
  --bg:#ffffff; --border:#d9d9d9; --ink:#0a0a0a; --dark:#252422; --text:#464646; --muted:#7f7f7f; --cap:#6b7280;
  --sel:#0d99ff; --ease:cubic-bezier(.2,.7,.1,1);
  background:var(--bg);color:var(--ink);font-family:var(--font-inter),Inter,system-ui,sans-serif;font-size:16px;line-height:24px;-webkit-font-smoothing:antialiased;overflow-x:clip
}
.aifa-cs *{box-sizing:border-box}
.aifa-cs img{display:block;max-width:100%}
.aifa-cs .h1,.aifa-cs .h3{font-family:var(--font-bebas-neue),"Bebas Neue",sans-serif;font-weight:500;color:var(--text);letter-spacing:.01em;margin:0}
.aifa-cs .container{max-width:928px;margin:0 auto;padding:16px 16px 64px}
@media (min-width:768px){.aifa-cs .container{padding:32px 32px 64px;max-width:960px}}
.aifa-cs .back{display:inline-flex;align-items:center;gap:8px;color:var(--ink);text-decoration:none;margin-bottom:24px;font-size:14px;font-weight:500}
.aifa-cs .back svg{width:16px;height:16px;transition:transform .15s}
.aifa-cs .back:hover svg{transform:translateX(-3px)}
.aifa-cs .h1{font-size:24px;line-height:32px;margin-bottom:16px}
@media (min-width:768px){.aifa-cs .h1{font-size:30px;line-height:36px}}
.aifa-cs .tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px}
.aifa-cs .tag{font-size:12px;line-height:16px;font-weight:500;color:var(--dark);padding:4px 10px;border-radius:9999px}
.aifa-cs .h3{font-size:30px;line-height:36px;margin:96px 0 24px}
.aifa-cs .cap{text-align:center;font-size:14px;line-height:20px;color:var(--cap);margin:16px 0 0}

/* ---------- dark / light logo slider ---------- */
.aifa-cs .cmp{position:relative;width:100%;aspect-ratio:727/380;border-radius:6px;overflow:hidden;user-select:none;-webkit-user-select:none;touch-action:pan-y;cursor:ew-resize;outline:none;isolation:isolate}
.aifa-cs .cmp:focus-visible{box-shadow:0 0 0 2px var(--dark)}
.aifa-cs .logo-layer{position:absolute;inset:0;background-size:cover;background-position:center}
.aifa-cs .logo-mark{position:absolute;left:50%;top:50%;width:42.228%;height:auto;transform:translate(-50%,-50%);pointer-events:none;-webkit-user-drag:none}
.aifa-cs .clip{position:absolute;inset:0;overflow:hidden;will-change:transform;transform:translate3d(-100%,0,0)}
.aifa-cs .clip > .logo-layer{will-change:transform;transform:translate3d(100%,0,0)}
.aifa-cs .handle{position:absolute;top:0;bottom:0;left:0;width:0;pointer-events:none;will-change:transform}
.aifa-cs .handle::before{content:"";position:absolute;top:0;bottom:0;left:-.5px;width:1px;background:#fff;opacity:.45}
.aifa-cs .grip{position:absolute;top:50%;left:0;width:8px;height:44px;margin:-22px 0 0 -4px;border-radius:4px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.12);opacity:.7;transition:transform .2s var(--ease)}
.aifa-cs .cmp:hover .grip,.aifa-cs .cmp.dragging .grip{transform:scaleY(1.25)}
.aifa-cs .pill{position:absolute;top:12px;font-size:12px;line-height:16px;font-weight:500;padding:4px 10px;border-radius:9999px;pointer-events:none;transition:opacity .3s}
.aifa-cs .pill-dark{left:12px;background:rgba(255,255,255,.16);color:#fff;box-shadow:inset 0 0 0 1px rgba(255,255,255,.25)}
.aifa-cs .pill-light{right:12px;background:#fff;color:var(--dark)}

/* ---------- carousels: shared frame ---------- */
.aifa-cs .canvas{width:100%;position:relative;height:clamp(440px,68vw,600px);border-radius:6px;overflow:hidden;background:#f5f5f5;box-shadow:0 0 0 1px var(--border);cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none}
.aifa-cs .canvas.panning{cursor:grabbing}
.aifa-cs .canvas.full{position:fixed;inset:0;width:auto;margin:0;height:auto;z-index:90;border-radius:0}
.aifa-cs .canvas.mode-slides{cursor:default;touch-action:auto}
.aifa-cs .seg{position:absolute;top:12px;left:12px;z-index:3;display:flex;padding:3px;gap:2px;background:#fff;border-radius:9999px;box-shadow:0 0 0 1px rgba(0,0,0,.06),0 4px 14px rgba(0,0,0,.06);cursor:default}
.aifa-cs .seg button{border:0;background:none;font:500 12px/16px var(--font-inter),Inter,sans-serif;color:var(--muted);padding:6px 14px;border-radius:9999px;cursor:pointer;transition:all .15s}
.aifa-cs .seg button:hover{color:var(--dark)}
.aifa-cs .seg button.on{background:var(--dark);color:#fff}

/* canvas view */
.aifa-cs .world{position:absolute;left:0;top:0;transform-origin:0 0}
.aifa-cs .mode-slides .world,.aifa-cs .mode-slides .toolbar,.aifa-cs .mode-slides .cv-hint{display:none}
.aifa-cs .section{position:absolute;border-radius:calc(8px / var(--k,1));background:rgba(255,255,255,.55);box-shadow:0 0 0 calc(1px / var(--k,1)) #e3e3e3}
.aifa-cs .sname{position:absolute;left:0;bottom:100%;margin-bottom:calc(6px / var(--k,1));font-size:calc(12px / var(--k,1));line-height:1.2;font-weight:500;color:#fff;background:#7f7f7f;padding:calc(3px / var(--k,1)) calc(8px / var(--k,1));border-radius:calc(4px / var(--k,1));white-space:nowrap}
.aifa-cs .frame{position:absolute;width:1080px;height:1350px}
.aifa-cs .frame img{width:100%;height:100%;object-fit:cover;pointer-events:none;-webkit-user-drag:none;background:#fff}
.aifa-cs .fname{position:absolute;left:0;bottom:100%;margin-bottom:calc(4px / var(--k,1));font-size:calc(11px / var(--k,1));line-height:1.2;color:#7f7f7f;white-space:nowrap}
.aifa-cs .world.tiny .fname{opacity:0}
.aifa-cs .frame::after{content:"";position:absolute;inset:0;box-shadow:0 0 0 calc(1.5px / var(--k,1)) var(--sel);opacity:0;transition:opacity .1s;pointer-events:none}
.aifa-cs .frame:hover::after{opacity:1}
.aifa-cs .frame:hover .fname{color:var(--sel)}
.aifa-cs .toolbar{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);display:flex;align-items:center;gap:2px;padding:4px;background:#fff;border-radius:8px;box-shadow:0 0 0 1px rgba(0,0,0,.06),0 6px 20px rgba(0,0,0,.1);cursor:default;z-index:2}
.aifa-cs .toolbar button{height:32px;min-width:32px;padding:0 8px;border:0;background:none;border-radius:6px;font:500 12px/1 var(--font-inter),Inter,sans-serif;color:var(--dark);cursor:pointer;display:grid;place-items:center}
.aifa-cs .toolbar button:hover{background:#f0f0f0}
.aifa-cs .toolbar svg{width:16px;height:16px}
.aifa-cs .toolbar .pct{min-width:52px;font-variant-numeric:tabular-nums}
.aifa-cs .toolbar .sep{width:1px;height:20px;background:#e6e6e6;margin:0 4px}
.aifa-cs .cv-hint{position:absolute;top:12px;right:12px;font-size:12px;line-height:16px;color:var(--muted);background:rgba(255,255,255,.9);padding:4px 10px;border-radius:9999px;box-shadow:0 0 0 1px #eee;pointer-events:none;transition:opacity .3s;z-index:2}
.aifa-cs .canvas.active .cv-hint{opacity:0}

/* slides view */
.aifa-cs .sv{position:absolute;inset:0;display:none;flex-direction:column;background:#f5f5f5;cursor:default}
.aifa-cs .mode-slides .sv{display:flex}
.aifa-cs .sv-track{flex:1;min-height:0;display:flex;align-items:center;gap:24px;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;padding:64px calc(50% - var(--sw,200px) / 2) 8px;scrollbar-width:none;overscroll-behavior-x:contain}
.aifa-cs .sv-track::-webkit-scrollbar{display:none}
.aifa-cs .sv-slide{flex:0 0 auto;width:var(--sw,200px);height:auto;aspect-ratio:1080/1350;scroll-snap-align:center;border-radius:6px;overflow:hidden;background:#fff;box-shadow:0 20px 40px -24px rgba(37,36,34,.35),0 0 0 1px rgba(0,0,0,.05);opacity:.45;transform:scale(.94);transition:opacity .35s var(--ease),transform .35s var(--ease);cursor:pointer;padding:0;border:0}
.aifa-cs .sv-slide.on{opacity:1;transform:none;cursor:default}
.aifa-cs .sv-slide img{width:100%;height:100%;object-fit:cover;pointer-events:none}
.aifa-cs .sv-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 16px 16px}
.aifa-cs .sv-tabs{display:flex;gap:6px;flex-wrap:wrap}
.aifa-cs .sv-tabs button{border:1px solid var(--border);background:#fff;font:500 12px/16px var(--font-inter),Inter,sans-serif;color:var(--muted);padding:5px 12px;border-radius:9999px;cursor:pointer;transition:all .15s}
.aifa-cs .sv-tabs button:hover{color:var(--dark)}
.aifa-cs .sv-tabs button.on{background:var(--dark);border-color:var(--dark);color:#fff}
.aifa-cs .sv-ctrl{display:flex;align-items:center;gap:8px}
.aifa-cs .sv-count{font:500 12px/16px var(--font-inter),Inter,sans-serif;color:var(--muted);font-variant-numeric:tabular-nums;margin-right:4px}
.aifa-cs .sv-arw{width:36px;height:36px;border-radius:50%;border:1px solid var(--border);background:#fff;color:var(--dark);display:grid;place-items:center;cursor:pointer;transition:opacity .15s;padding:0}
.aifa-cs .sv-arw:hover{opacity:.7}
.aifa-cs .sv-arw:disabled{opacity:.3;cursor:default}
.aifa-cs .sv-arw svg{width:16px;height:16px}

/* ---------- campaign ---------- */
.aifa-cs .cover{position:relative;border-radius:6px;overflow:hidden;aspect-ratio:1584/396;box-shadow:0 0 0 1px #eee}
.aifa-cs .cover img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;transform:translate3d(var(--mx,0),var(--my,0),0) scale(1.012);transition:transform .4s var(--ease)}
.aifa-cs .posts{display:grid;grid-template-columns:1.9139fr 1fr;gap:16px;margin-top:16px;align-items:start}
.aifa-cs .tilt{perspective:1100px}
.aifa-cs .card{position:relative;border-radius:6px;overflow:hidden;transform-style:preserve-3d;transition:transform .5s var(--ease),box-shadow .5s;cursor:zoom-in;display:block;width:100%;padding:0;border:0;background:none}
.aifa-cs .card img{width:100%;height:auto}
.aifa-cs .glare{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.35),transparent 45%);opacity:0;transition:opacity .3s;mix-blend-mode:soft-light}
.aifa-cs .tilt:hover .glare{opacity:1}
.aifa-cs .tilt:hover .card{box-shadow:0 30px 60px -30px rgba(37,36,34,.45)}
.aifa-cs .lb{position:fixed;inset:0;z-index:100;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);display:grid;place-items:center;padding:24px;opacity:0;pointer-events:none;transition:opacity .3s;cursor:zoom-out}
.aifa-cs .lb.open{opacity:1;pointer-events:auto}
.aifa-cs .lb img{max-height:90vh;max-width:92vw;width:auto;border-radius:6px;box-shadow:0 30px 80px -30px rgba(0,0,0,.35);transform:scale(.96);transition:transform .35s var(--ease)}
.aifa-cs .lb.open img{transform:none}

.aifa-cs .reveal{opacity:0;transform:translateY(24px);transition:opacity .8s var(--ease),transform .8s var(--ease)}
.aifa-cs .reveal.inview{opacity:1;transform:none}

@media (max-width:640px){
  .aifa-cs .posts{grid-template-columns:1fr;gap:12px}
  .aifa-cs .h3{margin:64px 0 16px;font-size:24px;line-height:32px}
  .aifa-cs .canvas{height:520px}
  .aifa-cs .seg{top:8px;left:8px}
  .aifa-cs .seg button{padding:5px 12px}
  .aifa-cs .cv-hint{display:none}
  .aifa-cs .toolbar{bottom:10px}
  .aifa-cs .toolbar button{min-width:30px;height:30px;padding:0 6px}
  .aifa-cs .sv-track{gap:12px;padding-top:52px}
  .aifa-cs .sv-bar{flex-direction:column;align-items:stretch;gap:10px;padding:10px 12px 12px}
  .aifa-cs .sv-tabs{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin:0 -12px;padding:0 12px}
  .aifa-cs .sv-tabs::-webkit-scrollbar{display:none}
  .aifa-cs .sv-tabs button{flex:0 0 auto;white-space:nowrap}
  .aifa-cs .sv-ctrl{justify-content:space-between}
  .aifa-cs .sv-arw{width:40px;height:40px}
  .aifa-cs .cmp{aspect-ratio:4/3}
  .aifa-cs .logo-mark{width:68%}
  .aifa-cs .pill{top:8px;font-size:11px;padding:3px 8px}
  .aifa-cs .pill-dark{left:8px}.aifa-cs .pill-light{right:8px}
  .aifa-cs .grip{height:36px;margin-top:-18px}
  .aifa-cs .cap{font-size:13px}
}
@media (prefers-reduced-motion:reduce){
  .aifa-cs *{animation:none!important;transition:none!important}
  .aifa-cs .reveal{opacity:1;transform:none}
}
`;
