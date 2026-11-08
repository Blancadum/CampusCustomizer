import React from 'react';
import { GIT_CHEATSHEET_ITEMS } from '../../../../../config/gitCommandsData';

export default function GithubCheatsheetTab({ copiedId, onCopy }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      {GIT_CHEATSHEET_ITEMS.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: 'var(--bg-subtle, rgba(0,0,0,0.03))',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-title)' }}>
              {item.title}
            </span>
            <button
              onClick={() => onCopy(item.cmd, `cheat_${idx}`)}
              style={{
                background: copiedId === `cheat_${idx}` ? '#10b981' : 'transparent',
                color: copiedId === `cheat_${idx}` ? '#fff' : 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '0.7rem',
                cursor: 'pointer',
              }}
            >
              {copiedId === `cheat_${idx}` ? '✓ Copiado' : 'Copiar'}
            </button>
          </div>
          <pre
            style={{
              background: '#1e1e2e',
              color: '#cdd6f4',
              padding: '0.5rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              margin: '0.3rem 0',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            {item.cmd}
          </pre>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {item.desc}
          </span>
        </div>
      ))}
    </div>
  );
}
