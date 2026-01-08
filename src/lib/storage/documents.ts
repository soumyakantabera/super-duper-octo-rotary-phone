import { getDB } from './db';
import type { Document } from '../../types/document';
import { v4 as uuidv4 } from 'uuid';

export async function createDocument(
  title: string,
  content: string = ''
): Promise<Document> {
  const db = await getDB();
  const now = Date.now();
  
  const document: Document = {
    id: uuidv4(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
    wordCount: countWords(content),
    characterCount: content.length,
    metadata: {},
  };

  await db.add('documents', document);
  return document;
}

export async function getDocument(id: string): Promise<Document | null> {
  const db = await getDB();
  const doc = await db.get('documents', id);
  return doc || null;
}

export async function updateDocument(
  id: string,
  updates: Partial<Document>
): Promise<void> {
  const db = await getDB();
  const doc = await db.get('documents', id);
  
  if (!doc) {
    throw new Error('Document not found');
  }

  const updatedDoc = {
    ...doc,
    ...updates,
    updatedAt: Date.now(),
  };

  // Recalculate stats if content changed
  if (updates.content !== undefined) {
    updatedDoc.wordCount = countWords(updates.content);
    updatedDoc.characterCount = updates.content.length;
  }

  await db.put('documents', updatedDoc);
}

export async function deleteDocument(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('documents', id);
  await db.delete('autosave', id); // Also delete autosave
}

export async function listDocuments(): Promise<Document[]> {
  const db = await getDB();
  const docs = await db.getAllFromIndex('documents', 'by-updatedAt');
  return docs.reverse(); // Most recent first
}

export async function duplicateDocument(id: string): Promise<Document> {
  const doc = await getDocument(id);
  
  if (!doc) {
    throw new Error('Document not found');
  }

  return createDocument(`${doc.title} (Copy)`, doc.content);
}

// Utility function to count words
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}
