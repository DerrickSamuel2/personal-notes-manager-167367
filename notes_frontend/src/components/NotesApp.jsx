import React, { useEffect, useMemo, useState } from 'react';
import { createNote, deleteNote, getNote, loadNotes, updateNote } from '../utils/storage';
import NotesHeader from './NotesHeader';
import NotesSidebar from './NotesSidebar';
import NotesEditor from './NotesEditor';

/**
 * NotesApp composes the header, sidebar, and editor into the required layout.
 * It manages the lifecycle of notes using localStorage as a mocked backend.
 */
// PUBLIC_INTERFACE
export default function NotesApp() {
  /** Entry point component mounting the Notes UI. */
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState('');

  // Initialize from storage, with a demo note if empty
  useEffect(() => {
    const initial = loadNotes();
    if (!initial.length) {
      const demo = createNote({
        title: 'Welcome to Ocean Notes',
        content: 'This is a demo note. Use the + New button to create notes. Start typing to edit.',
      });
      setNotes([demo]);
      setActiveId(demo.id);
    } else {
      setNotes(initial);
      setActiveId(initial[0]?.id || null);
    }
  }, []);

  // Derived selected note
  const activeNote = useMemo(() => (activeId ? getNote(activeId) : null), [activeId, notes]);

  // CRUD actions
  const handleCreate = () => {
    const n = createNote({ title: 'Untitled', content: '' });
    setNotes(loadNotes());
    setActiveId(n.id);
  };

  const handleDelete = (id) => {
    if (!id) return;
    const ok = deleteNote(id);
    if (ok) {
      const next = loadNotes();
      setNotes(next);
      setActiveId(next[0]?.id || null);
    }
  };

  const handleUpdate = (id, patch) => {
    const updated = updateNote(id, patch);
    if (updated) {
      setNotes(loadNotes());
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(n =>
      n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [notes, query]);

  return (
    <div className="container-app">
      <NotesHeader
        onNew={handleCreate}
        onDelete={() => handleDelete(activeId)}
        canDelete={!!activeId}
      />

      <NotesSidebar
        notes={filtered}
        activeId={activeId}
        setActiveId={setActiveId}
        onQueryChange={setQuery}
        query={query}
        onNew={handleCreate}
      />

      <main className="main" aria-live="polite">
        <div className="editor-card" role="region" aria-label="Note editor">
          <div className="editor-toolbar">
            <input
              className="title-input"
              placeholder="Note title"
              value={activeNote?.title || ''}
              onChange={(e) => activeId && handleUpdate(activeId, { title: e.target.value })}
              aria-label="Note title"
            />
            <div className="muted small">
              {activeNote
                ? `Last updated ${new Date(activeNote.updatedAt).toLocaleString()}`
                : 'No note selected'}
            </div>
          </div>
          <div className="editor-body">
            <textarea
              className="textarea"
              placeholder="Start typing your note..."
              value={activeNote?.content || ''}
              onChange={(e) => activeId && handleUpdate(activeId, { content: e.target.value })}
              aria-label="Note content"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
