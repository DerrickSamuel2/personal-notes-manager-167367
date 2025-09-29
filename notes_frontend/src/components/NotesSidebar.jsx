import React from 'react';

/**
 * Sidebar showing search, quick create, and notes list.
 * Props:
 * - notes: Array<{ id, title, content, updatedAt }>
 * - activeId: string | null
 * - setActiveId: (id: string) => void
 * - onQueryChange: (q: string) => void
 * - query: string
 * - onNew: () => void
 */
// PUBLIC_INTERFACE
export default function NotesSidebar({ notes, activeId, setActiveId, onQueryChange, query, onNew }) {
  /** Sidebar component providing navigation for notes. */
  return (
    <aside className="sidebar" role="navigation" aria-label="Notes navigation">
      <div className="search">
        <input
          className="input"
          type="search"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search notes"
        />
        <button className="btn btn-amber" onClick={onNew} aria-label="Quick create note">
          + New
        </button>
      </div>

      <div className="notes-list" role="list">
        {notes.length === 0 && (
          <div className="muted small">No notes yet. Create your first note.</div>
        )}
        {notes.map((n) => {
          const isActive = n.id === activeId;
          const snippet = n.content?.trim() || 'No content';
          return (
            <button
              key={n.id}
              className={`note-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveId(n.id)}
              role="listitem"
              aria-current={isActive ? 'true' : 'false'}
              title={n.title}
            >
              <h4 className="note-item-title">{n.title || 'Untitled'}</h4>
              <p className="note-item-snippet">{snippet}</p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
