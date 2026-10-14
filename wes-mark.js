// Wes avatar (WesMark) — shared by Wes Avatars.dc.html. Registers window.WesMark.
(function(){class WesMarkImpl {
  constructor(props, uid) { this.props = props; this.uid = uid; }
  eyes(type, fg) {
    const h = window.React.createElement, L = 43, R = 57, Y = 50;
    const both = (fn) => [fn(L, 'l'), fn(R, 'r')];
    switch (type) {
      case 'roll': return both((x, k) => h('circle', { key: k, cx: x, cy: Y, r: 4.4, fill: fg }));
      case 'round': return both((x, k) => h('circle', { key: k, cx: x, cy: Y, r: 5.6, fill: fg }));
      case 'narrow': return both((x, k) => h('rect', { key: k, x: x - 4.5, y: Y - 1.6, width: 9, height: 3.2, rx: 1.6, fill: fg }));
      case 'angled': return both((x, k) => h('rect', { key: k, x: x - 4.4, y: Y - 1.9, width: 8.8, height: 3.8, rx: 1.9, fill: fg, transform: `rotate(${x < 50 ? -13 : 13} ${x} ${Y})` }));
      case 'blink': case 'pill': return both((x, k) => h('rect', { key: k, x: x - 2.3, y: Y - 5, width: 4.6, height: 10, rx: 2.3, fill: fg }));
      case 'glow': return both((x, k) => h('g', { key: k }, h('circle', { cx: x, cy: Y, r: 5, fill: fg, opacity: 0.55, filter: `url(#${this.uid}b)` }), h('circle', { cx: x, cy: Y, r: 2.6, fill: fg })));
      case 'offset': return [h('circle', { key: 'l', cx: L, cy: 51, r: 4.4, fill: fg }), h('circle', { key: 'r', cx: R, cy: 48, r: 3.3, fill: fg })];
      case 'soft': return both((x, k) => h('ellipse', { key: k, cx: x, cy: Y, rx: 4.9, ry: 3.8, fill: fg }));
      case 'geometric': return both((x, k) => h('rect', { key: k, x: x - 3.3, y: Y - 3.3, width: 6.6, height: 6.6, rx: 1.6, fill: fg }));
      case 'calm': return both((x, k) => h('path', { key: k, d: `M${x - 4.6} ${Y - 1} Q${x} ${Y + 4} ${x + 4.6} ${Y - 1}`, fill: 'none', stroke: fg, strokeWidth: 3.4, strokeLinecap: 'round' }));
      case 'alert': return both((x, k) => h('ellipse', { key: k, cx: x, cy: Y - 1.5, rx: 3.5, ry: 5.6, fill: fg }));
      case 'halfmoon': return both((x, k) => h('path', { key: k, d: `M${x - 4.8} ${Y - 1.8} H${x + 4.8} A4.8 4.8 0 0 1 ${x - 4.8} ${Y - 1.8} Z`, fill: fg }));
      case 'happyArc': return both((x, k) => h('path', { key: k, d: `M${x - 5.2} ${Y + 2.6} Q${x} ${Y - 5.8} ${x + 5.2} ${Y + 2.6}`, fill: 'none', stroke: fg, strokeWidth: 4.4, strokeLinecap: 'round' }));
      case 'arc': return both((x, k) => h('path', { key: k, d: `M${x - 4.6} ${Y + 2} Q${x} ${Y - 4.6} ${x + 4.6} ${Y + 2}`, fill: 'none', stroke: fg, strokeWidth: 3.6, strokeLinecap: 'round' }));
      default: return both((x, k) => h('circle', { key: k, cx: x, cy: Y, r: 4.2, fill: fg }));
    }
  }
  renderVals() {
    const h = window.React.createElement, u = this.uid;
    const eye = this.props.eye || 'pill';
    const s = this.props.state || 'neutral';
    const surface = this.props.surface || 'tile';
    const succ = this.props.success || 'spark';
    const size = +(this.props.size || 64);
    const anim = this.props.animate === true || this.props.animate === 'true';
    const tile = surface === 'tile';
    const fg = tile || surface === 'bareLight' ? '#FFFFFF' : '#5B3DF5';
    const lime = '#C7FF3D';
    const happy = s === 'encouraging' || s === 'success' || s === 'happy';
    const fb = { transformBox: 'fill-box', transformOrigin: 'center' };
    const defs = h('defs', { key: 'defs' },
      h('filter', { id: u + 'b', x: '-100%', y: '-100%', width: '300%', height: '300%' }, h('feGaussianBlur', { stdDeviation: 2.2 })),
      h('filter', { id: u + 'g', x: '-50%', y: '-50%', width: '200%', height: '200%' }, h('feGaussianBlur', { stdDeviation: 7 })));

    const dance = s === 'dancing';
    const o = s === 'listening' ? 3.5 : dance ? -0.8 : s === 'success' ? -1.5 : s === 'happy' ? -1.2 : s === 'encouraging' ? -0.8 : 0;
    const spin = anim && s === 'thinking' ? h('animateTransform', { attributeName: 'transform', type: 'rotate', values: '0 50 50;180 50 50;180 50 50', keyTimes: '0;0.5;1', calcMode: 'spline', keySplines: '0.65 0 0.35 1;0 0 1 1', dur: '2.8s', repeatCount: 'indefinite' }) : null;
    const brackets = h('g', { key: 'br', fill: 'none', stroke: fg, strokeWidth: 9, strokeLinecap: 'round', transform: s === 'thinking' && !anim ? 'rotate(30 50 50)' : undefined },
      h('g', { style: anim && dance ? { animation: 'wmBeatL .6s cubic-bezier(.3,.7,.3,1) infinite' } : null }, h('path', { d: 'M26 58 V38 Q26 26 38 26 H58', transform: `translate(${-o} ${-o})` })),
      h('g', { style: anim && dance ? { animation: 'wmBeatR .6s cubic-bezier(.3,.7,.3,1) infinite' } : null }, h('path', { d: 'M74 42 V62 Q74 74 62 74 H42', transform: `translate(${o} ${o})` })), spin);

    let eyeType = s === 'happy' || dance ? 'happyArc' : happy ? 'arc' : eye;
    if (s === 'success' && succ === 'eyes') eyeType = 'arc';
    const eyeFg = s === 'success' && succ === 'eyes' ? lime : fg;
    let eyeTf;
    if (s === 'thinking') eyeTf = 'translate(53 45) scale(0.8) translate(-50 -50)';
    else if (s === 'listening') eyeTf = 'translate(50 50) scale(1.1) translate(-50 -50)';
    const eyeMotion = !anim ? null : s === 'neutral' && eye === 'blink' ? { animation: 'wmBlinkFast 3.2s ease-in-out infinite', ...fb } : s === 'neutral' && eye === 'roll' ? { animation: 'wmRoll 4s ease-in-out infinite' } : s === 'neutral' ? { animation: 'wmBlink 5.5s ease-in-out infinite', ...fb } : s === 'listening' ? { animation: 'wmLean 3.6s ease-in-out infinite', ...fb } : s === 'happy' ? { animation: 'wmSqueeze 3.2s ease-in-out infinite', ...fb } : dance ? { animation: 'wmEyeBop .6s ease-in-out infinite', ...fb } : null;
    const eyeKids = this.eyes(eyeType, eyeFg);
    const listenBlink = anim && s === 'listening' ? { animation: 'wmBlink 3.8s ease-in-out infinite', ...fb } : null;
    const eyesEl = h('g', { key: 'ey', transform: eyeTf }, h('g', { style: eyeMotion }, h('g', { style: listenBlink },
      s === 'success' && succ === 'eyes' ? h('g', { opacity: 0.8, filter: `url(#${u}b)` }, this.eyes('arc', lime)) : null, eyeKids)));

    const kids = [defs];
    if (s === 'success' && succ === 'halo') kids.push(h('rect', { key: 'halo', x: 6, y: 6, width: 88, height: 88, rx: 26, fill: lime, filter: `url(#${u}g)`, style: anim ? { animation: 'wmGlow 3s ease-in-out infinite' } : { opacity: 0.8 } }));
    const bodyMotion = !anim ? null : dance ? { animation: 'wmDance 1.2s ease-in-out infinite', transformBox: 'fill-box', transformOrigin: '50% 88%' } : s === 'happy' ? { animation: 'wmHop 3.2s cubic-bezier(.3,.7,.3,1) infinite', ...fb } : s === 'encouraging' ? { animation: 'wmNod 3.4s ease-in-out infinite', ...fb } : (s === 'neutral' || s === 'listening') ? { animation: 'wmBreath 5s ease-in-out infinite', ...fb } : null;
    const body = [tile ? h('rect', { key: 't', x: 4, y: 4, width: 92, height: 92, rx: 27, fill: '#5B3DF5' }) : null, brackets, eyesEl];
    if (s === 'happy') body.push(window.React.createElement('circle', { key: 'hs', cx: 74, cy: 26, r: 3.4, fill: lime, opacity: 0.95 }));
    if (s === 'success' && succ === 'spark') body.push(h('circle', { key: 'sp', cx: 73, cy: 27, r: 4.8, fill: lime }));
    if (s === 'success' && succ === 'corner') body.push(h('g', { key: 'co', fill: 'none', stroke: lime, strokeLinecap: 'round' },
      h('path', { d: 'M64 26 Q74 26 74 36', strokeWidth: 9, opacity: 0.55, filter: `url(#${u}b)` }),
      h('path', { d: 'M64 26 Q74 26 74 36', strokeWidth: 6 })));
    kids.push(h('g', { key: 'body', style: bodyMotion, transform: dance && !anim ? 'rotate(-7 50 88)' : undefined }, body));
    return { svg: h('svg', { width: size, height: size, viewBox: '0 0 100 100', style: { display: 'block', overflow: 'visible' }, 'aria-label': 'Wes' }, kids) };
  }
}

var n=0;window.WesMark=function(props){var R=window.React;var ref=R.useRef(null);if(!ref.current)ref.current='wm'+(++n)+Math.random().toString(36).slice(2,6);return new WesMarkImpl(props||{},ref.current).renderVals().svg;};})();
