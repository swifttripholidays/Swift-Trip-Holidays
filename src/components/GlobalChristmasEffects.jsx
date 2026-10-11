import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';

/** Lightweight, decorative Christmas layer shared by every React route. */
export default function GlobalChristmasEffects() {
  const flakes = useMemo(() => Array.from({ length: 64 }, (_, index) => {
    const seed = index + 1;
    return {
      id: seed,
      left: `${(seed * 37.7) % 100}%`,
      size: `${5 + ((seed * 3) % 9)}px`,
      duration: `${13 + ((seed * 7) % 17)}s`,
      delay: `${-((seed * 5) % 27)}s`,
      drift: `${((seed * 23) % 120) - 60}px`,
      opacity: 0.28 + ((seed * 13) % 60) / 100,
    };
  }), []);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="global-christmas-effects" aria-hidden="true">
      <div className="global-snowfall">
        {flakes.map((flake) => (
          <span
            className="global-snowfall__flake"
            key={flake.id}
            style={{
              '--flake-left': flake.left,
              '--flake-size': flake.size,
              '--flake-duration': flake.duration,
              '--flake-delay': flake.delay,
              '--flake-drift': flake.drift,
              '--flake-opacity': flake.opacity,
            }}
          >
            {flake.id % 4 === 0 ? '✦' : '❄'}
          </span>
        ))}
      </div>

      <div className="global-santa global-santa--left">
        <span className="global-santa__emoji">🎅</span>
        <span className="global-santa__sparkle">✦</span>
      </div>
      <div className="global-santa global-santa--right">
        <span className="global-santa__emoji">🎅</span>
        <span className="global-santa__sparkle">❄</span>
      </div>
    </div>,
    document.body
  );
}
