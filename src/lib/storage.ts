import { Note } from "@/types/note";

const NOTES_KEY = "tdc-notes";

export const getNotes = (): Note[] => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(NOTES_KEY);

  return stored ? JSON.parse(stored) : [];
};

export const saveNote = (note: Note) => {
  const notes = getNotes();

  notes.unshift(note);

  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};

export const getCustomerNotes = (customerId: string) => {
  return getNotes().filter((note) => note.customerId === customerId);
};
