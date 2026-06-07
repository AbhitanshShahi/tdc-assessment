"use client";

import { useEffect, useState } from "react";

import { saveNote } from "@/lib/storage";

import { Note } from "@/types/note";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  customerId: string;
}

export default function NotesSection({ customerId }: Props) {
  const [note, setNote] = useState("");

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("tdc-notes");

    if (!stored) return;

    const parsed: Note[] = JSON.parse(stored);

    setNotes(parsed.filter((n) => n.customerId === customerId));
  }, [customerId]);

  const handleAddNote = () => {
    if (!note.trim()) return;

    const newNote: Note = {
      id: crypto.randomUUID(),
      customerId,
      content: note,
      createdAt: new Date().toLocaleString(),
    };

    saveNote(newNote);

    setNotes((prev) => [newNote, ...prev]);

    setNote("");
  };

  return (
    <div className="rounded-xl border bg-background p-6">
      <h3 className="mb-4 text-lg font-semibold">Notes</h3>

      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add meeting notes..."
      />

      <Button className="mt-3" onClick={handleAddNote}>
        Add Note
      </Button>

      <div className="mt-6 space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="rounded-lg border p-3">
            <p>{note.content}</p>

            <p className="mt-2 text-xs text-muted-foreground">
              {note.createdAt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
