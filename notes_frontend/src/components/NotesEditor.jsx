import React from 'react';

/**
 * NotesEditor provides a controlled inputs interface for a note.
 * This component is currently not used directly (inlined in NotesApp toolbar/body)
 * but is exported for future modularity and potential rich editor integration.
 * Props:
 * - title: string
 * - content: string
 * - onTitleChange: (value: string) => void
 * - onContentChange: (value: string) => void
 */
// PUBLIC_INTERFACE
export default function NotesEditor({ title, content, onTitleChange, onContentChange }) {
  /** Controlled editor component for a note's title and content. */
  return (
    <div className="editor-card">
      <div className="editor-toolbar">
        <input
          className="title-input"
          placeholder="Note title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          aria-label="Note title"
        />
      </div>
      <div className="editor-body">
        <textarea
          className="textarea"
          placeholder="Start typing your note..."
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          aria-label="Note content"
        />
      </div>
    </div>
  );
}
