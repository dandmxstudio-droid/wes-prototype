// "Wes: a day with your AI partner" — six-chapter desktop prototype (1440×900) built from tools/mvp6.js frames.
// Loaded at runtime: const P = new Function('V', src + '\nreturn P;')(V);
// Sequencing markers read by the engine: data-seq="wes|say|user|show", data-type (typed lines), data-success, data-stagger.
const P = (() => {
const Q = V.parts, D = 'd';
const { when, wMsg, uMsg, chips, overnight, upd, outCard, doneRow, ic } = Q;
const TD = Q.TD;
const ACC = '#5B3DF5', INK = '#080C10', MUT = '#565A68', LIME = '#C7FF3D';
const SH = '0 0 0 1px rgba(8,12,16,0.05), 0 1px 2px rgba(8,12,16,0.04), 0 12px 32px -20px rgba(8,12,16,0.24)';
// ---------- Wes avatar states (WesMark geometry, pill eyes, tile surface) ----------
const avatar = (st, s, anim, extra = '') => {
  const o = st === 'listening' ? 3.5 : st === 'success' ? -1.5 : 0, fb = 'transform-box:fill-box;transform-origin:center;';
  const spin = anim && st === 'thinking' ? '<animateTransform attributeName="transform" type="rotate" values="0 50 50;180 50 50;180 50 50" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.65 0 0.35 1;0 0 1 1" dur="2.8s" repeatCount="indefinite"></animateTransform>' : '';
  const br = `<g fill="none" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round"${st === 'thinking' && !anim ? ' transform="rotate(30 50 50)"' : ''}><path d="M26 58 V38 Q26 26 38 26 H58" transform="translate(${-o} ${-o})"></path><path d="M74 42 V62 Q74 74 62 74 H42" transform="translate(${o} ${o})"></path>${spin}</g>`;
  const eye = (x) => st === 'success' ? `<path d="M${x - 4.6} 52 Q${x} 45.4 ${x + 4.6} 52" fill="none" stroke="#FFFFFF" stroke-width="3.6" stroke-linecap="round"></path>` : `<rect x="${x - 2.3}" y="45" width="4.6" height="10" rx="2.3" fill="#FFFFFF"></rect>`;
  const etf = st === 'thinking' ? ' transform="translate(53 45) scale(0.8) translate(-50 -50)"' : st === 'listening' ? ' transform="translate(50 50) scale(1.1) translate(-50 -50)"' : '';
  const L = anim && st === 'listening', sty = (a) => L ? ` style="animation:${a};${fb}"` : '';
  const spark = st === 'success' ? `<circle cx="73" cy="27" r="4.8" fill="${LIME}"${anim ? ` style="animation:wmPop .45s cubic-bezier(.3,1.6,.5,1) both;${fb}"` : ''}></circle>` : '';
  const label = { neutral: 'Wes', thinking: 'Wes is thinking', listening: 'Wes is listening', success: 'Wes: step done' }[st] || 'Wes';
  return `<svg data-wes-avatar="" data-state="${st}"${extra} width="${s}" height="${s}" viewBox="0 0 100 100" role="img" aria-label="${label}" style="display:block;flex:none;overflow:visible"><g${sty('wmBreath 5s ease-in-out infinite')}><rect x="4" y="4" width="92" height="92" rx="27" fill="${ACC}"></rect>${br}<g${etf}><g${sty('wmLean 3.6s ease-in-out infinite')}><g${sty('wmBlink 3.8s ease-in-out infinite')}>${eye(43)}${eye(57)}</g></g></g>${spark}</g></svg>`;
};
// ---------- markup helpers ----------
const inj = (h, i, attr) => { const m = /^<[a-zA-Z0-9]+/.exec(h.slice(i)); return m ? h.slice(0, i + m[0].length) + ' ' + attr + h.slice(i + m[0].length) : h; };
const mark = (h, needle, attr, anchor) => { const a = anchor ? h.indexOf(anchor) : 0; if (a < 0) return h; const i = h.indexOf(needle, a); return i < 0 ? h : inj(h, i, attr); };
const tag = (h, attr) => inj(h, h.indexOf('<'), attr);
const W = (x, after = '') => tag(wMsg(x, after), 'data-seq="wes"');
const U = (x) => tag(uMsg(x), 'data-seq="user"');
const S = (x) => tag(x, 'data-seq="show"');
const ESC = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const post = (h, o = {}) => {
  h = h.replace(/<div data-nav="(Explore|Jobs)"[\s\S]*?<\/div>/g, '');
  h = h.replace('<span style="flex:1;font-size:16px;line-height:1.5;color:#6E7180">Message Wes…</span>', `<input data-composer="" type="text" aria-label="Message Wes" placeholder="Message Wes…" value="${ESC(o.typed || '')}" autocomplete="off" style="flex:1;min-width:0;height:44px;border:0;outline:0;background:transparent;padding:0;font-family:Inter,system-ui,sans-serif;font-size:16px;line-height:1.5;color:${INK}">`);
  if (o.wes) { const m = h.indexOf('<main'), i = h.indexOf('<svg data-wes-avatar=""', m); if (i > 0) h = inj(h, i, 'data-head=""'); const k = h.indexOf('Online</span>', m); if (k > 0) h = h.slice(0, k) + '<span data-status="">Online</span></span>' + h.slice(k + 13); }
  return h;
};
// ---------- views ----------
const wesView = (o) => post(V.view(D, Q.wesO({ prompts: [], ...o, thread: () => o.thread })), { wes: true, typed: o.typed });
const say = (h, success) => mark(mark(h, '<div data-pattern="wes-briefing"', `data-seq="say"${success ? ' data-success=""' : ''}`), '<p style="margin:0;font-size:18px', 'data-type=""', 'data-pattern="wes-briefing"');
const todayView = (base, o = {}, success = false) => post(say(V.view(D, Q.todayO({ ...base, ...o })), success));
const on1 = () => { let h = V.view(D, { bare: Q.obTop(0), main: () => Q.on1Body(D) }); h = mark(h, '<div', 'data-seq="say"', 'max-width:600px;margin:0 auto'); h = mark(h, '<h1', 'data-type=""', 'max-width:600px'); h = mark(h, '<p style="margin:0;font-size:17px', 'data-type=""', 'max-width:600px'); return post(h); };
const on3 = () => { let h = V.view(D, { bare: Q.obTop(2), main: () => Q.on3Body(D) }); h = mark(h, '<div style="width:100%;max-width:1040px', 'data-seq="say" data-stagger="420"'); h = mark(h, '<h1', 'data-type=""', 'max-width:1040px'); h = mark(h, '<span style="font-size:16px;line-height:1.5;color:#565A68;text-wrap:pretty">Based on', 'data-type=""'); return post(h); };
// ---------- chapter content ----------
const OVN = overnight(Q.OVN).replace('>While you were away<', '>What I did while you were away<');
const T2 = when('Today · 9:04 AM');
const KW = { 'I heard back': ['That’s good news, Maya. I added a step to Today so we can go through their reply together.', 'Added to Today · Go through Kitewell’s reply'], 'Still waiting': ['That’s normal a week after a follow-up. If it’s still quiet on Friday, I’ll draft a short nudge for you to send.', 'Logged · Kitewell, still waiting'], 'I’m losing interest': ['That’s worth knowing. I’ll stop planning around Kitewell and keep today on Parcelwise.', 'Kitewell moved out of your plan'] };
const RET3 = { left: '2 steps left', step: 'Prep for Parcelwise' };
const INTRO3 = 'Let’s prep for Parcelwise: five likely questions, about 45 minutes. Answer out loud or type, whichever is easier.';
const ANS = 'Start with where leads come from, find the rule that misfires, and show the response-time drop after the fix.';
const Q5 = outCard(D, { icon: 'message-square-text', k: 'warn', kind: 'Practice question 5 of 5', title: '“How would you fix lead routing that sends good leads to the wrong reps?”', tools: false, rows: [['learn', 'Tip:', 'how leads arrive, the rule you’d change, the number it moved.']] });
const T3 = when('Today · 9:20 AM'), GAP3 = when('Questions 1 to 4 · 35 minutes later');
const RET5 = { left: '2 steps left', step: 'Check in on AI Product Marketing' };
const T5 = when('Mon, Oct 19 · 9:15 AM');
const P51 = 'Three weeks in. Here’s what your signals say.', P52 = 'AI Product Marketing isn’t getting replies yet. One direction builds on what is working. Want a look?', P53 = 'Lifecycle Marketing. It’s the nurture work you liked most, as the whole job.';
const REQ = 'Honestly, can you just apply to Fieldnote and Kitewell for me? I’m so tired of filling out forms.';
const DEC = 'I hear you. Those forms are a slog. I don’t apply for people, because where your name goes should stay your call. What I can do is get each one down to a few minutes.';
const HARD = 'I don’t see the point anymore. Maybe I’m just done.';
const H1 = 'That sounds really heavy, Maya. I’m glad you told me. Today’s steps can wait. I’ve paused them.';
const H2 = 'I’m not a counselor, but you don’t have to carry this alone. If you’re thinking about hurting yourself or feel unsafe, please reach out now.';
const CH = [
  { title: 'The first night', sub: 'Resume, first directions, and three steps for tomorrow.', steps: [
    { hint: 'Wes opens with one ask. Tap “Choose a file”.', v: () => on1() },
    { hint: 'Wes lays out where it would start. Tap “See tomorrow’s plan”.', v: () => on3() },
    { hint: 'The next morning, Today is the front door: three small steps.', end: true, v: () => todayView(TD.day1) }] },
  { title: 'Coming back', sub: 'A check-in, and what Wes did while Maya was away.', steps: [
    { hint: 'Maya is back. Tap a step, a reply or Ask Wes.', v: () => todayView(TD.due) },
    { hint: 'Wes shows what it did overnight. Tap a check-in reply.', v: () => wesView({ thread: T2 + S(OVN) + W(Q.WS1_LINE, chips(['I heard back', 'Still waiting', 'I’m losing interest'])) }) },
    { hint: 'One tap answered the check-in, and the plan follows.', end: true, v: (ui) => { const r = ui.msg ? ['Thanks for telling me. I’ll keep that in mind as I plan today.', ''] : KW[ui.pick] || KW['Still waiting']; return wesView({ thread: T2 + OVN + wMsg(Q.WS1_LINE) + U(ESC(ui.msg || ui.pick || 'Still waiting')) + W(r[0]) + (r[1] ? S(upd(r[1])) : '') }); } }] },
  { title: 'A step session', sub: 'From a step on Today into Wes, and back one step closer.', steps: [
    { hint: 'Tap “Start with Wes” on the first step.', v: () => todayView(TD.due, { ci: null, ans: 'Check-in: halfway through Trailhead. I moved the rest to Thursday.' }) },
    { hint: 'Maya’s answer is in the composer, so Wes is listening. Press send.', focus: true, v: () => wesView({ ret: RET3, typed: ANS, thread: T3 + W(INTRO3) + S(GAP3) + W('Last one.', Q5) }) },
    { hint: 'Tap “Done · back to Today”.', go: { 'Done · back to Today': 'done' }, v: (ui) => wesView({ ret: RET3, thread: T3 + wMsg(INTRO3) + GAP3 + wMsg('Last one.', Q5) + U(ESC(ui.msg || ANS)) + W('That’s the shape they want. That’s all five, Maya. You’re ready for Thursday.', doneRow()) }) },
    { hint: 'Back on Today with the step checked.', end: true, v: () => todayView(TD.back, {}, true) }] },
  { title: 'A rough day', sub: 'Maya says it’s a hard one. Wes lightens the plan.', steps: [
    { hint: 'Hard-day mode: one small step, and the rest can wait.', end: true, v: () => todayView(TD.hard) }] },
  { title: 'A new direction', sub: 'Signals shift, and Wes suggests a direction that builds on what works.', steps: [
    { hint: 'Wes reads three weeks of signals. Tap “Show me”.', v: () => wesView({ ret: RET5, thread: T5 + W(P51, Q.CPC(D)) + W(P52, chips(['Show me'], false)) }) },
    { hint: 'Tap “Add to my focus”, or “Not now”.', next: (pick) => pick === 'Not now' ? 3 : 2, v: (ui) => wesView({ ret: RET5, thread: T5 + wMsg(P51, Q.CPC(D)) + wMsg(P52) + U(ESC(ui.msg || 'Show me')) + W(P53, Q.DIRCARD(D) + chips(['Add to my focus', 'Not now'], false)) }) },
    { hint: 'Lifecycle arrives on Today as two new steps.', end: true, v: () => todayView(TD.pivot, {}, true) },
    { hint: 'Nothing changes until Maya says so.', end: true, alt: true, dot: 2, v: () => wesView({ ret: RET5, thread: T5 + wMsg(P51, Q.CPC(D)) + wMsg(P52) + uMsg('Show me') + wMsg(P53, Q.DIRCARD(D)) + U('Not now') + W('No problem. AI Product Marketing stays in your focus for now, and Lifecycle waits under Other options whenever you want another look.') }) }] },
  { title: 'Where Wes stops', sub: 'Wes won’t apply for Maya, and puts her safety ahead of the plan.', steps: [
    { hint: 'Wes holds one line, then does the rest. Tap any reply.', calm: true, v: () => wesView({ thread: when('Tue, Oct 6 · 1:05 PM') + U(REQ) + W(DEC, Q.APPKIT(D) + chips(['Do Kitewell next', 'Mark Fieldnote applied'])) }) },
    { hint: 'The next morning. Safety comes first; every task is paused.', calm: true, v: () => wesView({ noWeek: true, thread: when('Wed, Oct 7 · 8:52 AM') + U(HARD) + W(H1) + W(H2, Q.SUPPORT(D) + chips(['I’m safe, just exhausted', 'I’d like to talk to someone', 'Not right now'], false)) }) },
    { hint: 'Today is paused. No steps, no ring, no nudges.', end: true, calm: true, v: () => post(V.view(D, Q.pausedO())) }] }];
// ---------- start screen ----------
const logo = `<svg width="26" height="26" viewBox="0 0 48 48" fill="none" aria-hidden="true" style="flex:none"><path d="M7 31V14a7 7 0 0 1 7-7h17" stroke="${ACC}" stroke-width="7.5"></path><path d="M41 17v17a7 7 0 0 1-7 7H17" stroke="${ACC}" stroke-width="7.5"></path></svg>`;
const home = () => `<div data-vp="d" style="width:1440px;height:900px;position:relative;display:flex;flex-direction:column;background:#F4F4F8;color:${INK};font-family:Inter,system-ui,sans-serif;text-align:left;padding:36px 56px 64px;box-sizing:border-box"><div style="display:flex;align-items:center;gap:8px;height:44px">${logo}<span style="font-size:21px;font-weight:700;letter-spacing:-0.04em">wesembly</span></div><div style="flex:1;width:100%;max-width:1120px;margin:0 auto;display:flex;flex-direction:column;justify-content:center;gap:48px"><div style="display:flex;flex-direction:column;align-items:flex-start;gap:20px">${avatar('neutral', 64, false)}<h1 style="margin:0;font-size:60px;font-weight:650;letter-spacing:-0.045em;line-height:1.05">Wes: a day with your AI partner</h1><p style="margin:0;font-size:19px;line-height:1.55;color:${MUT}">A design prototype. Maya is a composite user.</p></div><div role="list" aria-label="Chapters" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px">${CH.map((c, i) => `<div role="listitem" style="display:flex;min-width:0"><div role="button" tabindex="0" data-chapter="" data-go="ch:${i}" style="flex:1;min-width:0;display:flex;flex-direction:column;gap:10px;min-height:172px;padding:24px;border-radius:20px;background:#FFFFFF;box-shadow:${SH};cursor:pointer;box-sizing:border-box"><div style="display:flex;align-items:center;justify-content:space-between"><span style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;letter-spacing:0.12em;color:${ACC}">0${i + 1}</span>${ic('arrow-right', '#6E7180', 20)}</div><span style="margin-top:auto;font-size:21px;font-weight:650;letter-spacing:-0.025em;line-height:1.25">${c.title}</span><span style="font-size:15.5px;line-height:1.5;color:${MUT};text-wrap:pretty">${c.sub}</span></div></div>`).join('')}</div></div></div>`;
const render = (ci, si, ui) => ci < 0 ? home() : CH[ci].steps[si].v(ui || {});
return { CH, home, avatar, render };
})();
