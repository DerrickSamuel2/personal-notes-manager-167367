const STORAGE_KEY = 'notes_app_items_v1';

/**
 * A lightweight storage utility abstracting localStorage access for notes.
 * Stored shape:
 * {
 *   items: Array<{ id: string, title: string, content: string, updatedAt: number, createdAt: number }>
 * }
 */

// PUBLIC_INTERFACE
export function loadNotes() {
  /** Load all notes from localStorage. Returns an array of notes. */
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveNotes(items) {
  /** Persist the provided notes array to localStorage. */
  const payload = { items };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

// PUBLIC_INTERFACE
export function createNote({ title = 'Untitled', content = '' } = {}) {
  /** Create a new note, persist, and return it. */
  const id = cryptoRandomId();
  const ts = Date.now();
  const next = { id, title: title.trim() || 'Untitled', content, createdAt: ts, updatedAt: ts };
  const items = loadNotes();
  items.unshift(next);
  saveNotes(items);
  return next;
}

// PUBLIC_INTERFACE
export function updateNote(id, patch) {
  /** Update a note by id with a patch object, persist, and return updated note or null. */
  const items = loadNotes();
  const idx = items.findIndex(n => n.id === id);
  if (idx === -1) return null;
  const updated = { ...items[idx], ...patch, updatedAt: Date.now() };
  items[idx] = updated;
  saveNotes(items);
  return updated;
}

// PUBLIC_INTERFACE
export function deleteNote(id) {
  /** Delete a note by id and persist. Returns true if deleted. */
  const items = loadNotes();
  const next = items.filter(n => n.id !== id);
  const changed = next.length !== items.length;
  if (changed) saveNotes(next);
  return changed;
}

// PUBLIC_INTERFACE
export function getNote(id) {
  /** Retrieve a single note by id or null. */
  const items = loadNotes();
  return items.find(n => n.id === id) || null;
}

function cryptoRandomId() {
  // Use Web Crypto if available
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buf = new Uint32Array(4);
    crypto.getRandomValues(buf);
    return Array.from(buf).map(n => n.toString(16)).join('');
  }
  // Fallback
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
