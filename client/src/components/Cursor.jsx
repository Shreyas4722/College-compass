import { useEffect } from 'react';
export default function Cursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    let mx = 0, my = 0, rx = 0, ry = 0;
    const move = e => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', move);
    let raf;
    const tick = () => {
      dot.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx - 14}px,${ry - 14}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    document.addEventListener('mouseover', e => {
      if (e.target.closest('a,button,select')) ring.classList.add('expand');
      else ring.classList.remove('expand');
    });
    return () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(raf); dot.remove(); ring.remove(); };
  }, []);
  return null;
}
