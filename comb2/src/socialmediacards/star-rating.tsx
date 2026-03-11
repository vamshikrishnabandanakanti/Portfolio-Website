'use client';

import { useState } from 'react';

interface StarRatingProps {
  totalStars?: number;
  defaultValue?: number;
  onRate?: (rating: number) => void;
}

export function StarRating({ totalStars = 5, defaultValue = 0, onRate }: StarRatingProps) {
  const [rating, setRating] = useState(defaultValue);
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {Array.from({ length: totalStars }, (_, i) => i + 1).map((star) => {
        const active = (hover || rating) >= star;
        return (
          <button
            key={star}
            type="button"
            onClick={() => { setRating(star); onRate?.(star); }}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0, outline: 'none',
              transform: hover === star ? 'scale(1.3) rotate(-10deg)' : 'scale(1)',
              transition: 'transform 0.2s ease',
            }}
          >
            <svg width={24} height={24} viewBox="0 0 24 24"
              fill={active ? '#FACC15' : 'none'}
              stroke={active ? '#FACC15' : '#9CA3AF'}
              strokeWidth="1.5"
              style={{ display: 'block', transition: 'all 0.25s ease' }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <StarRating defaultValue={3} onRate={(r) => console.log(`Rated: ${r}`)} />
    </div>
  );
}
