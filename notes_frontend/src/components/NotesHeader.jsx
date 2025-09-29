import React from 'react';

/**
 * Header with brand, new note, and delete controls.
 * Props:
 * - onNew: () => void
 * - onDelete: () => void
 * - canDelete: boolean
 */
// PUBLIC_INTERFACE
export default function NotesHeader({ onNew, onDelete, canDelete }) {
  /** Top header with controls for the notes app. */
  return (
    <header className="header" role="banner">
      <div className="brand" aria-label="Ocean Notes">
        <div className="brand-badge" aria-hidden="true" />
        <div className="brand-title">Ocean Notes</div>
      </div>
      <div className="header-actions" role="group" aria-label="Header actions">
        <button className="btn btn-primary" onClick={onNew} aria-label="Create new note">
          + New
        </button>
        <button
          className="btn btn-danger"
          onClick={onDelete}
          disabled={!canDelete}
          aria-disabled={!canDelete}
          aria-label="Delete current note"
        >
          Delete
        </button>
      </div>
    </header>
  );
}
