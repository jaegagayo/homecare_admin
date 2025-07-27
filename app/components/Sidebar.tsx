import { IconButton } from '@radix-ui/themes';
import { useState } from 'react';
import { MENU } from '../constants/menu';

interface FloatingActionBarProps {
  onMenuClick: (label: string) => void;
  selected: string;
}

export default function FloatingActionBar({ onMenuClick, selected }: FloatingActionBarProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: 24,
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        zIndex: 100,
      }}
    >
      {MENU.map((item, idx) => (
        <div
          key={item.label}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onMenuClick && onMenuClick(item.label)}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              onMenuClick && onMenuClick(item.label);
            }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            transition: 'background 0.2s',
            overflow: 'hidden',
            cursor: 'pointer',
            padding: 0,
            height: 48,
            background: hovered === idx
              ? 'linear-gradient(270deg, rgba(30,30,30,1) 60%, rgba(30,30,30,0.0) 100%)'
              : 'none',
            boxShadow: 'none',
            borderRadius: 24,
          }}
        >
          <IconButton
            variant={selected === item.label ? 'solid' : 'ghost'}
            color="gray"
            size="3"
            tabIndex={-1}
            aria-label={item.label}
            style={{ background: 'none', boxShadow: 'none', width: 40, height: 40 }}
          >
            {item.icon}
          </IconButton>
          <span
            style={{
              opacity: hovered === idx ? 1 : 0,
              maxWidth: hovered === idx ? 200 : 0,
              whiteSpace: 'nowrap',
              transition: 'opacity 0.15s, margin-left 0.2s, max-width 0.2s, padding 0.2s',
              fontWeight: 500,
              color: 'var(--gray-12)',
              pointerEvents: hovered === idx ? 'auto' : 'none',
              fontSize: 18,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              height: 48,
              background: 'none',
              overflow: 'hidden',
              paddingLeft: hovered === idx ? 8 : 0,
              paddingRight: hovered === idx ? 20 : 0,
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
