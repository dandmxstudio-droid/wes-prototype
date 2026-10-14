// Types Wes's messages like a chat message being composed.
// Auto mode: lines marked [data-tw] inside [data-tw-group]. API: window.WesTyping.type(elements, { start, onDone }) → { finish }.
(function () {
  if (window.__wesTyping) return; window.__wesTyping = 1;
  const RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const type = (lines, o = {}) => {
    let over = false, timer = 0, li = 0, ci = 0;
    const data = lines.map(l => { const t = l.textContent; l.setAttribute('data-tw', ''); l.innerHTML = '<span data-tw-on></span><span aria-hidden="true" style="color:transparent">' + t.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>'; l.setAttribute('aria-label', t); return { l, t, on: l.firstChild, off: l.lastChild }; });
    const finish = () => { if (over) return; over = true; clearTimeout(timer); data.forEach(d => { d.on.textContent = d.t; d.off.textContent = ''; }); if (o.onDone) o.onDone(); };
    const step = () => {
      if (over) return;
      if (!data.length || !data[0].l.isConnected) { over = true; return; }
      const d = data[li]; if (!d) return finish();
      ci = Math.min(d.t.length, ci + (d.t[ci] === ' ' ? 2 : 1));
      d.on.textContent = d.t.slice(0, ci); d.off.textContent = d.t.slice(ci);
      if (ci >= d.t.length) { li++; ci = 0; timer = setTimeout(step, 260); return; }
      timer = setTimeout(step, 16 + Math.random() * 14);
    };
    if (RM || o.instant) finish(); else timer = setTimeout(step, o.start == null ? 520 : o.start);
    return { finish };
  };
  window.WesTyping = { type, reduced: RM };
  if (/Design System|All Wesembly|Screens - 1st Iteration|Future Iteration|User Journey|Wes Avatars/.test(decodeURIComponent(location.pathname))) return;
  const seen = (window.__wesTyped = window.__wesTyped || {});
  const run = g => {
    if (g.__tw) return; g.__tw = 1;
    const lines = [...g.querySelectorAll('[data-tw]')]; if (!lines.length) return;
    const key = lines.map(l => l.textContent).join('|');
    if (RM || seen[key]) return;
    type(lines, { onDone: () => { seen[key] = 1; } });
  };
  const scan = () => document.querySelectorAll('[data-tw-group]').forEach(run);
  let q0 = 0; const qs = ms => { if (ms && ms.every(m => m.target.closest && m.target.closest('[data-tw], [data-car-label]') || (m.target.parentElement && m.target.parentElement.closest('[data-tw]')))) return; if (!q0) q0 = setTimeout(() => { q0 = 0; scan(); }, 250); };
  new MutationObserver(qs).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', scan); scan();
})();
